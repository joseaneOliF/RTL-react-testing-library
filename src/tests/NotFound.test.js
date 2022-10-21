import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('', () => {
  test('se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const titleNotFound = screen.getByRole('heading', { level: 2, name: 'Page requested not found' });
    expect(titleNotFound).toBeInTheDocument();
  });

  test('se a página mostra uma imagem', () => {
    renderWithRouter(<NotFound />);
    const imageNotFound = screen.getByRole('img');
    expect(imageNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
