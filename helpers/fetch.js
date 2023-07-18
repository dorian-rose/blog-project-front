
/**
 * 
 * @param {String} url URL direction to API 
 * @param {String} method 
 * @param {Object} [body ] if applicable, body of API request 
 * @catch {error}
 */
const consultation = async (url, method, body = {}) => {

    let options = {};

    const data = { ...body }
    if (data.title) {
        const titleSpaced = data.title.replaceAll("_", " ")
        data.title = titleSpaced
    }

   // console.log(url, "method", method, "body", body)

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
        return error
    }
}



module.exports = { consultation };
