import React from "react";
import fetchService from "../Services/FetchService";

class ShowFilm extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
    };
  }

  getFilms = async () => {
    const idFilm = this.props.match.params.id;

    const response = await fetchService.get(
      `https://api.themoviedb.org/3/movie/${idFilm}?api_key=fa9396caaff48fdbfe275115fa4f5860&language=en-US`
    );
    console.log(response);

    this.setState({
      data: response.results,
      loading: false,
    });
  };
  componentDidMount() {
    this.getFilms();
  }
  render() {
    console.log(this.state.data);

    return <h1>araaaaaaaaaaaaa</h1>;
  }
}
export default ShowFilm;
