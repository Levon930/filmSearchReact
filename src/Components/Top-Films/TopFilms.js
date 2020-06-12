import React from "react";

import fetchService from "../Services/FetchService";
import "./TopFilms.css";
import Loading from "../Loader/Loader";

class TopFilms extends React.Component {
  constructor() {
    super();
    this.state = {
      top: [],
      url: "https://image.tmdb.org/t/p/w500",
      loading: true,
    };
  }

  getFilms = async () => {
    const response = await fetchService.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=fa9396caaff48fdbfe275115fa4f5860`
    );

    this.setState({
      top: response.results,
      loading: false,
    });
  };

  componentDidMount() {
    this.getFilms();
  }

  render() {
    const { loading, top, url } = this.state;

    const TopFilms = top.map((film) => {
      return (
        <div className="film" key={film.id}>
          <img src={url + film.poster_path} />
          <p>{film.name || film.title}</p>
        </div>
      );
    });
    if (loading) {
      return (
        <div>
          <Loading />
        </div>
      );
    }
    return (
      <div className="tops">
        <div className="allTopFilm">{TopFilms}</div>
      </div>
    );
  }
}
export default TopFilms;
