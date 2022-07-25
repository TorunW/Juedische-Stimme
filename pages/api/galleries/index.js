import excuteQuery from 'lib/db'
import { insertGallery, selectGalleries } from 'lib/queries';

export default async (req, res) => {
    try {
        if (req.method === 'POST') {
            const result = await excuteQuery({
                query: insertGallery(req.body)
            });
            // console.log(result,"result")
            res.json(result)
        }
        else {
            const result = await excuteQuery({
                query:selectGalleries(50,1)
            })
            res.json(result)
        }
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};

