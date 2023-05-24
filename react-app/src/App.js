import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate, thunkGetUserById } from "./store/session";
import Navigation from "./components/Navigation";
import UserProfilePage from "./components/UserProfilePage";
import EditProfilePage from "./components/EditProfilePage";
import FilmsPage from "./components/FilmsPage";
import FilmDetailsPage from "./components/FilmDetailsPage";
import ProfileFilms from "./components/ProfileFilms";
import ProfileLikes from "./components/ProfileLikes";
import FilmCreate from "./components/FilmCreate";
import FilmUpdate from "./components/FilmUpdate"
import ListsPage from "./components/ListsPage";
import ProfileLists from "./components/ProfileLists";
import Watchlist from "./components/Watchlist";
import ListDetailsPage from "./components/ListDetailsPage";
import ProtectedRoute from "./components/auth/ProtectedRoute"
import ListUpdate from "./components/ListUpdate";
import ListCreate from "./components/ListCreate";
import HomePage from "./components/HomePage";

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
            <HomePage />
          </Route>
          <Route path="/profile/watchlist">
            <ProtectedRoute>
              <Watchlist />
            </ProtectedRoute>
          </Route>
          <Route path="/profile/lists">
            <ProtectedRoute>
              <ProfileLists />
            </ProtectedRoute>
          </Route>
          <Route path="/profile/settings">
            <ProtectedRoute>
              <EditProfilePage />
            </ProtectedRoute>
          </Route>
          <Route path="/profile/films">
            <ProtectedRoute>
              <ProfileFilms />
            </ProtectedRoute>
          </Route>
          <Route path="/profile/likes">
            <ProtectedRoute>
              <ProfileLikes />
            </ProtectedRoute>
          </Route>
          <Route path="/profile">
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          </Route>
          <Route path="/films/create">
            <ProtectedRoute>
              <FilmCreate />
            </ProtectedRoute>
          </Route>
          <Route path="/films/:filmId/edit">
            <ProtectedRoute>
              <FilmUpdate />
            </ProtectedRoute>
          </Route>
          <Route path="/films/:filmId">
            <FilmDetailsPage />
          </Route>
          <Route path="/films">
            <FilmsPage />
          </Route>
          <Route path="/lists/create">
            <ProtectedRoute>
              <ListCreate/>
            </ProtectedRoute>
          </Route>
          <Route path="/lists/:listId/edit">
            <ProtectedRoute>
              <ListUpdate />
            </ProtectedRoute>
          </Route>
          <Route path="/lists/:listId">
            <ListDetailsPage />
          </Route>
          <Route path="/lists">
            <ListsPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
