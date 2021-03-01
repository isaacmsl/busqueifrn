import type { NextApiRequest, NextApiResponse } from 'next'
import { Servidor } from '../../../types/Servidor'
import { getResource } from '../../../utils/getResource'

export default async(request: NextApiRequest, response: NextApiResponse) => {
    const { limit } = request.query

    const numberLimit = Number(limit)

    const servidores: Servidor[] = await getResource(process.env.SERVIDORES_BASE_URI, numberLimit)

    response.setHeader("Cache-Control", "max-age=0, s-maxage=86400, stale-while-revalidate, public")
    response.status(200).json(servidores)
}