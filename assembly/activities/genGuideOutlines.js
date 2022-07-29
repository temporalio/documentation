import readdirp from "readdirp";
import fs from "fs-extra";
import path from "path";

const xI = 150;
const yI = 65;
const ctxLabel = "guide context";

export async function genGuideOutlines(config) {
  console.log("reading guide configurations...");

  const file_paths = [];
  const guide_configs = {
    cfgs: [],
  };

  let writePath = path.join(config.rootDir, config.guideConfigsPath);

  for await (const entry of readdirp(writePath)) {
    console.log(entry);
    const raw_content = await fs.readJSON(entry.fullPath);
    guide_configs.cfgs.push(raw_content);
  }

  // newNode(0, "Home", 10, 10)
  const diagram_nodes = [];
  const node_links = [];

  let iMeta = {
    id: 1,
    x: 10,
    y: 10,
  };

  for (const cfg of guide_configs.cfgs) {
    iMeta = incrementMeta(iMeta, false, true);
    const gNode = newNode(iMeta.id, cfg.title, iMeta.x, iMeta.y);
    //const gLink = newLink("node-0", gNode.id);
    diagram_nodes.push(gNode);
    //node_links.push(gLink);
    const gParentId = gNode.id;
    let h2flag = true;
    for (const h2 of cfg.h2_sections) {
      if (h2flag) {
        iMeta = incrementMeta(iMeta, true, true);
      } else {
        iMeta = incrementMeta(iMeta, false, true);
      }
      h2flag = false;
      let h2Label = "";
      if (h2.header == "none") {
        h2Label = ctxLabel;
      } else {
        h2Label = h2.header;
      }
      const h2Snode = newNode(iMeta.id, h2Label, iMeta.x, iMeta.y);
      const h2Slink = newLink(gParentId, h2Snode.id);
      diagram_nodes.push(h2Snode);
      node_links.push(h2Slink);

      if (h2?.h3_sections) {
        const h2ParentId = h2Snode.id;
        let h3flag = true;
        for (const h3 of h2.h3_sections) {
          if (h3flag) {
            iMeta = incrementMeta(iMeta, true, true);
          } else {
            iMeta = incrementMeta(iMeta, false, true);
          }
          h3flag = false;
          let h3Label = "";
          if (h3.header == "none") {
            h3Label = ctxLabel;
          } else {
            h3Label = h3.header;
          }
          const h3Snode = newNode(iMeta.id, h3Label, iMeta.x, iMeta.y);
          const h3Slink = newLink(h2ParentId, h3Snode.id);
          diagram_nodes.push(h3Snode);
          node_links.push(h3Slink);
          if (h3?.h4_sections) {
            const h3ParentId = h3Snode.id;
            let h4flag = true;
            console.log(JSON.stringify(h3));
            for (const h4 of h3.h4_sections) {
              if (h4flag) {
                iMeta = incrementMeta(iMeta, true, true);
              } else {
                iMeta = incrementMeta(iMeta, false, true);
              }
              h4flag = false;
              let h4Label = "";
              if (h4.header == "none") {
                h4Label = ctxLabel;
              } else {
                h4Label = h4.header;
              }
              const h4Snode = newNode(iMeta.id, h4Label, iMeta.x, iMeta.y);
              const h4Slink = newLink(h3ParentId, h4Snode.id);
              diagram_nodes.push(h4Snode);
              node_links.push(h4Slink);
            }
            iMeta = decrementX(iMeta);
          }
        }
        iMeta = decrementX(iMeta);
      }
    }
    iMeta = resetX(iMeta);
  }

  writePath = path.join(
    config.rootDir,
    config.outlineDiagramFilePath,
    config.outlineDiagramJSONFIleName
  );

  await fs.writeJSON(writePath, {nodes: diagram_nodes, links: node_links});
  return;
}

function incrementMeta(iMeta, x, y) {
  iMeta.id++;
  if (x) {
    iMeta.x = iMeta.x + xI;
  }
  if (y) {
    iMeta.y = iMeta.y + yI;
  }
  return iMeta;
}

function decrementX(iMeta) {
  iMeta.x = iMeta.x - xI;
  return iMeta;
}

function resetX(iMeta) {
  iMeta.x = 10;
  return iMeta;
}

function newNode(id, content, x, y) {
  return {id: `node-${id}`, content: content, coordinates: [x, y]};
}

function newLink(inputNode, outputNode) {
  return {input: inputNode, output: outputNode, readonly: true};
}
