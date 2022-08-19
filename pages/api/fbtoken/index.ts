import excuteQuery from 'lib/db'
import { insertFbToken } from 'lib/queries';

export default async (req, res) => {
    try {
        if (req.method === 'POST') {
            const result = await excuteQuery({
                query: insertFbToken(req.body)
            });
            res.json(result)
        }
        else if (req.method === 'GET') {
            const result = await excuteQuery({
                query: `SELECT * FROM fb_token LIMIT 1`,
            });
            res.json(result)
        }
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};

