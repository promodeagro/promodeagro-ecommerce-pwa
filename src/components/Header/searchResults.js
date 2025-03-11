import React, { Component } from "react";
import { Box } from "@mui/material";
import AlgoliaSearch from "./AlgoliaSearch";
import { withRouter } from "components/withRouter";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.searchInputRef = React.createRef();
    this.state = {
      matches: window.matchMedia("(max-width: 600px)").matches,
    };
  }

  componentDidMount() {
    window
      .matchMedia("(max-width: 600px)")
      .addEventListener("change", (e) => this.setState({ matches: e.matches }));
  }

  render() {
    const { matches } = this.state;

    return (
      <Box
        className="search-wrapper"
        style={matches ? { width: "100vw" } : { width: "650px" }}
      >
        <AlgoliaSearch inputRef={this.searchInputRef} />
      </Box>
    );
  }
}

export default withRouter(SearchResults);

