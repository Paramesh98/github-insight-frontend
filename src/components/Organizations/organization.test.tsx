import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { mockOrganizationData } from '../../../__mocks__/organization';
import Organization from './index';

describe('Organization Component', () => {
  it('should display the organization avatar', () => {
    render(<Organization data={mockOrganizationData} />);

    const avatarImage: HTMLImageElement = screen.getByAltText('avatar');
    expect(avatarImage.src).toBe(mockOrganizationData.avatar_url);
  });

  it('should display the correct GitHub ID', () => {
    render(<Organization data={mockOrganizationData} />);

    const githubIdElement = screen.getByText('123');
    expect(githubIdElement).toBeInTheDocument();
  });

  it('should display the correct description', () => {
    render(<Organization data={mockOrganizationData} />);

    const descriptionElement = screen.getByText('Test Organization Description');
    expect(descriptionElement).toBeInTheDocument();
  });

  it('should display the repositories link correctly', () => {
    render(<Organization data={mockOrganizationData} />);

    const repositoriesLink = screen.getByText('View Repositories');
    expect(repositoriesLink).toHaveAttribute('href', mockOrganizationData.repos_url);
  });

  it('should display the events link correctly', () => {
    render(<Organization data={mockOrganizationData} />);

    const eventsLink = screen.getByText('View Events');
    expect(eventsLink).toHaveAttribute('href', mockOrganizationData.events_url);
  });

  it('should display the members link correctly', () => {
    render(<Organization data={mockOrganizationData} />);

    const membersLink = screen.getByText('View Members');
    expect(membersLink).toHaveAttribute(
      'href',
      mockOrganizationData.members_url?.replace('{/member}', '')
    );
  });

  it('should display the public members link correctly', () => {
    render(<Organization data={mockOrganizationData} />);

    const publicMembersLink = screen.getByText('View Public Members');
    expect(publicMembersLink).toHaveAttribute(
      'href',
      mockOrganizationData.public_members_url?.replace('{/member}', '')
    );
  });

  it('should render buttons with correct links', () => {
    render(<Organization data={mockOrganizationData} />);

    const exploreReposButton = screen.getByRole('button', { name: 'Explore Repositories' });
    expect(exploreReposButton).toHaveAttribute('href', mockOrganizationData.repos_url);

    const visitOrgButton = screen.getByRole('button', { name: 'Visit Organization' });
    expect(visitOrgButton).toHaveAttribute(
      'href',
      `https://github.com/${mockOrganizationData.login}`
    );
  });

  it('should render the CardHeader component with correct values', () => {
    render(<Organization data={mockOrganizationData} />);

    const usernameLink = screen.getByRole('link', { name: mockOrganizationData.login });
    expect(usernameLink).toHaveAttribute(
      'href',
      `https://github.com/${mockOrganizationData.login}`
    );
  });
});
