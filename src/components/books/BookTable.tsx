import { Book, Prisma } from '@prisma/client';
import { Table } from 'react-bootstrap';
import Tag from './Tag';

export default function BookTable({
  books,
  onTagClick,
}: {
  books: Book[];
  onTagClick?: (tag: string) => void;
}) {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Titlu</th>
            <th>Autor</th>
            <th>Etichete</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                {book.tags?.map((tag) => (
                  <Tag key={`${book.id}-${tag}`} onClick={() => onTagClick && onTagClick(tag)}>
                    {tag}
                  </Tag>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
