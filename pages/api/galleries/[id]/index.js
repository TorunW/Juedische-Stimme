import { selectGalleryById, updateGallery, deleteGallery, selectGalleryImagesByGalleryId } from 'lib/queries';
import excuteQuery from 'lib/db'

export default async (req, res) => {
    try {
        if (req.method === 'PUT') {
            const result = await excuteQuery({
                query: updateGallery(req.body,req.query.id)
            });
            console.log(result,"result on put / update gallery")
            res.json(result)
        }
        else if (req.method === 'DELETE'){
            const result = await excuteQuery({
                query: deleteGallery(req.query.id)
            });
            console.log(result,"result on delete gallery")
            res.json(result)
        }
        else {
            const result = await excuteQuery({
                query:selectGalleryById(req.query.id)
            })
            const galleryImagesResponse = await excuteQuery({
                query: selectGalleryImagesByGalleryId(req.query.id)
            });  
            res.json({
                gallery:result[0],images:galleryImagesResponse
            })
            // Handle any other HTTP method
        }
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};
