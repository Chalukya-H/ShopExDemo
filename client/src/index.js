import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux' 
import configureStore from './store/configureStore'
import {startGetUser} from './actions/userAction'
import {getCategories} from './actions/categoryAction' 
import  'bootstrap/dist/css/bootstrap.css'
import  '../node_modules/bootstrap/dist/css/bootstrap.min.css'


const store = configureStore()
store.subscribe( () =>{ 
  store.getState()
})
 
// handle page reload
if(localStorage.getItem('token')) {   
  store.dispatch(getCategories())   
}
 

const ele = (
  <Provider store ={store}>
      <App/> 
      {/* <Footer/> */}
  </Provider>
)

ReactDOM.render( ele, document.getElementById('root') );
  
