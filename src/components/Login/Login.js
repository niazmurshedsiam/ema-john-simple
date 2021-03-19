import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import React, { useState } from "react";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.login(); // if already initialized, use that one
 }
function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
  });
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          // password : password,
          photo: photoURL,
        };
        setUser(signedInUser);
        console.log(displayName, photoURL, email);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  };

  const handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const signOutUser = {
          isSignedIn: false,
          name: "",
          photo: "",
          email: "",
          error: "",
          success: "",
        };
        setUser(signOutUser);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  const handleSubmit = (event) => {
    // console.log(user.email,user.password);
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          updateUserName(user.name);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    event.preventDefault();
  };

  const handleBlur = (event) => {
    // console.log(event.target.name,event.target.value);
    let isFormValid = true;
    if (event.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
      console.log(isFormValid);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };
  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
        // photoURL: "https://example.com/jane-q-user/profile.jpg",
      })
      .then(function () {
        // Update successful.
        console.log('user name update successfully');
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <div style={{textAlign:"center",margin:"10px",padding:"10px"}}>
      {user.isSignedIn ? (
        <button onClick={handleSignout}>Sign out</button>
      ) : (
        <button onClick={handleSignin}>Sign in</button>
      )}
      <br/>
      {/* <button>Sign in using Facebook</button> */}
      {
        user.isSignedIn && (
          <div>
            <p> Welcome, {user.name}</p>
            <p>Your email {user.email}</p>
            <img src={user.photo} alt="" />
          </div>
      )}
      <h1>Our Own Authentication</h1>
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {
          <input
            type="text"
            name="email"
            onBlur={handleBlur}
            placeholder="Enter your email"
            required
          />
        }
        <br />
        {
          <input
            type="password"
            name="password"
            onBlur={handleBlur}
            placeholder="Enter your password"
            required
          />
        }
        <br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "create" : "Logged In"} successfully
        </p>
      )}
    </div>
  );
}

export default Login;