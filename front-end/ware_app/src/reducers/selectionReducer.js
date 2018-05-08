
const reducer = (state = [], action) => {

    if (action.type === 'TOGGLE_SELECTED') {
       if(state.findIndex(function(item) {
            return item === action.data
        }) > -1){
           console.log("removed", action.data)
           const newState = state.filter( p => p.id != action.data.id)
           return newState
       }
       else{
           console.log("added", action.data)
           action.data.amount = 1 // alustetaan lisätessä yhdellä
           return [...state, action.data]
       }
    }

    if (action.type === 'UPDATE_SELECTED') {
        const newState = state.map(item => {
            if (item.id === action.data.id) {
                return action.data
            }
            else {
                return item
            }
        })
        return newState
    }
    if (action.type === 'REMOVE_FROM_SELECTED') {
        const newState = state.map( item => {
            if(item.id !== action.data.id)
            {
                return item
            }
        })
        return newState
    }
    return state
}

export const toggleSelected = (product) => {
    return async (dispatch) => {
        dispatch({
            type: 'TOGGLE_SELECTED',
            data: product
        })
    }
}
export const updateSelected = (product) => {
    return async (dispatch) => {
        dispatch({
            type: 'UPDATE_SELECTED',
            data: product
        })
    }
}
export const removeFromSelected = (product) => {
    return async (dispatch) => {
        dispatch({
            type: 'REMOVE_FROM_SELECTED',
            data: product
        })
    }
}

export default reducer