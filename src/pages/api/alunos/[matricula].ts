import type { NextApiRequest, NextApiResponse } from 'next'
const { ALUNOS_BASE_URI_QUERY } = process.env

export default async(request: NextApiRequest, response: NextApiResponse) => {
    const { matricula } = request.query

    const URI = ALUNOS_BASE_URI_QUERY + matricula

    const requestDadosIFRN = await fetch(URI)
    const requestDadosIFRNJson = await requestDadosIFRN.json()

    const data = requestDadosIFRNJson.result.records[0];
    
    response.setHeader("Cache-Control", "max-age=0, s-maxage=86400, stale-while-revalidate, public")
    response.status(200).json(data)
}