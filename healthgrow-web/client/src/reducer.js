const initialState = {
  logged_in: 0,
  is_admin: 0,
  user: ""
};

//need to figure out how to pass val, then can update admin
const reducer = (state = initialState, action) => {
  const new_state = {...state};
  if (action.type == 'LOGIN') {
    new_state.logged_in = 1;
    new_state.is_admin = action.admin;
    new_state.user = action.user;
    
  } else if (action.type == 'LOGOUT') {
    new_state.logged_in = 0;
    new_state.is_admin = 0;
    new_state.user = '';    
  }

  console.log('reducer: ' + action.type + " " + JSON.stringify(new_state));
  return new_state;
}

export default reducer;
