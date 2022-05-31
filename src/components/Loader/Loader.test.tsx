import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from './Loader';

test('renders loading spinner', () => {
  render(<Loader loading={true} />);
  const navbarElement = screen.getByRole('status');
  expect(navbarElement).toBeInTheDocument();
});

test('renders no loading spinner', () => {
  render(<Loader loading={false} />);
  const navbarElement = screen.queryByRole('status');
  expect(navbarElement).not.toBeInTheDocument();
});
