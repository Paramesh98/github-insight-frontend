import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PaginatedComponent from './index';

const mockData = Array.from({ length: 20 }, (_val, index) => `Item ${index + 1}`);
const renderItem = (item: string) => <div>{item}</div>;

describe('PaginatedComponent', () => {
  it('should display the title when no data is present', () => {
    render(
      <PaginatedComponent
        data={[]}
        itemsPerPage={20}
        renderItem={renderItem}
        isLoading={false}
        title='Items'
        currentPage={1}
        isLastPage={false}
        setCurrentPage={jest.fn()}
      />
    );

    const noItemsText = screen.getByText('No Items found');
    expect(noItemsText).toBeInTheDocument();
  });

  it('should correctly display paginated items', () => {
    render(
      <PaginatedComponent
        data={mockData}
        itemsPerPage={20}
        renderItem={renderItem}
        isLoading={false}
        title='Items'
        currentPage={1}
        isLastPage={false}
        setCurrentPage={jest.fn()}
      />
    );

    const displayedItems = screen.getAllByText(/Item \d+/);
    expect(displayedItems).toHaveLength(20);
  });

  it('should update the displayed items when a new page is selected', () => {
    render(
      <PaginatedComponent
        data={mockData}
        itemsPerPage={5}
        renderItem={renderItem}
        isLoading={false}
        title='Items'
        currentPage={1}
        isLastPage={false}
        setCurrentPage={jest.fn()}
      />
    );

    const nextButton = screen.getAllByText('Next');
    const prevButton = screen.getAllByText('Previous');
    expect(nextButton[0]).toBeInTheDocument();
    expect(prevButton[0]).toBeInTheDocument();
  });

  it('should render the pagination component correctly', () => {
    render(
      <PaginatedComponent
        data={mockData}
        itemsPerPage={5}
        renderItem={renderItem}
        isLoading={false}
        title='Items'
        currentPage={1}
        isLastPage={false}
        setCurrentPage={jest.fn()}
      />
    );

    const paginationItems = screen.getAllByRole('listitem');
    expect(paginationItems).toHaveLength(2);
  });

  it('should show correct pagination info when items are loaded', () => {
    render(
      <PaginatedComponent
        data={mockData.slice(0, 5)}
        itemsPerPage={5}
        renderItem={renderItem}
        isLoading={false}
        title='Items'
        currentPage={1}
        isLastPage={false}
        setCurrentPage={jest.fn()}
      />
    );

    const paginationInfo = screen.getByText('Showing 1-5 items');
    expect(paginationInfo).toBeInTheDocument();
  });
});
