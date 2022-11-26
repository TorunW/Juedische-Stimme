import excuteQuery from "lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      let pageViewsObject = {};
      await Promise.all(
        months.map(async (month) => {
          const pageViews = await excuteQuery({
            query: `SELECT COUNT(*) AS count FROM js_pageviews WHERE date_created  BETWEEN '2022-${month}-01 00:00:00' AND '2022-${month}-31 23:59:59'`,
          });
          pageViewsObject[month] = pageViews[0].count;
        })
      );
      res.json(pageViewsObject);
    } else {
      res.json({ message: "NO PUT POST DELETE" });
    }
  } catch (error) {
    res.json(error);
  }
};
