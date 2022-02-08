const initialState = {};

export const profile_reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_TAB":
      return { ...state, filterBy: action.payload };

    case "SET_FILTER":
      return { ...state, filterBy: action.payload };
    default:
      return state;
  }
};
