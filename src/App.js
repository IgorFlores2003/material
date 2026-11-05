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
      <Header />
      <main className="conteudo">
        <MaterialList materiais={materiais} />
      </main>
      <footer className="rodape conteudo">
        Semana da Administração &amp; Ciências Contábeis · Murilo e Yasmim
      </footer>
    </>
  );
}

export default App;
