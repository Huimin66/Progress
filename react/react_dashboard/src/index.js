import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import store from "./redux/store";
import { Provider } from "react-redux";

//react-redux
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

//redux
// store.subscribe(()=>{
//     ReactDOM.render(
//         <Provider store={store}>
//           <App />
//         </Provider>,
//         document.getElementById("root")
//       );
// })
