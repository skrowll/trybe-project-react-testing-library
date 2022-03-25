import { screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Conjunto de Testes do Componente NotFound.js', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });

  test('Verifica se a página contém um h2 com o texto "Page requested not found 😭"',
    () => {
      const heading = screen.getByRole(
        'heading',
        { name: /Page requested not found/i, level: 2 },
      );
      expect(heading).toBeInTheDocument();
    });
  test('Verifica se a página contém a imagem "Pikachu crying"', () => {
    const img = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
