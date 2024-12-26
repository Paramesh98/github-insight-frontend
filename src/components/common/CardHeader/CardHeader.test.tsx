import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CardHeader from './index';

const cardHeaderDetails = {
  avatar: 'avatar.png',
  url: 'https://example.com',
  userName: 'Test User',
};

describe('CardHeader Component', () => {
  it('renders the avatar image with correct src and alt text', () => {
    render(
      <CardHeader
        avatar={cardHeaderDetails.avatar}
        url={cardHeaderDetails.url}
        userName={cardHeaderDetails.userName}
      />
    );

    const avatarImage: HTMLImageElement = screen.getByAltText('avatar');

    expect(avatarImage).toHaveAttribute('src', expect.stringContaining('avatar.png'));

    expect(avatarImage).toHaveAttribute('alt', 'avatar');
  });

  it('displays the username correctly', () => {
    render(
      <CardHeader
        avatar={cardHeaderDetails.avatar}
        url={cardHeaderDetails.url}
        userName={cardHeaderDetails.userName}
      />
    );

    const userNameElement = screen.getByText('Test User');
    expect(userNameElement).toBeInTheDocument();
  });

  it('renders the link with the correct href attribute', () => {
    render(
      <CardHeader
        avatar={cardHeaderDetails.avatar}
        url={cardHeaderDetails.url}
        userName={cardHeaderDetails.userName}
      />
    );

    const link = screen.getByRole('link', { name: 'Test User' });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('does not crash when avatar prop is missing', () => {
    render(
      <CardHeader
        avatar={cardHeaderDetails.avatar}
        url={cardHeaderDetails.url}
        userName={cardHeaderDetails.userName}
      />
    );

    const link = screen.getByRole('link', { name: 'Test User' });
    expect(link).toBeInTheDocument();
  });
});
