import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import style from "./index.module.css";
import {
  openFullPostThunkCreator,
  addCommentThunkCreator,
} from "../../redux/actionCreators";

import { checkValidity } from "../../utils";
import Spinner from "../UI/Spinner";
import Comment from "./Comment";

class FullPost extends Component {
  state = {
    value: "",
    isValid: false,
    loading: false,
  };

  addPostComment = () => {
    const { value } = this.state;
    const { addComment, fullPost } = this.props;
    const commentObj = {
      body: value,
      postId: fullPost.id,
    };
    addComment(commentObj);
    setTimeout(() => this.refreshFullPost(), 100);
    this.setState({ value: "", isValid: false });
  };

  addCommentEnterPress = e => {
    if (e.key === "Enter") {
      this.addPostComment();
    }
  };

  commentOnChange = e => {
    const isValid = checkValidity(e.target.value);
    this.setState({ value: e.target.value, isValid });
  };

  componentDidMount = () => {
    this.refreshFullPost();
  };

  refreshFullPost = () => {
    const {
      openFullPost,
      location: {
        state: { id },
      },
    } = this.props;
    openFullPost(id);
  };

  render() {
    const { value, isValid } = this.state;
    const { fullPost, loading } = this.props;

    if (!fullPost && loading) {
      return <Spinner />;
    }

    const { title = "title", content, author, date, comments } = fullPost;

    return (
      <div className={style.fullPost}>
        <h1 className={style.title}>{title}</h1>
        <p className={style.content}>{content}</p>

        <div className={style.infoBlock}>
          <p className={style.author}>{author}</p>
          <p className={style.date}>{date}</p>
        </div>

        <Link
          to={{
            pathname: "/add-post",
            state: { updatePost: true },
          }}
        >
          <button className={style.edit} type="button">
            Edit
          </button>
        </Link>

        <div className={style.comments}>
          Комментарри({comments.length})
          {comments &&
            comments.map(comment => <Comment key={comment.id} {...comment} />)}
        </div>

        <div className={style.addComment}>
          <input
            type="text"
            onKeyPress={this.addCommentEnterPress}
            placeholder="Добавить комментарий..."
            onChange={this.commentOnChange}
            value={value}
            className={style.commentArea}
          />
          <button
            type="button"
            disabled={!isValid}
            className={style.buttonAdd}
            onClick={this.addPostComment}
          >
            {loading ? (
              <ClipLoader color={"rgba(0, 0, 0, 0.5)"} size={15} />
            ) : (
              "Опубликовать"
            )}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ fullPost, loading }) => ({
  fullPost,
  loading,
});

const mapDispatchToProps = {
  openFullPost: openFullPostThunkCreator,
  addComment: addCommentThunkCreator,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullPost);
