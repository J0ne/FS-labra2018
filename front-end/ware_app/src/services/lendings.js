import axios from 'axios'
const baseUrl = "http://localhost:3003/api/lendings"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const createNew = async(lending) => {
    const response = await axios.post(baseUrl, lending)
    return response.data
}

const markReverted = async(lending) => {
    console.log('LENDING SERVICE',lending)
    const response = await axios.put(baseUrl + '/' + lending.id, lending)
}
export default {
    getAll,
    createNew,
    markReverted
}