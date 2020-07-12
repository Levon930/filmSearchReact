import React from "react";
import fetchService from "../Services/FetchService";
import noMovie from "../Search-List/noMovie.png";
import Loading from "../Loader/Loader";
import "./SearchFilm.css";

class ShowFilm extends React.Component {
  constructor() {
    super();
    this.state = {
      item: {},
      loading: true,
      urlTrailer: [],
    };
  }

  getFilms = async () => {
    const idFilm = this.props.match.params.id;
    const data = sessionStorage.getItem("data_type");

    let url;
    let urlVid;

    if (data === "movie") {
      url = `https://api.themoviedb.org/3/movie/${idFilm}?api_key=fa9396caaff48fdbfe275115fa4f5860&language=en-US`;
      urlVid = `https://api.themoviedb.org/3/movie/${idFilm}/videos?api_key=fa9396caaff48fdbfe275115fa4f5860&language=en-US`;
    } else if (data === "tv") {
      url = `https://api.themoviedb.org/3/tv/${idFilm}?api_key=fa9396caaff48fdbfe275115fa4f5860&language=en-US`;
      urlVid = `https://api.themoviedb.org/3/tv/${idFilm}/videos?api_key=fa9396caaff48fdbfe275115fa4f5860&language=en-US`;
    }

    const response = await fetchService.get(url);
    this.getTrailer(urlVid);
    this.setState({
      item: response,
      loading: false,
    });
  };
  getTrailer = async (urlVid) => {
    const response = await fetchService.get(urlVid);

    this.setState({
      urlTrailer: response.results,
    });
  };
  componentWillUnmount() {
    sessionStorage.removeItem("data_type");
  }
  componentDidMount() {
    this.getFilms();
  }
  render() {
    const { item, loading, urlTrailer } = this.state;

    const trailer =
      urlTrailer.length !== 0 ? (
        urlTrailer.map((url) => {
          return (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${url.key}`}
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          );
        })
      ) : (
        <p>No Trailers</p>
      );

    const url = "https://image.tmdb.org/t/p/w500";
    const filName = item.original_title || item.name || item.original_title;
    const data = item.release_date || item.first_air_date;
    const poster = item.poster_path ? url + item.poster_path : noMovie;

    if (loading) {
      return (
        <div>
          <Loading />
        </div>
      );
    }
    return (
      <div>
        <div className="about">
          <img src={poster} alt={filName} />
          <div className="info">
            <p className="name">{filName}</p>
            <p>
              Date of release: <span>{data}</span>
            </p>
            <p class="lang">
              Original language:<span> {item.original_language}</span>
            </p>
            <p className="stat">
              Status:<span> {item.status}</span>
            </p>
            <p className="view">{item.overview}</p>
            {item.last_episode_to_air ? (
              <p class="season">
                {item.number_of_seasons} season
                {item.last_episode_to_air.episode_number} episodes
              </p>
            ) : (
              ""
            )}
            <p>
              <a href={item.homepage} target="_blank">
                Movie official page
              </a>
            </p>
            <p>
              <a
                className="imdb"
                href={`https://imdb.com/title/${item.imdb_id}`}
                target="_blank"
              >
                Link to imdb{" "}
              </a>
            </p>
          </div>
        </div>
        <div className="trailer">{trailer}</div>
      </div>
    );
  }
}
export default ShowFilm;
