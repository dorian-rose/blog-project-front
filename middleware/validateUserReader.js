//import petition
const { consultation } = require("../helpers/fetch");
// const cookieParser = require('cookie-parser');

const validateReader = async (req, res, next) => {

    const method = "POST"
    const email = req.cookies.email
    body = { email }
    const urlEnd = "/verify"
    console.log("validating user")
    const data = await consultation(process.env.URLBASEUSERS + urlEnd, method, body);
    console.log("user", data)
    if (!data.ok) {
        return res.redirect("/")
    }
    next()
}


module.exports = { validateReader }