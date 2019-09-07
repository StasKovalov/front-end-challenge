import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Blog from "./containers/Blog";
import Layout from "./components/Layout";
import FullPost from "./components/FullPost";
import NewPost from "./components/NewPost";

const App = () => (
  <div>
    <Layout>
      <Switch>
        <Route path="/" exact component={Blog} />
        <Route path="/posts/:id" exact component={FullPost} />
        <Route path="/add-post" exact component={NewPost} />
      </Switch>
    </Layout>
  </div>
);

export default App;
