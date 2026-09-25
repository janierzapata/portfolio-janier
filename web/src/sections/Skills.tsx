import { skills } from '../content';
import { Section } from '../components/Section';
import { Icon } from '../components/Icon';

export function Skills() {
  return (
    <Section
      id="habilidades"
      eyebrow="Habilidades"
      title="Infraestructura y aplicación, en el mismo lugar"
      lead="Las herramientas con las que trabajo a diario, agrupadas por la parte del sistema que tocan."
    >
      <ul className="skills">
        {skills.groups.map((group) => (
          <li key={group.id} className="glass-card skill">
            <span className="icon-tile">
              <Icon name={group.icon} />
            </span>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {/* Sin certificaciones cargadas el bloque no se pinta: un título con
          una lista vacía se lee como un error. */}
      {skills.certifications.length > 0 ? (
        <div className="certs">
          <h3>Certificaciones</h3>
          <ul>
            {skills.certifications.map((cert) => (
              <li key={cert.name} className="glass-card">
                {cert.url ? (
                  <a href={cert.url} target="_blank" rel="noopener noreferrer">
                    {cert.name}
                  </a>
                ) : (
                  cert.name
                )}
                <span>
                  {cert.issuer}
                  {cert.year ? ` · ${cert.year}` : ''}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  );
}
