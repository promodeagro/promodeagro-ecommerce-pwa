import React, { useState, useEffect, useRef, useMemo } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Configure,
  useHits,
  useSearchBox,
  useInstantSearch
} from "react-instantsearch-hooks-web";
import { Clear as ClearIcon } from "@mui/icons-material"; // Import Clear icon
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchProductItemView from "../AddRemoveProductComponents/searchProductView";
import searchIcon from "../../assets/img/search-icon.png";
import { debounce } from "lodash";

// ✅ Initialize Algolia search client
const searchClient = algoliasearch(
  "PBBD4F57NI", // ALGOLIA_APP_ID
  "27386ed97d577de7d0779a5f8a4c6be0" 
);

const AlgoliaSearch = ({ showResult = true, onFocus = () => {}, matches = false, inputRef, searchBgClick }) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const searchBoxRef = useRef(null);

  const placeholderTexts = [
    'Search "Pui saag"',
    'Search "Laal Saag"',
    'Search "Gondharaj Nimbu"',
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholderTexts.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="products">
        <Box className="search-container">
          <CustomSearchBox
            onFocus={onFocus}
            placeholder={placeholderTexts[placeholderIndex]}
            inputRef={(ref) => {
              searchBoxRef.current = ref;
              if (inputRef) inputRef.current = ref;
            }}
          />
          <SearchResults showResult={showResult} matches={matches} />
        </Box>
        <Configure restrictSearchableAttributes={["search_name", "sellingPrice"]} hitsPerPage={3} />
      </InstantSearch>
      <Box className="search-results-bg" onClick={searchBgClick} />
    </>
  );
};

// ✅ Search Results Component
const SearchResults = ({ showResult, matches }) => {
  const { results } = useInstantSearch();
  const hasResults = results?.nbHits !== 0;
  const hasQuery = results?.query?.length > 0;

  return (
    <Box className={`search-results ${showResult && hasQuery ? "active" : ""}`} style={matches ? { width: "100vw", marginTop: "20px" } : {}}>
      {showResult && hasResults ? <CustomHits /> : <p className="no-data">No data found</p>}
    </Box>
  );
};

// ✅ Custom SearchBox (Debounced)
const CustomSearchBox = ({ onFocus, placeholder, inputRef }) => {
  const { query, refine } = useSearchBox();
  const [searchTerm, setSearchTerm] = useState(query || "");

  // ✅ Wrap debouncedRefine in useMemo to prevent re-creation
  const debouncedRefine = useMemo(() => debounce(refine, 300), [refine]);

  useEffect(() => {
    debouncedRefine(searchTerm);
    return () => debouncedRefine.cancel();
  }, [searchTerm, debouncedRefine]);

  const handleClear = () => {
    setSearchTerm("");
    refine("");
  };

  return (
    <TextField
      id="outlined-search"
      className="search"
      variant="outlined"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onFocus={onFocus}
      inputRef={(ref) => {
        if (ref) {
          inputRef?.(ref);
          ref.refine = refine;
        }
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <img src={searchIcon} alt="Search" />
          </InputAdornment>
        ),
        endAdornment: searchTerm && (
          <InputAdornment position="end">
            <ClearIcon onClick={handleClear} style={{ cursor: "pointer" }} />
          </InputAdornment>
        ),
      }}
      placeholder={placeholder}
    />
  );
};

// ✅ Custom Hits Component
const CustomHits = () => {
  const { results } = useInstantSearch();
  const hits = results?.hits || [];
  const empty = results.nbHits === 0;

  return empty ? <p className="no-data">No data found</p> : <SearchProductItemView productList={hits} />;
};

export default AlgoliaSearch;
