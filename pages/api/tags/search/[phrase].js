import excuteQuery from 'lib/db'
import { selectTagsBySearchPhrase } from 'lib/queries';

export default async (req, res) => {
    try {
        const result = await excuteQuery({
            query: selectTagsBySearchPhrase(req.query.phrase)
        });
        res.json(result)
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};
