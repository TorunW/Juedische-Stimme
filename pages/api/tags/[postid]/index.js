import excuteQuery from 'lib/db'
import { insertTermTaxonomy, insertTerm, selectTagsByPostId, insertTermRelationship } from 'lib/queries';

export default async (req, res) => {
    try {
        if (req.method === 'POST'){

            const insertTermResult = await excuteQuery({
                query: insertTerm(req.body)
            });
            // console.log(insertTermResult, " INSERT TERM RESULT ")
            const termId = insertTermResult.insertId
            const body = {
                term_id:termId,
                taxonomy:'post_tag',
                description:'',
                parent:'0',
                count:'1'
            }
            const insertTermTaxonomyResult = await excuteQuery({
                query: insertTermTaxonomy(body)
            });
            // console.log(insertTermTaxonomyResult , "INSERT TERM TAXONOMY RESULT")
            const insertTermRelationshipResult = await excuteQuery({
                query: insertTermRelationship(termId,req.query.postid)
            });
            // console.log(insertTermRelationshipResult, " INSERT TERM RELATIONSHIP RESULT")
            res.json({message:'tag created!'})
        } else {
            const result = await excuteQuery({
                query: selectTagsByPostId(req.query.postid)
            });
            res.json(result)
        }
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};