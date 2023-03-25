import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/user';

const store = configureStore({
  reducer: {
    user: userReducer
  },
  middleware: [
  ]
});

export default store;
