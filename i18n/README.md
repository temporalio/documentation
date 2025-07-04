# Temporal Documentation Translation Guide

## 🆕 Adding a New Language

1. **Update `docusaurus.config.js`:**
   ```javascript
   i18n: {
     locales: ['en', 'ko', 'your-locale'],
     localeConfigs: { 'your-locale': { label: 'Your Language' } }
   }
   ```

2. **Generate translation templates:**
   ```bash
   yarn write-translations --locale [your-locale]
   ```

3. **Test locally:**
   ```bash
   yarn start --locale [your-locale]
   ```

## 📝 Translating Documentation

To translate a document that doesn't exist yet:

1. Copy the original file from `docs/` 
2. Place it in `i18n/[locale]/docusaurus-plugin-content-docs/current/{same-path}`
3. Translate the content (keep frontmatter `id` and technical terms unchanged)
4. Test locally

## 📁 File Structure

```
i18n/[locale]/
├── docusaurus-theme-classic/
│   ├── navbar.json     # Navigation menu
│   └── footer.json     # Footer links
└── docusaurus-plugin-content-docs/
    ├── current.json    # Sidebar categories  
    └── current/        # Translated MDX files
        └── {same-path-as-docs}
```

For questions, use GitHub Issues or Community Slack #docs channel.
Thank you for helping make Temporal docs accessible worldwide! 🌍 