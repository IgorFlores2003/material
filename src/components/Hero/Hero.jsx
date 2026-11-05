import { FiArrowDown } from 'react-icons/fi';
import ilustracao from '../../assets/hero-ilustracao.jpg';
import './Hero.css';

function Hero() {
  return (
    <header className="hero">
      <div className="hero__texto conteudo">
        <p className="hero__evento">
          <strong>Workshop</strong>
          Open Innovation 2026
        </p>

        <h1 className="hero__titulo">
          <span className="hero__titulo-pequeno">Sua</span>
          <span className="hero__titulo-grande">Carreira</span>
          <span className="hero__titulo-medio">
            começa antes do <em className="hero__destaque">Diploma</em>
          </span>
        </h1>

        <p className="hero__curso">Administração e Ciências Contábeis</p>
        <p className="hero__autores">Murilo Silva &amp; Yasmim Nascimento</p>

        <a className="hero__cta" href="#materiais">
          Baixar materiais
          <FiArrowDown aria-hidden="true" />
        </a>
      </div>

      <img className="hero__ilustracao" src={ilustracao} alt="" />
    </header>
  );
}

export default Hero;
