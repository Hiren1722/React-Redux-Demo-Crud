import userConstants from "../_constants/user.constants";

const userActions = {
  userRegister,
  userUpdate,
  userDelete,
};
function userRegister(user) {
  return (dispatch) => {
        dispatch(success(user));
      };
 
  function success(user) {
    return {
      type: userConstants.REGISTER_SUCCESS,
      user,
    };
  }
 
}

function userUpdate(user) {
  return (dispatch) => {
    dispatch(success(user));
  };
  
  function success(user) {
    return {
      type: userConstants.UPDATE_SUCCESS,
      user,
    };
  }
  
}
function userDelete(user) {
    return (dispatch) => {
      dispatch(success(user));
    };
   
    function success(user) {
      return {
        type: userConstants.DELETE_SUCCESS,
        user,
      };
    }
   
  }

export default userActions;
