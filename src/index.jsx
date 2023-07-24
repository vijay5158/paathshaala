import React from 'react';
// import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './App';
import './index.css';
import registerServiceWorker from "./registerServiceWorker";
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from "react-cookie";
import { store } from './redux/store';
import { createRoot } from 'react-dom/client';
// ReactDOM.render(
//   <CookiesProvider>
//     <Provider store={store} >
//     <App />
//    </Provider>
//    </CookiesProvider>
//  ,
//   document.getElementById('root')
// );
// registerServiceWorker();
// reportWebVitals();

const rootElement = document.getElementById('root');

// Use createRoot to render your app
createRoot(rootElement).render(
  <CookiesProvider>
  <Provider store={store} >
  <App />
 </Provider>
 </CookiesProvider>

);