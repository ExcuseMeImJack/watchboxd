const GET_ALL_FILMS = "films/GET_FILMS"
const GET_ONE_FILM = "films/GET_FILM"
const CREATE_FILM = "films/CREATE_FILM"
const UPDATE_FILM = "films/UPDATE_FILM"
const DELETE_FILM = "films/DELETE_FILM"
const LIKE_FILM = "films/LIKE_FILM"
const WATCH_FILM = "films/WATCH_FILM"

const actionGetAllFilms = (films) => ({
    type: GET_ALL_FILMS,
    payload: films
});

const actionGetOneFilm = (film) => ({
    type: GET_ONE_FILM,
    payload: film
});

const actionCreateFilm = (newFilm) => ({
    type: CREATE_FILM,
    payload: newFilm
});

const actionDeleteFilm = (film) => ({
    type: DELETE_FILM,
    payload: film
});

const actionLikeFilm = (data) => ({
    type: LIKE_FILM,
    payload: data
})

const actionWatchFilm = (data) => ({
    type: WATCH_FILM,
    payload: data
})


export const thunkGetAllFilms = () => async(dispatch) => {
    const res = await fetch('/api/films');
    if(res.ok) {
        const films = await res.json();
        dispatch(actionGetAllFilms(films));
        return films;
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkGetFilmById = (filmId) => async(dispatch) => {
    const res = await fetch(`/api/films/${filmId}`);
    if(res.ok) {
        const film = await res.json();
        dispatch(actionGetOneFilm(film));
        return film;
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const thunkCreateFilm = (film) => async(dispatch) => {
    const res = await fetch('/api/films', {
        method: "POST",
        body: film
    })

    if(res.ok) {
        const newFilm = await res.json();
        if(newFilm.errors) return newFilm.errors
        dispatch(actionCreateFilm(newFilm))
        return newFilm;
    } else {
        const errors = await res.json()
        return errors
    }
}

export const thunkUpdateFilm = (film, filmId) => async(dispatch) => {
    const res = await fetch(`/api/films/${filmId}`, {
        method: "PUT",
        body: film
    })
    if(res.ok) {
        const updatedFilm = await res.json();
        // dispatch(actionUpdateFilm(updatedFilm))
        return updatedFilm;
    }
}

export const thunkDeleteFilm = (film) => async(dispatch) => {
    const res = await fetch(`/api/films/${film.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    if(res.ok) {
        const data = await res.json();
        if(data.errors) {
            return data.errors;
        }
        dispatch(actionDeleteFilm(film))
    }
}

export const thunkLikeFilm = (filmId) => async (dispatch) => {
    const res = await fetch(`/api/likes/${filmId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({filmId})
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(actionLikeFilm(data))
        dispatch(actionWatchFilm(data))
        return res
    } else {
        return {'message': 'Error liking a film'}
    }
}

export const thunkUnlikeFilm = (filmId) => async (dispatch) => {
    const res = await fetch(`/api/likes/${filmId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({filmId})
    })

    if(res.ok) {
        await res.json()
        return res
    } else {
        return {'message': 'Error liking a film'}
    }
}

export const thunkWatchFilm = (filmId) => async (dispatch) => {
    const res = await fetch(`/api/watch/${filmId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({filmId})
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(actionWatchFilm(data))
        return res
    } else {
        return {'message': 'Error watching a film'}
    }
}

export const thunkUnwatchFilm = (filmId) => async (dispatch) => {
    const res = await fetch(`/api/watch/${filmId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({filmId})
    })

    if(res.ok) {
        await res.json()
        return res
    } else {
        return {'message': 'Error unwatching a film'}
    }
}

export const thunkAddToWatchlist = (filmId) => async (dispatch) => {
    const res = await fetch(`/api/watchlist/${filmId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({filmId})
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(actionWatchFilm(data))
        return res
    } else {
        return {'message': 'Error adding a film to the watchlist'}
    }
}

export const thunkRemoveFromWatchlist = (filmId) => async (dispatch) => {
    const res = await fetch(`/api/watchlist/${filmId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({filmId})
    })

    if(res.ok) {
        await res.json()
        return res
    } else {
        return {'message': 'Error removing a film from the watchlist'}
    }
}

const initialState = { films: null }

export default function reducer(state = initialState, action) {
    switch(action.type){
        case GET_ALL_FILMS: {
            const newState = {films: action.payload.films}
            return newState
        }
        case GET_ONE_FILM: {
            const newState = {film: action.payload}
            return newState
        }
        case CREATE_FILM: {
            const newState = {...state, films: action.payload.newFilm}
            return newState
        }
        case UPDATE_FILM: {
            const newState = {...state, films: action.payload.updatedFilm}
            return newState
        }
        case DELETE_FILM: {
            const newState = {...state}
            delete newState[action.film]
            return newState
        }
        default:
            return state;
    }
}
