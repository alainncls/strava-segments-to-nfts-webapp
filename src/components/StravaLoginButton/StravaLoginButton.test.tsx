import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StravaLoginButton from './StravaLoginButton';

test('renders button to launch Strava login', () => {
  render(<StravaLoginButton />);
  const buttonElement = screen.getByRole('link');
  expect(buttonElement).toBeInTheDocument();
});
