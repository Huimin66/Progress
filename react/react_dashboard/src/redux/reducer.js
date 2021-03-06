import storageUtils from "../utils/storageUtils"
import {combineReducers} from 'redux'
  
import {SET_HEAD_TITLE,RECEIVE_USER,SHOW_ERROR_MSG,RESET_USER} from './action-type'

/* deal with head title reducer */
const initTitle='Home Page'
function headTitle(state=initTitle,action){
    // console.log(SET_HEAD_TITLE)
    switch(action.type){
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }
}

/* deal with user reducer */
const initUser=storageUtils.getUser()
function user(state=initUser,action){
    switch(action.type){
        case RECEIVE_USER:
            return action.user
        case SHOW_ERROR_MSG:
            const errorMsg = action.errorMsg
            return {...state,errorMsg}
        case RESET_USER:
            return {}
        default:
            return state
    }
}

/* 
    export conbined reducers
*/
export default combineReducers({
    headTitle,
    user
})