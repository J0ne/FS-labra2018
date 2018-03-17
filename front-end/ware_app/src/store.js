import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import productReducer from './reducers/productReducer'
import customerReducer from './reducers/customerReducers'
const reducer = combineReducers({
    products: productReducer,
    customers: customerReducer
})

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default store