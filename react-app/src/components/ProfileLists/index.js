import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { thunkGetAllLists } from "../../store/lists";

const ProfileLists = () => {
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
              <Link to="/profile/watchlist" id="watchlist-selector">Watchlist</Link>
              <Link to="/profile/lists">
                <p
                  className="current-user-profile-section"
                  id="profile-selected"
                >
                  Lists
                </p>
              </Link>
              <Link to="/profile/likes">Likes</Link>
            </div>
          </div>
          <div className="films-navbar-grid">
            <h1 id="films-page-title">MY LISTS</h1>
          </div>
        </div>
        <div className="lists-page-profile">
          <button className="change-cursor" onClick={() => history.push('/lists/create')}>Start your own list</button>
        </div>
        <div className="lists-container">
          {lists?.map((list) => (
            <div
              className="list-tile-container"
              onClick={() => history.push(`/lists/${list.id}`)}
            >
              <div className="list-tile">
                <span className="list-tile-overlap change-cursor">
                  <img src={list.films[0]?.tile_img_url} />
                  <img src={list.films[1]?.tile_img_url} />
                  <img src={list.films[2]?.tile_img_url} />
                  <img src={list.films[3]?.tile_img_url} />
                </span>
              </div>
              <div className="list-tile-info">
                <div className="list-tile-info-name">
                  <h2 className="change-cursor" id="list-name-text">
                    {list.list_name}
                  </h2>
                  {list.is_private === true && (
                    <i className="fa-solid fa-lock"></i>
                  )}
                </div>

                <div className="list-info-content">
                  <div className="list-info-line-profile">
                    <p>{list.films.length} films</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileLists;
