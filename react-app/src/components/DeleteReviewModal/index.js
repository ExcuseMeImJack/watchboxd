import React from "react";
import { useDispatch, useSelector} from "react-redux"
import { useModal } from "../../context/Modal";
import { thunkGetUserById } from "../../store/session";
import { thunkDeleteReviewById, thunkGetAllFilmReviews } from "../../store/reviews";
import { thunkGetFilmById } from "../../store/films";

function DeleteReviewModal({review, film}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const handleReviewDelete = async () => {
        await dispatch(thunkDeleteReviewById(review))
        await dispatch(thunkGetAllFilmReviews(film.id))
        await dispatch(thunkGetFilmById(film.id))
        closeModal();
    }

    return (
        <div className="delete-profile-modal-container">
            <h1>Delete Review</h1>
            <h3 id="delete-profile-text">Are you sure you want to continue with this action?</h3>
            <div className="delete-cancel-profile-buttons">
            <button className="delete-profile change-cursor" onClick={handleReviewDelete}>DELETE REVIEW</button>
                <button className="cancel-delete-profile-button change-cursor" onClick={() => closeModal()}>CANCEL</button>
            </div>
        </div>
    )
}

export default DeleteReviewModal
