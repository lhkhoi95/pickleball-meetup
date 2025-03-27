import { useState } from 'react';
import { fetchApi } from '@/lib/api';

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (endpoint: string, options?: RequestInit) => {
    try {
      setIsLoading(true);
      const result = await fetchApi<T>(endpoint, options);
      setData(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, fetchData };
}