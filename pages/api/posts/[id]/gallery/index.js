import excuteQuery from "lib/db";
import { insertGalleryToPost, updateGalleryToPost } from "lib/queries/posts";

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const result = await excuteQuery({
        query: insertGalleryToPost({
          postId: req.query.id,
          galleryId: req.body.galleryId,
        }),
      });
      console.log(result, " RESULT");
      res.json(result);
    } else if (req.method === "PUT") {
      const result = await excuteQuery({
        query: updateGalleryToPost({
          postId: req.query.id,
          galleryId: req.body.galleryId,
        }),
      });
      res.json(result);
    } else {
      // Handle any other HTTP method
      res.json({ message: "no GET here!" });
    }
  } catch (error) {
    res.json(error);
  }
};
