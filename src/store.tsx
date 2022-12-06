import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";
import thunkMiddleware from "redux-thunk";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

// EXAMPLE: In this function we can add whatever middleware we actually want to use here
// applyMiddleware(print1, print2, print3)
// other store enhancers if any

const store = createStore(rootReducer, composedEnhancer);

// let preloadedState
// const persistedTodosString = localStorage.getItem('todos')

// if (persistedTodosString) {
//   preloadedState = {
//     todos: JSON.parse(persistedTodosString)
//   }
// }

// const store = createStore(rootReducer, preloadedState)

export default store;
