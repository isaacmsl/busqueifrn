import debugDev from "./debugDev"

const debugNamespace = "getResource"

export default async (useLimits: boolean, uri: string) => {
    debugDev(debugNamespace, `usar limits: ${useLimits}`)
    debugDev(debugNamespace, `uri: ${uri}`)

    const res = await fetch(uri)
    const resJson = await res.json()

    const data = (useLimits)? resJson.result.records: resJson;

    debugDev(debugNamespace, `retornando array de length: ${data.length}`)
    return data
}