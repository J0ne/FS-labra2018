import customerService from '../services/customers'

const customerReducer = (state = [], action) => {
    console.log(state, action)

    if (action.type === 'CREATE') {
        return [...state, action.data]
    }
    if (action.type === 'GET_ALL') {
        return action.data
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

// export const productInitialization = (data) => {
//     return async (dispatch) => {
//         const products = await productService.getAll()
//         dispatch({
//             type: 'INIT_PRODUCTS',
//             data: products
//         })

//     }
// }

export default customerReducer