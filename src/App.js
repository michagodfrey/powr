import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebase-config";
import { doc, setDoc } from "firebase/firestore";
import DisplayWorkouts from "./DisplayWorkouts";
import CreateWorkout from "./CreateWorkout";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  // display current user email
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  // console.log(user.uid)

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      )
        .then(async (res) => {
          const ref = doc(db, "users", res.user.uid);
          await setDoc(ref, {
            email: registerEmail,
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    console.log("signed out");
  };

  return (
    <>
      <header>
        <img src={require("./images/powr-logo.webp")} alt="POWR logo" />
        <div>
          {user ? (
            <>
              <span>{user.email}</span>
              <button onClick={logout}>Sign out</button>
            </>
          ) : (
            <div className="header-public">
              <button
                className="login-with-google-btn"
                // onClick={signInWithGoogle}
              >
                Sign in with Google
              </button>
              <button className="login-with-email-btn">
                Sign in or Register with Email
              </button>

              {/* <p>Register</p>
              <input
                type="email"
                placeholder="email"
                onChange={(event) => {
                  setRegisterEmail(event.target.value);
                }}
              />
              <input
                type="password"
                placeholder="password"
                onChange={(event) => {
                  setRegisterPassword(event.target.value);
                }}
              />
              <button onClick={register}>Sign up</button>
              <p>Sign in</p>
              <input
                type="email"
                placeholder="email"
                onChange={(event) => {
                  setLoginEmail(event.target.value);
                }}
              />
              <input
                type="password"
                placeholder="password"
                onChange={(event) => {
                  setLoginPassword(event.target.value);
                }}
              />
              <button onClick={login}>Login</button> */}
            </div>
          )}
        </div>
      </header>
      <main>
        {user ? (
          <>
            <CreateWorkout user={user} />
            <DisplayWorkouts user={user} />
          </>
        ) : (
          <div className="main-public">
            <h1>POWR</h1>
            <span>Progressive Overload Workout Recorder</span>
            <p>
              POWR is a workout tracking tool that helps users achieve
              progressive overload.
            </p>
            <p>
              Progressive overload is a strength training technique where the
              resistance or weight is gradually increased over time to
              continuously challenge the body and promote muscle adaptation and
              growth.
            </p>
            <p>
              Record your exercises, reps, and weight for each workout session,
              and see if you have successfully added more volume (weight x reps)
              in order to challenge their muscles and promote growth.
            </p>
            <img
              src={require("./images/placeholder.png")}
              alt="Placeholder img"
            />
            <h2>What is Progressive Overload Training?</h2>
            <p>
              Progressive overload training is a technique used in strength
              training where the individual increases the demands placed on the
              body by gradually increasing the resistance or weight used in the
              exercise over time. The goal is to gradually increase the amount
              of stress placed on the muscles, which then adapt and become
              stronger in response to the increased demand. This can be achieved
              by increasing the weight, reps, or sets, or by making the exercise
              more difficult in some other way. The key principle is that the
              body needs to be challenged in order to make progress and improve.
            </p>
          </div>
        )}
      </main>
      <footer>
        <div>
          <a href="#">
            <img
              src={require("./images/white-facebook.png")}
              alt="facebook logo"
              width="30"
            />
          </a>
          <a href="#">
            <img
              src={require("./images/white-twitter.png")}
              alt="twitter logo"
              width="30"
            />
          </a>
          <a href="#">
            <img
              src={require("./images/white-youtube.png")}
              alt="youtube logo"
              width="30"
            />
          </a>
          <a href="#">
            <img
              src={require("./images/white-instagram.png")}
              alt="instagram logo"
              width="30"
            />
          </a>
        </div>
        {/* <span>Built By Michael Godfrey | Website contains text generated by ChatGPT</span> */}
      </footer>
    </>
  );
}

export default App;
