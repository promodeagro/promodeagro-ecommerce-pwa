import React, { useState, useEffect, useRef, useMemo } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,

  Configure,
  
  useSearchBox,
  useInstantSearch,
} from "react-instantsearch-hooks-web";
import { Clear as ClearIcon } from "@mui/icons-material";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchProductItemView from "../AddRemoveProductComponents/searchProductView";
import searchIcon from "../../assets/img/search-icon.png";
import { debounce } from "lodash";

// ✅ Initialize Algolia search client
const searchClient = algoliasearch("PBBD4F57NI", "27386ed97d577de7d0779a5f8a4c6be0");

const AlgoliaSearch = ({ showResult = true, onFocus = () => {}, matches = false, inputRef }) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const searchContainerRef = useRef(null); // Ref for detecting outside clicks

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

  // ✅ Handle clicks outside the search bar and results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSearchTerm(""); // Clear search input
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <InstantSearch searchClient={searchClient} indexName="products">
      <Box ref={searchContainerRef} className="search-container">
        <CustomSearchBox
          onFocus={onFocus}
          placeholder={placeholderTexts[placeholderIndex]}
          inputRef={inputRef}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />
        <SearchResults showResult={showResult} matches={matches} />
      </Box>
      <Configure restrictSearchableAttributes={["search_name", "sellingPrice"]} hitsPerPage={25} />
      <SearchResultsBg searchTerm={searchTerm} />
    </InstantSearch>
  );
};

const SearchResultsBg = ({ searchTerm }) => {
  const { results } = useInstantSearch();
  const hasResults = results?.nbHits > 0;

  return (
    <div
      className={`search-results-bg ${searchTerm && hasResults ? "active" : ""}`}
    />
  );
};

// ✅ Search Results Component
const SearchResults = ({ showResult, matches }) => {
  const { results } = useInstantSearch();
  const hasResults = results?.nbHits !== 0;
  const hasQuery = results?.query?.length > 0;

  return (
    <Box
      className={`search-results ${showResult && hasQuery ? "active" : ""}`}
      style={matches ? { width: "100vw", marginTop: "20px" } : {}}
    >
      {showResult && hasResults ? <CustomHits /> : <p className="no-data">No data found</p>}
    </Box>
  );
};

// ✅ Custom SearchBox (Debounced)
const CustomSearchBox = ({ onFocus, placeholder, inputRef, setSearchTerm, searchTerm }) => {
  const { query, refine } = useSearchBox();
  const [searchValue, setSearchValue] = useState(query || "");

  // ✅ Debounced refine function
  const debouncedRefine = useMemo(() => debounce(refine, 300), [refine]);

  useEffect(() => {
    debouncedRefine(searchValue);
    return () => debouncedRefine.cancel();
  }, [searchValue, debouncedRefine]);

  const handleClear = () => {
    setSearchValue("");
    setSearchTerm("");
    refine("");
  };

  useEffect(() => {
    if (searchTerm === "") setSearchValue("");
  }, [searchTerm]);

  return (
    <TextField
      id="outlined-search"
      className="search"
      variant="outlined"
      value={searchValue}
      onChange={(e) => {
        setSearchValue(e.target.value);
        setSearchTerm(e.target.value);
      }}
      onFocus={onFocus}
      inputRef={(ref) => {
        if (ref) {
          if (inputRef) inputRef.current = ref;
          ref.refine = refine;
        }
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <img src={searchIcon} alt="Search" />
          </InputAdornment>
        ),
        endAdornment: searchValue && (
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
