import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth } from "./firebase";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Profile from "./pages/profile";
import PublicHome from "./pages/publicHome"
import UserContext from "./utils/userContext";
import API from "./utils/API";
import Footer from "./components/Footer/footer";

const styleApp = {
  paddingBottom: "140px",
}

function App() {
  const [userState, setUserState] = useState({
    user: null,
    userSignOut: () => auth.signOut()
  });

  const contextValue = { userState, setUserState };

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        API.getSavedUser(userAuth.uid)
          .then(res => {
            console.log(`User coming from DB:`, res.data[0]);
            setUserState({ ...userState, user: res.data[0] });
          })
          .catch(error => {
            console.log(`Error getting user from DB:`, error);
          })
      } else {
        setUserState({ ...userState, user: null });
      }
    });
  }, [])

  return (
    <UserContext.Provider value={contextValue}>
      <Router>
        <Navbar className="navbar" />
        {!userState.user ?
          <div className={styleApp}>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Route component={PublicHome} />
            </Switch>
          </div>
          :
          <div className={styleApp}>
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/profile" component={Profile} />
              <Route component={Home} />
            </Switch>
          </div>
        }
        <Footer />
      </Router>
    </UserContext.Provider>
  )
}

export default App;