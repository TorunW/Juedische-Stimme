import excuteQuery from 'lib/db'
import { insertTerm, insertTermTaxonomy } from 'lib/queries';

export default async (req, res) => {
    try {
        if (req.method === 'POST') {
            console.log(req.body)
            const insertTermResult = await excuteQuery({
                query: insertTerm({name:req.body.name,slug:req.body.slug})
            });
            console.log(insertTermResult, " INSERT TERM RESULT ")

            const termId = insertTermResult.insertId
            const body = {
                term_id:termId,
                taxonomy:'category',
                description:req.body.description,
                parent:'0',
                count:'0'
            }
            const insertTermTaxonomyResult = await excuteQuery({
                query: insertTermTaxonomy(body)
            });
            console.log(insertTermTaxonomyResult , "INSERT TERM TAXONOMY RESULT")

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

