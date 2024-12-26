import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { mockGistData } from '../../../__mocks__/gist';
import { Gist } from './index';

describe('Gist Component', () => {
  it('renders the avatar with the correct src and alt text', () => {
    render(<Gist data={mockGistData} />);

    const avatarImage: HTMLImageElement = screen.getByAltText('avatar');
    expect(avatarImage).toHaveAttribute('src', 'https://example.com/avatar.png');
    expect(avatarImage).toHaveAttribute('alt', 'avatar');
  });

  it('renders the username', () => {
    render(<Gist data={mockGistData} />);

    const link = screen.getByText('TestUser');
    expect(link).toBeInTheDocument();
  });

  it('displays the gist description correctly', () => {
    render(<Gist data={mockGistData} />);

    const description = screen.getByText('A mock gist description');
    expect(description).toBeInTheDocument();
  });

  it('displays created and updated dates', () => {
    render(<Gist data={mockGistData} />);

    const createdDate = screen.getByText('12/25/2024');
    const updatedDate = screen.getByText('12/26/2024');
    expect(createdDate).toBeInTheDocument();
    expect(updatedDate).toBeInTheDocument();
  });

  it('shows the correct metadata for public status and comments', () => {
    render(<Gist data={mockGistData} />);

    const publicStatus = screen.getByText('Yes');
    const comments = screen.getByText('5');
    expect(publicStatus).toBeInTheDocument();
    expect(comments).toBeInTheDocument();
  });

  it('renders a link to view the gist', () => {
    render(<Gist data={mockGistData} />);

    const viewGistButton = screen.getByRole('button', { name: /View Gist/ });
    expect(viewGistButton).toHaveAttribute('href', 'https://example.com/gist123');
    expect(viewGistButton).toBeInTheDocument();
  });

  it('renders the correct files with the filename, language, and size', () => {
    render(<Gist data={mockGistData} />);

    const fileItem = screen.getByText('file1.js');
    expect(fileItem).toBeInTheDocument();

    const fileInfo = screen.getByText(/JavaScript \| 1234 bytes/);
    expect(fileInfo).toBeInTheDocument();

    const viewFileButton = screen.getByRole('button', { name: /View File/ });
    expect(viewFileButton).toHaveAttribute('href', 'https://example.com/file1.js');
  });
});
