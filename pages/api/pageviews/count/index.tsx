import { getLastYearMonths } from "helpers/getLastYearMonths";
import excuteQuery from "lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const months = getLastYearMonths();
      let pageViewsObject = {};
      await Promise.all(
        months.map(async (month) => {
          const pageViews = await excuteQuery({
            query: `
              SELECT COUNT(*) AS count 
                FROM js_pageviews 
                WHERE date_created 
                BETWEEN '${month.year}-${month.month}-01 00:00:00' AND '${month.year}-${month.month}-31 23:59:59'
            `,
          });
          pageViewsObject[`${month.month}/${month.year}`] = {
            ...month,
            pageViews: pageViews[0].count,
          };
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
