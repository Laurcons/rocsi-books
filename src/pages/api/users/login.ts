import { IronSessionConfig } from "@/lib/iron-session";
import { prisma } from "@/lib/prisma";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';

export default withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(422).send("Combinația de user și parolă nu este corectă.");
      }

      // verify password
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) {
        return res.status(422).send("Combinația de user și parolă nu este corectă.");
      }

      (req.session as any).userId = user.id;
      await req.session.save();

      return res.status(200).end();
    } catch (err) {
      console.log({err});
      return res.status(422).send("A avut loc o eroare necunoscută.");
    }
  },
  IronSessionConfig
);