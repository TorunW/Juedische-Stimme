import { getPlaiceholder } from 'plaiceholder';

export default async (req, res) => {
    try {
        if (req.method === 'POST') {
            
            console.log(req.body.uri)

            const {img, svg} = await getPlaiceholder(req.body.uri, {
              size: 64,
            });

            res.json({
                img,
                svg
            })
        } else  {
            // Handle any other HTTP method
            res.json({message:'only POST requests on this api end point!'})
        }
    } catch ( error ) {
        console.log(error , " PLACEHOLDER API ERROR ");
        res.json(error)
    }
};