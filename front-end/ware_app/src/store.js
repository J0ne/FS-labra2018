import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import productReducer from './reducers/productReducer'
const reducer = combineReducers({
    products: productReducer
})

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default store