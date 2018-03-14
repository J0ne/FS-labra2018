import productService from '../services/products'

const reducer = (state = [], action) => {
    console.log(state, action)

    if (action.type === 'CREATE') {
        return [...state, action.data]
    }
    if (action.type === 'INIT_PRODUCTS') {
        return action.data
    }

    return state
}


export const productInitialization = (data) => {
    return async (dispatch) => {
        const products = await productService.getAll()
        dispatch({
            type: 'INIT_PRODUCTS',
            data: products
        })

    }
}

export default reducer