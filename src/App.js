import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "./firebase-config";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
// import Modal from "./Modal";
import Workout from "./Workout";
import CreateWorkout from "./CreateWorkout";

function App() {

  // sign in and register user states
  const [ registerEmail, setRegisterEmail ] = useState("");
  const [ registerPassword, setRegisterPassword ] = useState("");
  const [ loginEmail, setLoginEmail ] = useState("");
  const [ loginPassword, setLoginPassword ] = useState("");
  const [ user, setUser ] = useState({});
  // const [ isModalOpen, setIstModalOpen ] = useState(false);

  // const openModal = () => {
  //   setIstModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIstModalOpen(false);
  // };

  const usersRef = collection(db, "users");

  // display current user email
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [])
  
  

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

  // console.log(user)

  return (
    <>
      {/* <header>
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
      </header> */}
      {/* <aside>
        <Modal isModalOpen={isModalOpen} closeModal={closeModal} />
      </aside> */}
      {/* <section>spacer</section> */}
      <main>
        {/* <button onClick={newWorkout}>New workout</button> */}

        {/* <Workout /> */}
        <CreateWorkout />
      </main>
      {/* <footer>This is a footer</footer> */}
    </>
  );
}

export default App;
