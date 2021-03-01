const fetcher = async (resource: string) => {
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_URL}${resource}`)
    const data = await res.json()
    return data
}

export default fetcher