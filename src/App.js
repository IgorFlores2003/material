import Header from './components/Header/Header';
import MaterialList from './components/MaterialList/MaterialList';
import { materiais } from './data/materiais';

function App() {
  return (
    <div className="container">
      <Header />
      <main>
        <MaterialList materiais={materiais} />
      </main>
      <footer className="rodape">
        Semana da Administração &amp; Ciências Contábeis · LACUS · Murilo e Yasmim
      </footer>
    </div>
  );
}

export default App;
