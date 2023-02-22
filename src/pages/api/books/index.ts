import { NextApiRequest, NextApiResponse } from "next";
import get from "./get";

export default function handle(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': return get(req, res);
    default:
      res.status(404).end();
  }
}