/* eslint-disable camelcase */
import { User } from '../src/types/User';

export const mockUser: User = {
  avatar_url: 'http://avatar.url',
  name: 'Test User',
  login: 'testUser',
  type: 'User',
  bio: 'This is a test user bio.',
  company: 'Test Company',
  location: 'Test Location',
  blog: 'https://testuser.com',
  public_repos: 10,
  followers: 100,
  following: 50,
  public_gists: 5,
  created_at: '2020-01-01',
  html_url: 'https://github.com/testUser',
};
