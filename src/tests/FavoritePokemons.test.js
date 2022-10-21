import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../pages';
import App from '../App';

describe('Testa o componente FavoritePokemons.js', () => {
  test('se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);

    const paragraph = screen.getByText('No favorite pokemon found');
    expect(paragraph).toBeInTheDocument();
  });

  test('Se tem Pokemons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /More Details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    // const favoritedPokemon = screen.getByText('/Favorite pokémons/i');
    // expect(favoritedPokemon).toBeInTheDocument();
    // userEvent.click(favoritedPokemon);

    const checkedPokemon = screen.getByRole('checkbox');
    expect(checkedPokemon).toBeInTheDocument();
    userEvent.click(checkedPokemon);
  });
});
