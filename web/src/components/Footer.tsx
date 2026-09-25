import { profile } from '../content';
import { useCurrentYear } from '../hooks/useCurrentYear';

export function Footer() {
  const year = useCurrentYear();
  return (
    <footer className="footer">
      © {year} {profile.name}
    </footer>
  );
}
