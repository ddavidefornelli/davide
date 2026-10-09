# Davide Fornelli's portfolio

## Development

```sh
npm install
npm run dev
npm run build
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
