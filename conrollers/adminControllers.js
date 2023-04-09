const { consultation } = require("../helpers/fetch")
const { getPages } = require("../helpers/pages")


const limit = 3
const skip = 3


//login admin (author)

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
        console.log(data)
        if (data.ok) {
            res.cookie("email", body.email, { http: true, secure: true, sameSite: 'strict', expires: new Date('2023-12-20') })
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
const getEntry = async (req, res) => {
    console.log("in admin get one entry")
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
const showNewEntriesForm = (req, res) => {
    const { email } = req.params
    res.render("adminViews/newEntryForm", { email });
};

//create new entry
const createEntry = async (req, res) => {
    console.log("in admin get create entry")
    const { email } = req.params
    const body = req.body
    body.image = req.file.filename
    console.log(body)
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

const showUpdateEntryForm = async (req, res) => {
    console.log("in admin show update form")
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

const updateEntry = async (req, res) => {
    console.log("in admin update entries")
    const { title, email } = req.params;
    const urlEnd = `update/${title.replaceAll("_", " ")}/${email}`
    const method = "PUT"
    try {
        const body = req.body;
        body.image = req.file.filename
        ///if image not updated?
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


const deleteEntry = async (req, res) => {
    console.log("in admin delete entries")
    const { title, email } = req.params;
    const urlEnd = "delete"
    const method = "DELETE"
    try {
        const body = { title, "author": email };
        console.log(title, email, body)
        data = await consultation(`${process.env.URLBASE}${urlEnd}`, method, body);
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error deleting entry",
        });
    }
    res.redirect(`/admin/entries/${email}/1`)
};

module.exports = { showAdminLoginPage, loginUserAuthor, getEntries, getEntry, createEntry, showNewEntriesForm, showUpdateEntryForm, updateEntry, deleteEntry }