import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "./firebase-config";
import { doc, setDoc } from "firebase/firestore";
import DisplayWorkouts from "./DisplayWorkouts";
import CreateWorkout from "./CreateWorkout";

function App() {
  const [ registerEmail, setRegisterEmail ] = useState("");
  const [ registerPassword, setRegisterPassword ] = useState("");
  const [ loginEmail, setLoginEmail ] = useState("");
  const [ loginPassword, setLoginPassword ] = useState("");
  const [ user, setUser ] = useState({});

  // display current user email
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [])
  
  // console.log(user.uid)
  
  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then(async (res) => {
        const ref = doc(db, "users", res.user.uid);
        await setDoc(ref, {
          email: registerEmail
        })
      })
      .catch((error) => {
        console.log(error.message)
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      console.log(error.message);
    }
  }

  const logout = async () => {
    await signOut(auth);
    console.log("signed out")
  }

  return (
    <>
      <header>
        <div>
          <p>POWR</p>
          <p>Progressive Overload Workout Recorder</p>
        </div>

        <div>
          {user ? (
            <>
              <span>{user.email}</span>
              <button onClick={logout}>Sign out</button>
            </>
          ) : (
            <>
              <p>Register</p>
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
              <button onClick={login}>Login</button>
            </>
          )}
        </div>
      </header>
      <main>
        <CreateWorkout user={user} />
        <DisplayWorkouts user={user} />
      </main>
      <footer>This is a footer</footer>
    </>
  );
}

export default App;
