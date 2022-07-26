import excuteQuery from 'lib/db'
import { selectNavItems } from 'lib/queries';

export default async (req, res) => {
    try {
        const result = await excuteQuery({
            query: selectNavItems('footer_menu')
        });
        console.log(result)
        res.json(result)
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};