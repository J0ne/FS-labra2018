import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import productReducer from './reducers/productReducer'
import customerReducer from './reducers/customerReducers'
import lendingReducer from './reducers/lendingReducer'
import userReducer from './reducers/userReducer'
import selectionReducer from './reducers/selectionReducer'
import customerSelectionReducer from './reducers/customerSelectionReducer'
import {composeWithDevTools} from 'redux-devtools-extension'

const reducer = combineReducers({
    products: productReducer, 
    customers: customerReducer, 
    lendings: lendingReducer, 
    user: userReducer,
    selectedProducts: selectionReducer,
    selectedCustomer: customerSelectionReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store