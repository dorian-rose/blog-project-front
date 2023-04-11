const jwt = require("jsonwebtoken");
const { consultation } = require("../helpers/fetch")

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const validateJwt = async (req, res, next) => {
  let data;
  const method = "POST"
  const body = { email: req.cookies.email }
  const urlEnd = '/renew'

  try {
    //retrieve token 
    const token = req.cookies.token

    //verify token
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

    console.log("validate", user)
    //if verified, renew
    data = await consultation(process.env.URLBASEUSERS + urlEnd, method, body);
    if (data.ok) {
      //save new token to cookies
      res.cookie("token", data.token, { http: true, secure: true, sameSite: 'strict', expires: new Date('2023-12-20') })
      console.log("renewed")
    }
  } catch (error) {
    res.clearCookie('token')
    res.clearCookie('email')
    res.render("userViews/index", { error: "Session timed out" })
  }
  next();
};

module.exports = { validateJwt };
