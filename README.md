# Davide Fornelli's portfolio

## Development

```sh
npm install
npm run dev
npm run build
```

## Background

The dark, granular earth background is derived from the supplied reference in `scripts/assets/earth-reference.png`. A seamless WebP tile preserves its irregular detail; a dark content veil and soft vignette keep the texture restrained. Warm ivory text, brighter hover colours, and a contrasting selection highlight preserve readability. Everything is static CSS, with no animation or additional browser dependencies. Print restores dark text on white, and forced-colour mode hides decorative layers.

Adjust intensity in `src/style.css` using `--background-texture-opacity`, `--background-content-shade`, and `--background-vignette-opacity`. The grain stays the same size on mobile, with a slightly stronger content veil for small screens.

The generated asset is committed in `public/textures/`; normal development and builds do not need Python. To regenerate it:

```sh
python -m venv /tmp/portfolio-background-tools
/tmp/portfolio-background-tools/bin/pip install numpy pillow
/tmp/portfolio-background-tools/bin/python scripts/generate-background.py
```

## Analytics

The site uses the existing `@vercel/analytics` integration. In the Vercel project dashboard, open **Analytics**, enable **Web Analytics**, then redeploy. Page views are available on Hobby within its usage limits. **Custom events require Vercel Pro**; this code does not change your plan or enable paid add-ons.

After deploying, view interaction counts in **Analytics → Events**:

| Event | Properties | Meaning |
| --- | --- | --- |
| Primary link clicked | `link`: CV, Mail, GitHub | Visitor activated a primary link (not proof of a download or sent email) |
| Project clicked | `project`: title | Visitor opened a linked project |
| Projects viewed | None | Projects heading entered the viewport (not proof it was read) |
| Cube interacted | `action`: rotate, move, reset, pause, resume; `input`: pointer, keyboard | Visitor actively used the cube |

Each event/property combination is counted once per page load to avoid flooding analytics with drags or repeated key presses. Idle cube animation is not counted. Middle-clicks and keyboard link activation are supported.

Implementation: `src/lib/engagement.js`, with cube events in `src/components/portrait-cube.js`. No session recordings, form contents, email addresses, or pointer coordinates are sent by this instrumentation. Query strings and URL fragments are removed from event URLs; Do Not Track and Global Privacy Control opt-outs are respected. Review applicable privacy disclosure requirements before publishing.

Development uses Vercel's debug mode rather than production reporting. Ad blockers and visitor opt-outs can prevent collection. This dashboard shows aggregate engagement, not which individual recruiter visited.

Vercel documentation: [setup](https://vercel.com/docs/analytics/quickstart), [custom events](https://vercel.com/docs/analytics/custom-events), [plan requirements](https://vercel.com/docs/analytics/limits-and-pricing).
