const { consultation } = require("../helpers/fetch")

const limit = 10
const skip = 10

//get all entries from one author (by author email)
const getEntries = async (req, res) => {
    console.log("in admin get all entries")
    const { email, page } = req.params
    const method = "GET"
    const urlEnd = `entries/${email}/${limit}/${skip * (page - 1)}`
    try {
        const data = await consultation(`${process.env.URLBASE}${urlEnd}`, method);

        if (data.ok) {
            const entries = data.entries
            res.render("adminViews/showEntries", {
                entries,
                email
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
    console.log("render form new ")
    res.render("adminViews/newEntryForm", { email });
};

//create new entry
const createEntry = async (req, res) => {
    console.log("in admin get create entry")
    const { email } = req.params
    const body = req.body
    const method = "POST"
    const urlEnd = `create/${email}`
    let data;
    try {
        data = await consultation(`${process.env.URLBASE}${urlEnd}`, method, body);
        if (!data.ok) {
            throw data.errors
        } else {
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
        data = await consultation(`${process.env.URLBASE}${urlEnd}`, method, body);
        if (!data.ok) {
            throw data.errors
        } else {
            res.redirect(`/admin/entries/${email}/1`)
        }
    } catch (error) {
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

module.exports = { getEntries, getEntry, createEntry, showNewEntriesForm, showUpdateEntryForm, updateEntry, deleteEntry }