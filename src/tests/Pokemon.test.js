import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Conjunto de Testes do Componente Pokemon.js', () => {
  // beforeEach(() => {
  //   renderWithRouter(<App />);
  // });

  test('Verifica se é renderizado um card com as informações de determinado pokémon',
    () => {
      renderWithRouter(<App />);
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName.textContent).toBe('Pikachu');
      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType.textContent).toBe('Electric');
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
      const pokemonImg = screen.getByAltText('Pikachu sprite');
      expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
    });
  test('Verifica se o card do Pokémon na Pokédex contém um link para exibir os detalhes',
    () => {
      renderWithRouter(<App />);
      const detailsLink = screen.getByText(/more details/i);
      expect(detailsLink.href).toBe('http://localhost/pokemons/25');
    });
  test('Verifica se ao clicar no link, é redirecionado para a página de detalhes',
    () => {
      const { history } = renderWithRouter(<App />);
      const detailsLink = screen.getByText(/more details/i);
      userEvent.click(detailsLink);
      expect(history.location.pathname).toBe('/pokemons/25');
    });
  test('Verifica se existe um ícone de estrela nos Pokémons favoritados',
    () => {
      renderWithRouter(<App />);
      const detailsLink = screen.getByText(/more details/i);
      userEvent.click(detailsLink);
      const favoriteCheckbox = screen.getByRole('checkbox', { checked: false });
      userEvent.click(favoriteCheckbox);
      const star = screen.getByAltText('Pikachu is marked as favorite');
      expect(star).toHaveAttribute('src', '/star-icon.svg');
      expect(star).toBeInTheDocument();
    });
});
