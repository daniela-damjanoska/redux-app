import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import { fetchBlogItems } from "./Features/BlogItems/blogItemsSlice";

// @ts-ignore
store.dispatch(fetchBlogItems());

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// for testing purposes:

// import store from "./store";

// console.log("Initial state: ", store.getState());
// // {todos: [....], filters: {status, colors}}

// // Every time the state changes, log it
// // Note that subscribe() returns a function for unregistering the listener
// const unsubscribe = store.subscribe(() =>
//   console.log("State after dispatch: ", store.getState())
// );

// // unsubscribe();

// store.dispatch({ type: "blogItems/filteredByQuery", payload: "Redux" });

// store.dispatch({ type: "blogItems/allItemsShown" });

// store.dispatch({ type: "blogItems/blogItemDeleted", payload: 2 });

// store.dispatch({ type: "blogItems/filteredById", payload: 1 });

// store.dispatch({ type: "blogItems/allItemsShown" });

// console.log("Initial state: ", store.getState());
