import excuteQuery from 'lib/db'
import { updateTerm, updateTermTaxonomy } from 'lib/queries';

export default async (req, res) => {
    try {
        if (req.method === 'PUT') {
            
            const termId = req.query.id;

            const updateTermResult = await excuteQuery({
                query: updateTerm({name:req.body.name, slug:req.body.slug,termId})
            });
            console.log(updateTermResult, " UPDATE TERM RESULT ")

            const updateTermTaxonomyResult = await excuteQuery({
                query: updateTermTaxonomy(req.body)
            });
            console.log(updateTermTaxonomyResult, " UPDATE TERM TAXONOMY RESULT ")

            // console.log(result,"result")
            res.json({message:'category updated!'})
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

