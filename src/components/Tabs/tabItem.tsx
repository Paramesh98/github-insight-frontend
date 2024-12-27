import { useState } from 'react';
import { Alert, Container, Spinner } from 'react-bootstrap';
import useFetch from '../../hooks/useFetch';
import { IGist } from '../../types/Gists';
import { IOrganization } from '../../types/Organization';
import { IRepository } from '../../types/Repository';
import PaginatedComponent from '../Pagination';

type ITabItem<T> = {
  endpoint: string;
  Component: React.ComponentType<{ data: T; key: string }>;
  title: string;
};

const TabItem = <T extends IRepository | IGist | IOrganization>({
  endpoint,
  Component,
  title,
}: ITabItem<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const url = `${endpoint}?page=${currentPage}&per_page=${itemsPerPage}`;
  const { loading, data, error } = useFetch<T[]>(url);

  if (!data) {
    return null;
  }

  if (error) {
    return (
      <Container>
        <Alert data-test-id='alert' variant='danger'>
          {error}
        </Alert>
      </Container>
    );
  }
  const isLastPage = data?.length < itemsPerPage;

  const renderItem = (item: T) => {
    return <Component data={item} key={item.id.toString()} />;
  };
  return (
    <>
      {loading && (
        <div className='d-flex d-flex justify-content-center align-items-center p-3'>
          <Spinner test-id='spinner' animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </div>
      )}

      <PaginatedComponent
        isLoading={loading}
        data={data}
        renderItem={renderItem}
        itemsPerPage={itemsPerPage}
        title={title}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        isLastPage={isLastPage}
      />
    </>
  );
};

export default TabItem;
