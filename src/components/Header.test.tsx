import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

test('renders header', () => {
  render(<Header />);
  const navbarElement = screen.getByRole('navigation');
  expect(navbarElement).toBeInTheDocument();
  const bannerElement = screen.getByText('Strava Segments to NFTs');
  expect(bannerElement).toBeInTheDocument();
});
