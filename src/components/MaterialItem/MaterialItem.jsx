import { FaRegFilePdf } from 'react-icons/fa';
import { FiDownload, FiExternalLink } from 'react-icons/fi';
import './MaterialItem.css';

function MaterialItem({ material, numero }) {
  const { titulo, descricao, arquivo, paginas, tamanho } = material;
  const url = `${process.env.PUBLIC_URL}/material/${arquivo}`;
  const rotuloPaginas = paginas === 1 ? 'página' : 'páginas';

  return (
    <li className="material-item">
      <div className="material-item__topo">
        <span className="material-item__numero">{String(numero).padStart(2, '0')}</span>
        <FaRegFilePdf className="material-item__icone" aria-hidden="true" />
      </div>

      <div className="material-item__info">
        <h3 className="material-item__titulo">{titulo}</h3>
        <p className="material-item__descricao">{descricao}</p>
        <p className="material-item__meta">
          PDF · {paginas} {rotuloPaginas} · {tamanho}
        </p>
      </div>

      <div className="material-item__acoes">
        <a className="material-item__baixar" href={url} download>
          <FiDownload aria-hidden="true" />
          Baixar
        </a>
        <a
          className="material-item__abrir"
          href={url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Abrir ${titulo}`}
          title="Abrir no navegador"
        >
          <FiExternalLink aria-hidden="true" />
        </a>
      </div>
    </li>
  );
}

export default MaterialItem;
