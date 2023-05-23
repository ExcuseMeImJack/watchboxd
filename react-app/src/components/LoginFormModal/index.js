import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
      history.push('/profile')
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('tester1@aa.io', 'password'))
    if (data) {
      setErrors(data);
    } else {
      closeModal();
      history.push('/profile')
    }
  }

  return (
    <div className="login-modal-component">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="login-modal-fields">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
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
        </div>
        <div className="login-button-submit-div">
            <button id="login-button-submit" onClick={handleDemoLogin}>Demo User</button>
            <button id="login-button-submit" type="submit">Log In</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
