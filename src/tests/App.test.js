import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Conjunto de Testes do Componente App.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  afterEach(() => {
    cleanup();
  });

  test('Verifica se o primeiro link possui o texto "Home"', () => {
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toHaveTextContent(/home/i);
  });
  test('Verifica se o segundo link possui o texto "About"', () => {
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toHaveTextContent(/about/i);
  });
  test('Verifica se o terceiro link possui o texto "Favorite Pokémons"', () => {
    const linkFav = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkFav).toHaveTextContent(/favorite pokémons/i);
  });
  test('Verifica se redireciona para "/" ao clicar no link Home', () => {
    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);
    const heading = screen.getByRole('heading', { name: /encountered poké/i, nivel: 2 });
    expect(heading).toBeInTheDocument();
  });
  test('Verifica se redireciona para "/about" ao clicar no link About', () => {
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const heading = screen.getByRole('heading', { name: /about pokédex/i, nivel: 2 });
    expect(heading).toBeInTheDocument();
  });
  test('Verifica se redireciona para "/favorites" ao clicar no link Favorite Pokémons',
    () => {
      const linkFav = screen.getByRole('link', { name: /favorite pokémons/i });
      userEvent.click(linkFav);
      const heading = screen.getByRole('heading', { name: /favorite poké/i, nivel: 2 });
      expect(heading).toBeInTheDocument();
    });
  test('Verifica se redireciona para "/NotFound" ao entrar em uma URL desconhecida',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/test');
      const NotFound = screen.getByRole('heading', { name: /not found/i, nivel: 2 });
      expect(NotFound).toBeInTheDocument();
    });
});
