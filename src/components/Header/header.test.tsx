import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from './index';

describe('Header Component', () => {
  it('renders the header correctly', () => {
    render(<Header />);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  it('displays the correct title', () => {
    render(<Header />);

    const titleElement = screen.getByText('GitHub User Info');
    expect(titleElement).toBeInTheDocument();
  });

  it('displays the correct description', () => {
    render(<Header />);

    const descriptionElement = screen.getByText(
      'Retrieve repositories, gists, and organizations for any GitHub user'
    );
    expect(descriptionElement).toBeInTheDocument();
  });

  it('applies the correct classes for background and text color', () => {
    render(<Header />);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveClass('bg-dark');
    expect(headerElement).toHaveClass('text-light');
  });

  it('contains the h1 and p elements', () => {
    render(<Header />);

    const h1Element = screen.getByRole('heading', { level: 1 });
    const pElement = screen.getByText(
      'Retrieve repositories, gists, and organizations for any GitHub user'
    );

    expect(h1Element).toBeInTheDocument();
    expect(pElement).toBeInTheDocument();
  });
});
