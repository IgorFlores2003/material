import Header from './components/Header/Header';
import MaterialList from './components/MaterialList/MaterialList';
import Navbar from './components/Navbar/Navbar';
import { materiais } from './data/materiais';
import { useTheme } from './hooks/useTheme';

function App() {
  const { tema, alternarTema } = useTheme();

  return (
    <>
      <Navbar tema={tema} onAlternarTema={alternarTema} />
      <div className="container">
        <Header />
        <main>
          <MaterialList materiais={materiais} />
        </main>
        <footer className="rodape">
          Semana da Administração &amp; Ciências Contábeis · Murilo e Yasmim
        </footer>
      </div>
    </>
  );
}

export default App;
