import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { mockUser } from '../../../__mocks__/user';
import GithubUserCard from './index';

jest.mock('../Tabs', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Tabs Component</div>),
}));

describe('GithubUserCard Component', () => {
  test('renders the mockuser details correctly when mockuser is provided', async () => {
    render(<GithubUserCard user={mockUser} />);

    expect(screen.getByRole('img')).toHaveAttribute('src', 'http://avatar.url');
    expect(screen.getByText('User')).toBeInTheDocument();

    expect(screen.getByText(/Test Company/)).toBeInTheDocument();
    expect(screen.getByText(/Test Location/)).toBeInTheDocument();
    expect(screen.getByText(/testuser/)).toBeInTheDocument();

    const button = screen.getByText('Visit GitHub Profile');
    expect(button).toHaveAttribute('href', 'https://github.com/testUser');

    expect(screen.getByText('This is a test user bio.')).toBeInTheDocument();
    expect(screen.getByText('Member since: 1/1/2020')).toBeInTheDocument();
  });

  test('does not render anything when mockuser is null', () => {
    render(<GithubUserCard user={null} />);
    expect(screen.queryByText('Visit GitHub Profile')).not.toBeInTheDocument();
  });
});
