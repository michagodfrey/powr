import {useEffect, useState} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import {db, auth, googleProvider, facebookProvider} from "./firebase-config";
import {doc, setDoc} from "firebase/firestore";
import Modal from "./Modal";
import PublicDisplay from "./PublicDisplay";
import UserDisplay from "./UserDisplay";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

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

  // display user menu
  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  }

  // auth functions
  const register = async () => {
    try {
      if (registerPassword !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      )
        .then(async (res) => {
          const ref = doc(db, "users", res.user.uid);
          await setDoc(ref, {
            email: registerEmail,
            routines: {}
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

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (res) => {
        const registerName = res.user.displayName;
        const registerEmail = res.user.email;
        const registerImage = res.user.photoURL;
        const ref = doc(db, "users", res.user.uid);

        await setDoc(ref, {
          email: registerEmail,
          name: registerName,
          image: registerImage,
          routines: {}
        });

        closeModal();
      })
      .catch((error) => {
        console.log(error.message);
        closeModal();
      });
  };

  const signInWithFacebook = () => {
    signInWithPopup(auth, facebookProvider)
    .then(async (res) => {
      const registerName = res.user.displayName;
      const registerEmail = res.user.email;
      const ref = doc(db, "users", res.user.uid);

      await setDoc(ref, {
        email: registerEmail,
        name: registerName,
      });

      closeModal();
    })
    .catch((error) => {
      console.log(error.message);
      closeModal();
    })
  }

  const logout = async () => {
    await signOut(auth);
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
    <div className="box-border text-textColor font-mono">
      <header className="bg-secondary">
        {user ? (
          <div className="w-full p-4 flex items-center justify-between">
            <img
              className="max-h-16"
              src={require("./images/powr-logo-noBG.webp")}
              alt="POWR logo"
            />
            <button
              className="sm:hidden"
              type="button"
              aira-expanded="true"
              aria-haspopup="true"
              onClick={handleMenuClick}
            >
              <svg
                fill="#ffffff"
                width="50px"
                height="50px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Account Settings</title>
                <path d="M9.6,3.32a3.86,3.86,0,1,0,3.86,3.85A3.85,3.85,0,0,0,9.6,3.32M16.35,11a.26.26,0,0,0-.25.21l-.18,1.27a4.63,4.63,0,0,0-.82.45l-1.2-.48a.3.3,0,0,0-.3.13l-1,1.66a.24.24,0,0,0,.06.31l1,.79a3.94,3.94,0,0,0,0,1l-1,.79a.23.23,0,0,0-.06.3l1,1.67c.06.13.19.13.3.13l1.2-.49a3.85,3.85,0,0,0,.82.46l.18,1.27a.24.24,0,0,0,.25.2h1.93a.24.24,0,0,0,.23-.2l.18-1.27a5,5,0,0,0,.81-.46l1.19.49c.12,0,.25,0,.32-.13l1-1.67a.23.23,0,0,0-.06-.3l-1-.79a4,4,0,0,0,0-.49,2.67,2.67,0,0,0,0-.48l1-.79a.25.25,0,0,0,.06-.31l-1-1.66c-.06-.13-.19-.13-.31-.13L19.5,13a4.07,4.07,0,0,0-.82-.45l-.18-1.27a.23.23,0,0,0-.22-.21H16.46M9.71,13C5.45,13,2,14.7,2,16.83v1.92h9.33a6.65,6.65,0,0,1,0-5.69A13.56,13.56,0,0,0,9.71,13m7.6,1.43a1.45,1.45,0,1,1,0,2.89,1.45,1.45,0,0,1,0-2.89Z" />
              </svg>
            </button>
            {showMenu && (
              <div
                className="sm:hidden origin-top-right absolute right-0 top-[60px] mt-2 w-56 bg-white ring-1 ring-black ring-opacity-5 p-4"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1" role="none">
                  <p>
                    Signed in as <span className="underline">{user.email}</span>
                  </p>
                  <button
                    onClick={logout}
                    className="block w-full bg-secondary text-white text-center mt-2 px-4 py-2"
                    role="menuitem"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
            <div className="bg-white hidden sm:flex flex-col">
              <button
                className="text-white bg-secondary font-bold border px-4 py-2"
                onClick={logout}
              >
                Sign out
              </button>
              <span className="px-4">{user.email}</span>
            </div>
          </div>
        ) : (
          <div className="w-full p-4 flex items-center justify-between">
            <img
              className="max-h-16"
              src={require("./images/powr-logo-noBG.webp")}
              alt="POWR logo"
            />
            <button
              className="h-16 px-6 text-3xl text-white bg-primary hover:bg-primaryHover font-bold border-4"
              onClick={openModal}
            >
              LOGIN
            </button>
            <Modal
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              setRegisterEmail={setRegisterEmail}
              setRegisterPassword={setRegisterPassword}
              setConfirmPassword={setConfirmPassword}
              register={register}
              setLoginEmail={setLoginEmail}
              setLoginPassword={setLoginPassword}
              login={login}
              signInWithGoogle={signInWithGoogle}
              signInWithFacebook={signInWithFacebook}
              resetPassword={resetPassword}
            />
          </div>
        )}
      </header>
      <main className="items-center flex flex-col bg-white">
        <h1 className="text-[0px]">Progressive Overload Workout Recorder</h1>
        {user ? <UserDisplay user={user} /> : <PublicDisplay />}
      </main>
      <footer className="bg-secondary grid place-content-center h-24">
        <a href="https://github.com/michagodfrey/powr">
          <svg
            className="transition-colors hover:fill-primary cursor-pointer"
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffffff"
          >
            <title>github</title>
            <rect width="24" height="24" fill="none" />
            <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z" />
          </svg>
        </a>
      </footer>
    </div>
  );
}

export default App;
