import lendingService from '../services/lendings'

const lendingReducer = (state = [], action) => {
    // console.log(state, action)

    if (action.type === 'ADD_LENDING') {
        return [
            ...state,
            action.data
        ]
    }
    if (action.type === 'GET_ALL_LENDINGS') {
        return action.data
    }
    if (action.type === 'UPDATE_LENDING') {
        return action.data
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
        await lendingService.markReverted(lending)
        const lendings = await lendingService.getAll()
        dispatch({type: 'GET_ALL_LENDINGS', data: lendings})
    }
}

export default lendingReducer