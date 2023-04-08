//import petition
const { consultation } = require("../helpers/fetch");
// const cookieParser = require('cookie-parser');

const validateAuthor = async (req, res, next) => {

    console.log("in validatae athor")
    const method = "POST"
    const email = req.cookies.email
    body = { email }
    const urlEnd = "/author/verify"
    const data = await consultation(process.env.URLBASEUSERS + urlEnd, method, body);
    if (!data.ok) {
        return res.redirect("/")
    }
    next()
}


module.exports = { validateAuthor }