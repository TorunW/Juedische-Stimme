import excuteQuery from 'lib/db'
import { insertFbToken } from 'lib/queries';

export default async (req, res) => {
    try {
        if (req.method === 'POST') {
            const result = await excuteQuery({
                query: insertFbToken(req.body)
            });
            // console.log(result,"result")
            res.json(result)
        }
        else {
            // Handle any other HTTP method
            console.log('not post request')
            res.json({message:'no GET here!'})
        }
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};

