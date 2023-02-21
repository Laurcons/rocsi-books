
export async function fetcher<T>(input: RequestInfo | URL, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    if (response.headers.get('content-type')?.startsWith('application/json'))
      return response.json() as T;
    return;
  }
  throw new Error(await response.text());
}

export function fetchPost<T>(url: string, payload: Record<string, any>, options?: RequestInit) {
  return fetcher<T>(
    url,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
      ...options
    }
  );
}