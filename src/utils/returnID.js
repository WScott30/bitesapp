export const returnRecipeID = (uri) => {
    const words = uri.split('#')
    return words[1]
}