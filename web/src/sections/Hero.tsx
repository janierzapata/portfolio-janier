import { profile, withUrl } from '../content';
import { ButtonLink } from '../components/Button';
import { Icon } from '../components/Icon';

// Las tarjetas del hero son decorativas: muestran el tipo de trabajo (un
// pipeline, un despliegue) como el DESIGN.md muestra formularios de login.
// Van con aria-hidden porque su texto no aporta nada a un lector de pantalla
// que no esté ya en el resto de la página.
const pipeline = [
  { label: 'Instalar · npm ci', time: '14s' },
  { label: 'Tipos y lint', time: '09s' },
  { label: 'Build', time: '21s' },
  { label: 'Escaneo Trivy', time: '17s' },
  { label: 'Push a GHCR', time: '06s' },
];

export function Hero() {
  return (
    <header id="inicio" className="hero">
      <div className="spotlight" aria-hidden="true" />
      <div className="container hero__inner">
        <p className="eyebrow">{profile.eyebrow}</p>
        <h1 className="wordmark">{profile.name}</h1>
        <p className="hero__role">{profile.role}</p>
        <p className="hero__tagline">{profile.tagline}</p>
        <div className="hero__actions">
          <ButtonLink variant="primary" href="#contacto">
            Contáctame
            <Icon name="arrow" />
          </ButtonLink>
          <ButtonLink variant="ghost" href="#proyectos">
            Ver proyectos
          </ButtonLink>
          {withUrl([profile.contact.cv]).map((cv) => (
            <ButtonLink key={cv.url} variant="outline" href={cv.url} download={cv.fileName}>
              <Icon name="download" />
              Hoja de vida
            </ButtonLink>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="hero__stage" aria-hidden="true">
          <div className="float-card float-card--left">
            <div className="float-card__head">
              <span>Infraestructura</span>
              <span className="float-card__meta">terraform</span>
            </div>
            <pre className="term">
              <span className="term__prompt">$ terraform plan</span>
              {'\n'}+ azurerm_kubernetes_cluster{'\n'}+ aws_db_instance{'\n'}
              <span className="term__ok">Plan: 2 to add, 0 to destroy</span>
            </pre>
          </div>

          <div className="float-card float-card--center">
            <div className="float-card__head">
              <span>Integración</span>
              <span className="float-card__meta">main · a1f9c3e</span>
            </div>
            <ol className="steps">
              {pipeline.map((step) => (
                <li key={step.label} className="step">
                  <span className="step__dot" />
                  {step.label}
                  <span className="step__time">{step.time}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="float-card float-card--right">
            <div className="float-card__head">
              <span>Despliegue</span>
              <span className="float-card__meta">release-1.0.0</span>
            </div>
            <pre className="term">
              <span className="term__prompt">$ docker compose up -d</span>
              {'\n'}✓ web healthy{'\n'}✓ api healthy{'\n'}
              <span className="term__ok">caddy reload · ok</span>
            </pre>
          </div>
        </div>
      </div>
    </header>
  );
}
