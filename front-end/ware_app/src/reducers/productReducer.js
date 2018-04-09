import productService from '../services/products'

const reducer = (state = [], action) => {
    if (action.type === 'ADD_PRODUCT') {
        return [...state, action.data]
    }
    if (action.type === 'INIT_PRODUCTS') {

        console.table(action.data)
        return action.data
    }

    if (action.type === 'ADD_LENDING') {
        const map = new Map()
        const lendedProducts = action.data.products
        lendedProducts.forEach(element => {
            map.set(element.id, element.amount)
        })
        const keys = Array.from(map.keys())
        console.log(keys)
        const newSate = state.map( p => {
            if(keys.includes(p.id)){
                return updateAmount(map.get(p.id), p)
            }
            return p
        })
        return newSate
    }
    return state
}

const updateAmount = (lendedAmount, product) => {
    const newProduct = product;
    newProduct.amountInStorage = newProduct.amountInStorage - lendedAmount
    return newProduct
}

export const productInitialization = (data) => {
    return async(dispatch) => {
        const products = await productService.getAll()
        dispatch({type: 'INIT_PRODUCTS', data: products})

    }
}

export const createProduct = (data) => {
    return async(dispatch) => {
        const product = await productService.createNew(data)
        dispatch({type: 'ADD_PRODUCT', data: product})

    }
}

export default reducer