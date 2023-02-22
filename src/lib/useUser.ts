import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import fetchMe from "./api-helper/fetchMe";

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

  useEffect(() => {
    if (!query.isLoading) {
      if (!query.isSuccess && redirectIfUnauthenticated)
        router.push(`/auth/login?redirect=${encodeURIComponent(router.asPath)}`);
      if (query.isSuccess && redirectIfAuthenticated)
        router.push('/');
    }
  }, [query.isLoading, query.data, redirectIfUnauthenticated, redirectIfAuthenticated]);


  return {
    user: query.data,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
    isFetching: query.isFetching,
    isAuthed: query.isSuccess && !query.isLoading,
    invalidate: () => queryClient.invalidateQueries('/api/users/me'),
  };

}