import axios from 'axios'
//const baseUrl = "http://localhost:3001/api/products"
const baseUrl = '/api/products'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const createNew = async (product) => {
    const response = await axios.post(baseUrl, product )
    return response.data
}
export default { getAll, createNew } 
