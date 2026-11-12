# portfolio-site

Fahad Qureshi's finance work gallery: Power BI dashboards, n8n automations and ERP workflow maps.

## Pages
- `index.html` — Gallery (tabs, filters, cards)
- `erp-workflows.html` — ERP workflow maps for 8 industries
- `about.html` — About, experience and credentials

## How to update
| To change | Edit |
|---|---|
| Add or edit a gallery card, screenshots, downloads | **Admin screen:** app.pagescms.org → this repo → Gallery projects |
| Photo, CV, which tabs say "Coming soon" | Admin screen → Site settings |
| (same, by hand) | `data/projects.json`, `data/settings.json`, files in `images/` and `downloads/` |
| ERP tasks, owners, automation ideas | `data/erp-data.js` |
| Colours and fonts | `assets/site.css` (top of the file) |

Every change pushed to `main` goes live automatically through Cloudflare Pages.
