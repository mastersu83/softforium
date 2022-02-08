import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { auth_reducer } from "./auth_reducer";
import { profile_reducer } from "./profile_reducer";
import thunk from "redux-thunk";

let reducers = combineReducers({
  auth: auth_reducer,
  profile: profile_reducer,
});

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;
