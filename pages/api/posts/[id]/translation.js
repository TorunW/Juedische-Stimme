import excuteQuery from 'lib/db'

export default async (req, res) => {
    try {
        if (req.method === 'POST'){
            const titleResult = await excuteQuery({
                query: `INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('${req.query.id}','_post_title_translation_${req.body.language}','${req.body.title}')`
            });
            console.log(titleResult, " titleResult ")
            const excerptResult = await excuteQuery({
                query: `INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('${req.query.id}','_post_excerpt_translation_${req.body.language}','${req.body.excerpt}')`
            });
            console.log(excerptResult, " excerptResult ")
            const contentResult = await excuteQuery({
                query: `INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('${req.query.id}','_post_content_translation_${req.body.language}','${req.body.content}')`
            });
            console.log(contentResult, " contentResult ")

            res.json({message:`${req.body.language} translation for post ${req.query.id} created!`})
        } else if (req.method === 'PUT') {
            const result = await excuteQuery({
                query: `UPDATE wp_postmeta SET meta_value='${req.body.meta_value}' WHERE post_id='${req.query.id}' AND meta_key='_post_main_image'`
            });
            // console.log(result, " PUT post image result")
            res.json(result)
        } else {
            // Handle any other HTTP method
            res.json({message:'no GET on this route (/api/posts/[id]/translation)!'})
        }
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};
