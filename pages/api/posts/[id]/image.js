import excuteQuery from 'lib/db'

export default async (req, res) => {
    try {
        if (req.method === 'POST'){
            const result = await excuteQuery({
                query: `INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('${req.query.id}','_post_main_image','${req.body.meta_value}')`
            });
            // console.log(result, " POST post image result")
            res.json(result)
        } else if (req.method === 'PUT') {
            const result = await excuteQuery({
                query: `UPDATE wp_postmeta SET meta_value='${req.body.meta_value}' WHERE post_id='${req.query.id}' AND meta_key='_post_main_image'`
            });
            // console.log(result, " PUT post image result")
            res.json(result)
        } else {
            // Handle any other HTTP method
            res.json({message:'no GET on this route (/api/posts/[id]/image)!'})
        }
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};
