# Haozhou Wang's Academic Website

This website is built with **Vite + Svelte 5 + TypeScript + TailwindCSS 4**.
It serves as an academic portfolio for Haozhou Wang (王浩舟).

## 🚀 Project Structure

- **`src/`**: Frontend source code (Components, Pages, Services).
    - `routes/`: Svelte pages.
    - `components/`: Reusable Svelte components (`Profile`, `Publications`, etc).
    - `lib/`: Shared utilities (`services/` for logic, `data/` for static data).
- **`public/`**: Static assets.
    - `files/`: PDFs, CVs, and generated data (`scholar.json`, `publications.bib`).
    - `locales/`: i18n translation files.
- **`scripts/`**: Automation scripts (formerly `py/`).
    - `get_google_scholar.py`: Fetches citation stats from Google Scholar.

## 🛠 Local Development

1.  **Install dependencies**:
    ```bash
    pnpm install
    ```

2.  **Start dev server**:
    ```bash
    pnpm dev
    ```
    Open [http://localhost:5173](http://localhost:5173).

3.  **Build for production**:
    ```bash
    pnpm build
    ```
    Output is in `dist/`.

## 🤖 Automation

### Google Scholar Updates
The `scripts/get_google_scholar.py` script fetches latest citation data.
It runs automatically via GitHub Actions (`.github/workflows/update_google_scholar.yml`) every **Monday** or on manual dispatch.

### Zotero Integration
The publications list is rendered from `public/files/publications.bib`.
**Action Required**: Configure your Zotero Better BibTeX export to target:
`<PROJECT_ROOT>/public/files/publications.bib`

## 📦 Deployment

This project uses **GitHub Actions** for deployment.
On every push to `main` branch, the `deploy` workflow builds the site and publishes to **GitHub Pages**.

See `.github/workflows/deploy.yml` for details.
