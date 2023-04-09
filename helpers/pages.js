const { consultation } = require("../helpers/fetch")

//function to check total number of entries/entries for author/search results and return this number
const getPages = async (email, search) => {

    const method = "POST"
    const urlEnd = "number"
    let body;
    if (search) {
        body = { search }
    } else {
        body = { email }
    }
    try {
        const data = await consultation(`${process.env.URLBASE}${urlEnd}`, method, body);
        if (data.ok) {
            const numEntries = data.numEntries[0].count
            return numEntries

        } else {
            throw data.msg
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getPages }