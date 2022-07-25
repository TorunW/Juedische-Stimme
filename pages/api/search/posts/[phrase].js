import excuteQuery from 'lib/db'
import { selectPostNamesBySearchPhrase } from 'lib/queries/posts';

export default async (req, res) => {
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

