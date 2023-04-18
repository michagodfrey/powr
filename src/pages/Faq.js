import React from 'react';
import { Accordion } from "flowbite-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Faq = () => {
  return (
    <>
      <Header />
      <main className="items-center flex flex-col min-h-[calc(100vh-192px)] bg-white dark:bg-black transition-colors">
        <h1 className="text-3xl my-6 text-center">Frequently Asked Questions</h1>
        <Accordion alwaysOpen={true} className="w-11/12 max-w-3xl">
          <Accordion.Panel>
            <Accordion.Title>
              What is Progressive Overload Workout Recorder
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Progressive Overload Workout Recorder (POWR) is a workout log app that aims to inspire you to achieve progressive overflow in your workout routines.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>What information do you collect on users?</Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                We store your email for authentication purposes. Your email and workout and exercise data are stored on the Firebase Firestore database. We will never send you spam or provide your email to third parties.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              How do I use this app?
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Create an account, you can use your Google, Facebook or email. Save your favourite exercises and routines.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </main>
      <Footer />
    </>
  );
}

export default Faq