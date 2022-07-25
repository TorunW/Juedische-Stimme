import excuteQuery from 'lib/db'
import { updatePost, deletePost } from 'lib/queries/posts'
import { decreaseTermTaxonomyCount, deleteTermRelationship, incrementTermTaxonomyCount, updateTermRelationship } from 'lib/queries';

export default async (req, res) => {
    try {
        if (req.method === 'PUT') {

            console.log(req.body.previousCategoryId, " PREVIOUS CATEGORY ID")
            console.log(req.body.categoryId, " CATEGORY ID")

            const result = await excuteQuery({
                query: updatePost({...req.body,postId:req.query.id})
            });

            if (req.body.previousCategoryId !== null && req.body.previousCategoryId !== req.body.categoryId){
                // update wp_term_relationship
                const categoryChangedResult = await excuteQuery({
                    query: updateTermRelationship(req.body.categoryId,req.body.previousCategoryId,req.query.id)
                });
                console.log(categoryChangedResult, "categoryChangedResult")
                // increment new category's count
                const incrementCategoryCountResult = await excuteQuery({
                    query:incrementTermTaxonomyCount(req.body.categoryId)
                })
                console.log(incrementCategoryCountResult," incrementCategoryCountResult")
                // decrease old category's count
                const decreaseCategoryCountResult = await excuteQuery({
                    query:decreaseTermTaxonomyCount(req.body.previousCategoryId)
                })
                console.log(decreaseCategoryCountResult," decreaseCategoryCountResult")
                // update previous category wp_terms

            }

            res.json(result)
            
        }
        else if (req.method === 'DELETE'){
            
            const result = await excuteQuery({
                query: deletePost(req.query.id)
            });

            const deleteTermRelationshipResult = await excuteQuery({
                query: deleteTermRelationship(req.body.categoryId,req.query.id)
            })

            console.log(req.body, " REQ BODY!!!!!")

            const decreaseCategoryCountResult = await excuteQuery({
                query:`UPDATE wp_term_taxonomy SET count=count-1 WHERE term_id=${req.body.categoryId}`
            })
            console.log(decreaseCategoryCountResult, " DECREASE CATEGORY COuNT RESUTL")

            // console.log(result,"result")

            res.json(result)
        }
        else {
            // Handle any other HTTP method
            res.json({message:'no GET on this route (/api/posts/[id])!'})
        }
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};
