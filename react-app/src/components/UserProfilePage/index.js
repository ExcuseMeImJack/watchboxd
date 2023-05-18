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
    // let uniqueFilms = {}
    // const userFilms = []

    // activity.forEach(film => {
    //   console.log(film)
    //   uniqueFilms[film.title] = film;
    // })

    // for(let key in uniqueFilms){
    //   userFilms.push({[key]: uniqueFilms[key]})
    // }

    activity.sort((a, b) => {

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

    // console.log(userFilms)

    // userFilms.forEach(film => {
    //   console.log(film)
    // })

    return activity
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
            {user.bio ? <p>{user.bio}</p> : null}
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
                  <Link className="">
                    <p
                      className="current-user-profile-section"
                      id="profile-selected"
                    >
                      Profile
                    </p>
                  </Link>
                  <Link>Films</Link>
                  <Link>Watchlist</Link>
                  <Link>Lists</Link>
                  <Link>Likes</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="user-profile-content-container">
          <div className="user-profile-recent-activity-container">
            <p>RECENT ACTIVITY</p>
                {userFilms.length > 0 ? userFilms.map(film =>
                  <div>
                    <p>{film.title}</p>
                  </div>
                ) : null}
          </div>
          <div className="user-profile-lists-container">

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
