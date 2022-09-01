import excuteQuery from 'lib/db'
import { updateTerm, updateTermTaxonomy, deleteTerm, deleteTermTaxonomy } from 'lib/queries';

export default async (req, res) => {
    try {
        if (req.method === 'PUT') {
            const termId = req.query.id;
            const updateCategoryResult = await excuteQuery({
                query: updateTerm({name:req.body.name, slug:req.body.slug,termId})
            });
            const updateCategoryTaxonomyResult = await excuteQuery({
                query: updateTermTaxonomy(req.body)
            });
            // console.log(result,"result")
            res.json({message:'category updated!'})
        }
        else if (req.method === "DELETE"){
            const termId = req.query.id;

            const deleteCategoryResult = await excuteQuery({
                query: deleteTerm(termId)
            })

            const deleteCategoryTaxonomyResult = await excuteQuery({
                query: deleteTermTaxonomy(termId)
            })

            res.json({message:'category deleted!'})
        }
        else {
            // Handle any other HTTP method
            res.json({message:'no GET here!'})
        }
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};

