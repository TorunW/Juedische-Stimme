import excuteQuery from 'lib/db'
import { updateUser } from 'lib/queries/users';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        if (req.method === 'PUT'){ 
            const body = {
                ...req.body,
                user_pass:'STORED ON FIREBASE',
                ID:req.query.id,
            }
            const userUpdateResult = await excuteQuery({
                query:updateUser(body)
            })
            res.json(userUpdateResult)
        } else {
            res.json({message:'no GET on this route: /api/users/[id]'})
        }
    } catch ( error ) {
        console.log(error );
        res.json(error)
    }
};
