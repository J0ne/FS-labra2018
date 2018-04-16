import lendingService from '../services/lendings'

const lendingReducer = (state = [], action) => {
    // console.log(state, action)

    if (action.type === 'ADD_LENDING') {
        return [...state, action.data ]
    }
    if (action.type === 'GET_ALL_LENDINGS') {
        return action.data
    }
    if (action.type === 'UPDATE_LENDING') {
        console.log('UPDATE_LENDING:', action.data)

        const newState = state.map( lending => {
            const result = lending.id === action.data.id ? action.data : lending
            return result
        })
        return newState
    }
    return state
}

export const getLendings = () => {
    return async(dispatch) => {
        const lendings = await lendingService.getAll()
        dispatch({type: 'GET_ALL_LENDINGS', data: lendings})
    }
}
export const addLending = (data) => {
    return async(dispatch) => {
        const lending = await lendingService.createNew(data)
        dispatch({type: 'ADD_LENDING', data: lending})

    }
}

export const markReverted = (lending) => {
    return async(dispatch) => {
        const revertedLending = await lendingService.markReverted(lending)
console.log('revertedLending', revertedLending)
        dispatch({type: 'UPDATE_LENDING', data: revertedLending})
    }
}

export default lendingReducer