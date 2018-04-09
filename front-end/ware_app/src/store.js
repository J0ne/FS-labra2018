import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import productReducer from './reducers/productReducer'
import customerReducer from './reducers/customerReducers'
import lendingReducer from './reducers/lendingReducer'
import {composeWithDevTools} from 'redux-devtools-extension'

const reducer = combineReducers({products: productReducer, customers: customerReducer, lendings: lendingReducer})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store