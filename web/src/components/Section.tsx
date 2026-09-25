import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  children: ReactNode;
}

// Toda sección abre igual —etiqueta, título, una línea—: es el ritmo que
// define el DESIGN.md y lo que deja escanear la página sin leerla.
export function Section({ id, eyebrow, title, lead, children }: SectionProps) {
  const titleId = `${id}-title`;
  return (
    <section id={id} className="section" aria-labelledby={titleId}>
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={titleId} className="section-title">
            {title}
          </h2>
          {lead ? <p className="section-lead">{lead}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
