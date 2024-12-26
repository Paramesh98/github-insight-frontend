import { Alert } from 'react-bootstrap';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import GithubUserCard from './components/UserCard';
import { endpointForUser } from './config/endpoints';
import useFetch from './hooks/useFetch';
import { User } from './types/User';

function App() {
  const { loading, data, error, fetchWithUrl } = useFetch<User>();

  const fetchUserData = (userName: string): void => {
    const userEndpoint = endpointForUser(userName);
    fetchWithUrl(userEndpoint);
  };

  return (
    <div className='app-container'>
      <Header />
      <div className='container mt-4'>
        {!!error && <Alert variant={'error'}>{error}</Alert>}
        <SearchBar fetchUserData={fetchUserData} loading={loading} />
        <GithubUserCard user={data} />
      </div>
    </div>
  );
}

export default App;
