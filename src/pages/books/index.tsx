import BookTable from '@/components/books/BookTable';
import FilteredSearch, { BookQuery } from '@/components/books/FilteredSearch';
import Layout from '@/components/Layout';
import { fetcher } from '@/lib/fetcher';
import { Book } from '@prisma/client';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';

function useBooks(queryParams: Record<string, any>) {
  const query = Object.keys(queryParams)
    .filter((key) => !!queryParams[key])
    .map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
    .join('&');
  const url = `/api/books/?${query}`;
  return useQuery(url, async (): Promise<Book[]> => {
    return (await fetcher(url))!;
  });
}

export default function Books() {
  const [query, setQuery] = useState<BookQuery>({ take: 5 });
  const books = useBooks(query);

  const handleSetQuery = (newQuery: BookQuery) => {
    console.log({ newQuery });
    const q = {
      ...newQuery,
      // if tags set, convert them to CS list;
      ...(newQuery.tags?.length ? { tags: newQuery.tags.join(',') as any } : { tags: undefined }),
      take: 20,
    };
    setQuery(q);
    console.log({ q });
  };

  const addTagRef = useRef<((tag: string) => void) | undefined>(undefined);

  return (
    <Layout authRequired={true}>
      <h2>Cărți</h2>

      <FilteredSearch onFilters={handleSetQuery} addTagRef={addTagRef} />

      <BookTable
        books={books.data ?? []}
        onTagClick={(tag) => addTagRef.current && addTagRef.current(tag)}
      />
    </Layout>
  );
}
