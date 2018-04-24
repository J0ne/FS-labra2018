import customerService from '../services/customers'

const customerReducer = (state = [], action) => {
    // console.log(state, action)

    if (action.type === 'GET_ALL') {
        console.log(action.data)
        return action.data
    }
    if (action.type === 'ADD_LENDING'){
        // TODO: tarvitaanko 
    }
    if (action.type === 'ADD_CUSTOMER'){
        return [...state, action.data]
    }
    return state
}

export const getCustomers = () => {
    return async (dispatch) => {
        const customers = await customerService.getAll()
        dispatch({
            type: 'GET_ALL',
            data: customers
        })
    }
}

export const addCustomer = (data) => {
    return async(dispatch) => {
        const customer = await customerService.addCustomer(data)
        dispatch({type: 'ADD_CUSTOMER', data: customer})

    }
}

export default customerReducer