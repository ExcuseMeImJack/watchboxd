import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./UserProfile.css";

const UserProfilePage = () => {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  console.log(user);

  const handleEditProfile = () => {
    history.push("/profile/settings");
  };

  const calculateLikesAndWatches = () => {
    // We add together likes an watches bc if a person likes a film, they most likely watched it.
    const likes = user.likes.length;
    const watched = user.films_watched.length;
    return likes + watched;
  };

  const calculateLikesAndWatchesForYear = () => {
    const totalThisYear = [];
    user.likes.forEach((like) => {
      if (like.createdAt?.split(" ")[3] === new Date().getFullYear()) {
        totalThisYear.push({ [like.id]: like });
      }
    });
    user.films_watched.forEach((film_watched) => {
      if (film_watched.createdAt?.split(" ")[3] === new Date().getFullYear()) {
        totalThisYear.push({ [film_watched.id]: film_watched });
      }
    });

    return totalThisYear.length;
  };

  const orderFilms = () => {
    const likes = user.likes;
    const watched = user.films_watched;
    const activity = [...likes, ...watched]

    const uniqueFilms = [...new Map(activity.map((film) => [film.id, film])).values()];

    uniqueFilms.sort((a, b) => {

      const createdAtA = new Date(a.createdAt).getTime();
      const createdAtB = new Date(b.createdAt).getTime();

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

  return (
    <div className="user-profile-page-container">
      <div className="user-profile-page">
        <div className="user-profile-info">
          <div className="user-profile-user-img-container">
            <img id="user-profile-user-img" src={user.profile_img_url} />
          </div>
          <div className="user-profile-info-section-1">
            <div className="user-profile-edit-button-container">
              <h2>{user.username}</h2>
              <button id="user-profile-edit-button" onClick={handleEditProfile}>
                EDIT PROFILE
              </button>
            </div>
            {user.bio && <p>{user.bio}</p>}
          </div>
          <div className="user-profile-info-section-2">
            <div className="user-profile-data-lists">
              {calculateLikesAndWatches() == 1 ? (
                <div className="user-profile-films-watched-liked">
                  <h2>{calculateLikesAndWatches()}</h2>
                  <p>FILM</p>
                </div>
              ) : (
                <div className="user-profile-films-watched-liked">
                  <h2>{calculateLikesAndWatches()}</h2>
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
                <h2>{user.lists.length}</h2>
                <p>LISTS</p>
              </div>
            </div>
            <div className="user-profile-navbar">
              <div className="user-profile-navbar-border">
                <div className="user-profile-navbar-links">
                  <Link className="" to="/profile">
                    <p
                      className="current-user-profile-section"
                      id="profile-selected"
                    >
                      Profile
                    </p>
                  </Link>
                  <Link to="">Films</Link>
                  <Link to="">Watchlist</Link>
                  <Link to="">Lists</Link>
                  <Link to="">Likes</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="user-profile-content-container">
          <div className="user-profile-recent-activity-container">
            <p>RECENT ACTIVITY</p>
            <div className="user-profile-recent-activity-content">
                {userFilms.length > 0 ? userFilms.map(film =>
                  <Link key={film.title} className="user-profile-recent-films-card" to="">
                    <img id="user-profile-recent-films-card-img" src={film.tile_img_url} alt=""/>
                  </Link>
                ) : <p>Like or Watch some films!</p>}
            </div>
          </div>
          <div className="user-profile-lists-container">
            <div className="user-profile-watchlist-container">
              <p>WATCHLIST</p>
              <div className="user-profile-watchlist-content">
                  <Link to="">
                    <div className="watchlist-image-stack list-img-small">
                      <div className="watchlist-image-1">
                        <img id="watchlist-image-1-img" src={user.films_to_watch[0] ? user.films_to_watch[0].tile_img_url : "https://i.imgur.com/Ip9t5Pw.png"} alt=""/>
                      </div>
                      <div className="watchlist-image-2">
                        <img id="watchlist-image-2-img" src={user.films_to_watch[1] ? user.films_to_watch[1].tile_img_url : "https://i.imgur.com/Ip9t5Pw.png"} alt=""/>
                      </div>
                      <div className="watchlist-image-3">
                        <img id="watchlist-image-3-img" src={user.films_to_watch[2] ? user.films_to_watch[2].tile_img_url : "https://i.imgur.com/Ip9t5Pw.png"} alt=""/>
                      </div>
                      <div className="watchlist-image-4">
                        <img id="watchlist-image-4-img" src={user.films_to_watch[3] ? user.films_to_watch[3].tile_img_url : "https://i.imgur.com/Ip9t5Pw.png"} alt=""/>
                      </div>
                    </div>
                  </Link>
              </div>
            </div>
            <div className="user-profile-watchlist-container">
              <p>LISTS</p>
              <div className="user-profile-watchlist-content">
                {user.lists && user.lists.map(list =>
                <div>
                  <Link to="">
                  <div className="watchlist-image-stack list-img-small">
                    <div className="watchlist-image-1">
                      <img id="watchlist-image-1-img list-img-small" src={list.films[0] ? list.films[0].tile_img_url : "https://i.imgur.com/Ip9t5Pw.png"} alt=""/>
                    </div>
                    <div className="watchlist-image-2">
                      <img id="watchlist-image-2-img list-img-small" src={list.films[1] ? list.films[1].tile_img_url : "https://i.imgur.com/Ip9t5Pw.png"} alt=""/>
                    </div>
                    <div className="watchlist-image-3">
                      <img id="watchlist-image-3-img list-img-small" src={list.films[2] ? list.films[2].tile_img_url : "https://i.imgur.com/Ip9t5Pw.png"} alt=""/>
                    </div>
                    <div className="watchlist-image-4">
                      <img id="watchlist-image-4-img list-img-small" src={list.films[3] ? list.films[3].tile_img_url : "https://i.imgur.com/Ip9t5Pw.png"} alt=""/>
                    </div>
                  </div>
                </Link>
                <h4 id="user-profile-list-name">{list.list_name}</h4>

                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
