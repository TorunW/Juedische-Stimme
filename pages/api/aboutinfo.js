import excuteQuery from 'lib/db'
import { selectNavItems } from 'lib/queries';

export default async (req, res) => {
    try {
        if (req.method === 'PUT'){
            const result = await excuteQuery({
                query: `UPDATE js_about_info SET text_top='${req.body.text_top}', text_bottom='${req.body.text_bottom}', about_gallery_id='${req.body.about_gallery_id}'`
            });
            console.log(result)
            res.json(result)   
        } else {
            req.json({message:'NO GET / POST / DELETE HERE!'})
        }
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};