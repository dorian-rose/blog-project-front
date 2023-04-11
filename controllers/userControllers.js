const { consultation } = require("../helpers/fetch")
const { getPages } = require("../helpers/pages")
const limit = 3
const skip = 3

//Login 
const showIndex = (req, res) => {
    res.render("userViews/index");
}

const getAllEntries = async (req, res) => {
    const { page } = req.params
    const method = "GET"
    const urlEnd = `all-entries/${limit}/${skip * (page - 1)}`
    try {
        const data = await consultation(`${process.env.URLBASE}${urlEnd}`, method);
        if (data.ok) {
            const entries = data.entries
            const entryCount = await getPages()
            const pages = Math.ceil(entryCount / limit)
            res.render("userViews/showAllEntries", {
                entries,
                pages
            });
        } else {
            throw data.msg
        }
    } catch (error) {
        res.render("userViews/showAllEntries", {
            error
        });
    }
}

const getEntry = async (req, res) => {
    const { title, email } = req.params
    const method = "GET"
    const urlEnd = `entry/${title.replaceAll("_", " ")}/${email}`
    let data;
    try {
        data = await consultation(`${process.env.URLBASE}${urlEnd}`, method);
        if (data.ok) {
            const entry = data.entry[0]
            res.render("userViews/showDetailView", {
                entry
            });
        } else {
            throw data.msg
        }
    } catch (error) {
        res.render("userViews/showDetailView", {
            error
        });
    }
}//search all entries that have a match in title or body with search word retrieved from form
const showSearchForm = (req, res) => {
    res.render("userViews/searchForm");
}

const searchEntry = async (req, res) => {
    const { page } = req.params
    const search = req.body.search
    const method = "GET"
    const urlEnd = `search/${search}/${limit}/${skip * (page - 1)}`
    let data;
    try {
        if (!search) {
            return res.render("userViews/searchForm", {
                error: "Search is empty"
            });
        }
        data = await consultation(`${process.env.URLBASE}${urlEnd}`, method);
        if (data.ok) {
            const entryCount = await getPages(null, search)
            const pages = Math.ceil(entryCount / limit)
            const entries = data.entries
            res.render("userViews/searchResults", {
                entries,
                search,
                pages
            });
        } else {
            throw data.msg
        }
    } catch (error) {
        res.render("userViews/searchResults", {
            error, search
        });
    }
}



module.exports = { getAllEntries, getEntry, showSearchForm, searchEntry, showIndex, }