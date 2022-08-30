import excuteQuery from 'lib/db'
import { insertTerm, insertTermRelationship, insertTermTaxonomy, insertTermMeta } from 'lib/queries';

export default async (req, res) => {
    try {
        if (req.method === 'POST') {
            console.log(req.body)
            const insertTermResult = await excuteQuery({
                query: insertTerm({name:'menu_item',slug:''})
            });
            // console.log(insertTermResult, " INSERT TERM RESULT ")

            const termId = insertTermResult.insertId
            const body = {
                term_id:termId,
                taxonomy:req.body.taxonomy,
                description:req.body.title,
                parent:'0',
                count:'0',
                term_image:req.body.term_image
            }
            const insertTermTaxonomyResult = await excuteQuery({
                query: insertTermTaxonomy(body)
            });
            // console.log(insertTermTaxonomyResult , " insertTermTaxonomyResult ")

            const insertTermMetaResult = await excuteQuery({
                query: insertTermMeta({term_id:termId, meta_key:'_menuitem_link', meta_value:req.body.link})
            })

            const insertTermImageResult = await excuteQuery({
                query: insertTermMeta({term_id:termId, meta_key:'_menuitem_image', meta_value:req.body.term_image})
            })

            console.log(insertTermImageResult, " INSERT TERM META RESULT")

            // if (req.body.post_id  && req.body.post_id !== null){
                const insertTermRelationshipResult = await excuteQuery({
                    query: insertTermRelationship(termId,req.body.post_id,req.body.term_order)
                })
                console.log(insertTermRelationshipResult, " INSERT TERM RELATIONSHIP RESULT")
            // }
            
            // console.log(result,"result")
            res.json(insertTermTaxonomyResult)
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
