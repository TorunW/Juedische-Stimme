import excuteQuery from 'lib/db'
import { insertPost } from 'lib/queries/posts'
import { incrementTermTaxonomyCount, insertTermRelationship } from 'lib/queries';

export default async (req, res) => {
    try {
        if (req.method === 'POST') {

            const result = await excuteQuery({
                query: insertPost(req.body)
            });
            console.log(result,"result")

            console.log(req.body.categoryId, " REQ BODY CATEGORY ID")

            const insertTermRelationshipResult = await excuteQuery({
                query: insertTermRelationship(req.body.categoryId, result.insertId)
            })
            console.log(insertTermRelationshipResult, " INSERT TERM RELATIONSHIP RESULT")            

            const incrementCategoryCountResult = await excuteQuery({
                query:incrementTermTaxonomyCount(req.body.categoryId)
            })
            console.log(incrementCategoryCountResult," incrementCategoryCountResult")

            if (req.body.nextPostId){
                const incrementMaxIdRecordResult = await excuteQuery({
                    query:`UPDATE js_maxids SET max_id='${result.insertId + 1}' WHERE js_maxids.table='posts'`
                })
                console.log(incrementMaxIdRecordResult, 'incrementMaxIdRecordResult')   
            } else {
                const createMaxIdRecordResult = await excuteQuery({
                    query:`INSERT INTO js_maxids (js_maxids.table,max_id) VALUES ('posts','${result.insertId + 1}')`
                })
                console.log(createMaxIdRecordResult, 'createMaxIdRecordResult')   
            }
            
            
            res.json(result)
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

