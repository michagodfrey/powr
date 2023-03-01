import React from "react";

// The front page of the app the user sees before logging in
const PublicDisplay = () => {
  return (
    <div className="text-center w-full">
      <div className="bg-primary pb-4">
        <img
          className="w-full max-w-2xl h-auto m-auto pt-8 pb-4 md:pt-16 md:pb-8"
          src={require("./images/powr-logo-noBG.webp")}
          alt="POWR logo"
        />
        <p className="text-lg md:text-2xl text-secondary font-bold px-2 pb-2 md:pb-4">
          The workout recording app that helps users achieve progressive
          overload
        </p>
      </div>
      <img
        className="w-full max-w-lg h-auto my-4 m-auto"
        src={require("./images/placeholder.png")}
        alt="Placeholder img"
      />
      <h2 className="underline mt-8 mb-4 text-2xl">How does it work?</h2>
      <div className="m-auto text-lg text-justify px-4 max-w-5xl">
        Create an acount to keep a record of your workouts. Track the reps and
        weight for each exercise over time and see if you have successfully
        added more volume (weight x reps) to challenge your muscles and promote
        growth.
      </div>
      <h2 className="underline mt-8 mb-4 text-2xl">
        What is Progressive Overload Training?
      </h2>
      <p className="m-auto mb-16 text-justify text-lg px-4 max-w-5xl">
        Progressive overload is a strength training technique where the demands
        on the body are gradually increased over time to continuously challenge
        the body and promote muscle adaptation and growth. The goal is to
        gradually increase the amount of stress placed on the muscles by
        increasing the weight, reps, or sets.
      </p>
    </div>
  );
};

export default PublicDisplay;
