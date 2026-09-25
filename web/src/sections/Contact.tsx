import { profile, whatsappUrl, withUrl } from '../content';
import { Section } from '../components/Section';
import { ButtonLink } from '../components/Button';
import { Icon } from '../components/Icon';
import { CopyEmailButton } from '../components/CopyEmailButton';

export function Contact() {
  const { contact } = profile;
  const links = withUrl(contact.links);
  const whatsapp = whatsappUrl();
  const cv = withUrl([contact.cv]);
  return (
    <Section id="contacto" eyebrow="Contacto" title={contact.heading}>
      {/* Correo, WhatsApp y enlaces: sin formulario no hay datos personales
          que almacenar ni aviso de la Ley 1581 que publicar. */}
      <div className="glass-card contact">
        <p className="section-lead">{contact.text}</p>
        {/* El violeta queda solo en copiar el correo: una sola acción principal. */}
        <div className="contact__primary">
          <CopyEmailButton email={contact.email} />
          {whatsapp ? (
            <ButtonLink variant="ghost" href={whatsapp}>
              <Icon name="chat" />
              WhatsApp
            </ButtonLink>
          ) : null}
        </div>
        {links.length > 0 || cv.length > 0 ? (
          <ul className="contact__links">
            {cv.map((item) => (
              <li key={item.url}>
                <ButtonLink variant="outline" href={item.url} download={item.fileName}>
                  <Icon name="download" />
                  {item.label}
                </ButtonLink>
              </li>
            ))}
            {links.map((link) => (
              <li key={link.url}>
                <ButtonLink variant="outline" href={link.url}>
                  {link.label}
                  <Icon name="external" />
                </ButtonLink>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Section>
  );
}
