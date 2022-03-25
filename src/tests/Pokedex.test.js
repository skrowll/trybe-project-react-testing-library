import { screen, cleanup } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Conjunto de Testes do Componente Pokedex.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  afterEach(() => {
    cleanup();
  });

  test('Verifica se a página contém um h2 com o texto "Encountered pokémons"', () => {
    const heading = screen.getByRole(
      'heading', { name: /encountered pokémons/i, level: 2 },
    );
    expect(heading).toBeInTheDocument();
  });
  test('Verifica exibição do próximo Pokémon quando o botão "Próximo pokémon" é clicado',
    () => {
      const button = screen.getByRole(
        'button', { name: /próximo pokémon/i },
      );
      expect(button).toBeInTheDocument();
      userEvent.click(button);
      const nextPokemon = screen.getByText(/charmander/i);
      if (screen.queryByText(/dragonair/i) !== null) {
        userEvent.click(button);
        const firstPokemon = screen.getByText(/pikachu/i);
        expect(firstPokemon).toBeInTheDocument();
      } else {
        expect(nextPokemon).toBeInTheDocument();
      }
    });
  test('Verifica se é mostrado apenas um Pokémon por vez', () => {
    const card = screen.getAllByTestId('pokemon-name');
    expect(card.length).toBe(1);
  });
  test('Verifica se a Pokédex tem os botões de filtro', () => {
    const typesButtons = screen.getAllByTestId('pokemon-type-button');
    const typesAmount = 7;
    const typeTestId = 'pokemon-type';
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(typesButtons.length).toBe(typesAmount);
    const electricTypeButton = typesButtons[0];
    userEvent.click(electricTypeButton);
    const electricType = screen.getByTestId(typeTestId, { name: /electric/i });
    expect(electricType).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();
    expect(electricTypeButton.textContent).toBe('Electric');
    const fireTypeButton = typesButtons[1];
    userEvent.click(fireTypeButton);
    const fireType = screen.getByTestId(typeTestId, { name: /fire/i });
    expect(fireType).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();
    expect(fireTypeButton.textContent).toBe('Fire');
    const bugTypeButton = typesButtons[2];
    userEvent.click(bugTypeButton);
    const bugType = screen.getByTestId(typeTestId, { name: /bug/i });
    expect(bugType).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();
    expect(bugTypeButton.textContent).toBe('Bug');
    const poisonTypeButton = typesButtons[3];
    userEvent.click(poisonTypeButton);
    const poisonType = screen.getByTestId(typeTestId, { name: /poison/i });
    expect(poisonType).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();
    expect(poisonTypeButton.textContent).toBe('Poison');
    const psychicTypeButton = typesButtons[4];
    userEvent.click(psychicTypeButton);
    const psychicType = screen.getByTestId(typeTestId, { name: /psychic/i });
    expect(psychicType).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();
    expect(psychicTypeButton.textContent).toBe('Psychic');
    const normalTypeButton = typesButtons[5];
    userEvent.click(normalTypeButton);
    const normalType = screen.getByTestId(typeTestId, { name: /normal/i });
    expect(normalType).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();
    expect(normalTypeButton.textContent).toBe('Normal');
    const dragonTypeButton = typesButtons[6];
    userEvent.click(dragonTypeButton);
    const dragonType = screen.getByTestId(typeTestId, { name: /dragon/i });
    expect(dragonType).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();
    expect(dragonTypeButton.textContent).toBe('Dragon');
  });
  test('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    const buttonAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(buttonAll);
    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });
});
