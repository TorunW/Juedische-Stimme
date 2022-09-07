import excuteQuery from 'lib/db'
import { selectPostNamesBySearchPhrase } from 'lib/queries/posts';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const result = await excuteQuery({
            query: selectPostNamesBySearchPhrase({phrase:req.query.phrase})
        });
        res.json(result)        
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};

