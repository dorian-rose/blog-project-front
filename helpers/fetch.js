

const consultation = async (url, method, body = {}) => {
    console.log("in fetch", body)
    let options = {};
    console.log("url", url)
    const data = { ...body }
    if (data.title) {
        const titleSpaced = data.title.replaceAll("_", " ")
        data.title = titleSpaced
    }
    console.log("in fetch, respaced", data)
    try {
        if (method == "POST" || method == "PUT" || method == "DELETE") {

            options = {
                method: method,
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json",
                }
            }
        }

        const response = await fetch(url, options);
        const respData = await response.json();

        return respData;

    } catch (error) {
        console.log('FAILED while fetching', error)
    }
}



module.exports = { consultation };
