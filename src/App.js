import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail
} from "firebase/auth";
import { db, auth, googleProvider } from "./firebase-config";
import { collection, doc, query, setDoc, where } from "firebase/firestore";
import DisplayWorkouts from "./DisplayWorkouts";
import CreateWorkout from "./CreateWorkout";
import Modal from "./Modal";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // sign in modal functions
  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {

    setIsModalOpen(false);
  }

  // display current user email
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  // auth functions
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

  // this is not currently working
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
    .then(async (res) => {

      const registerName = res.user.displayName;
      const registerEmail = res.user.email;
      const registerImage = res.user.photoURL;

      const usersCol = collection(db, "users");
      const userExists = query(usersCol, where("email", "==", registerEmail));

      if (!userExists) {
        const ref = doc(db, "users", res.user.uid);
        await setDoc(ref, {
          email: registerEmail,
          name: registerName,
          image: registerImage,
        });
      }
    })
    .then(() => {
      closeModal();
    })
    .catch((error) => {
      console.log(error.message);
      closeModal();
    });
  }

  const logout = async () => {
    await signOut(auth);
    console.log("signed out");
  };

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      closeModal();
      console.log(`reset email sent to ${email}`)
    })
    .catch((error) => {
      console.log(error.message);
    })
  }

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
              <button onClick={openModal}>Login/Signup</button>
              <Modal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                setRegisterEmail={setRegisterEmail}
                setRegisterPassword={setRegisterPassword}
                register={register}
                setLoginEmail={setLoginEmail}
                setLoginPassword={setLoginPassword}
                login={login}
                signInWithGoogle={signInWithGoogle}
                resetPassword={resetPassword}
              />
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
          {/* <a href="#">
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
          </a> */}
        </div>
        <span>Built By Michael Godfrey</span>
      </footer>
    </>
  );
}

export default App;
