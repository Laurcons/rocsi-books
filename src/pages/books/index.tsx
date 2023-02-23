import BookTable from '@/components/books/BookTable';
import FilteredSearch, { BookQuery } from '@/components/books/FilteredSearch';
import Layout from '@/components/Layout';
import { fetcher } from '@/lib/fetcher';
import { Book } from '@prisma/client';
import { useState } from 'react';
import { useQuery } from 'react-query';

function useBooks(queryParams: Record<string, any>) {
  const query = Object.keys(queryParams).map(key => `${key}=${encodeURIComponent(queryParams[key])}`).join('&');
  const url = `/api/books/?${query}`;
  return useQuery(url, async (): Promise<Book[]> => {
    return (await fetcher(url))!;
  });
}

export default function Books() {
  const [query, setQuery] = useState<BookQuery>({ take: 5 });
  const books = useBooks(query);

  const handleSetQuery = (newQuery: BookQuery) => {
    setQuery({
      ...newQuery,
      take: 20
    });
  };

  return <Layout authRequired={true}>
    <h2>Cărți</h2>
    
    <FilteredSearch onFilters={handleSetQuery} />

    <BookTable books={books.data ?? []} />

  </Layout>;
}