import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getPostsThunkCreator,
  openFullPostThunkCreator,
} from "../../redux/actionCreators";

import Spinner from "../../components/UI/Spinner";
import Post from "../../components/Post";
import style from "./index.module.css";

class Blog extends Component {
  componentDidMount = () => {
    const { getPost } = this.props;
    getPost();
  };

  openFullPost = ({
    currentTarget: {
      dataset: { id },
    },
  }) => {
    const { openFullPost } = this.props;
    openFullPost(id);
  };

  render() {
    const { posts, loading } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <section className={style.posts}>
        {posts &&
          posts.map(post => (
            <Link
              key={post.id}
              className={style.link}
              to={{
                pathname: `/posts/${post.id}`,
                state: {
                  id: post.id,
                },
              }}
            >
              <div
                onClick={e => this.openFullPost(e)}
                className={style.postWrapper}
                data-id={post.id}
              >
                <Post {...post} key={post.id} />
              </div>
            </Link>
          ))}
      </section>
    );
  }
}

const mapStateToProps = ({ posts, loading }) => ({
  posts,
  loading,
});

const mapDispatchToProps = {
  getPost: getPostsThunkCreator,
  openFullPost: openFullPostThunkCreator,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog);
