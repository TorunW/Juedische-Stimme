import excuteQuery from 'lib/db'
import { deleteGalleryImage } from 'lib/queries';

export default async (req, res) => {
    try {
        if (req.method === 'PUT') {
            // const result = await excuteQuery({
            //     query: inserGalleryImage(req.body)
            // });
            // // console.log(result,"result")
            // res.json(result)
        } else if (req.method === 'DELETE') {
            const result = await excuteQuery({
                query: deleteGalleryImage(req.query.id)
            });
            console.log(result,"result")
            res.json(result)
        } else  {
            // Handle any other HTTP method
            console.log('not post request')
            res.json({message:'no GET here!'})
        }
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};