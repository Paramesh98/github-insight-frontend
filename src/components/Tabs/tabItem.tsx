import { Alert, Spinner } from 'react-bootstrap';
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
  const { loading, data, error } = useFetch<T[]>(endpoint);

  if (!data) {
    return null;
  }

  const renderItem = (item: T) => {
    return <Component data={item} key={item.id.toString()} />;
  };
  return (
    <>
      {loading && (
        <div className='d-flex d-flex justify-content-center align-items-center p-3'>
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </div>
      )}
      {!!error && <Alert variant={'error'}>{error}</Alert>}
      <PaginatedComponent
        isLoading={loading}
        data={data}
        renderItem={renderItem}
        itemsPerPage={6}
        title={title}
      />
    </>
  );
};

export default TabItem;
