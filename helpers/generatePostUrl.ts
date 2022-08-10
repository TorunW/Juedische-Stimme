export const GeneratePostUrl = (postName) => {
    const url = postName.split('#').join(':__--__:')
    return url
}