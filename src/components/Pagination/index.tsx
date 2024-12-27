import React, { Dispatch, SetStateAction } from 'react';
import { Pagination } from 'react-bootstrap';

interface PaginatedComponentProps<T> {
  data: T[];
  itemsPerPage: number;
  renderItem: (item: T) => React.ReactNode;
  isLoading: boolean;
  title: string;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  isLastPage: boolean;
}

const PaginatedComponent = <T,>({
  data,
  itemsPerPage,
  renderItem,
  isLoading,
  title,
  setCurrentPage,
  isLastPage,
  currentPage,
}: PaginatedComponentProps<T>) => {
  const handleNext = (): void => {
    if (!isLastPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = (): void => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const getItemRange = (): string => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = start + data.length - 1;
    return `Showing ${start}-${end} items`;
  };

  if (!isLoading && data.length === 0) {
    return <h5 className='text-center my-5'>No {title} found</h5>;
  }

  return (
    <>
      {!isLoading && data.length > 0 && (
        <>
          <div data-test-id='loading' className='mb-2'>
            {getItemRange()}
          </div>
          {data.map((item) => renderItem(item))}
          <Pagination className='d-flex justify-content-center mt-3'>
            <Pagination.Prev disabled={currentPage === 1} onClick={handlePrevious}>
              Previous
            </Pagination.Prev>
            <Pagination.Next disabled={isLastPage} onClick={handleNext}>
              Next
            </Pagination.Next>
          </Pagination>
        </>
      )}
    </>
  );
};

export default PaginatedComponent;
