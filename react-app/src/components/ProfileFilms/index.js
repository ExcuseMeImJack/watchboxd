import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import './ProfileFilms.css'
import { thunkGetAllFilms } from "../../store/films";

const ProfileFilms = () => {
    const user = useSelector(state => state.session.user)
    const history = useHistory();
    const [search, setSearch] = useState("");
    let searchedFilms;

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(thunkGetAllFilms())
    }, [dispatch])


      const orderFilms = () => {
        const watched = user.films_watched;
        const activity = [...watched]

        const uniqueFilms = [...new Map(activity.map((film) => [film.id, film])).values()];

        uniqueFilms.sort((a, b) => {

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
        return uniqueFilms
      }

      const userFilms = orderFilms();

      // eslint-disable-next-line
      searchedFilms = userFilms.filter((film) => {
        if(search === '') return film
        else if(film.title.toLowerCase().includes(search.toLowerCase()) || film.description.toLowerCase().includes(search.toLowerCase()) || film.director.toLowerCase().includes(search.toLowerCase()) || film.genre.toLowerCase().includes(search.toLowerCase())) return film
    })

    return (
        <div className="user-films-page-container">
            <div className="user-films-page">
                <div className="user-film-navbar">
                    <div className="user-profile-navbar-border">
                        <div className="user-profile-navbar-links">
                        <Link to="/profile">Profile</Link>
                        <Link to="/profile/films"><p
                            className="current-user-profile-section"
                            id="profile-selected"
                            >
                            Films
                            </p></Link>
                        <Link to="/profile/watchlist" id="watchlist-selector">Watchlist</Link>
                        <Link to="/profile/lists">Lists</Link>
                        <Link to="/profile/likes">Likes</Link>
                        </div>
                    </div>
                    <div className="films-navbar-grid">
                    <h1 id="films-page-title">WATCHED FILMS</h1>
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
                </div>
                <div className="user-films-all">
                    {searchedFilms.map(film =>
                    <div key={film.id} className="user-films-card change-cursor" onClick={() => history.push(`/films/${film.id}`)}>
                        <img id="user-films-card-img" src={film.tile_img_url} alt=""/>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default ProfileFilms
