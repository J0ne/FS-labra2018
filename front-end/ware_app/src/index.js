import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store'
import moment from 'moment'
import localeFi from 'moment/locale/fi'
import { Provider } from 'react-redux'

moment.locale('fi', localeFi);

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    )
}
render()
store.subscribe(render)