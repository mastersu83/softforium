const initialState = {
  profile: {},
  isAuth: false,
};

export const auth_reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return { ...state, ...action.payload };
    case "LOG_IN":
      return { ...state, isAuth: true };
    case "LOG_OUT":
      return { ...state, isAuth: false };
    default:
      return state;
  }
};
