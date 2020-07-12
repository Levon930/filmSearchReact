import React from "react";
import "./Search.css";
import { withRouter } from "react-router-dom";
class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
    };
  }
  getValue = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  render() {
    const { history } = this.props;

    const { value } = this.state;
    return (
      <div className="jumbotron">
        <h3 className="text-center">Search films</h3>
        <form
          id="search-form"
          onSubmit={(e) => e.preventDefault()}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              history.push(`/${value}`);
            }
          }}
        >
          <input
            type="search"
            name="#"
            id="searchText"
            placeholder="What movie are you looking for?"
            onChange={this.getValue}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.target.value = "";
              }
            }}
          />
        </form>
      </div>
    );
  }
}
export default withRouter(Search);
