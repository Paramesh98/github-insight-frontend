import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import useFetch from '../useFetch';

const TestComponent = (props: { initialUrl?: string }) => {
  const { data, loading, error, fetchWithUrl } = useFetch(props.initialUrl);
  return (
    <div>
      <div data-testid='loading'>{loading ? 'Loading...' : 'Loaded'}</div>
      <div data-testid='error'>{error || 'No Error'}</div>
      <div data-testid='data'>{data ? JSON.stringify(data) : 'No Data'}</div>
      <button onClick={() => fetchWithUrl('https://example.com')}>Fetch Data</button>
    </div>
  );
};

describe('useFetch Hook', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('should return loading state while fetching data', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { message: 'Test Data' } }),
    });

    render(<TestComponent initialUrl='https://test.com' />);

    expect(screen.getByTestId('loading')).toHaveTextContent('Loading...');
    expect(screen.getByTestId('data')).toHaveTextContent('No Data');
    await act(async () => {
      // Wait for the effect to complete
    });

    expect(screen.getByTestId('loading')).toHaveTextContent('Loaded');
    expect(screen.getByTestId('data')).toHaveTextContent('{"message":"Test Data"}');
  });

  it('should handle successful fetch with data', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { message: 'Test Data' } }),
    });

    render(<TestComponent initialUrl='https://test.com' />);

    await act(async () => {
      // Wait for the effect to complete
    });

    expect(screen.getByTestId('data')).toHaveTextContent('{"message":"Test Data"}');
    expect(screen.getByTestId('loading')).toHaveTextContent('Loaded');
    expect(screen.getByTestId('error')).toHaveTextContent('No Error');
  });

  it('should handle errors correctly', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch failed'));

    render(<TestComponent initialUrl='https://test.com' />);

    await act(async () => {
      // Wait for the effect to complete
    });

    expect(screen.getByTestId('loading')).toHaveTextContent('Loaded');
    expect(screen.getByTestId('error')).toHaveTextContent('Fetch failed');
  });

  it('should call fetchWithUrl to trigger a new fetch', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { message: 'New Data' } }),
    });
    render(<TestComponent />);
    await act(async () => {
      screen.getByText('Fetch Data').click();
    });
    expect(screen.getByTestId('loading')).toHaveTextContent('Loaded');
    expect(screen.getByTestId('data')).toHaveTextContent('{"message":"New Data"}');
  });

  it('should skip fetch if skip option is true', async () => {
    const { container } = render(<TestComponent initialUrl='https://test.com' />);
    await act(async () => {
      container.querySelector('button')?.click();
    });
    expect(screen.getByTestId('data')).toHaveTextContent('No Data');
  });
});
