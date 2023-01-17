import React from 'react';
import ReactDOM from 'react-dom/client';
// import { ContextProvider } from "./global-context";
import App from './App';
import "./style/style.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <ContextProvider> */}
      <App />
    {/* </ContextProvider> */}
  </React.StrictMode>
);

