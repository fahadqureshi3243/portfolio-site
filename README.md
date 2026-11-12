# portfolio-site

Fahad Qureshi's finance work gallery: Power BI dashboards, n8n automations and ERP workflow maps.

## Pages
- `index.html` — Gallery (tabs, filters, cards)
- `erp-workflows.html` — ERP workflow maps for 8 industries
- `about.html` — About, experience and credentials

## How to update
| To change | Edit |
|---|---|
| Add or edit a gallery card | `data/projects.js` (one block per card) |
| Add screenshots | put the image in `images/`, then list it under `images` in that card |
| Add a download | put the file in `downloads/` (under 25 MB), then set `download` in that card |
| Turn the Training or Finance Samples tab on | remove it from `comingSoon` in `data/projects.js` |
| ERP tasks, owners, automation ideas | `data/erp-data.js` |
| Colours and fonts | `assets/site.css` (top of the file) |

Every change pushed to `main` goes live automatically through Cloudflare Pages.
