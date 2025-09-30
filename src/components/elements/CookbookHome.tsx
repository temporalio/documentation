import React from "react";
import Tile from "@site/src/components/elements/Tile";
import { useAllDocsData } from "@docusaurus/plugin-content-docs/client";
import styles from "./CookbookHome.module.css";
import useGlobalData, { usePluginData } from "@docusaurus/useGlobalData";
import clsx from "clsx";

type CookbookItem = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  permalink: string;
  source?: string;
};

type DocMeta = {
  id: string;
  unversionedId?: string;
  title?: string;
  description?: string;
  frontMatter?: { title?: string; description?: string; tags?: any[] };
  tags?: { label: string }[];
  permalink?: string;
};

function DocTile({ item, docsById }: { item: CookbookItem; docsById: Map<string, DocMeta> }) {
  const { id, title: pluginTitle, description: pluginDescription, tags: pluginTags, permalink: pluginPermalink } = item;

  const docMeta =
    docsById.get(id) ??
    docsById.get(`cookbook:${id}`) ??
    docsById.get(item.id.replace(/^cookbook:/, ""));

  const title = docMeta?.title ?? docMeta?.frontMatter?.title ?? pluginTitle;
  const description = docMeta?.description ?? docMeta?.frontMatter?.description ?? pluginDescription;

  if (!title || !description) {
    throw new Error(
      `Cookbook doc "${id}" missing required field(s):` +
        `${!title ? " title" : ""}` +
        `${!description ? " description" : ""}`
    );
  }

  const tagsFromMeta = docMeta?.tags?.map((t: any) => t.label);
  const tagsFromFrontMatter = Array.isArray(docMeta?.frontMatter?.tags)
    ? docMeta.frontMatter.tags.map((t: any) => (typeof t === "string" ? t : t?.label)).filter(Boolean)
    : undefined;
  const resolvedTags = (tagsFromMeta ?? tagsFromFrontMatter ?? pluginTags) as string[];

  const href = docMeta?.permalink ?? pluginPermalink ?? "#";

  return <Tile title={title} description={description} href={href} tags={resolvedTags} />;
}

export default function CookbookHome() {
  const global = useGlobalData();
  console.log("[CookbookHome] plugins:", Object.keys(global?.plugins ?? {})); // should include 'cookbook-index'

  const dataAny = usePluginData("cookbook-index") as any;
  const allDocsData = useAllDocsData();
  const cookbookDocs = allDocsData?.cookbook?.versions?.find((version: any) => version?.isLast) ??
    allDocsData?.cookbook?.versions?.[0];

  const docsById = React.useMemo(() => {
    const map = new Map<string, DocMeta>();
    const docs: DocMeta[] = cookbookDocs?.docs ?? [];
    docs.forEach((doc) => {
      map.set(doc.id, doc);
      map.set(`cookbook:${doc.id}`, doc);
      if (doc.unversionedId) {
        map.set(doc.unversionedId, doc);
        map.set(`cookbook:${doc.unversionedId}`, doc);
      }
    });
    return map;
  }, [cookbookDocs]);

  const raw = (dataAny?.items ?? []) as (CookbookItem | null | undefined)[];
  raw.forEach((x, i) => {
    if (!x || typeof (x as any).title !== "string") {
      console.warn("[CookbookHome] invalid item at index", i, x);
    }
  });

  const items: CookbookItem[] = raw.filter(
    (x): x is CookbookItem => !!x && typeof x === "object" && typeof (x as any).title === "string"
  );

  if (items.length === 0) {
    throw new Error("CookbookHome: no items found by cookbook-index plugin (check server logs for [cookbook-index]).");
  }

  return (
    <section className={clsx("cookbook--centered", styles.page)}>
      <div className={styles.inner}>
        <header data-testid="cookbook-hero" className={styles.hero} aria-label="Cookbook overview">
          <p className={styles.eyebrow}>Cookbook</p>
          <h1 className={styles.heroTitle}>AI recipes for Temporal.</h1>
          <p className={styles.heroBlurb}>
            Step-by-step solutions that show how to build reliable, production-ready AI systems with Temporal. Learn
            practical paradigms for prompts, tools, retries, and workflow design.
          </p>
        </header>
        <div className={styles.grid}>
          {items.map((it) => (
            <div key={it.id} className={styles.cell}>
              <DocTile item={it} docsById={docsById} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
