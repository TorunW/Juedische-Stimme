import excuteQuery from "lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getEvents, insertEvent } from "lib/queries/events";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const result = await excuteQuery({
        query: getEvents(),
      });
      res.json(result);
    } else if (req.method === "POST") {
      const result = await excuteQuery({
        query: insertEvent(req.body),
      });
      res.json(result);
    } else {
      res.json({ message: "NO GET / POST / DELETE HERE!" });
    }
  } catch (error) {
    res.json(error);
  }
};
