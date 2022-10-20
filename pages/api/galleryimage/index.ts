import excuteQuery from "lib/db";
import { inserGalleryImage, selectGalleryImagesByGalleryId } from "lib/queries";

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const result = await excuteQuery({
        query: inserGalleryImage(req.body),
      });
      res.json(result);
    } else {
      // Handle any other HTTP method
      res.json({ message: "no PUT / DELETE here!" });
    }
  } catch (error) {
    res.json(error);
  }
};
