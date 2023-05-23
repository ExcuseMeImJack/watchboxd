import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllFilms, thunkGetFilmById } from "../../store/films";
import { useHistory, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import "./FilmDetails.css";
import DeleteFilmModal from "../DeleteFilmModal";
import { useState } from "react";

const FilmDetailsPage = () => {
  const { filmId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const films = useSelector((state) => state.films.films);
  const user = useSelector((state) => state.session.user);
  const film = films?.find((film) => {
    if (film.id === parseInt(filmId)) {
      return film;
    }
  });

  useEffect(() => {
    dispatch(thunkGetAllFilms());
  }, [dispatch]);

  if (!film) return null;

  const getTrailerId = () => {
    const url = film.trailer_url;
    let id;
    if (url.includes("youtube.com")) { // https://www.youtube.com/watch?v=WRrCVyT09ow
      id = url.split("=")[1];
    } else if (url.includes("youtu.be")) { // https://www.youtu.be/WRrCVyT09ow
      id = url.split("/")[3];
    }
    return id;
  };

  return (
    <div className="film-details-page-container">
      <div className="film-details-page">
        <div className="background-img-container">
          <div className="film-background-image-container faded faded-all">
            <img id="film-background-image" src={film.background_img_url} />
          </div>
        </div>
        <div className="film-details-grid">
          <div className="film-tile-card">
            <img id="film-details-tile-image" src={film.tile_img_url} />
            <div className="film-watches-likes-container">
              <div className="film-watches">
                <i class="fa-solid fa-eye"></i>
                <p>#</p>
              </div>
              <div className="film-likes">
                <i class="fa-solid fa-heart"></i>
                <p>#</p>
              </div>
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
        <div className="film-details-grid-new">
          <div className="film-details">
            <h1 id="film-title-detail">{film.title}</h1>
            <div className="secondary-film-details-heading">
              <h3>{film.year}</h3>
              <h3>Directed by {film.director}</h3>
            </div>
            <p id="film-description-detail">{film.description}</p>
          </div>
          {user && (
            <div className="film-interactions-panel">
              <div className="film-interactions">
                <div>
                  <i
                    className={
                      user.films_watched.find(
                        (currFilm) => currFilm.id === film.id
                      )
                        ? "fa-solid fa-eye change-cursor"
                        : "fa-regular fa-eye change-cursor"
                    }
                  ></i>
                  <p>
                    {user.films_watched.find(
                      (currFilm) => currFilm.id === film.id
                    )
                      ? "Watched"
                      : "Watch"}
                  </p>
                </div>
                <div>
                  <i
                    className={
                      user.likes.find((currFilm) => currFilm.id === film.id)
                        ? "fa-solid fa-heart change-cursor"
                        : "fa-regular fa-heart change-cursor"
                    }
                  ></i>
                  <p>
                    {user.likes.find((currFilm) => currFilm.id === film.id)
                      ? "Liked"
                      : "Like"}
                  </p>
                </div>
                <div>
                  <i className="fa-solid fa-clock change-cursor"></i>
                  <p>Watchlist</p>
                </div>
              </div>

              <div className="film-add-to-lists">
                <OpenModalButton
                  buttonText={"Add to lists..."}
                  buttonStyleClass={
                    "add-to-list-button-film-details change-cursor"
                  }
                />
              </div>

              {user.id === film.user_id &&
              <div className="control-buttons">
                <button className="update-film-button change-cursor" onClick={() => history.push(`/films/${film.id}/edit`)}>UPDATE FILM</button>
                <OpenModalButton
                buttonStyleClass={"delete-profile change-cursor"}
                buttonText={"DELETE FILM"}
                modalComponent={<DeleteFilmModal film={film}/>}
                modalStyleClass={"delete-profile-modal-content"}
            />
              </div>}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilmDetailsPage;
