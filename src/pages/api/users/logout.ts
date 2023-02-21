import { IronSessionConfig } from "@/lib/iron-session";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(
  (req: NextApiRequest, res: NextApiResponse) => {
    req.session.destroy();
    res.status(200).end();
  },
  IronSessionConfig
)