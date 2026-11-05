import './App.css';

const BASE = process.env.PUBLIC_URL;

const MATERIAIS = [
  {
    titulo: 'Sua carreira começa antes do diploma',
    descricao: 'Material completo do workshop: currículo, entrevista e imagem profissional.',
    arquivo: 'Sua_Carreira_Comeca_Antes_do_Diploma.pdf',
    info: 'PDF · 80 páginas · 7,5 MB',
  },
  {
    titulo: 'Fichas – Entrevista de Estágio',
    descricao: 'Ficha do entrevistador e ficha do entrevistado para a simulação de entrevista.',
    arquivo: 'Fichas_Entrevista_Estagio.pdf',
    info: 'PDF · 2 páginas · 220 KB',
  },
];

function App() {
  return (
    <div className="page">
      <header className="hero">
        <span className="tag">V Open Innovation · Univás 2026</span>
        <h1>Currículo, Entrevista e Imagem</h1>
        <p className="sub">
          Semana da Administração &amp; Ciências Contábeis
        </p>
      </header>

      <main>
        <h2>Materiais do workshop</h2>
        <ul className="lista">
          {MATERIAIS.map((m) => {
            const url = `${BASE}/material/${m.arquivo}`;
            return (
              <li key={m.arquivo} className="card">
                <div className="icone" aria-hidden="true">PDF</div>
                <div className="texto">
                  <h3>{m.titulo}</h3>
                  <p>{m.descricao}</p>
                  <span className="info">{m.info}</span>
                </div>
                <div className="acoes">
                  <a className="btn" href={url} download>
                    Baixar
                  </a>
                  <a className="link" href={url} target="_blank" rel="noreferrer">
                    Abrir
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </main>

      <footer>LACUS · Murilo e Yasmim</footer>
    </div>
  );
}

export default App;
