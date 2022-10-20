import excuteQuery from "lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "PUT") {
      const result = await excuteQuery({
        query: `UPDATE js_about_info SET text_top='${req.body.text_top}', text_bottom='${req.body.text_bottom}', header_slogan='${req.body.header_slogan}', about_gallery_id='${req.body.about_gallery_id}'`,
      });
      res.json(result);
    } else {
      res.json({ message: "NO GET / POST / DELETE HERE!" });
    }
  } catch (error) {
    res.json(error);
  }
};
