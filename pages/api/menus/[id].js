import excuteQuery from "lib/db";
import {
  updateTermTaxonomy,
  updateTermMeta,
  deleteTerm,
  deleteTermRelationship,
  deleteTermTaxonomy,
  deleteTermMeta,
  insertTermMeta,
} from "lib/queries";

export default async (req, res) => {
  try {
    if (req.method === "PUT") {
      const termId = req.body.term_id;
      const body = {
        term_id: termId,
        taxonomy: req.body.taxonomy,
        description: req.body.title,
        parent: "0",
        count: "0",
        term_image: req.body.term_image,
        link: req.body.link,
        has_translation: req.body.has_translation,
        title_en_US: req.body.title_en_US,
      };
      console.log(body);
      // update term taxonomy
      const updateTermTaxonomyResult = await excuteQuery({
        query: updateTermTaxonomy(body),
      });
      // update term meta
      const updateTermMetaResult = await excuteQuery({
        query: updateTermMeta({
          term_id: termId,
          meta_key: "_menuitem_link",
          meta_value: body.link,
        }),
      });
      const updateTermMetaImageResult = await excuteQuery({
        query: updateTermMeta({
          term_id: termId,
          meta_key: "_menuitem_image",
          meta_value: body.term_image,
        }),
      });

      if (body.has_translation) {
        const updateTermMetaTranslationResult = await excuteQuery({
          query: updateTermMeta({
            term_id: termId,
            meta_key: "_menuitem_translation_en_US",
            meta_value: body.title_en_US,
          }),
        });
      } else {
        const insertTermTranslationResult = await excuteQuery({
          query: insertTermMeta({
            term_id: termId,
            meta_key: "_menuitem_translation_en_US",
            meta_value: body.title_en_US,
          }),
        });
      }
      res.json({ message: "MENU ITEM UPDATED" });
    } else if (req.method === "DELETE") {
      // delete term
      const deleteTermResult = await excuteQuery({
        query: deleteTerm(req.body.term_id),
      });
      // delete term taxonomy
      const deleteTermTaxonomyResult = await excuteQuery({
        query: deleteTermTaxonomy(req.body.term_id),
      });
      // delete term relationship
      const deleteTermRelationshipResult = await excuteQuery({
        query: deleteTermRelationship(req.body.term_id, req.body.ID),
      });
      const deleteTermMetaResult = await excuteQuery({
        query: deleteTermMeta(req.body.term_id, "_menuitem_link"),
      });
      const deleteTermImageResult = await excuteQuery({
        query: deleteTermMeta(req.body.term_id, "_menuitem_image"),
      });
      const deleteTermTranslationResult = await excuteQuery({
        query: deleteTermMeta(req.body.term_id, "_menuitem_translation_en_US"),
      });
      res.json({ message: "MENU ITEM DELETED" });
    } else {
      res.json({ message: "NO GET HERE!" });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
