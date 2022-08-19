import excuteQuery from 'lib/db'
import { updateFbToken } from 'lib/queries';

export default async (req, res) => {
    try {
        if (req.method === 'PUT') {
            const result = await excuteQuery({
                query: updateFbToken(req.body,req.query.id)
            });
            console.log(result,"result on put / update gallery")
            res.json(result)
        }
        else if (req.method === 'DELETE'){
            res.json({message:'no DELETE on this route (/api/fbtoken/[id])!'})
        }
        else {
            // Handle any other HTTP method
            res.json({message:'no GET on this route (/api/fbtoken/[id])!'})
        }
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};
