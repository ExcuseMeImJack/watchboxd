import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllFilms, thunkGetFilmById } from "../../store/films";
import { useParams } from "react-router-dom";
import './FilmDetails.css'

const FilmDetailsPage = () => {
    const {filmId} = useParams();
    const dispatch = useDispatch();
    const films = useSelector(state => state.films.films)
    console.log(films)
    const film = films?.find(film => {
        if(film.id === parseInt(filmId)){
            return film
        }
    })
    console.log(film)

    // const film = films.find(film => film.id === parseInt(filmId))

    useEffect(() => {
        dispatch(thunkGetAllFilms())
        // dispatch(thunkGetFilmById(filmId))
    }, [dispatch])

    if(!film) return null
    // console.log(film[1])
    return (
        <div className="film-details-page-container">
            <div className="film-details-page">
                <div className="film-background-image-container">
                    <img id="film-background-image" src={film.background_img_url}/>
                </div>
            </div>
        </div>
    )
}

export default FilmDetailsPage
