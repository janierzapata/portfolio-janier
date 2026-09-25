import type { SkillIcon } from '../content/types';

type IconName = SkillIcon | 'mail' | 'arrow' | 'external' | 'download' | 'chat' | 'copy' | 'check';

// Glifos de línea a 1.5 px, monocromos, como pide el DESIGN.md para los
// mosaicos de iconos. Van en el bundle: nada de sprites externos ni fuentes
// de iconos que añadirían otro origen a la CSP.
const paths: Record<IconName, string> = {
  cloud: 'M7 18h10a4 4 0 0 0 .6-7.96A6 6 0 0 0 6.1 9.1 4.5 4.5 0 0 0 7 18Z',
  container: 'M3 7.5 12 3l9 4.5v9L12 21l-9-4.5v-9ZM3 7.5l9 4.5m0 0 9-4.5M12 12v9',
  pipeline:
    'M5 6a2 2 0 1 0 0 .01M19 18a2 2 0 1 0 0 .01M5 8v3a3 3 0 0 0 3 3h8a3 3 0 0 1 3 3v-1M12 4h7v4',
  code: 'm8 8-4 4 4 4m8-8 4 4-4 4m-2.5-11-3 14',
  server: 'M4 5h16v5H4zM4 14h16v5H4zM8 7.5h.01M8 16.5h.01',
  layout: 'M4 5h16v14H4zM4 9h16M9 9v10',
  database:
    'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3ZM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  shield: 'M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Zm-3 9 2 2 4-4',
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  external: 'M14 5h5v5m0-5-8 8M18 14v5H5V6h5',
  copy: 'M9 9h10v10H9zM5 15V5h10',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  download: 'M12 4v11m-5-5 5 5 5-5M5 20h14',
  // Globo de chat genérico: el logo de WhatsApp es marca registrada y
  // además rompería el sistema de iconos monocromos de línea.
  chat: 'M20 11.5a8 8 0 0 1-11.7 7.1L4 20l1.4-4.1A8 8 0 1 1 20 11.5Z',
};

interface IconProps {
  name: IconName;
}

export function Icon({ name }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  );
}
