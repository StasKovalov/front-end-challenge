import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import style from "./index.module.css";

const Header = () => (
  <div className={style.header}>
    <NavLink
      exact
      activeClassName={style.activeLink}
      className={style.link}
      to={{
        pathname: "/",
        state: { updatePost: false },
      }}
    >
      <div className={style.route}>Home</div>
    </NavLink>

    <NavLink
      exact
      activeClassName={style.activeLink}
      className={style.link}
      to={{
        pathname: "/add-post",
        state: { updatePost: false },
      }}
    >
      <div className={style.route}>Add post</div>
    </NavLink>
  </div>
);

export default withRouter(Header);
