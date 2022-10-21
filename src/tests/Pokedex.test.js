import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('', () => {
  test('se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const titlePokedex = screen.getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(titlePokedex).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemonID = screen.getAllByTestId('pokemon-name');
    expect(pokemonID.length).toBe(1);

    const pokemonIDType = screen.getAllByTestId('pokemon-type');
    expect(pokemonIDType.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    // o botão All tem um data-testid diferente do que os outros. data-testid type ="button"
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons[0]).toHaveAccessibleName(/Electric/i); // It is useful, for instance, to assert that form elements and buttons are properly labelled.
    expect(filterButtons[1]).toHaveAccessibleName(/Fire/i);
    expect(filterButtons[2]).toHaveAccessibleName(/Bug/i);
    expect(filterButtons[3]).toHaveAccessibleName(/Poison/i);
    expect(filterButtons[4]).toHaveAccessibleName(/Psychic/i);
    expect(filterButtons[5]).toHaveAccessibleName(/Normal/i);
    expect(filterButtons[6]).toHaveAccessibleName(/Dragon/i);
  }); // https://github.com/testing-library/jest-dom#tohaveaccessiblename

  test('Teste se é possível clicar no botão de filtragem All', () => {
    renderWithRouter(<App />);

    const buttonToFilterByAll = screen.getByRole('button', { name: 'All' });
    // expect(buttonToFilterByAll).toBeInTheDocument();
    userEvent.click(buttonToFilterByAll);
  });
  // Utilizei o código e a explicação do amigo Sérgio Moreira
});
