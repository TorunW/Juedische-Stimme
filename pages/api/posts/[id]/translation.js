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
            res.json({message:`${req.body.language} translation for post ${req.query.id} created!`})
        } else if (req.method === 'PUT') {
            const titleResult = await excuteQuery({
                query: `UPDATE wp_postmeta SET meta_value='${req.body.title}' WHERE post_id='${req.query.id}' AND meta_key='_post_title_translation_${req.body.language}'`
            });
            const excerptResult = await excuteQuery({
                query: `UPDATE wp_postmeta SET meta_value='${req.body.excerpt}' WHERE post_id='${req.query.id}' AND meta_key='_post_excerpt_translation_${req.body.language}'`
            });
            const contentResult = await excuteQuery({
                query: `UPDATE wp_postmeta SET meta_value='${req.body.content}' WHERE post_id='${req.query.id}' AND meta_key='_post_content_translation_${req.body.language}'`
            });
            // console.log(result, " PUT post image result")
            res.json({message:`${req.body.language} translation for post ${req.query.id} updated!`})
        } else {
            // Handle any other HTTP method
            res.json({message:'no GET on this route (/api/posts/[id]/translation)!'})
        }
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};
