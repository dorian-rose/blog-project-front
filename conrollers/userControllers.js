const { consultation } = require("../helpers/fetch")
const limit = 10
const skip = 10

const getAllEntries = async (req, res) => {
    const { page } = req.params
    const method = "GET"
    const urlEnd = `all-entries/${limit}/${skip * (page - 1)}`
    try {
        const data = await consultation(`${process.env.URLBASE}${urlEnd}`, method);
        console.log(data)
        // res.render("userViews/detailView", {
        //     data
        // });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error retrieving entries",
        });
    }
}

const getEntry = async (req, res) => {
    const { title, email } = req.params
    const method = "GET"
    const urlEnd = `entry/${title}/${email}`
    let data;
    try {
        data = await consultation(`${process.env.URLBASE}${urlEnd}`, method);
        console.log(data)
        // res.render("userViews/detailView", {
        //     data
        // });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error retrieving entry",
        });
    }
}

const searchEntry = async (req, res) => {
    const { search, page } = req.params
    const method = "GET"
    const urlEnd = `search/${search}/${limit}/${skip * (page - 1)}`
    let data;
    try {
        data = await consultation(`${process.env.URLBASE}${urlEnd}`, method);
        console.log(data)
        // res.render("userViews/detailView", {
        //     data
        // });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error retrieving entry",
        });
    }
}



module.exports = { getAllEntries, getEntry, searchEntry }