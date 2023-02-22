import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getAll(req: NextApiRequest, res: NextApiResponse) {
  const skip = parseInt(req.query.skip as string ?? '0');
  const take = parseInt(req.query.take as string ?? '10');

  const [total, data] = await Promise.all([
    prisma.user.count(),
    prisma.user.findMany({ skip, take })
  ]);

  res.json({
    total,
    data
  });
}