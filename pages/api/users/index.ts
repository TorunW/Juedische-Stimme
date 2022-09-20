import excuteQuery from 'lib/db'
import { insertUser } from 'lib/queries/users';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        if (req.method === 'POST'){ 
            const userInsertResult = await excuteQuery({
                query:insertUser({
                    ...req.body,
                    user_pass:'STORED ON FIREBASE'
                })
            })
            res.json(userInsertResult)
        } else {
            res.json({message:'no GET on this route: /api/users/'})
        }
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};
