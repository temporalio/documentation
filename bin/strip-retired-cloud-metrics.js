// The Cloud CLI still generates reference text for the retired certificate-authenticated
// metrics endpoint. Keep that section out of the published command reference until
// the command definitions are removed upstream.
function stripRetiredCloudMetrics(content) {
  const heading = '\n## metrics\n';
  const start = content.indexOf(heading);
  if (start === -1) return content;

  const end = content.indexOf('\n## ', start + heading.length);
  if (end === -1) throw new Error('Cloud account metrics section has no following heading');

  const section = content.slice(start, end);
  const commands = [...section.matchAll(/^### /gm)];
  if (commands.length !== 1 || !section.includes('\n### metrics cert-ca\n')) {
    throw new Error('Cloud account metrics commands changed; review the docs filter');
  }

  return content.slice(0, start) + content.slice(end);
}

module.exports = { stripRetiredCloudMetrics };
