import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';

interface PaginatedComponentProps<T> {
  data: T[];
  itemsPerPage: number;
  renderItem: (item: T) => React.ReactNode;
  isLoading: boolean;
  title: string;
}

const PaginatedComponent = <T,>({
  data,
  itemsPerPage,
  renderItem,
  isLoading,
  title,
}: PaginatedComponentProps<T>) => {
  const intialPage: number = 1;
  const [activePage, setActivePage] = useState<number>(intialPage);

  const totalPages: number = Math.ceil(data.length / itemsPerPage);

  const handleSelect = (selectedPage: number): void => {
    setActivePage(selectedPage);
  };

  const getCurrentPageData = (): T[] => {
    const startIndex = (activePage - intialPage) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const renderPagination = (): JSX.Element[] => {
    const items: JSX.Element[] = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === activePage}
          onClick={() => handleSelect(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  if (!isLoading && data.length === 0) {
    return <h5 className='text-center my-5'>No {title} found</h5>;
  }
  return (
    <>
      {!isLoading && (
        <div className='mb-2'>
          Showing {Math.min((activePage - intialPage) * itemsPerPage + intialPage, data.length)}-
          {Math.min(activePage * itemsPerPage, data.length)} of {data.length} items
        </div>
      )}
      {getCurrentPageData().map((item) => renderItem(item))}
      <Pagination className='d-flex justify-content-center'>{renderPagination()}</Pagination>
    </>
  );
};

export default PaginatedComponent;
