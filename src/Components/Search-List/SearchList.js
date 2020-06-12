import React from "react";
import fetchService from "../Services/FetchService";
import Loading from "../Loader/Loader";
import noMovie from "./noMovie.png";
import { withRouter } from "react-router-dom";
class SearchList extends React.Component {
  constructor() {
    super();
    this.state = {
      searchRes: [],
      url: "https://image.tmdb.org/t/p/w500",
      loading: true,
    };
  }
  getFilms = async () => {
    const searchText = this.props.match.params.value;

    const response = await fetchService.get(
      `https://api.themoviedb.org/3/search/multi?api_key=fa9396caaff48fdbfe275115fa4f5860&language=en-US&query=${searchText}`
    );

    this.setState({
      searchRes: response.results,
      loading: false,
    });
  };

  componentDidMount() {
    this.getFilms();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.value !== this.props.match.params.value) {
      this.getFilms();
    }
  }
  render() {
    const { loading, searchRes, url } = this.state;

    const TopFilms = searchRes.map((film) => {
      const urlPoster =
        film.media_type === "person" ? film.profile_path : film.poster_path;
      return (
        <div
          className="film"
          key={film.id}
          onClick={() => {
            this.props.history.push(`${film.id}`);
          }}
        >
          <img
            src={urlPoster !== null ? url + urlPoster : noMovie}
            alt={film.name || film.title}
          />
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

export default withRouter(SearchList);
