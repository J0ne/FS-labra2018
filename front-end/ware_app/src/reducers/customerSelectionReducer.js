const reducer = (state = null, action) => {

    if (action.type === 'SELECT_CUSTOMER') {
        const newState = action.data
        return newState
    }

    if (action.type === 'REMOVE_SELECTED') {
        return null
    }
    return state
}

export const selectCustomer = (customer) => {
    return async (dispatch) => {
        dispatch({
            type: 'SELECT_CUSTOMER',
            data: customer
        })
    }
}
export const removeCustomer = (customer) => {
    return async (dispatch) => {
        dispatch({
            type: 'REMOVE_SELECTED',
            data: customer
        })
    }
}

export default reducer