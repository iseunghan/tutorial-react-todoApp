import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, createStore, legacy_createStore} from 'redux';
import rootReducer from './modules';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import logger from 'redux-logger';

const root = ReactDOM.createRoot(document.getElementById('root'));

// 하나의 리덕스 스토어를 만들어준다.
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

root.render (
  <React.StrictMode>
      <Provider store={store}>
          <App/>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
