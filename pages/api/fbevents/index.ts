import excuteQuery from 'lib/db'
import { insertFbFeed } from 'lib/queries';

export default async (req, res) => {
    try {
        if (req.method === 'POST') {
            const result = await excuteQuery({
                query: insertFbFeed(req.body)
            });
            console.log(result,"result")
            res.json(result)
        }
        else if (req.method === 'GET') {
            const result = await excuteQuery({
                query: `SELECT * FROM fb_feed WHERE type='events' ORDER BY ID DESC LIMIT 1`,
              });
            res.json(result)
        }
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};
