import Callout from './components/Callout/Callout';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import MaterialList from './components/MaterialList/MaterialList';
import Navbar from './components/Navbar/Navbar';
import { materiais } from './data/materiais';
import { useTheme } from './hooks/useTheme';

function App() {
  const { tema, alternarTema } = useTheme();

  return (
    <>
      <Navbar tema={tema} onAlternarTema={alternarTema} />
      <Hero />
      <main>
        <MaterialList materiais={materiais} />
        <Callout>
          Você não precisa ter toda a carreira planejada, mas pode começar a explorar seus
          caminhos agora.
        </Callout>
      </main>
      <Footer />
    </>
  );
}

export default App;
