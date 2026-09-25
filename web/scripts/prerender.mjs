// Inserta el HTML renderizado en dist/index.html. Corre después de
// `vite build` y `vite build --ssr`; el bundle de servidor se borra al final
// para que no viaje dentro de la imagen.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const ssr = fileURLToPath(new URL('../dist-ssr/', import.meta.url));

const { render } = await import(`${ssr}entry-server.js`);
const template = await readFile(`${dist}index.html`, 'utf8');
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error(`No encontré ${marker} en index.html`);

await writeFile(`${dist}index.html`, template.replace(marker, `<div id="root">${render()}</div>`));
await rm(ssr, { recursive: true, force: true });
console.log('prerender: index.html con contenido');
