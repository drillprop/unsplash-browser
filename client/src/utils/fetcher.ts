export const fetcher = async (endpoint: string, query: string) => {
  const url = `/api/${endpoint}/${query}`;
  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to fetch data');
};
