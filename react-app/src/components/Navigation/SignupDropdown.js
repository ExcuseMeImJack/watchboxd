import { useEffect, useRef, useState } from "react";
import "./SignupDropdown.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { login, signUp, thunkGetAllUsers } from "../../store/session";

const SignupDropdown = ({users}) => {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
        setEmail("");
        setPassword("");
        setErrors({});
        setUsername('')
        setConfirmPassword('')
        setIsSubmitted(false)
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const listOfExistingUsernames = users?.map(user => user.username.toLowerCase())

  const existingUsers = (newUsername) => listOfExistingUsernames?.includes(newUsername.toLowerCase()) ? false : true

  useEffect(() => {
    const valErrors = {}

    if(password !== confirmPassword) valErrors.passwordConfirmation = "Confirm Password field must be the same as the Password field";
    if(password.length < 4) valErrors.password = "Password must be more than 4 characters"
    if(username.length > 16 || username.length < 4) valErrors.username = "Username must be between 4 and 16 characters"
    if(validateEmail(email) === false) valErrors.email = "Email must be valid"
    if(existingUsers(username) === false) valErrors.username = "Username already exists"

    setErrors(valErrors)
  }, [password, username, email, confirmPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true)
    if(Object.keys(errors).length === 0) {
      setIsSubmitted(false)
      const data = await dispatch(signUp(username, email, password));
      if(data){
        setIsSubmitted(true)
        const backendErrors = {}
        const errAttr = data[0].split(' : ')[0]
        const err = data[0].split(' : ')[1]
        backendErrors[errAttr] = err;
        setErrors(backendErrors)
      } else {
        closeMenu();
        history.push('/profile')
      }
    }
  }

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("tester1@aa.io", "password"));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
      history.push("/profile");
    }
  };

  const ulClassName = "signup-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = (e) => setShowMenu(false)

  return (
    <>
      <button className="signup-button change-cursor" onClick={openMenu}>
        CREATE ACCOUNT
      </button>
      <div className={ulClassName} ref={ulRef}>
        <form onSubmit={handleSubmit}>
          <div className="signup-form-details">
          <div className="email-input-signup">
          <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

        </div>
        <div className="username-input-signup">
          <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

        </div>
        <div className="password-input-signup">
          <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

        </div>
        <div className="password-confirm-input-signup">
          <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

        </div>
            <div className="submit-button-submit-div">
              <button id="login-button-submit" className="change-cursor" type="submit">
                Sign Up
              </button>
              <button id="login-button-demo" className="change-cursor" onClick={handleDemoLogin} type="button">
                Demo User
              </button>
            </div>
          </div>
          {Object.keys(errors).length > 0 && (
            <div>
              <div className="errors-signup">
                {isSubmitted && errors.email && <p className="errors">{errors.email}</p>}
                {isSubmitted && errors.username && <p className="errors">{errors.username}</p>}
                {isSubmitted && errors.passwordConfirmation && <p className="errors">{errors.passwordConfirmation}</p>}
                {isSubmitted && errors.password && <p className="errors">{errors.password}</p>}
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default SignupDropdown;
