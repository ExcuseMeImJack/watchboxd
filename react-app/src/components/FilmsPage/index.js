import React, {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkGetAllFilms } from "../../store/films";
import {thunkGetAllUsers} from "../../store/session";
import './FilmsPage.css'
const FilmsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [search, setSearch] = useState("");
    const films = useSelector(state => state.films.films) // Returns an array of all the films on the site
    const users = useSelector(state => state.session.users)
    let searchedFilms;

    useEffect(() => {
        dispatch(thunkGetAllFilms())
        dispatch(thunkGetAllUsers())
    }, [dispatch])

    if(!films) return null
    if(!users) return null

    const orderFilms = () => {
      films.sort((a, b) => {
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
      return films;
    };

    const userFilms = orderFilms();

    // eslint-disable-next-line
    searchedFilms = userFilms.filter((film) => {
      if (search === "") return film;
      else if (
        film.title.toLowerCase().includes(search.toLowerCase()) ||
        film.description.toLowerCase().includes(search.toLowerCase()) ||
        film.director.toLowerCase().includes(search.toLowerCase()) ||
        film.genre.toLowerCase().includes(search.toLowerCase())
      )
        return film;
    });

    const calculateTotalWatches = (currFilm) => {
        let watches = 0;
        users?.forEach(user => {
            user.films_watched.forEach(film => {
                if(film.id === currFilm.id) watches++;
            })
        })
        return watches
    }

    const calculateTotalLikes = (currFilm) => {
        let likes = 0;
        users?.forEach(user => {
            user.likes.forEach(film => {
                if(film.id === currFilm.id) likes++;
            })
        })
        return likes
    }

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
                                        <p>{calculateTotalWatches(film)}</p>
                                    </div>
                                    <div className="film-likes">
                                        <i className="fa-solid fa-heart"></i>
                                        <p>{calculateTotalLikes(film)}</p>
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
