import Callout from './components/Callout/Callout';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import MaterialList from './components/MaterialList/MaterialList';
import Navbar from './components/Navbar/Navbar';
import Palestrantes from './components/Palestrantes/Palestrantes';
import { materiais } from './data/materiais';
import { palestrantes } from './data/palestrantes';
import { useTheme } from './hooks/useTheme';

function App() {
  const { tema, alternarTema } = useTheme();

  return (
    <>
      <Navbar tema={tema} onAlternarTema={alternarTema} />
      <Hero />
      <main>
        <MaterialList materiais={materiais} />
        <Palestrantes palestrantes={palestrantes} />
        <Callout>
          Você não prexisa ter toda a sua carreira planejada, mas pode começar a explorar seus caminhos HOJE.
        </Callout>
      </main>
      <Footer />
    </>
  );
}

export default App;
