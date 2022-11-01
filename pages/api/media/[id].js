import excuteQuery from 'lib/db'

export default async (req, res) => {
    try {
        if (req.method === 'DELETE'){
            
            const result = await excuteQuery({
                query: `DELETE FROM wp_postmeta WHERE meta_id='${req.query.id}';`
            });

            console.log(result,"result")
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
