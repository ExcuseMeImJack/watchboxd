import { useEffect, useRef, useState } from "react";
import "./LoginDropdown.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { login } from "../../store/session";
const LoginDropdown = () => {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false)
        setEmail('')
        setPassword('')
        setErrors([])
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
      history.push("/profile");
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("david@aa.io", "password"));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
      history.push("/profile");
    }
  };

  const ulClassName = "login-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => {
    setShowMenu(false)
    setEmail('')
    setPassword('')
    setErrors([])
  };

  return (
    <>
      <button className="login-button change-cursor" onClick={openMenu}>
        SIGN IN
      </button>
      <div className={ulClassName} ref={ulRef}>
        <form onSubmit={handleSubmit}>
          <div className="login-form-details">
            <div className="email-login-div">
              <label>Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="password-login-div">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="login-button-submit-div">
              <button id="login-button-submit" className="change-cursor" type="submit">
                Log In
              </button>
              <button id="login-button-demo" className="change-cursor" onClick={handleDemoLogin} type="button">
                Demo User
              </button>
            </div>
          </div>
          {errors.length > 0 && (
            <div>
              <div className="errors-login">
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

export default LoginDropdown;
