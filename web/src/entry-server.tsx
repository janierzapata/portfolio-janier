import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';

// Solo lo usa scripts/prerender.mjs en el build. El HTML sale ya pintado y
// el navegador muestra la página antes de descargar el JS: en un portafolio
// casi todo es texto, y esperar al bundle para verlo es tiempo perdido.
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
