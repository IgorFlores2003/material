import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { materiais } from './data/materiais';
import { palestrantes } from './data/palestrantes';

beforeEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
});

test('lista os materiais com link de download', () => {
  render(<App />);
  const botoes = screen.getAllByRole('link', { name: 'Baixar' });
  expect(botoes).toHaveLength(materiais.length);
  expect(botoes[0]).toHaveAttribute('href', expect.stringMatching(/\.pdf$/));
});

test('mostra o LinkedIn de cada palestrante', () => {
  render(<App />);
  palestrantes.forEach(({ nome, linkedin }) => {
    const link = screen.queryByRole('link', { name: `LinkedIn de ${nome}` });
    if (linkedin) {
      expect(link).toHaveAttribute('href', linkedin);
    } else {
      expect(link).not.toBeInTheDocument();
    }
  });
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

test('não salva o PDF com respostas obrigatórias vazias', () => {
  window.print = jest.fn();
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /Salvar em PDF/ }));
  expect(window.print).not.toHaveBeenCalled();
  expect(screen.getByRole('alert')).toHaveTextContent('Nome do entrevistador');
  expect(screen.getByLabelText(/Nome do entrevistador/)).toHaveFocus();

  fireEvent.change(screen.getByLabelText(/Nome do entrevistador/), { target: { value: 'Ana' } });
  fireEvent.change(screen.getByLabelText(/Nome do candidato/), { target: { value: 'Bia' } });
  fireEvent.click(screen.getAllByRole('radio')[1]);
  fireEvent.change(screen.getByLabelText(/Um ponto positivo/), { target: { value: 'Clareza' } });
  fireEvent.change(screen.getByLabelText(/Uma sugestão/), { target: { value: 'Exemplos' } });
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /Salvar em PDF/ }));
  expect(window.print).toHaveBeenCalledTimes(1);
});

test('permite escolher e preencher as fichas', () => {
  render(<App />);
  const nome = screen.getByLabelText(/Nome do entrevistador/);
  fireEvent.change(nome, { target: { value: 'Ana' } });
  expect(nome).toHaveValue('Ana');

  fireEvent.click(screen.getByRole('tab', { name: /Entrevistado$/ }));
  expect(screen.getByLabelText(/^Nome:/)).toHaveValue('');
  expect(screen.getByText('Prepare suas respostas')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('tab', { name: /Entrevistador$/ }));
  expect(screen.getByLabelText(/Nome do entrevistador/)).toHaveValue('Ana');
});
