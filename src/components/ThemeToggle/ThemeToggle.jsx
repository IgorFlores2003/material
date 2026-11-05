import { FiMoon, FiSun } from 'react-icons/fi';
import './ThemeToggle.css';

function ThemeToggle({ tema, onAlternar }) {
  const escuro = tema === 'dark';
  const rotulo = escuro ? 'Mudar para tema claro' : 'Mudar para tema escuro';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onAlternar}
      aria-label={rotulo}
      title={rotulo}
    >
      {escuro ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
    </button>
  );
}

export default ThemeToggle;
