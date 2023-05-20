import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate, thunkGetUserById } from "./store/session";
import Navigation from "./components/Navigation";
import UserProfilePage from "./components/UserProfilePage";
import EditProfilePage from "./components/EditProfilePage";
import FilmsPage from "./components/FilmsPage";
import FilmDetailsPage from "./components/FilmDetailsPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user)
  // console.log(user)
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Navigation isLoaded={isLoaded} />
          </Route>
          <Route path="/login" >
            <Navigation isLoaded={isLoaded} />
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <Navigation isLoaded={isLoaded} />
            <SignupFormPage />
          </Route>
          <Route path="/profile/settings">
            <Navigation isLoaded={isLoaded} />
            <EditProfilePage/>
          </Route>
          <Route path="/profile">
            <Navigation isLoaded={isLoaded} />
            <UserProfilePage/>
          </Route>
          <Route path="/films/:filmId">
            <Navigation isLoaded={isLoaded}/>
            <FilmDetailsPage/>
          </Route>
          <Route path="/films">
            <Navigation isLoaded={isLoaded} />
            <FilmsPage/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
