import {useEffect, useState} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import {db, auth, googleProvider} from "./firebase-config";
import {collection, doc, query, setDoc, where} from "firebase/firestore";
import DisplayWorkouts from "./DisplayWorkouts";
import CreateWorkout from "./CreateWorkout";
import Modal from "./Modal";
import PublicDisplay from "./PublicDisplay";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // display modal functions
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // display current user data
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

  // does not create new user in users
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
  };

  const logout = async () => {
    await signOut(auth);
    console.log("signed out");
  };

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        closeModal();
        console.log(`reset email sent to ${email}`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="box-border text-textColor">
      <header>
        {user ? (
          <div className="bg-secondary w-full p-4 flex items-center justify-between">
            <img
              className="max-h-12 sm:max-h-16"
              src={require("./images/powr-logo-noBG.webp")}
              alt="POWR logo"
            />
            <span className="text-white mx-4 text-lg sm:text-2xl">{user.email}</span>
            <button
              className="h-12 sm:h-16 w-32 sm:w-40 text-lg sm:text-2xl text-secondary bg-white font-bold p-2 sm:p-1"
              onClick={logout}
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="bg-secondary w-full p-4 flex items-center justify-between">
            <img
              className="max-h-12 sm:max-h-16"
              src={require("./images/powr-logo-noBG.webp")}
              alt="POWR logo"
            />
            <button
              className="h-12 sm:h-16 w-32 sm:w-40 text-lg sm:text-2xl text-secondary bg-white font-bold p-2 sm:p-1"
              onClick={openModal}
            >
              Login/Signup
            </button>
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
      </header>
      <main className="items-center flex flex-col bg-beige">
        <h1 className="text-[0px]">Progressive Overload Workout Recorder</h1>
        {user ? (
          <>
            <CreateWorkout user={user} />
            <DisplayWorkouts user={user} />
          </>
        ) : (
          <PublicDisplay />
        )}
      </main>
      <footer className="bg-secondary text-white grid place-content-center h-24">
        <span>&#169; 2023 Progressive Overload Workout Tracker</span>
      </footer>
    </div>
  );
}

export default App;
