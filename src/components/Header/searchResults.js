import React, { Component } from "react";
import AlgoliaSearch from "./AlgoliaSearch";
import { withRouter } from "components/withRouter";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.searchInputRef = React.createRef();
  }

  render() {
    return <AlgoliaSearch inputRef={this.searchInputRef} />;
  }
}

export default withRouter(SearchResults);

