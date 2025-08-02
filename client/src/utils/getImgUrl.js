function getImgUrl (name) {
    return new URL(`../assets/machines/${name}`, import.meta.url)
}
export {getImgUrl}