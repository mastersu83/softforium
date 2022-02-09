const initialState = {};

export const profile_reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return { ...state, ...action.payload.profile };
    case "LOG_OUT":
      return {};
    default:
      return state;
  }
};
