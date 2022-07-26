import excuteQuery from 'lib/db'
import {  selectPosts } from 'lib/queries/posts'
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "POST") {
            const newsletterResponse = await excuteQuery({
                query: selectPosts({
                  slug: req.body.category,
                  numberOfPosts: 6,
                  pageNum: 1,
                  isCategory: true,
                  fieldsList: [
                    'ID',
                    'post_date',
                    'post_content',
                    'post_excerpt',
                    'post_title',
                    'post_name',
                    'categoryId',
                    'categoryName',
                    'postImage',
                  ],
                  locale: req.body.locale !==  req.body.defaultLocale ?  req.body.locale : '',
                }),
            });
            res.json(newsletterResponse)

        } else  {
            // Handle any other HTTP method
            res.json({message:'only GET requests on this api endpoint: /api/posts/newsletter!'})
        }
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};

