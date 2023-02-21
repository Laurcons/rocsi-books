import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import fetchMe from "./api/fetchMe";

export default function useUser({
  redirectIfUnauthenticated,
  redirectIfAuthenticated,
}: {
  redirectIfUnauthenticated?: boolean;
  redirectIfAuthenticated?: boolean;
}) {

  const query = useQuery('/api/users/me', fetchMe);
  const queryClient = useQueryClient();
  const router = useRouter();

  if (!query.isLoading) {
    if (!query.data && redirectIfUnauthenticated)
      router.push(`/auth/login?redirect=${encodeURIComponent(router.asPath)}`);
    if (query.data && redirectIfAuthenticated)
      router.push('/');
  }

  return {
    user: query.data,
    isLoading: query.isLoading,
    error: query.error,
    isLoggedIn: !!query.data,
    isAuthed: query.data && !query.isLoading,
    invalidate: () => queryClient.invalidateQueries('/api/users/me'),
  };

}