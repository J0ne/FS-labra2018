import axios from 'axios'
const baseUrl = '/api/users'
const registerUrl = '/api/users/register'

const register = async(registerData) => {
    const response = await axios.post(registerUrl, registerData)
    return response.data
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
export default {
    register
}