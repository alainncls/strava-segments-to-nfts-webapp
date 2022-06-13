import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

test('renders login screen', async () => {
  render(
    <MemoryRouter initialEntries={[{ pathname: '/login' }]}>
      <Login />
    </MemoryRouter>,
  );
  const headerElement = await screen.queryByRole('navigation');
  expect(headerElement).not.toBeInTheDocument();

  const footerElement = await screen.queryByRole('contentinfo');
  expect(footerElement).not.toBeInTheDocument();

  const walletElement = screen.getByText('Connect your wallet');
  expect(walletElement).toBeInTheDocument();
});
