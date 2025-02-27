import React, { Component } from "react";
import { InstantSearch, Configure, connectSearchBox, connectHits, connectStateResults } from "react-instantsearch-dom";
import { Box, TextField, InputAdornment, CircularProgress } from "@mui/material";
import algoliasearch from "algoliasearch";
import SearchProductItemView from "../AddRemoveProductComponents/searchProductView";
import searchIcon from "../../assets/img/search-icon.png";

class AlgoliaSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchClient: null, // Store Algolia search client
      loading: true, // Loading state for API keys
      placeholderIndex: 0,
      searchBoxKey: 0, // To force re-render of search box
    };
    this.searchBoxRef = React.createRef();

    this.placeholderTexts = [
      'Search "Pui saag"',
      'Search "Laal Saag"',
      'Search "Gondharaj Nimbu"',
    ];
  }

  componentDidMount() {
    this.fetchAlgoliaKeys();
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        placeholderIndex: (prevState.placeholderIndex + 1) % this.placeholderTexts.length,
      }));
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  async fetchAlgoliaKeys() {
    try {
      const response = await fetch("https://ijy06nbhob.execute-api.ap-south-1.amazonaws.com/getSecrets");
      const data = await response.json();
   
      
      if (data.ALGOLIA_APP_ID && data.ALGOLIA_API_KEY) {
        this.setState({
          searchClient: algoliasearch(data.ALGOLIA_APP_ID, data.ALGOLIA_API_KEY),
          loading: false,
        });
      } else {
        console.error("Invalid API response:", data);
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error("Error fetching Algolia keys:", error);
      this.setState({ loading: false });
    }
  }


  

  render() {
    const { showResult, onFocus, matches, inputRef,searchBgClick } = this.props;
    const { placeholderIndex, searchBoxKey, searchClient, loading } = this.state;

    if (loading) {
      return <CircularProgress />;
    }

    if (!searchClient) {
      return <p>Error initializing search. Please try again later.</p>;
    }

    return (
      <>
        <InstantSearch searchClient={searchClient} indexName="products" key={searchBoxKey}>
          <Box className="search-container">
            <CustomSearchBox
              onFocus={onFocus}
              placeholder={this.placeholderTexts[placeholderIndex]}
              inputRef={(ref) => {
                this.searchBoxRef.current = ref;
                if (inputRef) inputRef.current = ref;
              }}
            />
            <SearchResults>
              {({ hasResults, hasQuery }) => (
                <Box className={`search-results ${showResult && hasQuery ? "active" : ""}`} style={matches ? { width: "100vw" } : {}}>
                  {showResult && hasResults && <CustomHits />}
                </Box>
              )}
            </SearchResults>
          </Box>
          <Configure hitsPerPage={5} />
        </InstantSearch>
        <Box className='search-results-bg' onClick={searchBgClick} />
      </>
    );
  }
}

// Search Results Component
const SearchResults = connectStateResults(({ searchState, searchResults, children }) => {
  const hasResults = searchResults?.nbHits !== 0;
  const hasQuery = searchState?.query?.length > 0;
  return children({ hasResults, hasQuery, searchResults });
});

// Custom Search Box
const CustomSearchBox = connectSearchBox(({ currentRefinement, refine, onFocus, placeholder, inputRef }) => {
  return (
    <TextField
      id="outlined-search"
      className="search"
      variant="outlined"
      value={currentRefinement}
      onChange={(e) => refine(e.target.value)}
      onFocus={onFocus}
      inputRef={(ref) => {
        if (ref) {
          inputRef(ref);
          ref.refine = refine; // Attach refine function
        }
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <img src={searchIcon} alt="Search" />
          </InputAdornment>
        ),
      }}
      placeholder={placeholder}
    />
  );
});


// Search Hits Component
const CustomHits = connectHits(({ hits }) => (
  hits.length === 0 ? <p className="no-data">No data found</p> : <SearchProductItemView productList={hits} />
));

export default AlgoliaSearch;