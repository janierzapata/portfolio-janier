import { experience } from '../content';
import { Section } from '../components/Section';
import { WithYears } from '../components/WithYears';
import type { Role } from '../content/types';

function period(role: Role): string {
  if (!role.start) return role.end ? `Hasta ${role.end}` : 'Actual';
  return `${role.start} — ${role.end || 'Actual'}`;
}

export function Experience() {
  return (
    <Section
      id="experiencia"
      eyebrow="Experiencia"
      title="Trayectoria"
      lead={
        <WithYears text="{years} años entre desarrollo full-stack, microservicios e infraestructura." />
      }
    >
      <ol className="timeline">
        {experience.map((role) => (
          <li key={`${role.company}-${role.title}`} className="timeline__item">
            <span className="timeline__marker" aria-hidden="true" />
            <article className="glass-card">
              <p className="timeline__when">{period(role)}</p>
              <h3 className="timeline__title">
                {role.title} <span className="timeline__company">· {role.company}</span>
              </h3>
              <p className="timeline__summary">{role.summary}</p>
              {role.highlights.length > 0 ? (
                <ul className="timeline__highlights">
                  {role.highlights.map((item) => (
                    <li key={item.slice(0, 32)}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
