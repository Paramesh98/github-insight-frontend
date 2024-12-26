import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { mockRepositoryData } from '../../../__mocks__/repository';
import { Repository } from './index';

describe('Repository Component', () => {
  it('should render repository data correctly', () => {
    render(<Repository data={mockRepositoryData} />);

    expect(screen.getByText(mockRepositoryData.name)).toBeInTheDocument();
    expect(screen.getByText(mockRepositoryData.description)).toBeInTheDocument();
    expect(screen.getByText('500 KB')).toBeInTheDocument();
    expect(screen.getAllByText(mockRepositoryData.language)[0]).toBeInTheDocument();
    expect(screen.getByText('12/1/2024')).toBeInTheDocument();
  });

  it('should render engagement stats correctly', () => {
    render(<Repository data={mockRepositoryData} />);

    expect(screen.getByText('Stars')).toBeInTheDocument();
    expect(screen.getByText(mockRepositoryData.stargazers_count.toString())).toBeInTheDocument();

    expect(screen.getByText('Forks')).toBeInTheDocument();
    expect(screen.getByText(mockRepositoryData.forks_count.toString())).toBeInTheDocument();

    expect(screen.getByText('Open Issues')).toBeInTheDocument();
    expect(screen.getByText(mockRepositoryData.open_issues_count.toString())).toBeInTheDocument();

    expect(screen.getByText('Watchers')).toBeInTheDocument();
    expect(screen.getByText(mockRepositoryData.watchers_count.toString())).toBeInTheDocument();
  });

  it('should display badges for language, license, and privacy', () => {
    render(<Repository data={mockRepositoryData} />);

    expect(screen.getAllByText(mockRepositoryData.language)[0]).toBeInTheDocument();
    expect(screen.getByText(`License: ${mockRepositoryData.license.name}`)).toBeInTheDocument();
    expect(screen.getByText('Private: No')).toBeInTheDocument();
  });

  it('should render correct avatar and username in CardHeader', () => {
    render(<Repository data={mockRepositoryData} />);

    const avatarImage = screen.getByRole('img');
    expect(avatarImage).toHaveAttribute('src', mockRepositoryData.owner.avatar_url);

    const usernameLink = screen.getByText(mockRepositoryData.owner.login);
    expect(usernameLink).toBeInTheDocument();
  });

  it('should open the repository link when the "View Repository" button is clicked', () => {
    render(<Repository data={mockRepositoryData} />);

    const viewButton = screen.getByText('View Repository');
    expect(viewButton).toHaveAttribute('href', mockRepositoryData.html_url);
    fireEvent.click(viewButton);
  });
});
