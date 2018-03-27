import axios from 'axios'
const baseUrl = "http://localhost:3001/lendings"


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const createNew = async (lending) => {
    const response = await axios.post(baseUrl,lending)
    return response.data
}
export default { getAll, createNew } 