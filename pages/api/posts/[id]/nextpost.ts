import excuteQuery from 'lib/db'
import { selectNextPostInCategoryById } from 'lib/queries/posts';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'POST') {
            const result = await excuteQuery({
                query: selectNextPostInCategoryById({postId:req.query.id, categoryId:req.body.categoryId,isPrevious:false})
            });
            res.json(result[0])
        }
        else {
            // Handle any other HTTP method
            res.json({message:'only POST on this route (/api/posts/[id]/nextpost)!'})
        }
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};
