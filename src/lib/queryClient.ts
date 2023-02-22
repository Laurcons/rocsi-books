import { QueryClient } from "react-query";

const globalForQueryClient = global as unknown as { queryClient: QueryClient };

export const queryClient = globalForQueryClient.queryClient || new QueryClient();

if (process.env.NODE_ENV !== 'production') globalForQueryClient.queryClient = queryClient;