type GistOwner = {
  login?: string;
  id?: number;
  node_id?: string;
  avatar_url?: string;
  url?: string;
  html_url?: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  repos_url?: string;
  events_url?: string;
  received_events_url?: string;
  type?: string;
  user_view_type?: string;
  site_admin?: boolean;
};

type GistFile = {
  filename?: string;
  type?: string;
  language?: string;
  raw_url?: string;
  size?: number;
};

export type IGist = {
  url?: string;
  forks_url?: string;
  commits_url?: string;
  id: string;
  node_id?: string;
  git_pull_url?: string;
  git_push_url?: string;
  html_url?: string;
  files: {
    [key: string]: GistFile;
  };
  public?: boolean;
  created_at: string;
  updated_at: string;
  description?: string;
  comments?: number;
  user?: null | string;
  comments_url?: string;
  owner?: GistOwner;
  truncated?: boolean;
};
