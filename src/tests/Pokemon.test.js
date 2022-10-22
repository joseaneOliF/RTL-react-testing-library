import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';
import { Pokemon } from '../components';

const pikachu = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
};

describe('Testa o componente Pokemon', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon:', () => {
    renderWithRouter(<App />);
    const pokemonList = pokemons;
    const pokemonWeight = pokemonList[0].averageWeight;

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(pokemonList[0].name);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(pokemonList[0].type);

    const pokemonWeight2 = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight2).toHaveTextContent(`${pokemonWeight.value} ${pokemonWeight.measurementUnit}`);

    const PokemonImg = screen.getByAltText(/Pikachu sprite/i);
    expect(PokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Teste se o card do pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste pokémon.', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonLink = pokemons[0];

    const pokemonDetails = screen.getByRole('link', { name: 'More details' });
    expect(pokemonDetails).toBeInTheDocument();

    userEvent.click(pokemonDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${pokemonLink.id}`);
  });

  test('Teste se existe um ícone de estrela nos pokémons favoritados:', () => {
    renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite />);
    const img = screen.getAllByRole('img');
    expect(img[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(img[1]).toHaveAttribute('alt', `${pikachu.name} is marked as favorite`);
  });
});

// Tive ajuda do colega Sérgio Moreira e estudando o código colega Josiel
