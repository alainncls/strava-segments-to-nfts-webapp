import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StravaLogin from './StravaLogin';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ refresh_token: 'refresh_token', access_token: 'access_token' }),
    }),
  ) as jest.Mock;
});

test('renders component to intercept the oauth2 callback', () => {
  render(
    <MemoryRouter initialEntries={[{ pathname: '/oauth' }]}>
      <StravaLogin />
    </MemoryRouter>,
  );
  const headerElement = screen.getByRole('navigation');
  expect(headerElement).toBeInTheDocument();

  const footerElement = screen.getByRole('contentinfo');
  expect(footerElement).toBeInTheDocument();
});

test('renders an error if callback has incomplete scope', () => {
  render(
    <MemoryRouter initialEntries={[{ pathname: '/oauth', search: '?code=authCode&scope=read,read_all' }]}>
      <StravaLogin />
    </MemoryRouter>,
  );
  const toastElement = screen.getByText('The scope you authorized is not sufficient for the app to work');
  expect(toastElement).toBeInTheDocument();
});

test('renders no error if callback is complete', () => {
  render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: '/oauth',
          search: '?code=authCode&scope=read,activity:read,activity:read_all,read_all',
        },
      ]}
    >
      <StravaLogin />
    </MemoryRouter>,
  );

  const toastElement = screen.queryAllByText('The scope you authorized is not sufficient for the app to work');
  expect(toastElement).toHaveLength(0);
});
