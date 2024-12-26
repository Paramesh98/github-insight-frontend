import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import useFetch from '../../hooks/useFetch';
import { IRepository } from '../../types/Repository';
import TabItem from './tabItem';

jest.mock('../../hooks/useFetch');

describe('TabItem Component', () => {
  const mockComponent = ({ data }: { data: IRepository }) => {
    return <div>{data.name}</div>;
  };

  const endpoint = '/mock-endpoint';

  test('renders PaginatedComponent with data', async () => {
    const mockData = [
      { id: 1, name: 'Repo 1' },
      { id: 2, name: 'Repo 2' },
    ];

    (useFetch as jest.Mock).mockReturnValue({ loading: false, data: mockData, error: null });

    render(<TabItem endpoint={endpoint} Component={mockComponent} title='Repositories' />);

    await waitFor(() => {
      expect(screen.getByText('Repo 1')).toBeInTheDocument();
      expect(screen.getByText('Repo 2')).toBeInTheDocument();
    });
  });

  test('handles paginated data', async () => {
    const mockData = Array.from({ length: 6 }, (_, index) => ({
      id: index + 1,
      name: `Repo ${index + 1}`,
    }));

    (useFetch as jest.Mock).mockReturnValue({ loading: false, data: mockData, error: null });

    render(<TabItem endpoint={endpoint} Component={mockComponent} title='Repositories' />);
    const expectTabItem = (item: (typeof mockData)[0]) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    };
    await waitFor(() => {
      mockData.forEach(expectTabItem);
    });
  });
});
