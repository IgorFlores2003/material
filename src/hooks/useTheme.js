import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'tema';

function temaInicial() {
  try {
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (salvo === 'light' || salvo === 'dark') return salvo;
  } catch {
    // localStorage indisponível (ex.: aba anônima): segue o sistema
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  const [tema, setTema] = useState(temaInicial);

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
    try {
      localStorage.setItem(STORAGE_KEY, tema);
    } catch {
      // sem persistência, mas o tema continua funcionando na sessão
    }
  }, [tema]);

  const alternarTema = useCallback(() => {
    setTema((atual) => (atual === 'dark' ? 'light' : 'dark'));
  }, []);

  return { tema, alternarTema };
}
