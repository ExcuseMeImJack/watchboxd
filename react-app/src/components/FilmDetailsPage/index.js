import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  thunkAddToWatchlist,
  thunkGetAllFilms,
  thunkGetFilmById,
  thunkLikeFilm,
  thunkRemoveFromWatchlist,
  thunkUnlikeFilm,
  thunkUnwatchFilm,
  thunkWatchFilm,
} from "../../store/films";
import { useHistory, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import "./FilmDetails.css";
import DeleteFilmModal from "../DeleteFilmModal";
import { useState } from "react";
import {
  thunkGetAllUsers,
  thunkGetUserById,
  thunkUpdateUserInfo,
} from "../../store/session";
import Loading from "../Loading";
import {
  thunkGetAllFilmReviews,
  thunkGetAllUserReviews,
  thunkGetReviewById,
} from "../../store/reviews";
import ReactStars from "react-stars";
import ReviewsHistogram from "../ReviewsHistogram";
import ReviewUpdate from "../Reviews/ReviewUpdate";
import ReviewCreate from "../Reviews/ReviewCreate";
import ReviewTile from "../Reviews/ReviewTile";

const FilmDetailsPage = () => {
  const { filmId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.session.users);
  const film = useSelector((state) => state.films.film);
  const filmReviews = useSelector((state) => state.reviews.reviews);

  const isLiked = () =>
    user?.likes.find((currFilm) => currFilm.id === film?.id) ? true : false;
  const isWatched = () =>
    user?.films_watched.find((currFilm) => currFilm.id === film?.id)
      ? true
      : false;
  const isOnWatchlist = () =>
    user?.films_to_watch.find((currFilm) => currFilm.id === film?.id)
      ? true
      : false;
  const [likedFilm, setLikedFilm] = useState(isLiked());
  const [watchedFilm, setWatchedFilm] = useState(isWatched());
  const [addToWatchlist, setAddToWatchlist] = useState(isOnWatchlist());

  useEffect(() => {
    dispatch(thunkGetAllFilmReviews(filmId));
    const renderOrder = async () => {
      await dispatch(thunkGetAllUsers());
      await dispatch(thunkGetFilmById(filmId));
    };
    renderOrder();
  }, [dispatch, likedFilm, watchedFilm, addToWatchlist]);

  if (!film) return <Loading />;
  if(!filmReviews || !users) return <Loading/>

  if (film.id === filmId) return <Loading />;

  const handleLike = async () => {
    await dispatch(thunkLikeFilm(filmId));
    await dispatch(thunkUpdateUserInfo(user.id));
    await dispatch(thunkGetFilmById(filmId));
    dispatch(thunkGetAllFilmReviews(filmId));
    setLikedFilm(true);
    setWatchedFilm(true);
  };

  const handleUnlike = async () => {
    await dispatch(thunkUnlikeFilm(filmId));
    await dispatch(thunkUpdateUserInfo(user.id));
    await dispatch(thunkGetFilmById(filmId));
    dispatch(thunkGetAllFilmReviews(filmId));
    setLikedFilm(false);
  };

  const handleWatched = async () => {
    await dispatch(thunkWatchFilm(filmId));
    await dispatch(thunkUpdateUserInfo(user.id));
    await dispatch(thunkGetFilmById(filmId));
    dispatch(thunkGetAllFilmReviews(filmId));
    setWatchedFilm(true);
  };

  const handleUnwatched = async () => {
    await dispatch(thunkUnwatchFilm(filmId));
    await dispatch(thunkUpdateUserInfo(user.id));
    await dispatch(thunkGetFilmById(filmId));
    dispatch(thunkGetAllFilmReviews(filmId));
    setWatchedFilm(false);
  };

  const handleAddToWatchlist = async () => {
    await dispatch(thunkAddToWatchlist(filmId));
    await dispatch(thunkUpdateUserInfo(user.id));
    await dispatch(thunkGetFilmById(filmId));
    dispatch(thunkGetAllFilmReviews(filmId));
    setAddToWatchlist(true);
  };

  const handleRemoveFromWatchlist = async () => {
    await dispatch(thunkRemoveFromWatchlist(filmId));
    await dispatch(thunkUpdateUserInfo(user.id));
    await dispatch(thunkGetFilmById(filmId));
    dispatch(thunkGetAllFilmReviews(filmId));
    setAddToWatchlist(false);
  };

  const getTrailerId = () => {
    const url = film.trailer_url;
    let id;
    if (url.includes("youtube.com")) {
      // https://www.youtube.com/watch?v=WRrCVyT09ow
      id = url.split("=")[1];
    } else if (url.includes("youtu.be")) {
      // https://www.youtu.be/WRrCVyT09ow
      id = url.split("/")[3];
    }
    return id;
  };

  const ratingCounter = () => {
    const ratingCounterArr = [
      { 0.5: 0 },
      { 1: 0 },
      { 1.5: 0 },
      { 2: 0 },
      { 2.5: 0 },
      { 3: 0 },
      { 3.5: 0 },
      { 4: 0 },
      { 4.5: 0 },
      { 5: 0 },
    ];
    film.ratings.forEach((rate) => {
      if (rate === 0.5) ratingCounterArr[0]["0.5"]++;
      if (rate === 1) ratingCounterArr[1][1]++;
      if (rate === 1.5) ratingCounterArr[2]["1.5"]++;
      if (rate === 2) ratingCounterArr[3][2]++;
      if (rate === 2.5) ratingCounterArr[4]["2.5"]++;
      if (rate === 3) ratingCounterArr[5][3]++;
      if (rate === 3.5) ratingCounterArr[6]["3.5"]++;
      if (rate === 4) ratingCounterArr[7][4]++;
      if (rate === 4.5) ratingCounterArr[8]["4.5"]++;
      if (rate === 5) ratingCounterArr[9][5]++;
    });
    return ratingCounterArr;
  };



  const findReview = () => {
    const reviewsFound = filmReviews.filter((review) => review.user_id === user.id);
    if (reviewsFound.length > 0) {
      return reviewsFound[0];
    }
    return false;
  };

  const orderReviews = () => {
    filmReviews.sort((a, b) => {
      const createdAtA = new Date(a.created_at).getTime();
      const createdAtB = new Date(b.created_at).getTime();

      if (createdAtA > createdAtB) {
        return -1;
      }
      if (createdAtA < createdAtB) {
        return 1;
      }
      return 0;
    });
    return filmReviews;
  };

  const findReviewUser = (review) => {
    return users.find(user => user.id === review.user_id)
  }

  return (
    <div className="film-details-page-container">
      <div className="film-details-page">
        <div className="background-img-container">
          <div className="film-background-image-container faded faded-all">
            <img id="film-background-image" src={film.background_img_url} />
          </div>
        </div>
        <div className="film-details-details">
          <div className="film-details-grid-small">
            {!user ? (
              <div className="film-tile-card-small">
                <img
                  id="film-details-tile-image-small"
                  src={film.tile_img_url}
                />
                <div className="film-watches-likes-grid">
                  <div className="film-watches">
                    <i className="fa-solid fa-eye"></i>
                    <p>{film.watches}</p>
                  </div>
                  <div className="film-likes">
                    <i className="fa-solid fa-heart"></i>
                    <p>{film.likes}</p>
                  </div>
                  <div className="film-reviews">
                    <i className="fa-solid fa-message"></i>
                    <p>{film.reviews}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="film-tile-card">
                <img id="film-details-tile-image" src={film.tile_img_url} />
                <div className="film-watches-likes-grid">
                  <div className="film-watches">
                    <i className="fa-solid fa-eye"></i>
                    <p>{film.watches}</p>
                  </div>
                  <div className="film-likes">
                    <i className="fa-solid fa-heart"></i>
                    <p>{film.likes}</p>
                  </div>
                  <div className="film-reviews">
                    <i className="fa-solid fa-message"></i>
                    <p>{film.reviews}</p>
                  </div>
                </div>
              </div>
            )}
            <div className="film-details-grid-new">
              <div className="film-details">
                <div className="film-title">
                  <h1 id="film-title-detail">{film.title}</h1>
                </div>
                <div className="film-info-year-director">
                  <h3>{film.year}</h3>
                  <h3>Directed by {film.director}</h3>
                </div>
              </div>
              <div className="film-description-interactions">
                <p id="film-description-detail">{film.description}</p>
                {user && (
                  <div className="film-interactions-panel">
                    <div className="film-interactions">
                      <div>
                        {user.films_watched.find(
                          (currFilm) => currFilm.id === film.id
                        ) ? (
                          <i
                            className="fa-solid fa-eye change-cursor"
                            onClick={handleUnwatched}
                          />
                        ) : (
                          <i
                            className="fa-regular fa-eye change-cursor"
                            onClick={handleWatched}
                          />
                        )}
                        <p>
                          {user.films_watched.find(
                            (currFilm) => currFilm.id === film.id
                          )
                            ? "Watched"
                            : "Watch"}
                        </p>
                      </div>
                      <div>
                        {user.likes.find(
                          (currFilm) => currFilm.id === film.id
                        ) ? (
                          <i
                            className="fa-solid fa-heart change-cursor"
                            onClick={handleUnlike}
                          />
                        ) : (
                          <i
                            className="fa-regular fa-heart change-cursor"
                            title="Liking a film will also say that you Watched the film"
                            onClick={handleLike}
                          />
                        )}
                        <p>
                          {user.likes.find(
                            (currFilm) => currFilm.id === film.id
                          )
                            ? "Liked"
                            : "Like"}
                        </p>
                      </div>
                      <div>
                        {user.films_to_watch.find(
                          (currFilm) => currFilm.id === film.id
                        ) ? (
                          <i
                            className="fa-solid fa-clock change-cursor"
                            onClick={handleRemoveFromWatchlist}
                          />
                        ) : (
                          <i
                            className="fa-regular fa-clock change-cursor"
                            onClick={handleAddToWatchlist}
                          />
                        )}
                        <p>Watchlist</p>
                      </div>
                    </div>

                    {user.id === film.user_id && (
                      <div className="control-buttons">
                        <button
                          className="update-film-button change-cursor"
                          onClick={() => history.push(`/films/${film.id}/edit`)}
                        >
                          UPDATE FILM
                        </button>
                        <OpenModalButton
                          buttonStyleClass={"delete-profile change-cursor"}
                          buttonText={"DELETE FILM"}
                          modalComponent={<DeleteFilmModal film={film} />}
                          modalStyleClass={"delete-profile-modal-content"}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="border-divider"></div>
          <div className="film-trailer-review-details">
            <div className="film-review-details-panel">
              <div className="film-reviews-details-title">
                <h4>RATINGS</h4>
                <p>{film.reviews} FANS</p>
              </div>
              <div className="film-reviews-ratings">
                <ReactStars
                  className="fake-star"
                  count={1}
                  edit={false}
                  value={1}
                  size={18}
                  color2={"#23ce31"}
                />
                <div className="review-histogram">
                  <ReviewsHistogram reviewCounter={ratingCounter()} />
                </div>
                <div className="review-total-star-rating">
                  <h2 className={film.rating === "No Reviews" ? 'review-total-size' : ''}>
                    {film.rating % 1 === 0 ? film.rating + ".0" : film.rating}
                  </h2>
                  <ReactStars
                    id="real-star-rating"
                    count={5}
                    edit={false}
                    value={film.rating}
                    size={18}
                    color2={"#23ce31"}
                  />
                </div>
              </div>
              <div className="film-review-create-form" id="review-form-content">
                {!user ? (
                  <button className="create-a-list-button change-cursor" onClick={() => history.push('/')}>
                    Sign in to make a review
                  </button>
                ) : findReview() ? (
                  <ReviewUpdate review={findReview()} film={film}/>
                ) : (
                  <ReviewCreate film={film}/>
                )}
              </div>
            </div>
            <div className="film-trailer-player-container">
              <iframe
                className="trailer-film-player"
                height="550px"
                src={`https://www.youtube.com/embed/${getTrailerId()}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
            </div>
          </div>
          <div className="border-divider-reviews">
          </div>
        <div>
          {orderReviews().map(review =>
            <ReviewTile key={review.id} review={review} reviewUser={findReviewUser(review)}/>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default FilmDetailsPage;
