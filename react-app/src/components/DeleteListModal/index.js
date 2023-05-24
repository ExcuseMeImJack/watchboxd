import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import { logout, thunkDeleteUser, thunkGetUserById } from "../../store/session";
import { thunkDeleteFilm } from "../../store/films";
import { thunkDeleteList, thunkGetAllLists } from "../../store/lists";

function DeleteListModal({list}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal();

    const user = useSelector(state => state.session.user)

    const handleDeleteList = async () => {
        await dispatch(thunkDeleteList(list))
        history.push('/profile/lists')
        closeModal();
        await dispatch(thunkGetUserById(user.id))
    }

    return (
        <div className="delete-profile-modal-container">
            <h1>Delete {list.list_name}</h1>
            <h3 id="delete-profile-text">Are you sure you want to continue with this action?</h3>
            <div className="delete-cancel-profile-buttons">
            <button className="delete-profile change-cursor" onClick={handleDeleteList}>DELETE LIST</button>
                <button className="cancel-delete-profile-button change-cursor" onClick={() => closeModal()}>CANCEL</button>
            </div>
        </div>
    )
}

export default DeleteListModal
