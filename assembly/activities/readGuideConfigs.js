export async function genGuideConfigObject() {
  const file_paths = [];
  const guide_configs = {
    cfgs: [],
  };
  for await (const entry of readdirp(GUIDE_CONFIGS_PATH)) {
    const file = new File(entry.basename, entry.path, entry.fullPath);
    file_paths.push(file);
  }
  for (const file of file_paths) {
    const raw_content = await fs.readFile(`${file.fullpath}`);
    guide_configs.cfgs.push(JSON.parse(raw_content));
  }
  return guide_configs;
}
