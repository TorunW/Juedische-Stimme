import excuteQuery from "lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { updateLabel } from 'lib/queries/labels'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "PUT") {
      const result = await excuteQuery({
        query: updateLabel(req.body)
      });
      console.log(result)
      res.json(result);
    } else {
      res.json({ message: "NO GET / POST / DELETE HERE!" });
    }
  } catch (error) {
    res.json(error);
  }
};
