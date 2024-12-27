import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockUser } from '../../../__mocks__/user';
import { endPointForGists, endPointForOrgs, endPointForRepo } from '../../config/endpoints';
import UserDetailsTab from './index';

jest.mock('../../config/endpoints', () => ({
  endPointForGists: jest.fn(),
  endPointForOrgs: jest.fn(),
  endPointForRepo: jest.fn(),
}));

jest.mock('../Gists', () => ({
  Gist: jest.fn(() => <div>Gist Component</div>),
}));

jest.mock('../Repositories', () => ({
  Repository: jest.fn(() => <div>Repository Component</div>),
}));

jest.mock('../Organizations', () => ({
  Organization: jest.fn(() => <div>Organization Component</div>),
}));

jest.mock('./tabItem', () => ({
  __esModule: true,
  default: jest.fn(() => <div>TabItem Component</div>),
}));

describe('UserDetailsTab Component', () => {
  const mockRepoUrl = '/repos/mockUsername';
  const mockGistUrl = '/gists/mockUsername';
  const mockOrgUrl = '/orgs/mockUsername';

  beforeEach(() => {
    (endPointForRepo as jest.Mock).mockReturnValue(mockRepoUrl);
    (endPointForGists as jest.Mock).mockReturnValue(mockGistUrl);
    (endPointForOrgs as jest.Mock).mockReturnValue(mockOrgUrl);
  });

  test('renders tabs and tab content correctly', async () => {
    render(<UserDetailsTab user={mockUser} />);

    expect(screen.getByText('Repositories')).toBeInTheDocument();
    expect(screen.getByText('Gists')).toBeInTheDocument();
    expect(screen.getByText('Organizations')).toBeInTheDocument();
    expect(screen.getAllByText('TabItem Component').length).toBeGreaterThan(1);
    expect(endPointForRepo).toHaveBeenCalledWith(mockUser.login);
    expect(endPointForGists).toHaveBeenCalledWith(mockUser.login);
    expect(endPointForOrgs).toHaveBeenCalledWith(mockUser.login);
  });

  test('displays tab content when tab is clicked', async () => {
    render(<UserDetailsTab user={mockUser} />);

    const repositoriesTab = screen.getByText('Repositories');
    fireEvent.click(repositoriesTab);

    const expectTabItem = () => {
      expect(screen.getAllByText('TabItem Component').length).toBeGreaterThan(1);
    };

    await waitFor(expectTabItem);

    const gistsTab = screen.getByText('Gists');
    fireEvent.click(gistsTab);

    await waitFor(() => {
      expect(screen.getAllByText('TabItem Component').length).toBeGreaterThan(1);
    });

    const orgTab = screen.getByText('Organizations');
    fireEvent.click(orgTab);

    await waitFor(() => {
      expect(screen.getAllByText('TabItem Component').length).toBeGreaterThan(1);
    });
  });
});
