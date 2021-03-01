import type { NextApiRequest, NextApiResponse } from 'next'
import { Aluno } from '../../../types/Aluno'
import { getResource } from '../../../utils/getResource'

export default async(request: NextApiRequest, response: NextApiResponse) => {
    const { limit } = request.query

    const numberLimit = Number(limit)

    const alunos: Aluno[] = await getResource(process.env.ALUNOS_BASE_URI, numberLimit)

    response.setHeader("Cache-Control", "max-age=0, s-maxage=86400, stale-while-revalidate, public")
    response.status(200).json(alunos)
}

