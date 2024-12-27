import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SearchBar from './index';

describe('SearchBar Component', () => {
  const mockFetchUserData = jest.fn();

  beforeEach(() => {
    mockFetchUserData.mockClear();
  });

  test('renders input field and button correctly', () => {
    render(<SearchBar fetchUserData={mockFetchUserData} loading={false} />);

    const inputElement = screen.getByPlaceholderText('Enter GitHub username');
    const buttonElement = screen.getByRole('button', { name: /search/i });
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('disables the button when input is empty or loading is true', () => {
    render(<SearchBar fetchUserData={mockFetchUserData} loading={false} />);

    const buttonElement = screen.getByRole('button', { name: /search/i });
    fireEvent.change(screen.getByPlaceholderText('Enter GitHub username'), {
      target: { value: '' },
    });
    expect(buttonElement).toBeDisabled();
    render(<SearchBar fetchUserData={mockFetchUserData} loading={true} />);
    expect(buttonElement).toBeDisabled();
  });

  test('calls fetchUserData when submit button is clicked', async () => {
    render(<SearchBar fetchUserData={mockFetchUserData} loading={false} />);

    const inputElement = screen.getByPlaceholderText('Enter GitHub username');
    const buttonElement = screen.getByRole('button', { name: /search/i });
    fireEvent.change(inputElement, { target: { value: 'testUser' } });
    fireEvent.click(buttonElement);
    const fetchMockFn = () => {
      expect(mockFetchUserData).toHaveBeenCalledWith('testUser');
    };
    await waitFor(fetchMockFn);
  });

  test('calls fetchUserData when Enter key is pressed', async () => {
    render(<SearchBar fetchUserData={mockFetchUserData} loading={false} />);

    const inputElement = screen.getByPlaceholderText('Enter GitHub username');
    fireEvent.change(inputElement, { target: { value: 'testUser' } });
    fireEvent.keyUp(inputElement, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(mockFetchUserData).toHaveBeenCalledWith('testUser');
    });
  });

  test('displays "Loading..." when loading is true', () => {
    render(<SearchBar fetchUserData={mockFetchUserData} loading={true} />);

    const buttonElement = screen.getByRole('button', { name: /loading\.\.\./i });
    expect(buttonElement).toHaveTextContent('Loading...');
  });
});
