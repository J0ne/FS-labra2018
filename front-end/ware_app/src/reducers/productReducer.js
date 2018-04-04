import productService from '../services/products'

const reducer = (state = [], action) => {
    if (action.type === 'ADD_PRODUCT') {
        debugger
        return [...state, action.data]
    }
    if (action.type === 'INIT_PRODUCTS') {
        console.table(action.data)
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

export const createProduct = (data) => {
    return async (dispatch) => {
        const product = await productService.createNew(data)
        dispatch({
            type: 'ADD_PRODUCT',
            data: product
        })

    }
}

export default reducer