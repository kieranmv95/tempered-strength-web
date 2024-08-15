import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '../page';

describe('<Page />', () => {
  it('renders a heading and description', () => {
    render(<Page />);

    const heading = screen.getByText('TEMPERED STRENGTH');
    const title = screen.getByText('Coming Soon');

    expect(heading).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
