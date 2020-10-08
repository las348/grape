import React, { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import { auth } from "../firebase";
import API from "../utils/API";
import Box from '@material-ui/core/Box';
import './style/signup.css';

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  function handleInputChange(event) {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
    if (name === 'password2') {
      setPassword2(value);
    }
    if (name === 'displayName') {
      setDisplayName(value);
    }
  }

  function handleBtnSubmit(event) {
    event.preventDefault();
    if (email === " " || password === " " || password2 === " " || displayName === " " ) {
      setError('Enter all the Information');
    } else if (password !== password2) {
      setError('Enter the same password twice');
    } else {
      auth.createUserWithEmailAndPassword(email, password)
        .then((userAuth) => saveNewUser(userAuth))
        .catch(error => {
          setError(error.message);
      })
    }
  }

  function saveNewUser(userAuth) {
    let newUser = {
      uid: userAuth.user.uid,
      emailID: email,
      displayName: displayName
    }
    API.createNewUser(newUser)
    .catch(error => {
      setError('Service Unavailable, try again later. ');
      console.log(`Error Saving user to the DB: `, error)
    });
  }

  return (
    <Box display="flex" justifyContent="center">
      <section className="Signupcontainer">
        <h2>Sign Up</h2>
        {error !== null && (
          <div className="py-1 bg-red-600 w-full text-danger text-center mb-3">
            {error}
          </div>
        )}
        <SignUpForm
          emailID={email}
          password={password}
          password2={password2}
          displayName={displayName}
          handleInputChange={handleInputChange}
          handleBtnSubmit={handleBtnSubmit}
        />
      </section>
    </Box>
  );
}

export default SignUp;