import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('Testa a aplicação About', () => {
  test('se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const titleAbout = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(titleAbout).toBeInTheDocument();
  });

  test('se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const paragraph1 = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémons');
    expect(paragraph1).toBeInTheDocument();

    const paragraph2 = screen.getByText('One can filter Pokémons by type, and see more details for each one of them');
    expect(paragraph2).toBeInTheDocument();
  });

  test('se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const imageAbout = screen.getByRole('img');
    expect(imageAbout).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
