import { screen, cleanup } from '@testing-library/react';
import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Conjunto de Testes do Componente About.js', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  afterEach(() => {
    cleanup();
  });

  test('Verifica se a página contém um h2 com o texto "About Pokédex"', () => {
    const heading = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(heading).toBeInTheDocument();
  });
  test('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const paragraphs = screen.getAllByText(/pokémons/i);
    expect(paragraphs).toHaveLength(2);
  });
  test('Verifica se a página contém uma imagem de uma Pokédex', () => {
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
