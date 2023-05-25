import { useHistory } from "react-router-dom";
import "./ListForm.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkGetAllFilms } from "../../store/films";
import { useState } from "react";
import FilmList from "./FilmList";
import ListFilmTile from "../ListFilmTile";
import { thunkCreateList, thunkUpdateList } from "../../store/lists";
import { thunkGetUserById } from "../../store/session";

const ListForm = ({ list, formType }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const films = useSelector((state) => state.films.films);
  const user = useSelector(state => state.session.user)

  const [list_name, setListName] = useState(list.list_name);
  const [description, setDescription] = useState(list.description);
  const [is_private, setIsPrivate] = useState(list.is_private);
  const [add_films, setAddFilms] = useState(formType === 'create' ? list.add_films : list.films);
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const valErrors = {};

    if (list_name.length > 32 || list_name.length <= 3)
      valErrors.list_name = "List name must be between 4 and 32 characters";
    if (description.length > 1000)
      valErrors.description = "Description must be less than 1000 characters";
    if(add_films.length === 0)
      valErrors.add_films = "You must add atleast one film to the list"

    setErrors(valErrors);
  }, [list_name, description, add_films]);

  useEffect(() => {
    dispatch(thunkGetAllFilms());
  }, []);

  const addFilmsToList = (filmToAdd, closeMenu) => {
    // If the film already is in add_films, don't add it
    if (!add_films.find((film) => film.id === filmToAdd.id)) {
      setAddFilms((oldArr) => [...oldArr, filmToAdd]);
      closeMenu();
    }
  };

  const removeFilmsFromList = (filmId) => {
    // Filter all the films but the film with the id: filter(film => film.id !== +filmId)
    setAddFilms(add_films.filter((film) => film.id !== parseInt(filmId)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (Object.keys(errors).length < 1) {
      let filmIds = [];

      add_films.forEach((film) => {
        filmIds.push(film.id);
      });

      filmIds = filmIds.join(",");
      
      const formData = new FormData();
      formData.append("list_name", list_name);
      formData.append("is_private", is_private);
      formData.append("description", description);
      formData.append("add_film", filmIds);
      if (formType === "create") {
        const newList = await dispatch(thunkCreateList(formData));
        await dispatch(thunkGetUserById(user.id))
        history.push(`/lists/${newList.id}`);
      } else if (formType === "update") {
        const editedList = await dispatch(thunkUpdateList(formData, list.id));
        await dispatch(thunkGetUserById(user.id))
        history.push(`/lists/${editedList.id}`);
      }
    }
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
                <label><span>List name</span> <span className="errors">*{list_name.length > 0 && errors.list_name}</span></label>
                <input
                  type="text"
                  value={list_name}
                  onChange={(e) => setListName(e.target.value)}
                  id="list-input-box"
                  autoComplete="off"
                />
              </div>
              <div className="list-private-option-form">
                <label>Who can view</label>
                <select id="list-select-field" onChange={(e) => setIsPrivate(e.target.value)} value={is_private}>
                  <option value={false}>Anyone - Public list</option>
                  <option value={true}>Only you - Private list</option>
                </select>
              </div>
              <div className="list-film-search-bar">
                <label className="films-search-label"><span>Add a Film</span> <span className="errors">*{add_films.length === 0 && errors.add_films}</span></label>
                <input
                  id="films-page-search-bar"
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  placeholder="Enter name of film..."
                  autoComplete="off"
                />
                {search.length > 1 && (
                  <FilmList
                    films={searchedFilms}
                    addFilmsToList={addFilmsToList}
                  />
                )}
              </div>
              <div className="list-film-create-list-button">
                <button
                  disabled={Object.keys(errors).length > 0}
                  className={
                    Object.keys(errors).length > 0
                      ? "button-disabled"
                      : "button-enabled change-cursor"
                  }
                >
                  SAVE
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
                autoComplete="off"
              />
            </div>
          </div>
        </form>
        <div className="list-films-added">
          {add_films?.length > 0 &&
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
