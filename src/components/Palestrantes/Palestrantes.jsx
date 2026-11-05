import { FaLinkedin } from 'react-icons/fa';
import './Palestrantes.css';

function iniciais(nome) {
  const partes = nome.trim().split(/\s+/);
  return (partes[0][0] + (partes.length > 1 ? partes[partes.length - 1][0] : '')).toUpperCase();
}

function Palestrantes({ palestrantes }) {
  return (
    <section className="palestrantes conteudo" aria-labelledby="palestrantes-titulo">
      <h2 id="palestrantes-titulo" className="titulo-secao">
        Quem <span>apresentou</span>
      </h2>
      <p className="palestrantes__subtitulo">Conecte-se com os palestrantes no LinkedIn.</p>

      <ul className="palestrantes__lista">
        {palestrantes.map(({ id, nome, linkedin }) => (
          <li key={id} className="palestrante">
            <span className="palestrante__avatar" aria-hidden="true">
              {iniciais(nome)}
            </span>
            <span className="palestrante__nome">{nome}</span>
            <a
              className="palestrante__linkedin"
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`LinkedIn de ${nome}`}
            >
              <FaLinkedin aria-hidden="true" />
              LinkedIn
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Palestrantes;
