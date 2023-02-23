import Layout from '@/components/Layout';
import { fetcher } from '@/lib/fetcher';
import { ApiPaginatedResponse } from '@/types';
import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { Alert, Spinner, Table } from 'react-bootstrap';
import { useQuery } from 'react-query';

async function fetchUsers(): Promise<ApiPaginatedResponse<User[]>> {
  return (await fetcher('/api/users/getAll'))!;
}

export default function Users() {
  const router = useRouter();
  const query = useQuery(`/api/users/getAll?skip=${router.query.skip as string}&take=${router.query.take as string}`, fetchUsers);

  return <Layout authRequired={true}><>
    <h2>Utilizatori</h2>
    { query.isLoading && <Spinner /> }
    { !query.isLoading && query.error && <>
      <Alert variant="danger">{ query.error.toString() }</Alert>
    </>}
    { !query.isLoading && query.data && <>
      <Table hover>
        <thead><tr>
          <th>Nume</th>
          <th>Email</th>
        </tr></thead>
        <tbody>
          { query.data.data.map(user => <>
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          </>) }
        </tbody>
      </Table>
    </>}
  </></Layout>;
}