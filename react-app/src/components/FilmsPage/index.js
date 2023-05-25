import React, {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkGetAllFilms } from "../../store/films";
import './FilmsPage.css'
const FilmsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [search, setSearch] = useState("");
    const films = useSelector(state => state.films.films) // Returns an array of all the films on the site
    let searchedFilms;

    useEffect(() => {
        dispatch(thunkGetAllFilms())
    }, [dispatch])

    if(!films) return null

    searchedFilms = films.filter((film) => {
        if(search === '') return film
        else if(film.title.toLowerCase().includes(search.toLowerCase()) || film.description.toLowerCase().includes(search.toLowerCase()) || film.director.toLowerCase().includes(search.toLowerCase()) || film.genre.toLowerCase().includes(search.toLowerCase())) return film
    })

    return (
        <div className="films-page-container">
            <div className="films-page">
                <div className="films-navbar-grid">
                    <h1 id="films-page-title">FILMS</h1>
                    <div className="films-page-search-bar-container">
                        <label className="films-search-label">FIND A FILM</label>
                        <input
                            id="films-page-search-bar"
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                    </div>
                </div>
                <div className="films-page-tiles-container">
                    {searchedFilms.map((film, index) =>
                            <div key={index} className="films-page-tile" onClick={() => history.push(`/films/${film.id}`)}>
                                <img src={film.tile_img_url} />
                                <div className="film-watches-likes-container">
                                    <div className="film-watches">
                                        <i className="fa-solid fa-eye"></i>
                                        <p>#</p>
                                    </div>
                                    <div className="film-likes">
                                        <i className="fa-solid fa-heart"></i>
                                        <p>#</p>
                                    </div>
                                </div>
                            </div>
                    )}
                </div>
            </div>


        </div>
    )
}

export default FilmsPage
