import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders navbar', () => {
  render(<App />);
  const linkElement = screen.getByRole('navigation');
  expect(linkElement).toBeInTheDocument();
});
