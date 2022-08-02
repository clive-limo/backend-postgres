import {prisma} from "../../../../lib/prisma"
import { NextApiRequest, NextApiResponse } from "../../../../node_modules/next/dist/shared/lib/utils"

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const noteId = req.query.id;

    if(req.method === 'DELETE'){
        const note = await prisma.note.delete({
            where: {id: Number(noteId)}
        })
        res.json(note)
    } else {
        console.log("Node could not be created")
    }
}