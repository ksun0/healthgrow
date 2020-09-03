const { createStore } = require('redux');

const initialState = {
  logged_in: 0,
  is_admin: 0,
  user: ""
};

//need to figure out how to pass val, then can update admin
const login_reducer = (state = initialState, action) => {
  const new_state = {...state};
  if (action.type == 'LOGIN') {
    new_state.logged_in = 1;
    new_state.is_admin = action.admin;
    new_state.user = action.name;
  } else if (action.type == 'LOGOUT') {
    new_state.logged_in = 0;
    new_state.is_admin = 0;
    new_state.user = '';    
  }

  return new_state;
}

const store = createStore(login_reducer);
store.subscribe(() => {
    console.log('login/logout event//state: ' + JSON.stringify(store.getState().user));
})
store.dispatch({type:'LOGIN', admin: 1, name: "belinda"});
