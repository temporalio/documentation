const body = `# Page not found

This URL does not match a page in the Temporal documentation.

## Where to look next

- [Documentation index](https://docs.temporal.io/llms.txt)
- [Documentation sitemap](https://docs.temporal.io/sitemap.xml)
- [Temporal documentation home](https://docs.temporal.io/)
`;

module.exports = (_request, response) => {
  response
    .status(404)
    .setHeader('Content-Type', 'text/markdown; charset=utf-8')
    .setHeader('Vary', 'Accept, Accept-Encoding')
    .send(body);
};
