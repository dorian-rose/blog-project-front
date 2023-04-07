

const consultation = async (url, method, body = {}) => {

    let options = {};

    const data = { ...body }
    if (data.title) {
        const titleSpaced = data.title.replaceAll("_", " ")
        data.title = titleSpaced
    }

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
        console.log(url, options)
        const response = await fetch(url, options);
        const respData = await response.json();

        return respData;

    } catch (error) {
        console.log('FAILED while fetching', error)
        return error
    }
}



module.exports = { consultation };
