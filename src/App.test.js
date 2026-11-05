import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
});

test('lista os materiais com link de download', () => {
  render(<App />);
  const botoes = screen.getAllByRole('link', { name: 'Baixar' });
  expect(botoes).toHaveLength(2);
  expect(botoes[0]).toHaveAttribute('href', expect.stringMatching(/\.pdf$/));
});

test('alterna entre tema claro e escuro e salva a escolha', () => {
  render(<App />);
  expect(document.documentElement.dataset.theme).toBe('light');

  fireEvent.click(screen.getByRole('button', { name: 'Mudar para tema escuro' }));
  expect(document.documentElement.dataset.theme).toBe('dark');
  expect(localStorage.getItem('tema')).toBe('dark');

  fireEvent.click(screen.getByRole('button', { name: 'Mudar para tema claro' }));
  expect(document.documentElement.dataset.theme).toBe('light');
});

test('começa com o tema salvo anteriormente', () => {
  localStorage.setItem('tema', 'dark');
  render(<App />);
  expect(document.documentElement.dataset.theme).toBe('dark');
  expect(screen.getByRole('button', { name: 'Mudar para tema claro' })).toBeInTheDocument();
});
