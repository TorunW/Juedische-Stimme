import excuteQuery from "lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getLabels, insertLabel } from 'lib/queries/labels'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const result = await excuteQuery({
        query: getLabels()
      });
      res.json(result);
    } else if (req.method === "POST"){
      const result = await excuteQuery({
        query: insertLabel(req.body)
      })
      res.json(result)
    } else {
      res.json({ message: "NO GET / POST / DELETE HERE!" });
    }
  } catch (error) {
    res.json(error);
  }
};
