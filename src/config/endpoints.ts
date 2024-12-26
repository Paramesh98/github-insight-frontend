const baseUrl = 'http://localhost:8081/api';

export const endpointForUser = (userName: string): string => {
  return `${baseUrl}/${userName}`;
};

export const endPointForRepo = (userName: string): string => {
  return `${baseUrl}/${userName}/repos`;
};

export const endPointForGists = (userName: string): string => {
  return `${baseUrl}/${userName}/gists`;
};

export const endPointForOrgs = (userName: string): string => {
  return `${baseUrl}/${userName}/orgs`;
};