import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import "./DeleteUser.css"
import { logout, thunkDeleteUser, thunkGetUserById } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import './DeleteUser.css'

function DeleteUserModal() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.users)
    const { closeModal } = useModal();

    const handleDeleteAccount = async() => {
        await dispatch(thunkDeleteUser(user))
        history.push('/')
        await dispatch(logout())
        closeModal();

    }

    return (
        <div className="delete-profile-modal-container">
            <h1>Delete Profile</h1>
            <h3 id="delete-profile-text">Are you sure you want to continue with this action?</h3>
            <div className="delete-cancel-profile-buttons">
            <button className="delete-profile change-cursor" onClick={handleDeleteAccount}>DELETE ACCOUNT</button>
                <button className="cancel-delete-profile-button change-cursor" onClick={() => closeModal()}>CANCEL</button>
            </div>
        </div>
    )
}

export default DeleteUserModal
