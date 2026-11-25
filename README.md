# Maritime 3DSG paper website

Project page for **Persistent Metric-Semantic Maritime Scene Memory from
Open-Vocabulary 3D Scene Graphs**.

Intended URL: https://kimachristensen.github.io/maritime_3dsg/

A static HTML/CSS/JavaScript website following the visual style of the Bridge
Policy project page. No build step or package installation is needed.

## Preview

From this directory:

```sh
python3 -m http.server 8000
```

Visit http://localhost:8000/. Figure enlargement works with a keyboard or mouse.
The citation copy button is available on localhost and HTTPS. The citation stays
selectable if clipboard access is unavailable.

## Publish to GitHub Pages

Push the website files to the `main` branch of
`kimachristensen/maritime_3dsg`, then select **GitHub Actions** under the
repository's **Settings → Pages → Build and deployment → Source**. The included
workflow deploys the site on each push to `main` and also supports manual runs.

The workflow publishes only `index.html`, `.nojekyll`, and `static/`. The original
Overleaf ZIP is ignored by Git and is not included in the Pages artifact.

Alternatively, this buildless site can be deployed using Pages' **Deploy from a
branch** option with `main` and `/ (root)`; remove the Actions workflow if using
that option. Do not commit the Overleaf archive or other private working files.

## Content and assets

- `index.html`: title, authors, affiliation, supplied abstract, figure captions,
  arXiv link, embedded video, and supplied preprint citation.
- `static/css/index.css`: responsive layout and typography.
- `static/js/index.js`: accessible figure dialogs and citation copying.
- `static/images/`: WebP versions of the four supplied Overleaf figures, kept at
  their original pixel dimensions and encoded at quality 92.

The abstract is reproduced from the supplied `root.tex`, as one paragraph. The overview and results adapt the manuscript for the project page. The single paper link
opens arXiv; no local manuscript PDF is published.

The layout follows the Bridge Policy site and credits the original Nerfies
template. Google Fonts and the YouTube embed require an internet connection;
system fonts provide a fallback.
