import React from 'react'
import './App.less'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/login'
import Admin from './pages/admin' 
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export default class App extends React.Component {

  render(){
    return(

    <BrowserRouter history={history}>
       <Routes >
            <Route path="/login" element = {<Login/>} />
            <Route path="/*" element = {<Admin/>} />
       </Routes>
      </BrowserRouter>
    )
  }
}
