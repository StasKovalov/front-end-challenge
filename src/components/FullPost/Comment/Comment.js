import React from "react";
import style from "./index.module.css";

const Comment = ({ body }) => <p className={style.comment}>{body}</p>;

export default Comment;
