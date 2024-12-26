/* eslint-disable camelcase */
import { IGist } from '../src/types/Gists';

export const mockGistData: IGist = {
  id: '123',
  description: 'A mock gist description',
  created_at: '2024-12-25T10:00:00Z',
  updated_at: '2024-12-26T12:00:00Z',
  owner: {
    login: 'TestUser',
    avatar_url: 'https://example.com/avatar.png',
    html_url: 'https://example.com/testuser',
  },
  public: true,
  comments: 5,
  files: {
    'file1.js': {
      filename: 'file1.js',
      language: 'JavaScript',
      size: 1234,
      raw_url: 'https://example.com/file1.js',
    },
  },
  html_url: 'https://example.com/gist123',
};
