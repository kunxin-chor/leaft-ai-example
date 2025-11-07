const API_BASE_URL = "<url to FourSquare Proxy>";
const headers = {
    Accept: 'application/json'
}


async function search(lat, lng, query) {
    let ll = lat + "," + lng;
    let response = await axios.get(API_BASE_URL + "/places/search", {
        headers: {
            ...headers
        },
        params: {
            'll': ll,
            'query': query
        }
    })
    return response.data;
}