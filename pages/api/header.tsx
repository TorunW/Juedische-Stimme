import excuteQuery from "lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "PUT") {
      const result = await excuteQuery({
        query: `UPDATE js_about_info SET header_slogan='${req.body.header_slogan}', header_slogan_en_US='${req.body.header_slogan_en_US}'`,
      });
      res.json(result);
    } else {
      res.json({ message: "NO GET / POST / DELETE HERE!" });
    }
  } catch (error) {
    res.json(error);
  }
};
