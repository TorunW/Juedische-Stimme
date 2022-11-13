import excuteQuery from "lib/db";
import { deleteTermRelationship, insertTermRelationship } from "lib/queries";

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const result = await excuteQuery({
        query: insertTermRelationship(req.query.termid, req.query.postid),
      });
      const incrementTagCountResult = await excuteQuery({
        query: `UPDATE wp_term_taxonomy SET count=count+1 WHERE term_id='${req.query.termid}'`,
      });
      res.json(result);
    } else if (req.method === "DELETE") {
      const result = await excuteQuery({
        query: deleteTermRelationship(req.query.termid, req.query.postid),
      });
      const decreaseTagCountResult = await excuteQuery({
        query: `UPDATE wp_term_taxonomy SET count=count-1 WHERE term_id='${req.query.termid}'`,
      });
      res.json(result);
    } else {
      // Handle any other HTTP method
      res.json({ message: "no GET here!" });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
