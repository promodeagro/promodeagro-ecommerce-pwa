import React, { Component } from "react";
import { InstantSearch, Configure, connectSearchBox, connectHits, connectStateResults } from "react-instantsearch-dom";
import { Box, TextField, InputAdornment, CircularProgress } from "@mui/material";
import algoliasearch from "algoliasearch";
import SearchProductItemView from "../AddRemoveProductComponents/searchProductView";
import searchIcon from "../../assets/img/search-icon.png";

// Environment variables (Ensure they're set in .env)
const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,  
  process.env.REACT_APP_ALGOLIA_SEARCH_KEY

);

// State-based search results handling
const SearchResults = connectStateResults(({ searchState, searchResults, children }) => {
  const hasResults = searchResults?.nbHits !== 0;
  const hasQuery = searchState?.query?.length > 0;

  return children({ hasResults, hasQuery, searchResults });
});

// Custom Search Box
const CustomSearchBox = connectSearchBox(({ currentRefinement, refine, onFocus, placeholder, inputRef, onClear }) => (
  <TextField
    id="outlined-search"
    className="search"
    variant="outlined"
    value={currentRefinement}
    onChange={(e) => refine(e.target.value)}
    onFocus={onFocus}
    inputRef={inputRef}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <img src={searchIcon} alt="Search" />
        </InputAdornment>
      ),
    }}
    placeholder={placeholder}
  />
));

// Search Hits Component
const CustomHits = connectHits(({ hits }) => (
  hits.length === 0 ? <p className="no-data">No data found</p> : <SearchProductItemView productList={hits} />
));

class AlgoliaSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      placeholderIndex: 0,
      searchBoxKey: 0 // Add this to force re-render of search box
    };
    // Store reference to the search box
    this.searchBoxRef = React.createRef();

    this.placeholderTexts = [
      'Search "Pui saag"',
      'Search "Laal Saag"',
      'Search "Gondharaj Nimbu"',
    ];
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        placeholderIndex: (prevState.placeholderIndex + 1) % this.placeholderTexts.length,
      }));
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleBackgroundClick = () => {
    // Force re-render of search box with empty state
    this.setState(prevState => ({
      searchBoxKey: prevState.searchBoxKey + 1
    }));
    
    if (this.searchBoxRef.current) {
      this.searchBoxRef.current.value = '';
    }
    
    this.props.searchBgClick?.();
  };

  render() {
    const { showResult, onFocus, matches, inputRef } = this.props;
    const { placeholderIndex, searchBoxKey } = this.state;

    return (
      <>
        <InstantSearch 
          searchClient={searchClient} 
          indexName="products"
          key={searchBoxKey} // Force re-render of InstantSearch
        >
          <Box className="search-container">
            <CustomSearchBox
              onFocus={onFocus}
              placeholder={this.placeholderTexts[placeholderIndex]}
              inputRef={(ref) => {
                // Store ref both locally and pass to parent
                this.searchBoxRef.current = ref;
                if (inputRef) inputRef.current = ref;
              }}
            />
            <SearchResults>
              {({ hasResults, hasQuery }) => (
                <Box
                  className={`search-results ${showResult && hasQuery ? "active" : ""}`}
                  style={matches ? { width: "100vw" } : {}}
                >
                  {showResult && hasResults && <CustomHits />}
                </Box>
              )}
            </SearchResults>
          </Box>
          <Configure hitsPerPage={5} />
        </InstantSearch>
        <Box 
          className={`search-results-bg ${showResult ? "active" : ""}`} 
          onClick={this.handleBackgroundClick}
        />
      </>
    );
  }
}

export default AlgoliaSearch;
