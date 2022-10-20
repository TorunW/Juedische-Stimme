import excuteQuery from "lib/db";
import {
  deleteGalleryImage,
  selectGalleryImagesByGalleryId,
  updateGalleryImage,
} from "lib/queries";

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      const result = await excuteQuery({
        query: selectGalleryImagesByGalleryId(req.query.id),
      });
      res.json(result);
    } else if (req.method === "PUT") {
      const result = await excuteQuery({
        query: updateGalleryImage({
          ...req.body,
          galleryImageId: req.query.id,
        }),
      });
      res.json(result);
    } else if (req.method === "DELETE") {
      const result = await excuteQuery({
        query: deleteGalleryImage(req.query.id),
      });
      res.json(result);
    } else {
      // Handle any other HTTP method
      res.json({ message: "no PUT / POST here!" });
    }
  } catch (error) {
    res.json(error);
  }
};
