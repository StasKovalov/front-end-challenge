import React from "react";

import style from "./index.module.css";

const Post = ({ author, title, date }) => (
  <article className={style.post}>
    <h1>{title}</h1>
    <div className={style.info}>
      <div className={style.author}>{author}</div>
      <div className={style.date}>{date}</div>
    </div>
  </article>
);

export default Post;
