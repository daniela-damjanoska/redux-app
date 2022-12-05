import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// import store from "./store";

// console.log("Initial state: ", store.getState());
// // {todos: [....], filters: {status, colors}}

// // Every time the state changes, log it
// // Note that subscribe() returns a function for unregistering the listener
// const unsubscribe = store.subscribe(() =>
//   console.log("State after dispatch: ", store.getState())
// );

// store.dispatch({ type: "blogItems/blogItemDeleted", payload: 1 });

// // unsubscribe();

// store.dispatch({ type: "blogItems/blogItemDeleted", payload: 2 });

// // store.dispatch({ type: "blogItems/blogItemDeleted", payload: 2 });

// console.log("Initial state: ", store.getState());
