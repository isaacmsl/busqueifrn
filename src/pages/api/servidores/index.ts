import type { NextApiRequest, NextApiResponse } from 'next'
const { SERVIDORES_BASE_URI } = process.env

export default async(request: NextApiRequest, response: NextApiResponse) => {
    const { limit } = request.query

    const numberLimit = Number(limit)
    const URI = (numberLimit && numberLimit > 0)
        ? SERVIDORES_BASE_URI + `&limit=${numberLimit}`
        : SERVIDORES_BASE_URI + "&limit=5"

    const requestDadosIFRN = await fetch(URI)
    const requestDadosIFRNJson = await requestDadosIFRN.json()

    const data = requestDadosIFRNJson.result.records;

    response.status(200).json(data)
}