import React from 'react';
import ReactDOM from 'react-dom';
import Root from './config/routes';

import jquery from 'jquery';
import metismenu from 'metismenu';
import bootstrap from 'bootstrap';

import { createStore } from 'redux'
import kocApp from './reducers'


import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/font-awesome/css/font-awesome.css'
import './../node_modules/animate.css/animate.min.css'
import './../public/styles/style.css'

require('es6-promise').polyfill();
require('isomorphic-fetch');

let store = createStore(kocApp,/* preloadedState, */
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )


ReactDOM.render(
<Root store={store}/>,
    document.getElementById('root')
);