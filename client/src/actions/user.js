export const SET_USERNAME_GLOBAL = 'SET_USERNAME_GLOBAL';

export function setUsernameGlobal(userNameGlobal) {
  localStorage.setItem('userNameGlobal', userNameGlobal);
  return {
    type: SET_USERNAME_GLOBAL,
    payload: userNameGlobal
  };
}

//this is a comment!