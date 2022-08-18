import { getPlaiceholder } from 'plaiceholder';

export default async (req, res) => {
    try {
        if (req.method === 'POST') {

            const uri = `${req.headers.referer}wp-content/uploads/${req.body.uri}`

            const {img, svg} = await getPlaiceholder(uri, {
              size: 64,
            });

            res.json({
                img,
                svg,
                uri
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