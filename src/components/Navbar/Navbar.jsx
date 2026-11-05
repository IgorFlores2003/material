import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Navbar.css';

function Navbar({ tema, onAlternarTema }) {
  return (
    <nav className="navbar conteudo">
      <span className="navbar__evento">V Open Innovation · Univás 2026</span>
      <ThemeToggle tema={tema} onAlternar={onAlternarTema} />
    </nav>
  );
}

export default Navbar;
