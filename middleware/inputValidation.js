const { validationResult } = require("express-validator");

//validate inputs are not empty and have correct details as defined in userRouters, applies to create and update
const validateInputs = (req, res, next) => {
    console.log("validation", req.body)
    const errors = validationResult(req);

    //if errors isn't empty = there are blank fields or incorrect data type entered
    if (!errors.isEmpty()) {

        res.errors = errors.array();
        // return res.status(400).json({
        //     ok: false,
        //     errors: errors.array(),
        // });
    }
    //if all correct, continue to function
    next();
};

module.exports = { validateInputs };