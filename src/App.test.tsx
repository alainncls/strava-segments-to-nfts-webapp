import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders loading spinner', () => {
  render(<App />);
  const linkElement = screen.getByRole('status');
  expect(linkElement).toBeInTheDocument();
});
