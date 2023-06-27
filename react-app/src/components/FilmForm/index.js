import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  thunkCreateFilm,
  thunkGetAllFilms,
  thunkUpdateFilm,
} from "../../store/films";
import { useState } from "react";

import "./FilmForm.css";

const FilmForm = ({ film, formType }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const films = useSelector((state) => state.films.films);

  const [title, setTitle] = useState(film.title);
  const [year, setYear] = useState(film.year);
  const [genre, setGenre] = useState(film.genre);
  const [director, setDirector] = useState(film.director);
  const [description, setDescription] = useState(film.description);
  const [backgroundImage, setBackgroundImage] = useState(
    film.background_img_url
  );
  const [trailerUrl, setTrailerUrl] = useState(film.trailer_url);
  const [tileImage, setTileImage] = useState(film.tile_img_url);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [backgroundImagePreview, setBackgroundImagePreview] = useState(
    film.background_img_url ? film.background_img_url : ""
  );
  const [tileImagePreview, setTileImagePreview] = useState(
    film.tile_img_url ? film.tile_img_url : ""
  );
  const [trailerPreview, setTrailerPreview] = useState(film.trailer_url ? film.trailer_url : "")

  useEffect(() => {
    const valErrors = {};

    if (title.length >= 100 || title.length < 4)
      valErrors.title = "Film title must be between 4 and 100 characters";

    if (formType === "create") {
      films?.forEach((film) =>
        film.title.toLowerCase().replace(/[^a-z0-9]/gi, "") ===
        title.toLowerCase().replace(/[^a-z0-9]/gi, "")
          ? (valErrors.title = "Film already exists")
          : null
      );
    }

    if (parseInt(year) < 1800 || parseInt(year) > new Date().getFullYear() + 2)
      valErrors.year = `Year must be between 1800 and ${
        new Date().getFullYear() + 2
      }`;

    if (isNaN(parseInt(year))) valErrors.year = "Year must be a number value";

    if (year.length > 1 && year.length < 4)
      valErrors.year = "Year must have 4 characters";

    if (director.length < 2)
      valErrors.director = "Atleast 1 director must be entered";

    if (director.length > 100)
      valErrors.director = "Director list must be lower than 100 characters";

    if (genre.length < 2) valErrors.genre = "Atleast 1 Genre must be entered";

    if (genre.length > 100)
      valErrors.genre = "Genre List must be lower than 100 characters";

    if (description.length > 620)
      valErrors.description = "Description must be lower than 620 characters";

    if (description.length < 10)
      valErrors.description = "Description must be more than 10 characters";

    if (trailerUrl.length < 1)
      valErrors.trailerUrl = "A Trailer URL must be entered";

    if (!(trailerUrl.includes("youtube") || trailerUrl.includes("youtu.be")))
      valErrors.trailerUrl = "Trailer URL must be a YouTube link";

    const validUrlFileTypes = ["png", "jpg", "jpeg"];
    if (backgroundImage) {
      let urlArray;
      if (
        backgroundImage.name &&
        !backgroundImage.name.includes("watchboxd-images-aa")
      ) {
        urlArray = backgroundImage.name.split(".");
      } else {
        urlArray = backgroundImage.split(".");
      }

      const urlSuffix = urlArray[urlArray.length - 1];
      if (!validUrlFileTypes.includes(urlSuffix))
        valErrors.backgroundImage =
          "Image URL must end in .png, .jpg, or .jpeg";
    } else {
      valErrors.backgroundImage = "Background Image is required";
    }

    if (tileImage) {
      let urlArray;
      if (tileImage.name && !tileImage.name.includes("watchboxd-images-aa")) {
        urlArray = tileImage.name.split(".");
      } else {
        urlArray = tileImage.split(".");
      }
      const urlSuffix = urlArray[urlArray.length - 1];
      if (!validUrlFileTypes.includes(urlSuffix))
        valErrors.tileImage = "Image URL must end in .png, .jpg, or .jpeg";
    } else {
      valErrors.tileImage = "Tile Image is required";
    }

    setErrors(valErrors);
  }, [
    title,
    year,
    description,
    backgroundImage,
    trailerUrl,
    tileImage,
    genre,
    director,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (Object.keys(errors).length < 1) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("year", year);
      formData.append("description", description);
      formData.append("trailer_url", trailerUrl);
      formData.append("director", director);
      formData.append("genre", genre);
      formData.append("background_img_url", backgroundImage);
      formData.append("tile_img_url", tileImage);

      if (formType === "create") {
        const newFilm = await dispatch(thunkCreateFilm(formData));
        setImageLoading(false);
        history.push(`/films/${newFilm.id}`);
      } else if (formType === "update") {
        const editedFilm = await dispatch(thunkUpdateFilm(formData, film.id));
        setImageLoading(false);
        history.push(`/films/${editedFilm.id}`);
      }
    }
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

  return (
    <div className="create-film-page-container">
      <div className="create-film-page">
        {formType === "create" ? (
          <h1>Create a New Film</h1>
        ) : (
          <h1>Update {film.title}</h1>
        )}

        <div>
          {title && errors.title && <p className="errors">{errors.title}</p>}
          {year && errors.year && <p className="errors">{errors.year}</p>}
          {genre && errors.genre && <p className="errors">{errors.genre}</p>}
          {director && errors.director && (
            <p className="errors">{errors.director}</p>
          )}
          {description && errors.description && (
            <p className="errors">{errors.description}</p>
          )}
          {backgroundImage && errors.backgroundImage && (
            <p className="errors">{errors.backgroundImage}</p>
          )}
          {trailerUrl && errors.trailerUrl && (
            <p className="errors">{errors.trailerUrl}</p>
          )}
          {tileImage && errors.tileImage && (
            <p className="errors">{errors.tileImage}</p>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="create-film-form">
            <div className="left-create-film-form">
              <div className="film-form-title-year">
                <div className="film-form-title">
                  <label>Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="film-form-year">
                  <label>Year</label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="film-form-genre-director">
                <div className="film-form-genre">
                  <label>Genre</label>
                  <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                  />
                </div>
                <div className="film-form-director">
                  <label>Director(s)</label>
                  <input
                    type="text"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="film-form-description">
                <label>Description</label>
                <textarea
                  type="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="film-form-background-image">
                <label className="file-form-background-image-button">
                  Upload a Film Background Image
                  <div className="file-input-div">
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setBackgroundImage(e.target.files[0]);
                        setBackgroundImagePreview(
                          URL.createObjectURL(e.target.files[0])
                        );
                      }}
                    />
                    {backgroundImage ? (
                      <i className="fa-solid fa-check"></i>
                    ) : (
                      <i className="fa-solid fa-x"></i>
                    )}
                  </div>

                </label>
                {backgroundImagePreview && (
                    <img
                      id="background-image-preview"
                      src={backgroundImagePreview}
                    />
                  )}
              </div>
            </div>
            <div className="right-create-film-form">
              <div className="film-form-trailer">
                <label>YouTube Trailer Link URL</label>
                <input
                  type="text"
                  value={trailerUrl}
                  onChange={(e) => setTrailerUrl(e.target.value)}
                  required
                />
                {trailerPreview && (
                   <iframe
                   className="trailer-film-preview"
                   height="550px"
                   src={`https://www.youtube.com/embed/${getTrailerId()}`}
                   frameBorder="0"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                   allowFullScreen
                   title="Embedded youtube"
                 />
                )}
              </div>
              <div className="film-form-tile-image file-input-div">
                <label className="file-form-tile-image-button" >
                  Upload a Film Cover Image
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setTileImage(e.target.files[0]);
                        setTileImagePreview(
                          URL.createObjectURL(e.target.files[0])
                        );
                      }}
                    />
                    {tileImage ? (
                      <i className="fa-solid fa-check"></i>
                    ) : (
                      <i className="fa-solid fa-x"></i>
                    )}
                </label>
                {tileImagePreview && (
                      <img id="tile-image-preview" src={tileImagePreview} />
                      )}
              </div>
              {imageLoading && null}
              <div className="film-form-submit">
                {formType === "create" ? (
                  <button
                    className={
                      Object.keys(errors).length > 0
                        ? "button-disabled"
                        : "button-enabled change-cursor"
                    }
                    disabled={Object.keys(errors).length > 0}
                  >
                    Submit Film
                  </button>
                ) : (
                  <button
                    className={
                      Object.keys(errors).length > 0
                        ? "button-disabled"
                        : "button-enabled change-cursor"
                    }
                    disabled={Object.keys(errors).length > 0}
                  >
                    Update Film
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilmForm;
