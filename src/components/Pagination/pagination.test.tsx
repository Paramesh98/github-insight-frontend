import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import PaginatedComponent from './index';

const mockData = Array.from({ length: 20 }, (_val, index) => `Item ${index + 1}`);
const renderItem = (item: string) => <div>{item}</div>;

describe('PaginatedComponent', () => {
  it('should display the title when no data is present', () => {
    render(
      <PaginatedComponent
        data={[]}
        itemsPerPage={5}
        renderItem={renderItem}
        isLoading={false}
        title='Items'
      />
    );

    const noItemsText = screen.getByText('No Items found');
    expect(noItemsText).toBeInTheDocument();
  });

  it('should correctly display paginated items', () => {
    render(
      <PaginatedComponent
        data={mockData}
        itemsPerPage={5}
        renderItem={renderItem}
        isLoading={false}
        title='Items'
      />
    );

    const displayedItems = screen.getAllByText(/Item \d+/);
    expect(displayedItems).toHaveLength(5);
  });

  it('should update the displayed items when a new page is selected', () => {
    render(
      <PaginatedComponent
        data={mockData}
        itemsPerPage={5}
        renderItem={renderItem}
        isLoading={false}
        title='Items'
      />
    );

    const page2Button = screen.getByText('2');
    fireEvent.click(page2Button);

    const displayedItems = screen.getAllByText(/Item \d+/);
    expect(displayedItems[0]).toHaveTextContent('Item 6');
  });

  it('should render the pagination component correctly', () => {
    render(
      <PaginatedComponent
        data={mockData}
        itemsPerPage={5}
        renderItem={renderItem}
        isLoading={false}
        title='Items'
      />
    );

    const paginationItems = screen.getAllByRole('listitem');
    expect(paginationItems).toHaveLength(4);
  });

  it('should show correct pagination info when items are loaded', () => {
    render(
      <PaginatedComponent
        data={mockData}
        itemsPerPage={5}
        renderItem={renderItem}
        isLoading={false}
        title='Items'
      />
    );

    const paginationInfo = screen.getByText('Showing 1-5 of 20 items');
    expect(paginationInfo).toBeInTheDocument();
  });
});
