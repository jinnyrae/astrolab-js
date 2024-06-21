import { Link } from 'react-router-dom';
import { FaInstagramSquare } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
const Footer = () => {
  return (
    <section className="Footer__sec1">
      <footer>
        <div className="Footer__links">
          <Link to={'/cgv'}>CGV</Link>
          <Link to={'/apropos'}>Qui Sommes Nous?</Link>
          <Link to={'/pdc'}>Politique de confidentialité</Link>
        </div>
        <div className="Footer__media">
          <a href="https://www.instagram.com/astr.olab11/">
            <FaInstagramSquare />
          </a>
          <a href="https://x.com/Astrolab111">
            <FaTwitter />
          </a>
        </div>
      </footer>
      <div className="Footer__sec2">
        <p>
          Copyright &copy; {new Date().getFullYear()} | Tous droits résérvés{' '}
        </p>
      </div>
    </section>
  );
};
export default Footer;
