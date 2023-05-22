import { useParams } from "react-router-dom";
import FilmForm from "../FilmForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkGetAllFilms } from "../../store/films";
// import { useEffect } from "react";
// import { thunkGetAllFilms } from "../../store/films";

const FilmUpdate = () => {
    const {filmId} = useParams();
    const dispatch = useDispatch();
    const films = useSelector(state => state.films.films);

    useEffect(() => {
        dispatch(thunkGetAllFilms())
    }, [dispatch])

    if(!films) return null
    
    const film = films.find(film => film.id === parseInt(filmId));

    return (
        <FilmForm
            film={film}
            formType={'update'}/>
    )
}

export default FilmUpdate
