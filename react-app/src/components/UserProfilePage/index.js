import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./UserProfile.css";
import Loading from "../Loading";
import { useEffect } from "react";
import { thunkGetAllFilms } from "../../store/films";

const UserProfilePage = () => {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  // const films = useSelector((state) => state.session.films)


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thunkGetAllFilms())
  }, [dispatch])

  const handleEditProfile = () => {
    history.push("/profile/settings");
  };

  if(!user) return <Loading/>

  const orderFilms = () => {
    const likes = user.likes;
    const watched = user.films_watched;
    const activity = [...likes, ...watched]

    const uniqueFilms = [...new Map(activity.map((film) => [film.id, film])).values()];

    uniqueFilms.sort((a, b) => {
      const createdAtA = new Date(a.created_at).getTime();
      const createdAtB = new Date(b.created_at).getTime();

      if (createdAtA > createdAtB) {
        return -1;
      }
      if (createdAtA < createdAtB) {
        return 1;
      }
      return 0;
    })
    return uniqueFilms
  }

  const userFilms = orderFilms();

  const calculateLikesAndWatchesForYear = () => {
    const totalThisYear = [];
    userFilms.forEach((like) => {
      // eslint-disable-next-line
      if (like.created_at?.split(" ")[3] == new Date().getFullYear()) {
        totalThisYear.push({ [like.id]: like });
      }
    });
    return totalThisYear.length;
  };

  return (
    <div className="user-profile-page-container">
      <div className="user-profile-page">
        <div className="user-profile-info">
          <div className="user-profile-user-img-container">
            <img id="user-profile-user-img" alt="" src={user.profile_img_url} />
          </div>
          <div className="user-profile-info-section-1">
            <div className="user-profile-edit-button-container">
              <h2>{user.username}</h2>
              <button id="user-profile-edit-button" className="change-cursor" onClick={handleEditProfile}>
                EDIT PROFILE
              </button>
            </div>
            {user.bio && <p>{user.bio}</p>}
          </div>
          <div className="user-profile-info-section-2">
            <div className="user-profile-data-lists">
              {userFilms.length === 1 ? (
                <div className="user-profile-films-watched-liked">
                  <h2>{userFilms ? userFilms.length : 0}</h2>
                  <p>FILM</p>
                </div>
              ) : (
                <div className="user-profile-films-watched-liked">
                  <h2>{userFilms ? userFilms.length : 0}</h2>
                  <p>FILMS</p>
                </div>
              )}
              <div id="right-divider"></div>
              <div className="user-profile-films-watched-yearly">
                <h2>{calculateLikesAndWatchesForYear()}</h2>
                <p>THIS YEAR</p>
              </div>
              <div id="right-divider"></div>
              <div className="user-profile-lists-created">
                <h2>{user.lists ? user.lists.length : 0}</h2>
                <p>LISTS</p>
              </div>
            </div>
            <div className="user-profile-navbar">
              <div className="user-profile-navbar-border">
                <div className="user-profile-navbar-links">
                  <Link to="/profile">
                    <p
                      className="current-user-profile-section"
                      id="profile-selected"
                    >
                      Profile
                    </p>
                  </Link>
                  <Link to="/profile/films">Films</Link>
                  <Link to="/profile/watchlist" id="watchlist-selector">Watchlist</Link>
                  <Link to="/profile/lists">Lists</Link>
                  <Link to="/profile/likes">Likes</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="user-profile-content-container">
          <div className="user-profile-recent-activity-container">
            <p>RECENT ACTIVITY</p>
            <div className="user-profile-recent-activity-content">
                {userFilms && userFilms.length > 0 ? userFilms.map((film, i) =>
                 i <= 11 && <div key={film.title} className="user-profile-recent-films-card change-cursor" onClick={() => history.push(`/films/${film.id}`)} title={film.title + ' | ' + film.year + ' | ' + film.director}>
                 <img id="user-profile-recent-films-card-img" src={film.tile_img_url} alt="" />
               </div>

                ) : null}
            </div>
          </div>
          <div className="user-profile-lists-container">
            <div className="user-profile-watchlist-container">
              <p>WATCHLIST</p>
              <div className="user-profile-watchlist-content">
                {user.films_to_watch && user.films_to_watch.length ?
                  <Link to="/profile/watchlist">
                    <div className="watchlist-image-stack list-img-small">
                      <div className="watchlist-image-1">
                        <img id="watchlist-image-1-img" src={user.films_to_watch[0] ? user.films_to_watch[0].tile_img_url : "https://i.imgur.com/LXLqNVa.png"} alt=""/>
                      </div>
                      <div className="watchlist-image-2">
                        <img id="watchlist-image-2-img" src={user.films_to_watch[1] ? user.films_to_watch[1].tile_img_url : "https://i.imgur.com/LXLqNVa.png"} alt=""/>
                      </div>
                      <div className="watchlist-image-3">
                        <img id="watchlist-image-3-img" src={user.films_to_watch[2] ? user.films_to_watch[2].tile_img_url : "https://i.imgur.com/LXLqNVa.png"} alt=""/>
                      </div>
                      <div className="watchlist-image-4">
                        <img id="watchlist-image-4-img" src={user.films_to_watch[3] ? user.films_to_watch[3].tile_img_url : "https://i.imgur.com/LXLqNVa.png"} alt=""/>
                      </div>
                    </div>
                  </Link>
                  :
                  <button className="create-a-list-button change-cursor" onClick={() => history.push('/films')}>Add some films to your watchlist!</button>
                }
              </div>
            </div>
            <div className="user-profile-watchlist-container">
              <p>LISTS</p>
              <div className="user-profile-watchlist-content">
                {user.lists && user.lists.length > 0 ? user.lists.map(list =>
                <div>
                  <Link to={`/lists/${list.id}`}>
                  <div className="watchlist-image-stack list-img-small">
                    <div className="watchlist-image-1">
                      <img id="watchlist-image-1-img list-img-small" src={list.films[0] ? list.films[0].tile_img_url : "https://i.imgur.com/LXLqNVa.png"} alt=""/>
                    </div>
                    <div className="watchlist-image-2">
                      <img id="watchlist-image-2-img list-img-small" src={list.films[1] ? list.films[1].tile_img_url : "https://i.imgur.com/LXLqNVa.png"} alt=""/>
                    </div>
                    <div className="watchlist-image-3">
                      <img id="watchlist-image-3-img list-img-small" src={list.films[2] ? list.films[2].tile_img_url : "https://i.imgur.com/LXLqNVa.png"} alt=""/>
                    </div>
                    <div className="watchlist-image-4">
                      <img id="watchlist-image-4-img list-img-small" src={list.films[3] ? list.films[3].tile_img_url : "https://i.imgur.com/LXLqNVa.png"} alt=""/>
                    </div>
                  </div>
                </Link>
                <h4 id="user-profile-list-name">{list.list_name}</h4>

                </div>
                ) : <button className="create-a-list-button change-cursor" onClick={() => history.push('/lists/create')}>Create a List!</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
