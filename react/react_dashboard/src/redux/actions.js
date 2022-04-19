/*  contains several actions
    sync action:{type:xxx,date:data} 
    async action: dispatch=>{}
*/
import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG,
  RESET_USER,
} from "./action-type";
import { reqLogin } from "../api";
import storageUtils from "../utils/storageUtils";

/* set head title action */
export const setHeadTitle = (headTitle) => ({
  type: SET_HEAD_TITLE,
  data: headTitle,
});

export const receiveUser = (user) => ({ type: RECEIVE_USER, user });
export const showErrorMsg = (errorMsg) => ({ type: SHOW_ERROR_MSG, errorMsg });

/* logout action */
export const logout = () => {
  storageUtils.deleteUser();
  return { type: RESET_USER };
};

/*  login action */
export const login = (username, password) => async (dispatch) => {

  const result = await reqLogin(username, password);

  if (result.status === 0) {
    const user = result.data;

    storageUtils.saveUser(user);
    dispatch(receiveUser(user));

  } else {
    const msg = result.msg;
    dispatch(showErrorMsg(msg));
  }
};
