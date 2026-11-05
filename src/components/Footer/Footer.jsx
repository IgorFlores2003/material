import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { autor } from '../../data/autor';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer conteudo">
      <div className="footer__evento">
        <span className="rotulo">V Open Innovation 2026</span>
        <span className="footer__creditos">
          Semana da Administração &amp; Ciências Contábeis · Murilo e Yasmim
        </span>
      </div>

      <div className="footer__autor">
        <span>
          Criado por <strong>{autor.nome}</strong>
        </span>
        <div className="footer__redes">
          {autor.linkedin && (
            <a
              href={autor.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`LinkedIn de ${autor.nome}`}
              title="LinkedIn"
            >
              <FaLinkedin aria-hidden="true" />
            </a>
          )}
          <a
            href={autor.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`GitHub de ${autor.nome}`}
            title="GitHub"
          >
            <FaGithub aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
