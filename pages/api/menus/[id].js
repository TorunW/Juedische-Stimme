import excuteQuery from 'lib/db'
import { deleteTerm, deleteTermRelationship, deleteTermTaxonomy, insertTerm, insertTermRelationship, insertTermTaxonomy } from 'lib/queries';

export default async (req, res) => {
    try {
        if (req.method === "PUT"){

            if (req.body.taxonomy !== req.body.previousTaxonomy){
                // delete term
                const deleteTermResult = await excuteQuery({
                    query: deleteTerm(req.body.term_id)
                })
                console.log(deleteTermResult, " deleteTermResult ")
                // delete term taxonomy
                const deleteTermTaxonomyResult = await excuteQuery({
                    query: deleteTermTaxonomy(req.body.term_id)
                })
                console.log(deleteTermTaxonomyResult, " deleteTermTaxonomyResult ")
                // delete term relationship
                const deleteTermRelationshipResult = await excuteQuery({
                    query: deleteTermRelationship(req.body.term_id,req.body.post_id)
                });
                console.log(deleteTermRelationshipResult , " deleteTermRelationshipResult ")
                // insert term
                const insertTermResult = await excuteQuery({
                    query: insertTerm({name:'menu_item',slug:''})
                });
                console.log(insertTermResult, " INSERT TERM RESULT ")
                // insert term taxonomy
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
                // insert term relationship
                const insertTermRelationshipResult = await excuteQuery({
                    query: insertTermRelationship(termId,req.body.post_id)
                })
                console.log(insertTermRelationshipResult, " INSERT TERM RELATIONSHIP RESULT")
                res.json({message:'MENU ITEM UPDATED'})
            }
            res.json({message:'no change'})
        } else if (req.method === "DELETE"){
            // delete term
            const deleteTermResult = await excuteQuery({
                query: deleteTerm(req.body.term_id)
            })
            console.log(deleteTermResult, " deleteTermResult ")
            // delete term taxonomy
            const deleteTermTaxonomyResult = await excuteQuery({
                query: deleteTermTaxonomy(req.body.term_id)
            })
            console.log(deleteTermTaxonomyResult, " deleteTermTaxonomyResult ")
            // delete term relationship
            const deleteTermRelationshipResult = await excuteQuery({
                query: deleteTermRelationship(req.body.term_id,req.body.ID)
            });
            console.log(deleteTermRelationshipResult , " deleteTermRelationshipResult ")
            res.json({message:'MENU ITEM DELETED'})
        } else {
            res.json({message:'NO GET HERE!'})
        }

    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};