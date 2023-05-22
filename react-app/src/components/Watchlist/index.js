import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { thunkGetAllLists } from "../../store/lists";

const Watchlist = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const lists = useSelector((state) =>
    state.lists.lists?.filter((list) => list.user_id === user.id)
  );

  useEffect(() => {
    dispatch(thunkGetAllLists());
  }, [dispatch]);

  return (
    <div className="user-films-page-container">
      <div className="user-films-page">
        <div className="user-film-navbar">
          <div className="user-profile-navbar-border">
            <div className="user-profile-navbar-links">
              <Link to="/profile">Profile</Link>
              <Link to="/profile/films">Films</Link>
              <Link to="/profile/watchlist">
                <p
                  className="current-user-profile-section"
                  id="profile-selected"
                >
                  Watchlist
                </p>
              </Link>
              <Link to="/profile/lists">Lists</Link>
              <Link to="/profile/likes">Likes</Link>
            </div>
          </div>
          <div className="films-navbar-grid">
            <h1 id="films-page-title">MY WATCHLIST</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
