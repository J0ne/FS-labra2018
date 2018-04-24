import axios from 'axios'
//const baseUrl = "http://localhost:3001/api/customers"
const baseUrl = "/api/customers"


const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}
const addCustomer = async (customer) => {
    try {
        const response = await axios.post(baseUrl, customer)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
   
}

export default { getAll, addCustomer } 