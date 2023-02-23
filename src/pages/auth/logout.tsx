import Layout from '@/components/Layout';
import { fetchPost } from '@/lib/fetcher';
import useUser from '@/lib/useUser';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Logout() {
  const [error, setError] = useState('');
  const router = useRouter();
  const session = useUser({ redirectIfUnauthenticated: true });

  useEffect(() => {
    if (!session.isAuthed) return;
    async function effect() {
      try {
        await fetchPost('/api/users/logout', {});
        router.push('/');
      } catch (err: any) {
        setError(err?.message ?? err?.toString());
      }
    }
    effect();
  }, [session.isAuthed, router]);

  return <Layout>
    { error ? error : '...' }
  </Layout>;
}