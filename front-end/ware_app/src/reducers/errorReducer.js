

const errorReducer = (state = null, action) => {
    if (action.type === 'ADD_LENDING_ERROR') {
        console.log('ERROR REDUCER!')
        const newState = action.data
        return newState
    }
    return state
}

export default errorReducer