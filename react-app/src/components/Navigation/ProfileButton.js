import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className="navbar-profile-button" onClick={openMenu}>
        <img className="change-cursor" id="navbar-profile-img" src={user.profile_img_url}/>
        <p>{user.username}</p>
        <i className="fa-solid fa-caret-down"></i>
      </div>
      <div className={ulClassName} ref={ulRef}>
        {user && (
          <>
            <div className="navbar-profile-button-fake" onClick={closeMenu}>
              <img className="change-cursor" id="navbar-profile-img" src={user.profile_img_url}/>
              <p>{user.username}</p>
              <i className="fa-solid fa-caret-down"></i>
            </div>
            <div className="hoverable" onClick={() => history.push('/')}><p>Home</p></div>
            <div className="hoverable" onClick={() => history.push('/profile')}><p>Profile</p></div>
            <div className="hoverable" onClick={() => history.push('/profile/films')}><p>Films</p></div>
            <div className="hoverable watchlist-profile-link" /*onClick={() => history.push('/profile/watchlist')}*/><p>Watchlist</p></div>
            <div className="hoverable" onClick={() => history.push('/profile/lists')}><p>Lists</p></div>
            <div className="hoverable dropdown-likes" onClick={() => history.push('/profile/likes')}><p>Likes</p></div>
            <div>
              <div className="hoverable" onClick={handleLogout}><p>Sign Out</p></div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
