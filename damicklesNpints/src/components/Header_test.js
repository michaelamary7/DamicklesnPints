import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders Header component', () => {
  render(<Header />);
  expect(screen.getByText('Header Component')).toBeInTheDocument();
});
