import MaterialItem from '../MaterialItem/MaterialItem';
import './MaterialList.css';

function MaterialList({ materiais }) {
  return (
    <ul className="material-list">
      {materiais.map((material) => (
        <MaterialItem key={material.id} material={material} />
      ))}
    </ul>
  );
}

export default MaterialList;
