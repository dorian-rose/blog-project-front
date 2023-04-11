

const { consultation } = require("../helpers/fetch")
const { getPages } = require("../helpers/pages")


const limit = 6
const skip = 6


//login admin (author)
/**
 *                      
 * @param {Object} req 
 * @param {Object} res 
 * 
 */
const showAdminLoginPage = (req, res) => {
    res.render("userViews/login-form-admin");
}

const loginUserAuthor = async (req, res) => {
    const method = "POST"
    const body = req.body
    const urlEnd = '/author'
    let data;
    try {
        data = await consultation(process.env.URLBASEUSERS + urlEnd, method, body);
        if (data.ok) {
            res.cookie("email", body.email, { http: true, secure: true, sameSite: 'strict', expires: new Date('2023-12-20') })
            res.cookie("token", data.token, { http: true, secure: true, sameSite: 'strict', expires: new Date('2023-12-20') })
            //req.header.authorization = data.token
            res.redirect(`/admin/entries/${body.email}/1`)
        } else {
            throw data.msg
        }

    } catch (error) {
        res.render("userViews/login-form-admin", { error })
    }
};


//get all entries from one author (by author email)
/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
const getEntries = async (req, res) => {
    const { email, page } = req.params
    console.log(email, page)
    const method = "GET"
    const urlEnd = `entries/${email}/${limit}/${skip * (page - 1)}`
    try {
        const data = await consultation(`${process.env.URLBASE}${urlEnd}`, method);

        if (data.ok) {
            const entryCount = await getPages(email)
            const pages = Math.ceil(entryCount / limit)
            const entries = data.entries
            res.render("adminViews/showEntries", {
                entries,
                email,
                pages
            });
        } else {
            throw data.msg
        }
    } catch (error) {
        console.log(error)
        res.render("adminViews/showEntries", {
            error,
            email
        });
    }
}

//search and show one entry with more detail (article content)
/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
const getEntry = async (req, res) => {

    const { title, email } = req.params
    const method = "GET"
    const urlEnd = `entry/${title.replaceAll("_", " ")}/${email}`
    let data;
    try {
        data = await consultation(`${process.env.URLBASE}${urlEnd}`, method);
        if (data.ok) {
            const entry = data.entry[0]
            res.render("adminViews/showOneEntry", {
                entry,
                email
            });
        } else { throw data.msg }
    } catch (error) {
        res.render("adminViews/showOneEntry", {
            error,
            email
        });
    }
}

//render form to create new entry
/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
const showNewEntriesForm = (req, res) => {
    const { email } = req.params
    res.render("adminViews/newEntryForm", { email });
};

//create new entry
/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
const createEntry = async (req, res) => {

    const { email } = req.params
    const body = req.body
    body.image = req.file.filename

    const method = "POST"
    const urlEnd = `create/${email}`
    let data;
    try {
        data = await consultation(`${process.env.URLBASE}${urlEnd}`, method, body);
        if (!data.ok) {
            throw data.errors
        } else {
            console.log("create cont", email)
            res.redirect(`/admin/entries/${email}/1`)
        }

    } catch (error) {
        res.render("adminViews/newEntryForm", { email, error });
    }
}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
const showUpdateEntryForm = async (req, res) => {

    const { title, email } = req.params
    const method = "GET"
    const urlEnd = `entry/${title.replaceAll("_", " ")}/${email}`
    let data;
    try {
        data = await consultation(`${process.env.URLBASE}${urlEnd}`, method);
        if (!data.ok) {
            throw data.msg
        } else {
            const entry = data.entry[0]
            res.render("adminViews/updateEntryForm", {
                entry,
                email
            });
        }
    } catch (error) {
        res.render("adminViews/updateEntryForm", {
            mistake: error,
            email
        });
    }
};

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
const updateEntry = async (req, res) => {
    console.log("in admin update entries")
    const { title, email } = req.params;
    const urlEnd = `update/${title.replaceAll("_", " ")}/${email}`
    const method = "PUT"
    try {
        const body = req.body;
        console.log(body)
        if (typeof filename !== 'undefined') {
            body.image = req.file.filename
        } else {
            body.image = body.picture
        }

        data = await consultation(`${process.env.URLBASE}${urlEnd}`, method, body);
        if (!data.ok) {
            throw data.errors
        } else {
            res.redirect(`/admin/entries/${email}/1`)
        }
    } catch (error) {
        console.log(error)
        res.render("adminViews/updateEntryForm", {
            error,
            email,
            title
        });
    }
};

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
const deleteEntry = async (req, res) => {

    const { title, email } = req.params;
    const urlEnd = "delete"
    const method = "DELETE"
    try {
        const body = { title, "author": email };
        console.log(title, email, body)
        data = await consultation(`${process.env.URLBASE}${urlEnd}`, method, body);
        if (!data.ok) { throw data.msg }
    } catch (error) {
        console.log(error)
    }
    res.redirect(`/admin/entries/${email}/1`)
};

const logout = (req, res) => {
    res.clearCookie('email')
    res.redirect("/")
}


module.exports = { showAdminLoginPage, loginUserAuthor, getEntries, getEntry, createEntry, showNewEntriesForm, showUpdateEntryForm, updateEntry, deleteEntry, logout }