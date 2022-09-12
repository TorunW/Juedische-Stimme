import excuteQuery from 'lib/db'
import { insertTerm, insertTermTaxonomy, insertTermMeta } from 'lib/queries';

export default async (req, res) => {
    try {
        if (req.method === 'POST') {
            console.log(req.body)
            const insertTermResult = await excuteQuery({
                query: insertTerm({name:req.body.name,slug:req.body.slug})
            });
            console.log(insertTermResult, " INSERT TERM RESULT ")

            const termId = insertTermResult.insertId
            const insertTermTaxonomyResult = await excuteQuery({
                query: insertTermTaxonomy({
                    term_id:termId,
                    taxonomy:'category',
                    description:req.body.description,
                    parent:'0',
                    count:'0'
                })
            });
            console.log(insertTermTaxonomyResult , "INSERT TERM TAXONOMY RESULT")

            const insertTermMetaResult = await excuteQuery({
                query: insertTermMeta({
                    term_id:termId,
                    meta_key:'_category_main_image',
                    meta_value:req.body.category_image
                })
            });
            console.log(insertTermMetaResult, " INSERT TERM META RESULT")

            res.json(insertTermResult)
        }
        else {
            // Handle any other HTTP method
            console.log('not post request')
            res.json({message:'no GET here!'})
        }
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};

