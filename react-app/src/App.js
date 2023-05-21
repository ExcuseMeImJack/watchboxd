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
import ProfileFilms from "./components/ProfileFilms";
import ProfileLikes from "./components/ProfileLikes";
import CreateFilmPage from "./components/CreateFilmPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);
  // console.log(user)
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/profile/settings">
            <EditProfilePage />
          </Route>
          <Route path="/profile/films">
            <ProfileFilms />
          </Route>
          <Route path="/profile/likes">
            <ProfileLikes />
          </Route>
          <Route path="/profile">
            <UserProfilePage />
          </Route>
          <Route path="/films/create">
            <CreateFilmPage />
          </Route>
          <Route path="/films/:filmId">
            <FilmDetailsPage />
          </Route>
          <Route path="/films">
            <FilmsPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
