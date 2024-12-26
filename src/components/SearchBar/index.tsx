import { ChangeEvent, KeyboardEvent, useState } from 'react';

type ISearchBar = {
  fetchUserData: (userName: string) => void;
  loading: boolean;
};

const SearchBar = ({ fetchUserData, loading }: ISearchBar): JSX.Element => {
  const [userName, setUserName] = useState<string>('');

  const handleSubmit = (): void => {
    fetchUserData(userName);
  };

  return (
    <div className='search-bar mb-4'>
      <div className='input-group'>
        <input
          type='text'
          className='form-control'
          placeholder='Enter GitHub username'
          value={userName}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)}
          onKeyUp={(event: KeyboardEvent) => {
            if (event.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
        <button className='btn btn-primary' onClick={handleSubmit} disabled={!userName || loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
