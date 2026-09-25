import { projects, withUrl } from '../content';
import { Section } from '../components/Section';
import { ButtonLink } from '../components/Button';
import { Icon } from '../components/Icon';
import { RichText } from '../components/RichText';

export function Projects() {
  return (
    <Section
      id="proyectos"
      eyebrow="Proyectos"
      title="Sistemas que diseñé, construí y puse a correr"
      lead="Cada uno con el problema que resolvía, cómo lo resolví y qué quedó funcionando."
    >
      <ul className="projects">
        {projects.map((project, index) => {
          const links = withUrl(project.links);
          return (
            <li
              key={project.id}
              className={`glass-card project${index === 0 ? ' project--featured' : ''}`}
            >
              <div>
                <p className="project__kind">{project.kind}</p>
                <h3 className="project__name">{project.name}</h3>
              </div>
              <dl className="project__body">
                <div>
                  <dt>Problema</dt>
                  <dd>
                    <RichText text={project.problem} />
                  </dd>
                </div>
                <div>
                  <dt>Solución</dt>
                  <dd>
                    <RichText text={project.solution} />
                  </dd>
                </div>
                <div>
                  <dt>Resultado</dt>
                  <dd>
                    <RichText text={project.result} />
                  </dd>
                </div>
              </dl>
              <div className="project__foot">
                <ul className="badge-list" aria-label="Tecnologías">
                  {project.stack.map((tech) => (
                    <li key={tech} className="badge">
                      {tech}
                    </li>
                  ))}
                </ul>
                {links.map((link) => (
                  // Violeta como «Contáctame»: ver el proyecto en vivo es la
                  // acción que más convence, y en contorno se perdía entre las
                  // insignias de tecnologías.
                  <ButtonLink key={link.url} variant="primary" href={link.url}>
                    {link.label}
                    <span className="visually-hidden"> de {project.name}</span>
                    <Icon name="external" />
                  </ButtonLink>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
