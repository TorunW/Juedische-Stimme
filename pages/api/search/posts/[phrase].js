import excuteQuery from 'lib/db'
import { selectPostNamesBySearchPhrase } from 'lib/queries';

export default async (req, res) => {
    try {
        const result = await excuteQuery({
            query: selectPostNamesBySearchPhrase(req.query.phrase)
        });
        res.json(result)        
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};

