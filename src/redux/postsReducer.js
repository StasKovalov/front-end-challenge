import {
  AXIOS_REQUEST,
  POSTS_LOADED,
  RESPONSE_ERROR,
  POST_ADDED,
  OPENED_FULL_POST,
  UPDATE_POST,
  ADD_COMMENT,
} from "./constans";

const initialState = {
  posts: [],
  loading: true,
  error: null,
  fullPost: null,
  editingPost: null,
};

const postsReducer = (state = initialState, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case AXIOS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case POSTS_LOADED:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case RESPONSE_ERROR:
      return {
        ...state,
        error: payload,
      };

    case POST_ADDED:
      return {
        ...state,
        loading: false,
      };

    case OPENED_FULL_POST:
      return {
        ...state,
        loading: false,
        fullPost: payload,
      };

    case UPDATE_POST:
      return {
        ...state,
        loading: false,
      };

    case ADD_COMMENT:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default postsReducer;
