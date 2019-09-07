import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addPostThunkCreator,
  updatePostThunkCreator,
} from "../../redux/actionCreators";
import { getDateTime } from "../../utils";

import style from "./index.module.css";

class NewPost extends Component {
  state = {
    postForm: {
      title: "",
      content: "",
      author: "",
    },
    isValid: false,
    updatePost: null,
  };

  componentDidMount = () => {
    this.editPost();
  };

  editPost = () => {
    const {
      fullPost,
      location: {
        state: { updatePost },
      },
    } = this.props;

    if (updatePost) {
      const {
        title = "title",
        content = "content",
        author = "author",
      } = fullPost;

      this.setState({
        postForm: {
          title,
          content,
          author,
        },
        updatePost,
      });
    }
  };

  checkValidForm = (e, key) => {
    const postForm = { ...this.state.postForm };
    let postFormEl = { ...postForm[key] };
    postFormEl = e.target.value;
    postForm[key] = postFormEl;

    const valueArr = Object.values(postForm);
    let isValid = true;
    valueArr.forEach(value => (isValid = !!value.trim() && isValid));
    this.setState({ postForm, isValid });
  };

  postDataHandler = () => {
    const { addPost } = this.props;
    const { title, content, author } = this.state.postForm;
    const data = {
      title,
      content,
      author,
      date: getDateTime(),
    };
    addPost(data);
    this.setState({
      postForm: {
        title: "",
        content: "",
        author: "",
      },
    });
  };

  updatePostHandler = () => {
    const { updatePost, fullPost } = this.props;
    console.log(updatePost);
    const { title, content, author } = this.state.postForm;
    const data = {
      title,
      content,
      author,
      date: getDateTime(),
    };

    updatePost(fullPost.id, data);
    this.setState({
      postForm: {
        title: "",
        content: "",
        author: "",
      },
    });
  };

  render() {
    const { postForm, isValid, updatePost } = this.state;

    return (
      <div className={style.newPost}>
        <h1 className={style.textHead}>
          {updatePost ? "Update Post" : "Add Post"}
        </h1>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={postForm.title}
          className={style.title}
          onChange={event => this.checkValidForm(event, "title")}
        />
        <label htmlFor="content">Content</label>
        <input
          id="content"
          type="text"
          className={style.content}
          value={postForm.content}
          onChange={event => this.checkValidForm(event, "content")}
        />
        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          value={postForm.author}
          className={style.author}
          onChange={event => this.checkValidForm(event, "author")}
        />
        <button
          className={style.addPost}
          disabled={!isValid}
          type="button"
          onClick={updatePost ? this.updatePostHandler : this.postDataHandler}
        >
          {updatePost ? "Update Post" : "Add Post"}
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ fullPost }) => ({
  fullPost,
});

const mapDispatchToProps = {
  addPost: addPostThunkCreator,
  updatePost: updatePostThunkCreator,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost);
