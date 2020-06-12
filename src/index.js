import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./index.css";
import Header from "./Components/Header/Header";
import Search from "./Components/Search/Search";
import TopFilms from "./Components/Top-Films/TopFilms";
import SearchList from "./Components/Search-List/SearchList";
import ShowFilm from "./Components/Search-film/SearchFilm";

ReactDOM.render(
  <>
    <BrowserRouter>
      <div className="container">
        <Header />
        <Search />
        <Switch>
          <Route path="/" component={TopFilms} exact />
          <Route path="/:value" component={SearchList} exact />
          <Route path="/:value/:id" component={ShowFilm} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </div>
    </BrowserRouter>
    ,
  </>,
  document.getElementById("root")
);
