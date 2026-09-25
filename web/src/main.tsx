import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

// Fuentes auto-hospedadas: las sirve el mismo contenedor, así la CSP no
// necesita abrir un origen externo para ellas.
import '@fontsource-variable/inter/wght.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/jetbrains-mono/400.css';

import './styles/tokens.css';
import './styles/global.css';
import { App } from './App';

const root = document.getElementById('root');
if (!root) throw new Error('Falta #root en index.html');

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// En producción el HTML llega prerenderizado y React solo lo hidrata. En
// `npm run dev` el contenedor viene vacío y se renderiza desde cero.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
