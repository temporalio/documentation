const fs = require("fs");
const path = require("path");
const YAML = require("yaml");

// Load Vale JSON output and fix files based on swap rules from YAML styles

// 🔁 Load all swap rules from *.yml in the styles directory
function loadFixMapFromDirectory(stylesDir) {
  const allFixes = {};

  const files = fs.readdirSync(stylesDir).filter(f => f.endsWith(".yml") || f.endsWith(".yaml"));

  for (const file of files) {
    const filePath = path.join(stylesDir, file);
    const content = fs.readFileSync(filePath, "utf8");
    const parsed = YAML.parse(content);

    if (parsed && parsed.swap && typeof parsed.swap === "object") {
      Object.assign(allFixes, parsed.swap);
    } else {
      console.warn(`⚠️ No 'swap' section found in: ${file}`);
    }
  }

  return allFixes;
}

// ✍️ Apply fixes to files
function applyFixes(errors, fixMap) {
  const files = new Map();

  for (const err of errors) {
    const match = err.Match;
    if (fixMap[match]) {
      if (!files.has(err.Filename)) {
        files.set(err.Filename, []);
      }
      files.get(err.Filename).push(err);
    }
  }

  for (const [filename, issues] of files.entries()) {
    console.log(`🔧 Fixing: ${filename}`);
    let content = fs.readFileSync(filename, "utf8");

    // Sort issues in reverse order to avoid messing up spans
    const sorted = issues.sort((a, b) => b.Span[0] - a.Span[0]);

    for (const issue of sorted) {
      const replacement = fixMap[issue.Match];
      const [start, end] = issue.Span;
      content = content.slice(0, start) + replacement + content.slice(end);
    }

    fs.writeFileSync(filename, content, "utf8");
    console.log(`✅ Fixed ${issues.length} issue(s)`);
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    console.error("Usage: node auto-fix-vale.js <vale-output.json>");
    process.exit(1);
  }

  const valeJsonPath = args[0];
  const stylesDir = path.resolve(__dirname, "styles/Temporal");

  if (!fs.existsSync(stylesDir)) {
    console.error(`❌ Styles directory not found: ${stylesDir}`);
    process.exit(1);
  }

  console.log(`📦 Loading Vale styles from: ${stylesDir}`);
  const fixMap = loadFixMapFromDirectory(stylesDir);

  const raw = fs.readFileSync(valeJsonPath, "utf8");
  const errors = JSON.parse(raw);

  applyFixes(errors, fixMap);
}

main();
