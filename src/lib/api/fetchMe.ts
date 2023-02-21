import { Prisma } from "@prisma/client";
import { fetcher } from "../fetcher";

export default async function fetchMe(): Promise<Prisma.UserSelect> {
  return (await fetcher('/api/users/me'))!;
}