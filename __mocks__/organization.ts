/* eslint-disable camelcase */
import { IOrganization } from '../src/types/Organization';

export const mockOrganizationData: IOrganization = {
  login: 'test-org',
  avatar_url: 'https://example.com/avatar.png',
  id: 123,
  description: 'Test Organization Description',
  repos_url: 'https://github.com/test-org/repos',
  events_url: 'https://github.com/test-org/events',
  members_url: 'https://github.com/test-org/members',
  public_members_url: 'https://github.com/test-org/public_members',
};
