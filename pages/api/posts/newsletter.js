import excuteQuery from 'lib/db'
import {  selectPostsByTag } from 'lib/queries/posts'

export default async (req, res) => {
    try {
        if (req.method === "POST") {
            const newsletterResponse = await excuteQuery({
                query: selectPostsByTag({
                  slug: 'newsletter',
                  numberOfPosts: 6,
                  pageNum: 1,
                  isCategory: true,
                  fieldsList: [
                    'ID',
                    'post_date',
                    'post_content',
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

