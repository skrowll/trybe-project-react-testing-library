import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Conjunto de Testes do Componente FavoritePokemons.js', () => {
  test('Verifica se é exibido "No favorite pokemon found" quando não há favoritos',
    () => {
      renderWithRouter(<FavoritePokemons />);
      const favorites = screen.queryAllByTestId('pokemon-name');
      const message = screen.getByText(/no favorite pokemon found/i);
      favorites.length = 0
        && expect(message).toBeInTheDocument();
    });
  test('Verifica se é exibido todos os cards de Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByText(/more details/i);
    userEvent.click(linkDetails);
    const favoriteCheckbox = screen.getByRole('checkbox', { checked: false });
    userEvent.click(favoriteCheckbox);
    const linkFavPokemons = screen.getByText(/favorite pokémons/i);
    userEvent.click(linkFavPokemons);
    const favorites = screen.queryAllByTestId('pokemon-name');
    expect(favorites.length).toBe(1);
  });
});
