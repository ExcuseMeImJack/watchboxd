import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./EditProfile.css";
import { thunkGetUserById } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import DeleteUserModal from "../DeleteUserModal";

const EditProfilePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [username, setUsername] = useState(user.username);
  const [firstName, setFirstName] = useState(user.first_name === null ? "" : user.first_name);
  const [lastName, setLastName] = useState(user.last_name === null ? "" : user.last_name);
  const [bio, setBio] = useState(user.bio === null ? "" : user.bio);
  const [profilePic, setProfilePic] = useState(null);
  const [email, setEmail] = useState(user.email)
  const [imageLoading, setImageLoading] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const valErrors = {}
    if(username.length < 4 || username.length > 16) valErrors.username = "Username must be between 4 and 16 characters"
    if(bio && (bio.length > 100)) valErrors.bio = "Bio must be less than 100 characters"
    setErrors(valErrors)
  }, [username, bio])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("profile_img_url", profilePic);
    if(username) formData.append("username", username);
    if(firstName) formData.append("first_name", firstName);
    if(lastName) formData.append("last_name", lastName);
    if(bio) formData.append("bio", bio);

    setImageLoading(true);

    const res = await fetch('/api/users', {
        method: "PUT",
        body: formData
    })

    if(res.ok) {
        await res.json();
        setImageLoading(false)
        history.push('/profile')
        dispatch(thunkGetUserById(user.id))
    } else {
        setImageLoading(false)
        setErrors({"profilePic": "Profile Pic must be a png, jpg or jpeg"})
    }
  };

  return (
    <div className="general-profile-settings-page">
      <div className="general-profile-settings-container">
        <div className="account-title-button">
          <h2 id="account-setting-title">Account Settings</h2>
          <button className="cancel-profile-changes change-cursor" onClick={() => history.push('/profile')}>CANCEL</button>

        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            {errors.username && <p className="errors">{errors.username}</p>}
            {errors.profilePic && <p className="errors">{errors.profilePic}</p>}
            {errors.bio && <p className="errors">{errors.bio}</p>}
          </div>
          <div className="gen-settings-container">
            <div className="edit-settings-container">
              <label className="username-input">
                Username
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
              <div className="first-last-container">
                <label className="firstname-input">
                    First Name
                    <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>
                <label className="lastname-input">
                    Last Name
                    <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    />
                </label>
              </div>
              <label className="email-input">
                Email
                <input type="text" value={email} disabled={true} required />
              </label>
            </div>
            <div className="aboutme-container">
              <label className="aboutme-input">
                About me
                <textarea
                  type="textarea"
                  value={bio}
                  placeholder={"Write a bio..."}
                  onChange={(e) => setBio(e.target.value)}
                />
              </label>
            </div>
            <div className="edit-avatar-container">
              <label className="change-cursor edit-avatar-img-container">
                <img id="edit-avatar-pic" src={user.profile_img_url}/>
                <input
                  className="upload-profile-pic-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                />
              </label>
            </div>
          </div>
          {(imageLoading) && null}
          <div className="save-changes">
                <button disabled={Object.keys(errors).length > 0 ? true : false} className={Object.keys(errors).length > 0 ? "button-disabled" : "button-enabled change-cursor"} type="submit">SAVE CHANGES</button>
            </div>
        </form>
        <div className="delete-user">
            {user.email !== "tester1@aa.io" ? <OpenModalButton
                buttonStyleClass={"delete-profile change-cursor"}
                buttonText={"DELETE ACCOUNT"}
                modalComponent={<DeleteUserModal />}
                modalStyleClass={"delete-profile-modal-content"}
            /> : <OpenModalButton
            buttonStyleClass={"button-disabled"}
            buttonText={"DELETE ACCOUNT DISABLED FOR DEMO USER"}
            modalStyleClass={"delete-profile-modal-content"}
        />}
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
