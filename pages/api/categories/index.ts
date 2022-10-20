import excuteQuery from "lib/db";
import { insertTerm, insertTermTaxonomy, insertTermMeta } from "lib/queries";

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const insertTermResult = await excuteQuery({
        query: insertTerm({ name: req.body.name, slug: req.body.slug }),
      });

      const termId = insertTermResult.insertId;
      const insertTermTaxonomyResult = await excuteQuery({
        query: insertTermTaxonomy({
          term_id: termId,
          taxonomy: "category",
          description: req.body.description,
          parent: "0",
          count: "0",
        }),
      });

      const insertTermMetaResult = await excuteQuery({
        query: insertTermMeta({
          term_id: termId,
          meta_key: "_category_main_image",
          meta_value: req.body.category_image,
        }),
      });

      res.json(insertTermResult);
    } else {
      // Handle any other HTTP method
      res.json({ message: "no GET here!" });
    }
  } catch (error) {
    res.json(error);
  }
};
