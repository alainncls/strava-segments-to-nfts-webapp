import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders loading', () => {
  render(<App />);
  const linkElement = screen.getByRole(/status/i);
  expect(linkElement).toBeInTheDocument();
});
