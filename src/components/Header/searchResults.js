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
      showResult: false,
    };
  }

  componentDidMount() {
    window
      .matchMedia("(max-width: 600px)")
      .addEventListener("change", (e) => this.setState({ matches: e.matches }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.searchBgClick();  
    }
  }

  searchBgClick = () => {
    this.setState({ showResult: false});
    if (this.searchInputRef.current) {
      this.searchInputRef.current.value = "";
    }
  };

  handleSearchFocus = () => {
    this.setState({ showResult: true });
  };

  render() {
    const { matches, showResult } = this.state;

    return (
      <Box
       className="search-wrapper" style={matches ? { width: '100vw' } : {width:'650px'}}>
        <AlgoliaSearch 
          showResult={showResult}
          searchBgClick={this.searchBgClick}
          onFocus={this.handleSearchFocus}
          matches={matches}
          inputRef={this.searchInputRef}
        />
      </Box>
    );
  }
}

export default withRouter(SearchResults);


