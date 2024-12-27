import { useEffect, useState } from 'react';

type UseFetchReturn<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchWithUrl: (url?: string, options?: UseFetchOptions) => void;
};

type UseFetchOptions = RequestInit & {
  skip?: boolean;
  refresh?: string;
};

function useFetch<T>(initialUrl?: string, initialOptions?: UseFetchOptions): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const resetState = (): void => {
    setLoading(false);
    setError(null);
  };

  const updateLoadingState = (): void => {
    setLoading(true);
    setError(null);
  };

  const fetchData = async (url: string, options?: UseFetchOptions) => {
    updateLoadingState();
    try {
      const response = await fetch(url, { ...options });
      if (!response.ok) {
        throw new Error(
          `Error: ${response.status} - ${response.statusText || 'Please try again later!'}`
        );
      }
      const result = (await response.json()) as { data: T };
      setData(result.data);
      resetState();
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWithUrl = (url?: string, options?: UseFetchOptions) => {
    const fetchUrl = url ?? initialUrl;
    if (!fetchUrl) {
      throw new Error('Url is not provided');
    }
    fetchData(fetchUrl, options ?? initialOptions);
  };

  useEffect(() => {
    if (!initialOptions?.skip && initialUrl) {
      fetchData(initialUrl);
    }
  }, [initialUrl, initialOptions?.refresh, initialOptions?.skip]);

  return { data, loading, error, fetchWithUrl };
}

export default useFetch;
