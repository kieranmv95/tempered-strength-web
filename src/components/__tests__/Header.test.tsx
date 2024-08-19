import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('<Header />', () => {
  it('renders expected output', () => {
    render(<Header />);

    const text = screen.getByText('Newsletter');

    expect(text).toBeInTheDocument();
  });
});
