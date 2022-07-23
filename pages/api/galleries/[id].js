import { updateGallery, deleteGallery } from 'lib/queries';
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
            // Handle any other HTTP method
                res.json({message:'no GET on this route (/api/galleries/[id])!'})
        }
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};
