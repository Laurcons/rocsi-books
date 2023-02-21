import { withIronSessionApiRoute } from 'iron-session/next';
import { IronSessionConfig } from "@/lib/iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/lib/prisma';

export default withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    return res.json(await (async () => {
      const { userId } = req.session as any;
      if (!userId) return null;
      const user = await prisma.user.findUnique({ where: { id: userId } });
      return user;
    })());
  },
  IronSessionConfig
);