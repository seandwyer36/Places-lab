# Oh, the places you've been

## Author

Sean Dwyer: Lab 2, Fall 2026

## About this lab

A single-page website that shows a world map. Click anywhere on the map to drop a marker and
type some information about that place (when you lived there, a favorite restaurant, a place
you want to visit, and so on).

How it works:

- **Adding places.** Clicking the map drops a marker and opens an info box. Press **Esc** or
  **Enter** (or the Save button) to save what you typed and close the box. The box tells the
  user this each time it opens. Shift+Enter starts a new line.
- **Running list.** Every saved place appears in a list beside the map (below it on phones).
- **Done.** Pressing **Done** stops prompting for locations and hides the list, leaving just
  the map with all of the markers.
- **Viewing a place.** Clicking a marker shows the information entered for it. Esc, Enter, the
  Close button, or clicking outside the box closes it.
- **Reset.** Pressing **Reset** clears the map and the list and starts over.
- **Misclicks.** The new-place box has a **Discard** button that throws the spot away without
  saving it. (Esc and Enter always save, as the assignment specifies.)
- **Deleting one place.** Click a marker (or its entry in the list) and press **Delete** in the
  info box. A second click confirms, so a single stray click can't delete anything.
- **List entries are clickable.** Clicking an entry in the list opens the same info box as
  clicking its marker. This helps when markers overlap.

Design choices:

- The map starts zoomed out to show the whole world, since places can be anywhere on Earth.
  Panning is limited to the edges of the world so clicked coordinates are always valid.
- Info text is limited to 500 characters and the app holds at most 100 places, so nothing a
  user does can slow down or break the page.
- Map markers are drawn with CSS rather than Leaflet's default image files.
- All styling is hand-written CSS in `src/styles.css` (no CSS frameworks).

Built with React, Vite, [Leaflet](https://leafletjs.com/), react-leaflet and OpenStreetMap tiles.

## Prerequisites

- Node.js 20.19 or newer (22.x recommended) and npm. Vite 7 requires this.
- A modern web browser and an internet connection (the map tiles come from OpenStreetMap).

## Building this lab

From an empty directory, after installing the prerequisites:

```bash
git clone <your Classroom repository URL>
cd <repository folder>
npm install
npm run build
```

`npm run build` writes the production site to the `dist/` folder.

## How to run this lab

**Locally**

```bash
npm install
npm run dev
```

Then open the address Vite prints (usually http://localhost:5173).

To run the production build locally instead: `npm run build && npm run preview`.

**On render.com**

Live site: TODO paste your onrender.com URL here

The site is deployed as a Render **Static Site** with:

- Build command: `npm install && npm run build`
- Publish directory: `dist`

Differences between local and Render: locally you use the Vite development server (hot reload,
unminified code). On Render the pre-built `dist/` files are served as plain static files, so
the app behaves the same but loads from the minified production bundle.

## Testing procedures

TODO: confirm each item below in your own browser and note anything that failed.

1. Click the map. A marker appears and the info box opens with the Esc/Enter instruction.
2. Type text and press Enter. The box closes and the place shows in the list. Repeat with Esc.
3. Press Shift+Enter in the box and confirm a new line is added instead of closing the box.
4. Add several places in different countries and confirm the list numbers them in order.
5. Press Done. The list disappears, the map fills the width, and clicking the map does nothing.
6. Click a marker. Its info appears. Close it with Esc, Enter, the Close button, and by clicking
   outside the box.
7. Press Reset. Markers and list clear, and clicking the map works again.
8. Stress tests: paste a very long block of text, hold Enter down, press Reset many times
   quickly, and click rapidly on the map. Nothing should crash or show an error.
9. Resize the window to phone width (or use browser device mode) and repeat steps 1 to 7.
10. Click the map, then press **Discard**. No place should be added.
11. Click a marker, press **Delete**, then press it again to confirm. Only that place should
    be removed and the list should renumber. Also try deleting from a list entry, and try
    pressing Esc after the first Delete click (nothing should be deleted).
12. Check the browser console for errors.

## Challenges

TODO: describe the real problems you ran into and how you solved them.

## Full attribution of sources

- Leaflet documentation and API reference: https://leafletjs.com/reference.html
- React Leaflet documentation: https://react-leaflet.js.org/
- OpenStreetMap tile usage and attribution: https://www.openstreetmap.org/copyright
- React documentation: https://react.dev/
- Vite documentation: https://vite.dev/guide/
- MDN Web Docs (CSS grid, `ResizeObserver`, KeyboardEvent): https://developer.mozilla.org/
- Libraries used: react, react-dom, leaflet, react-leaflet, vite, @vitejs/plugin-react
- AI assistance: the initial version of the code in `src/`, `index.html`, `vite.config.js` and
  this README was written with Claude (Anthropic, Claude Sonnet 5.5). I reviewed it and can
  explain how each part works. TODO: edit this line to describe any changes you made yourself.

## Extra credit

**Delete a location** from the extra credit list: "edit or delete a location after it has been
added to the map"(mostly because not being able to was making me mad). Click any marker, or click its entry in the list, to open its info box,
then press **Delete** and press it again to confirm. The marker is removed from the map and the
list, and the remaining places keep their markers and are renumbered. This works both before
and after pressing Done.

Editing a saved place's text is not implemented.