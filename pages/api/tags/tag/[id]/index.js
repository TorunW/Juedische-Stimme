import excuteQuery from 'lib/db'
import { deleteTerm, deleteTermRelationships, deleteTermTaxonomy, updateTag, updateTagSlug } from 'lib/queries';

export default async (req, res) => {
    try {
        if (req.method === 'POST'){ 
            // CREATE A TAG WITHOUT A POST?
        } if (req.method === 'PUT'){

            const updateTagResult = await excuteQuery({
                query:updateTag(req.body)
            })
            const updateTagSlugResult = await excuteQuery({
                query:updateTagSlug(req.body)
            })
            res.json({message:"tag updated"})
        } else if (req.method === 'DELETE'){
            // delete wp_terms, wp_term_taxonomy, wp_term_relationships
            const deleteTermResult = await excuteQuery({
                query:deleteTerm(req.query.id)
            });
            const deleteTermTaxonomyResult = await excuteQuery({
                query:deleteTermTaxonomy(req.query.id)
            });
            const deleteTermRelationshipsResult = await excuteQuery({
                query:deleteTermRelationships(req.query.id)
            });
            res.json({message:"tag deleted!"})
        } else {
            // Handle any other HTTP method
            console.log('not post request')
            res.json({message:'no GET here!'})
        }
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};
