import React from "react";

const PublicDisplay = () => {
  
  return (
    <div className="text-center w-full">
      <div className="bg-primary pb-4">
        <img
          className="w-full max-w-2xl h-auto m-auto pt-8 pb-4 md:pt-16 md:pb-8"
          src={require("./images/powr-logo-noBG.webp")}
          alt="POWR logo"
        />
      </div>
      <p className="text-lg md:text-2xl text-secondary font-bold m-4">
        The workout recording app that helps users achieve progressive overload
      </p>
      <div className="p-4 border max-w-5xl m-auto shadow-md">
        <img
          
          src={require("./images/POWR-short-table.webp")}
          alt="Sceenshot of homepage"
        />
      </div>

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
