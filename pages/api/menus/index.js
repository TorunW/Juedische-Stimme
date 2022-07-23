import excuteQuery from 'lib/db'
import { insertTerm, insertTermRelationship, insertTermTaxonomy } from 'lib/queries';

export default async (req, res) => {
    try {
        if (req.method === 'POST') {
            console.log(req.body)
            const insertTermResult = await excuteQuery({
                query: insertTerm({name:'menu_item',slug:''})
            });
            console.log(insertTermResult, " INSERT TERM RESULT ")

            const termId = insertTermResult.insertId
            const body = {
                term_id:termId,
                taxonomy:req.body.taxonomy,
                description:'',
                parent:'0',
                count:'0'
            }
            const insertTermTaxonomyResult = await excuteQuery({
                query: insertTermTaxonomy(body)
            });
            console.log(insertTermTaxonomyResult , " insertTermTaxonomyResult ")

            const insertTermRelationshipResult = await excuteQuery({
                query: insertTermRelationship(termId,req.body.post_id)
            })
            console.log(insertTermRelationshipResult, " INSERT TERM RELATIONSHIP RESULT")
            
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
