import './Callout.css';

function Callout({ children }) {
  return (
    <aside className="callout conteudo">
      <p className="callout__texto">{children}</p>
    </aside>
  );
}

export default Callout;
