import Debug from "debug"

export default (namespace: string, message: string) => {
    const { IS_DEV } = process.env
    const isDevelopment = IS_DEV == "true"
    
    if (isDevelopment) {
        const debug = Debug(namespace)
        debug(message)
    } 
}