import React from 'react';
import ReactDOM from 'react-dom/client';
// connect React with Redux with the react-redux package
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css';

// importing the store
import store from "./store";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
