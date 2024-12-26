import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders the header', () => {
    render(<App />);

    expect(screen.getByText('GitHub User Info')).toBeInTheDocument();
    expect(
      screen.getByText('Retrieve repositories, gists, and organizations for any GitHub user')
    ).toBeInTheDocument();
  });

  it('renders the input', () => {
    render(<App />);
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
