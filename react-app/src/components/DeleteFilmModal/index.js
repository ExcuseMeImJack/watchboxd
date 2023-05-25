import React from "react";
import { useDispatch} from "react-redux"
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import { thunkDeleteFilm } from "../../store/films";

function DeleteFilmModal({film}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal();

    const handleDeleteFilm = async () => {
        await dispatch(thunkDeleteFilm(film))
        history.push('/films')
        closeModal();
    }

    return (
        <div className="delete-profile-modal-container">
            <h1>Delete {film.title}</h1>
            <h3 id="delete-profile-text">Are you sure you want to continue with this action?</h3>
            <div className="delete-cancel-profile-buttons">
            <button className="delete-profile change-cursor" onClick={handleDeleteFilm}>DELETE FILM</button>
                <button className="cancel-delete-profile-button change-cursor" onClick={() => closeModal()}>CANCEL</button>
            </div>
        </div>
    )
}

export default DeleteFilmModal
