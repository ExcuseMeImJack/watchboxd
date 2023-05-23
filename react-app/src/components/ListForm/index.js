import { useHistory } from "react-router-dom";
import "./ListForm.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkGetAllFilms } from "../../store/films";
import { useState } from "react";
import FilmList from "./FilmList";
import ListFilmTile from "../ListFilmTile";

const ListForm = ({ list, formType }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const films = useSelector((state) => state.films.films);

  const [list_name, setListName] = useState(list.list_name);
  const [description, setDescription] = useState(list.description);
  const [is_private, setIsPrivate] = useState(list.is_private);
  const [add_films, setAddFilms] = useState(list.add_films);
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(thunkGetAllFilms());
  }, []);

  const addFilmsToList = (filmToAdd) => {
    // If the film already is in add_films, don't add it
    if (!add_films.find((film) => film.id === filmToAdd.id)) {
      setAddFilms((oldArr) => [...oldArr, filmToAdd]);
    }
  };

  const removeFilmsFromList = (filmId) => {
    // Filter all the films but the film with the id: filter(film => film.id !== +filmId)
    setAddFilms(add_films.filter((film) => film.id !== parseInt(filmId)));
  };

  const handleSubmit = (e) => {
    e.preventdefault();
    // Turn the add_films array into a string separated by commas
    // Dispatch(CreateList())
    console.log("Submitted")
  };

  if (!films) return null;

  const searchedFilms = films.filter((film) => {
    if (search === "") return null;
    else if (film.title.toLowerCase().includes(search.toLowerCase()))
      return film;
  });

  return (
    <div className="list-form-page-container">
      <div className="list-form-page">
        <div className="list-form-header">
          {formType === "create" ? <h1>New List</h1> : <h1>Edit List</h1>}
        </div>
        <form onSubmit={handleSubmit}>
            <div className="list-form-grid">
            <div className="list-form-left">
                <div className="list-name-form">
                <label>Name *</label>
                <input
                    type="text"
                    value={list_name}
                    onChange={(e) => setListName(e.target.value)}
                    id="list-input-box"
                />
                </div>
                <div className="list-private-option-form">
                <label>Who can view</label>
                <select id="list-select-field">
                    <option value="false">Anyone - Public list</option>
                    <option value="true">Only you - Private list</option>
                </select>
                </div>
                <div className="list-film-search-bar">
                <label className="films-search-label">ADD A FILM</label>
                <input
                    id="films-page-search-bar"
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    placeholder="Enter name of film..."
                    autoComplete="off"
                />
                {search.length > 0 && (
                    <FilmList
                    films={searchedFilms}
                    addFilmsToList={addFilmsToList}
                    />
                )}
                </div>
                <div className="list-film-create-list-button">
                <button
                    className={
                    Object.keys(errors).length > 0
                        ? "button-disabled"
                        : "button-enabled change-cursor"
                    }
                >
                    CREATE
                </button>
                </div>
            </div>
            <div className="list-form-right">
                <label>Description</label>
                <textarea
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="list-textarea-box"
                />
            </div>
            </div>
        </form>
        <div className="list-films-added">
          {add_films.length > 0 &&
            add_films.map((film) => (
              <div className="film-confirmation-tile">
                <ListFilmTile
                  film={film}
                  removeFilmsFromList={removeFilmsFromList}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default ListForm;
