const initialState = {
    showloader: false
}

const commonReducer = (state = initialState, action) => {
console.log(action, initialState)
    if (action.type === 'REGISTER') {
        console.log("COMMON REDUCER")
        if( action.data){
            return {
                showloader: false
            }
        }
    }
    return initialState
}

export default commonReducer