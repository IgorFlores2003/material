import MaterialItem from '../MaterialItem/MaterialItem';
import './MaterialList.css';

function MaterialList({ materiais }) {
  return (
    <section id="materiais" className="materiais conteudo" aria-labelledby="materiais-titulo">
      <h2 id="materiais-titulo" className="titulo-secao">
        Materiais <span>para baixar</span>
      </h2>
      <p className="materiais__subtitulo">Tudo o que foi usado no workshop, em PDF.</p>

      <ol className="material-list">
        {materiais.map((material, indice) => (
          <MaterialItem key={material.id} material={material} numero={indice + 1} />
        ))}
      </ol>
    </section>
  );
}

export default MaterialList;
