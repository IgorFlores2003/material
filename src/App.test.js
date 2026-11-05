import { render, screen } from '@testing-library/react';
import App from './App';

test('lista os materiais com link de download', () => {
  render(<App />);
  const botoes = screen.getAllByRole('link', { name: 'Baixar' });
  expect(botoes).toHaveLength(2);
  expect(botoes[0]).toHaveAttribute('href', expect.stringMatching(/\.pdf$/));
});
