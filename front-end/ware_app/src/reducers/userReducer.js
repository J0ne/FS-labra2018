import loginService from '../services/login'

let user = JSON.parse(localStorage.getItem('user'))
const testUser = {
    username: "Jouni",
    role: "admin",
}
const initialState = user ? { loggedIn: true, user } : {}
console.log('initialState:', initialState)
const userReducer = ( initialState, action ) => {
    if (action.type === 'LOGIN_SUCCESS') {
        return testUser
    }
    if (action.type === 'LOG_OUT') {
        return null
    }
    return initialState === undefined ? testUser : initialState
}

export const login = (loginData) => {
    return async(dispatch) => {
        const loginResponse = await loginService.logIn(loginData)
        dispatch({type: 'LOGIN_SUCCESS', user: loginResponse})
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