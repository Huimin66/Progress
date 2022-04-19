/* redux core object: store */

import {applyMiddleware} from 'redux'
import {createStore} from 'redux'
import thunk from 'redux-thunk'
import combineReducers from './reducer'
import {composeWithDevTools} from 'redux-devtools-extension'

//export store
const store=createStore(combineReducers,composeWithDevTools(applyMiddleware(thunk)))
export default store