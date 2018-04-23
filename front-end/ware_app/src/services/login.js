import axios from 'axios'
//const baseUrl = 'http://localhost:3001/api/login'
const baseUrl = '/api/login'

const logIn = async (loginData) => {
    const response = await axios.post(baseUrl, loginData)
    return response.data
}
export default {
    logIn
}