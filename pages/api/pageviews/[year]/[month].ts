import excuteQuery from "lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      console.log(req.query);

      const { year, month } = req.query;
      const result = await excuteQuery({
        query: `
            SELECT * 
                FROM js_pageviews 
                WHERE date_created 
                BETWEEN '${year}-${month}-01 00:00:00' AND '${year}-${month}-31 23:59:59'
                AND url NOT LIKE '%ftp%' 
                AND url NOT LIKE '%:443%'
                AND url NOT LIKE '%.php%'
                AND url NOT LIKE '%.txt%'
                AND url NOT LIKE '%.env%'
                AND url NOT LIKE '%xml%'
                GROUP BY url
            `,
      });
      res.json(result);
    } else {
      res.json({ message: "NO PUT POST DELETE" });
    }
  } catch (error) {
    res.json(error);
  }
};
