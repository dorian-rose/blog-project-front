const { consultation } = require("../helpers/fetch")
const limit = 10
const skip = 10

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
            res.render("userViews/showAllEntries", {
                entries
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
}

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
        data = await consultation(`${process.env.URLBASE}${urlEnd}`, method);
        if (data.ok) {
            const entries = data.entries
            res.render("userViews/searchResults", {
                entries,
                search
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

//Login 
const showLoginPage = (req, res) => {
    res.render("userViews/login-form");
}

const loginUserReader = async (req, res) => {
    const method = "POST"
    const body = req.body
    let data;
    try {
        data = await consultation(process.env.URLBASEUSERS, method, body);
        console.log(data)
        if (data.ok) {
            res.cookie('email', body.email, { http: true, secure: true, sameSite: 'strict', expires: new Date('2023-12-20') })
            res.clearCookie('user')
            //res.cookie('token', data.token, { http: true, secure: true, sameSite: 'strict', expires: new Date('2023-12-20') })
            req.header.authorization = data.token
            res.redirect("/entries/1")
        } else {
            throw data.msg
        }

    } catch (error) {
        res.render("userViews/login-form", { error })
    }
};

const logout = (req, res) => {
    res.clearCookie('email')
    res.redirect("/")
}



module.exports = { getAllEntries, getEntry, showSearchForm, searchEntry, showLoginPage, loginUserReader, showIndex, logout }