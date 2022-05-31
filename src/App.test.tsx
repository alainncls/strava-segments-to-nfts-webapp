import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders whole page', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  // Check header
  const navbarElement = screen.getByRole('navigation');
  expect(navbarElement).toBeInTheDocument();
  const bannerElement = screen.getByText("Mint NFTs for the eligible Strava segments you've gone through");
  expect(bannerElement).toBeInTheDocument();

  // Check Nav link + GitHub links + login button + footer link
  const linkElements = screen.getAllByRole('link');
  expect(linkElements).toHaveLength(5);

  // Check footer
  const footerElement = screen.getByRole('contentinfo');
  expect(footerElement).toBeInTheDocument();
});
