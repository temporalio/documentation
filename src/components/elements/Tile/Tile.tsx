import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./Tile.module.css";

export type TileProps = {
  title: string;
  description: string;
  tags?: string[]; // collected, may be used later
  href?: string; // clickable card when present
  icon?: React.ReactNode; // emoji or SVG
  className?: string;
  headingLevel?: "h2" | "h3";
};

export default function Tile({ title, description, tags = [], href, icon, className, headingLevel = "h3" }: TileProps) {
  const isLink = typeof href === "string" && href.length > 0;
  const Container: React.ElementType = isLink ? Link : "div";
  const containerProps = isLink ? { to: href, href } : {};
  const Heading = headingLevel;

  return (
    <Container
      {...(containerProps as any)}
      className={clsx("tile", styles.tile, className)}
      data-tags={tags.join(",")}
      data-clickable={isLink ? "true" : undefined}
      aria-label={href ? title : undefined}
    >
      <div className={clsx("card__header", styles.header)}>
        {icon ? (
          <div className={styles.icon} aria-hidden>
            {icon}
          </div>
        ) : null}
        <Heading className={styles.title}>{title}</Heading>
      </div>
      <div className={clsx("card__body", styles.body)}>
        <p className={styles.description}>{description}</p>
        {tags.length > 0 && (
          <ul className={styles.tags} aria-label="labels">
            {tags.map((t) => (
              <li key={t} className={clsx("badge badge--secondary", styles.tag)}>
                {t.toUpperCase()}
              </li>
            ))}
          </ul>
        )}
      </div>
      {href && (
        <div className={clsx("card__footer", styles.footer)}>
          <span className={styles.cta}>
            Learn more
            <svg className={styles.arrow} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M5 12h14M13 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      )}
    </Container>
  );
}
