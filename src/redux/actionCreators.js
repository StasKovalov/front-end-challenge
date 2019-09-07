import axios from "axios";

import {
  AXIOS_REQUEST,
  POSTS_LOADED,
  RESPONSE_ERROR,
  POST_ADDED,
  OPENED_FULL_POST,
  UPDATE_POST,
  ADD_COMMENT,
} from "./constans";

export const axiosRequest = () => ({
  type: AXIOS_REQUEST,
});

export const postsLoaded = posts => ({
  type: POSTS_LOADED,
  payload: posts,
});

export const responseError = err => ({
  type: RESPONSE_ERROR,
  payload: err,
});

export const postAdded = () => ({
  type: POST_ADDED,
});

export const postAddError = err => ({
  type: RESPONSE_ERROR,
  payload: err,
});

export const openFullPost = id => ({
  type: OPENED_FULL_POST,
  payload: id,
});

export const updatePost = () => ({
  type: UPDATE_POST,
});

export const addComment = () => ({
  type: ADD_COMMENT,
});

export const getPostsThunkCreator = () => dispatch => {
  dispatch(axiosRequest());
  axios
    .get("https://simple-blog-api.crew.red/posts")
    .then(response => {
      const filtredData = response.data.filter(
        item => !(typeof item.author === "object")
      );
      dispatch(postsLoaded(filtredData));
    })
    .catch(err => dispatch(responseError(err)));
};

export const addPostThunkCreator = postObj => dispatch => {
  dispatch(axiosRequest());
  axios
    .post("https://simple-blog-api.crew.red/posts", postObj)
    .then(response => dispatch(postAdded()))
    .catch(err => dispatch(responseError(err)));
};

export const openFullPostThunkCreator = id => dispatch => {
  dispatch(axiosRequest());
  axios
    .get(`https://simple-blog-api.crew.red/posts/${id}?_embed=comments`)
    .then(response => dispatch(openFullPost(response.data)))
    .catch(err => dispatch(responseError(err)));
};

export const updatePostThunkCreator = (id, postObj) => dispatch => {
  dispatch(axiosRequest());
  axios
    .put(`https://simple-blog-api.crew.red/posts/${id}`, postObj)
    .then(response => dispatch(updatePost()))
    .catch(err => dispatch(responseError(err)));
};

export const addCommentThunkCreator = commentObj => dispatch => {
  dispatch(axiosRequest());
  axios
    .post("https://simple-blog-api.crew.red/comments", commentObj)
    .then(response => dispatch(addComment()))
    .catch(err => dispatch(responseError(err)));
};
