import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import { auth } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  function handleInputChange(event) {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    }
    else if (name === 'password') {
      setPassword(value);
    }
  }

  function handleBtnSubmit(event) {
    event.preventDefault();
    if (email === "" || password === "") {
      setError('Please enter your Email & Password to Login.');
    } else {
      auth.signInWithEmailAndPassword(email, password)
        .catch(() => {
          setError("Error logging in with this email and password.");
        }
        )
    }
  }

  return (
    <LoginForm
      email={email}
      password={password}
      error={error}
      handleInputChange={handleInputChange}
      handleBtnSubmit={handleBtnSubmit}
    />
  );
}

export default Login;