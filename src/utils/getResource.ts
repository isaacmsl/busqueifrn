export const getResource = async (baseUri: string, numberLimit: number) => {
    const URI = (numberLimit && numberLimit > 0)
        ? baseUri + `&limit=${numberLimit}`
        : baseUri + "&limit=5"
    
    const request = await fetch(URI)
    const data = await request.json()
    return data.result.records
}