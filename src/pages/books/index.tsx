import BookTable from "@/components/books/BookTable";
import Layout from "@/components/Layout";
import { fetcher } from "@/lib/fetcher";
import { Book, Prisma } from "@prisma/client";
import { Card, Spinner } from "react-bootstrap";
import { useQuery } from "react-query";

function useBooks(queryParams: Record<string, any>) {
  const query = Object.keys(queryParams).map(key => `${key}=${encodeURIComponent(queryParams[key])}`);
  const url = `/api/books/?${query}`;
  return useQuery(url, async (): Promise<Book[]> => {
    return (await fetcher(url))!;
  });
}

export default function Books() {
  const newest5Books = useBooks({ take: 5 });

  return <Layout authRequired={true}>
    <h2>Cărți</h2>
    <Card>
      <Card.Header>
        Cele mai noi 5 cărți
        {newest5Books.isFetching && <Spinner size="sm" className="ms-3" />}
      </Card.Header>
      <Card.Body>
        {newest5Books.data && <BookTable books={newest5Books.data} />}
      </Card.Body>
    </Card>
  </Layout>;
}