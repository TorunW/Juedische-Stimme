import excuteQuery from 'lib/db'
import { updateTerm, updateTermTaxonomy, deleteTerm, deleteTermTaxonomy, updateTermMeta, insertTermMeta, deleteTermMeta } from 'lib/queries';

export default async (req, res) => {
    try {
        if (req.method === 'PUT') {
            
            console.table(req.body)

            const termId = req.query.id;

            const updateCategoryResult = await excuteQuery({
                query: updateTerm({name:req.body.name, slug:req.body.slug,termId})
            });
            const updateCategoryTaxonomyResult = await excuteQuery({
                query: updateTermTaxonomy(req.body)
            });
            if (req.body.hasImage === true){
                const updateCategoryImageResult = await excuteQuery({
                    query: updateTermMeta({
                        term_id:termId,
                        meta_key:'_category_main_image',
                        meta_value:req.body.category_image
                    })
                });
                console.table(updateCategoryImageResult)
            } else {
                console.log('WHAT?!?!?!!')
                const createCategoryImageResult = await excuteQuery({
                    query: insertTermMeta({
                        term_id:termId,
                        meta_key:'_category_main_image',
                        meta_value:req.body.category_image
                    })
                });
                console.table(createCategoryImageResult)
            }
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
            const deleteCategoryImageResult = await excuteQuery({
                query: deleteTermMeta(termId)
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

