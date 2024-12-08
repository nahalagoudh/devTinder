const auth = (req, res, next) => {
    const token = "xyz";
    const isAuthorizedToken = token === "xyz";
    if (isAuthorizedToken) {
        next()

    } else {
        res.status(401).send("unauthorized request")
    }

}
module.exports = {
    auth
}