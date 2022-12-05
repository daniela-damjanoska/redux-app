import { combineReducers } from "redux";
import blogItemsReducer from "./Features/BlogItems/blogItemsSlice";

const rootReducer = combineReducers({ blogItems: blogItemsReducer });

export default rootReducer;
