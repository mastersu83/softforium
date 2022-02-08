import "./index.scss";
import Login from "./components/Login/Login";
import {Redirect, Route} from "react-router-dom";
import Register from "./components/Register/Register";
import { Profile } from "./components/Profile/Profile";
import { withAuthRedirect } from "./hoc/withAuthRedirect";
import { useSelector } from "react-redux";

function App() {
  let isAuth = useSelector((state) => state.auth.isAuth);
  return (
    <div className="root">
      <Route path="/register" exact>
        <Register isAuth={isAuth} />
      </Route>
      <Route path="/login" exact>
        <Login isAuth={isAuth} />
      </Route>
      <Route
        path="/profile"
        component={withAuthRedirect(Profile, isAuth)}
        exact
      />
        <Route
            path='*'
            component={withAuthRedirect(Profile, isAuth)}
        />
    </div>
  );
}

export default App;
