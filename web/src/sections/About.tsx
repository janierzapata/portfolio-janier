import { profile } from '../content';
import { Section } from '../components/Section';
import { WithYears } from '../components/WithYears';

export function About() {
  return (
    <Section id="sobre-mi" eyebrow="Sobre mí" title="Del commit al contenedor en producción">
      <div className="about">
        <div className="about__identity">
          <ul className="about__facts">
            <li>
              <strong>{profile.role}</strong>
            </li>
            <li>{profile.location}</li>
            <li>{profile.languages.join(' · ')}</li>
          </ul>
          <div className="about__education">
            <h3>Formación</h3>
            <ul>
              {profile.education.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <span>
                    {item.school} · {item.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="about__body">
          {profile.about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>
              <WithYears text={paragraph} />
            </p>
          ))}
        </div>
      </div>

      <ol className="approach" aria-label="Enfoque de trabajo">
        {profile.approach.map((item, index) => (
          <li key={item.title} className="glass-card">
            <span className="approach__index">0{index + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
