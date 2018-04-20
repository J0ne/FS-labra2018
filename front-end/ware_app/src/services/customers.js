import axios from 'axios'
const baseUrl = "http://localhost:3001/api/customers"
//const baseUrl = "/api/customers"


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { getAll } 