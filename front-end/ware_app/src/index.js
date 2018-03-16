import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store'
import moment from 'moment'
import localeFi from 'moment/locale/fi'
moment.locale('fi', localeFi);
ReactDOM.render(<App store={store} />, document.getElementById('root'));