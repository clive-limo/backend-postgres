import {prisma} from "../../../lib/prisma"
import { NextApiRequest, NextApiResponse } from "../../../node_modules/next/dist/shared/lib/utils"

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const {title, content} = req.body

    try {
        await prisma.note.create({
            data:{
                title,
                content
            }
        })
        res.status(200).json({message:'Note Created'})
    } catch (error) {
        console.log("Creation Failed")
    }
}