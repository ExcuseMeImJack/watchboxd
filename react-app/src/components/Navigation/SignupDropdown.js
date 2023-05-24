import { useEffect, useRef, useState } from "react";
import "./SignupDropdown.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { login, signUp } from "../../store/session";
const SignupDropdown = () => {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        setErrors([]);
        setUsername('')
        setConfirmPassword('')
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  const handleSubmit = async (e) => {
    const valErrors = {}
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

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
              <button id="login-button-demo" onClick={handleDemoLogin}>
                Demo User
              </button>
              <button id="login-button-submit" type="submit">
                Log In
              </button>
            </div>
          </div>
          {errors.length > 0 && (
            <div>
              <div className="errors-signup">
                {errors.map((error, idx) => (
                  <p key={idx} className="errors">
                    {error}
                  </p>
                ))}
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default SignupDropdown;
