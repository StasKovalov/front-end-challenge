import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import postsReducer from "./postsReducer";

const store = createStore(postsReducer, applyMiddleware(thunkMiddleware));

export default store;
