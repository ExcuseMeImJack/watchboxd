import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { login, signUp } from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom";

function SignupFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
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

  return (
    <div className="signup-modal-content">
        <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-content">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        <div className="email-input-signup">
          <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

        </div>
        <div>
          <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

        </div>
        <div>
          <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

        </div>
        <div>
          <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

        </div>
        <span className="submit-buttons-signup">
          <button id="signup-button-submit" onClick={handleDemoLogin}>
            Demo User
          </button>
          <button type="submit">Sign Up</button>
        </span>
      </form>
    </div>
  );
}

export default SignupFormModal;
