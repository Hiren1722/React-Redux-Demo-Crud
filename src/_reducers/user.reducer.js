import userConstants from "../_constants/user.constants";
const initialState = [];

export default function users(state = initialState, action) {
  switch (action.type) {

    case userConstants.REGISTER_SUCCESS:
      return  state.concat(action.user);

    case userConstants.UPDATE_SUCCESS:
        return  state.map(    
          (user, i) => user.id === action.user.id ? {...user, name : action.user.name ,  email : action.user.email,phone:action.user.phone,birth_date:action.user.birth_date,gender:action.user.gender,language:action.user.language }    
                                  : user);
                                  
    case userConstants.DELETE_SUCCESS:
      return state.filter(item => item.id !== action.user);

    default:
      return state;
  }
}
