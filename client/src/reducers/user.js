import { createReducer } from '@reduxjs/toolkit';
import { SET_USERNAME_GLOBAL } from '../actions/user';

const initialState = {
  userNameGlobal: localStorage.getItem('userNameGlobal') || 'eheh'
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(SET_USERNAME_GLOBAL, (state, action) => {
    state.userNameGlobal = action.payload;
  });
});

export default userReducer;
