import loginService from '../services/login'

let user = JSON.parse(localStorage.getItem('user'))
console.log('user:', user)
const testUser = {
    username: "Jouni",
    role: "admin",
}
const initialState = user ? user : null

const userReducer = ( state = initialState, action ) => {
    if (action.type === 'LOGIN_SUCCESS') {
        const userAsString = JSON.stringify(action.data)
        localStorage.setItem('user', userAsString )
        const newState = action.data
        return newState
    }
    if (action.type === 'LOG_OUT') {
        localStorage.removeItem("user")
        return null
    }
    return state
}

export const logIn = (loginData) => {
    return async(dispatch) => {
        const loginResponse = await loginService.logIn(loginData)
        dispatch({type: 'LOGIN_SUCCESS', data: loginResponse})
    }
}
export const logOut = () => {
        return async(dispatch) => {   dispatch({type: 'LOG_OUT'})
    }
}

export default userReducer

/*
"token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlkaWFkbWluIiwiaWQiOiI1YWN" +
    "mOGEwZGEyM2VkMThhYTJhM2IxNTUiLCJpYXQiOjE1MjM1NTU3Mjh9._dm-26m89S8EEvEXzZwYb-G-dg" +
        "wMEf2UThi32Qde1cQ",
"username" : "idiadmin",
"name" : "Idi Admin"
*/