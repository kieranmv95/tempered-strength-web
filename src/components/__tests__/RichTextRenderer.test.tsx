import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RichTextRenderer from '../RichTextRenderer';

const data = {
  nodeType: 'document',
  data: {},
  content: [
    {
      nodeType: 'paragraph',
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Firstly Welcome to the Tempered Strength Newsletter.',
          marks: [{ type: 'bold' }],
          data: {},
        },
      ],
    },
  ],
};

describe('<RichTextRenderer />', () => {
  it('renders expected output', () => {
    render(<RichTextRenderer json={data} />);

    const text = screen.getByText(
      'Firstly Welcome to the Tempered Strength Newsletter.'
    );

    expect(text).toBeInTheDocument();
  });
});
