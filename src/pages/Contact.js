import React from 'react';
import { Label, TextInput, Textarea, Button } from "flowbite-react";

const Contact = () => {
  return (
    <>
      <main className="items-center flex flex-col grow min-h-[calc(100vh-192px)] bg-white dark:bg-black transition-colors">
        <h1 className="text-3xl my-6 text-center">Contact</h1>
        <form className="gap-4 w-11/12 max-w-3xl">
          <div className="my-4">
            <div className="block">
              <Label htmlFor="name" value="Your name" />
            </div>
            <TextInput id="name" type="text" placeholder="Name" required={true} shadow={true} />
          </div>
          <div className="my-4">
            <div className="block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="mail@email.com"
              required={true}
              shadow={true}
            />
          </div>
          <div id="textarea" className="my-4">
            <div className="block">
              <Label htmlFor="comment" value="Your message" />
            </div>
            <Textarea
              id="comment"
              placeholder="Leave a comment..."
              required={true}
              rows={4}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </main>
    </>
  );
}

export default Contact