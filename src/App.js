import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Footer, Exercises } from "./components";
import { Contact, Account, Faq, Home, UserDisplay } from "./pages";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);


  // dark mode - applied to main
  // const [darkMode, setDarkMode] = useState("light");

  // useEffect(() => {
  //   if (darkMode === 'dark') {
  //     document.documentElement.classList.add('dark')
  //   } else {
  //     document.documentElement.classList.remove('dark')
  //   }
  // }, [darkMode]);

  // useEffect(() => {
  //   if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //     setDarkMode('dark');
  //   } else {
  //     setDarkMode('light');
  //   }
  //   console.log('preferred mode set')
  // }, [])

  // const toggleDarkMode = () => {
  //   setDarkMode(darkMode === "dark" ? "light" : "dark");
  // }

  return (
    <div className="box-border text-textColor font-sans">
      <BrowserRouter>
        <Header user={user} />
        <Routes>
          <Route
            path="/"
            element={user ? <UserDisplay user={user} /> : <Home />}
          />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account user={user} />} />
          <Route path="/test" element={<Exercises user={user} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
