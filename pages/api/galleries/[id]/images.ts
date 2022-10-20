import excuteQuery from "lib/db";
import { selectGalleryImagesByGalleryId } from "lib/queries";

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      const galleryImagesResponse = await excuteQuery({
        query: selectGalleryImagesByGalleryId(req.quiery.id),
      });
      res.json(galleryImagesResponse);
    } else {
      res.json({ message: "only GET on this route!" });
    }
  } catch (error) {
    res.json(error);
  }
};
