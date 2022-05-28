import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders navbar', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const linkElement = screen.getByRole('navigation');
  expect(linkElement).toBeInTheDocument();
});
