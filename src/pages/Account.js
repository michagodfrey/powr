import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

const Account = () => {
  return (
    <>
      <Header />
      <main className="items-center flex flex-col grow min-h-[calc(100vh-192px)] bg-white dark:bg-black transition-colors">
        <h1>Account</h1>
        
      </main>
      <Footer />
    </>
  );
}

export default Account