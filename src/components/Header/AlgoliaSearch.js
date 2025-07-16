import React, { useState, useEffect, useRef, useMemo } from "react";
import { useLocation } from "react-router-dom";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Configure,
  useSearchBox,
  useInstantSearch,
} from "react-instantsearch-hooks-web";
import { loginDetails } from "../../Views/Utills/helperFunctions";

import { useMediaQuery } from "@mui/material";
import { Clear as ClearIcon } from "@mui/icons-material";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchProductItemView from "../AddRemoveProductComponents/searchProductView";
import searchIcon from "../../assets/img/searchiconsvg.svg";
import { debounce } from "lodash";

const searchClient = algoliasearch("PBBD4F57NI", "27386ed97d577de7d0779a5f8a4c6be0");

const AlgoliaSearch = ({ showResult = true, onFocus = () => {}, inputRef }) => {
  const matches = useMediaQuery("(max-width: 650px)");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const searchContainerRef = useRef(null);
  const location = useLocation();
  const isLoggedIn = loginDetails()?.token;

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

  // ✅ Close search on route change
  useEffect(() => {
    setSearchTerm("");
  }, [location.key]);

  // ✅ Handle clicks outside the search bar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle mobile back button press
  useEffect(() => {
    const handlePopState = () => {
      if (inputRef?.current) {
        inputRef.current.blur();
      }
      setSearchTerm("");
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [inputRef]);

  // Add effect to control body scroll
  useEffect(() => {
    if (searchTerm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [searchTerm]);

  // Handle touch events to close keyboard
  useEffect(() => {
    const handleTouchStart = () => {
      if (inputRef?.current) {
        inputRef.current.blur();
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    return () => document.removeEventListener('touchstart', handleTouchStart);
  }, [inputRef]);

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
        <SearchResults showResult={showResult} matches={matches} searchTerm={searchTerm} setSearchTerm={setSearchTerm} isLoggedIn={isLoggedIn} />
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

const SearchResults = ({ showResult, matches, searchTerm, setSearchTerm, isLoggedIn }) => {
  const { results } = useInstantSearch();
  const hasResults = results?.nbHits !== 0;
  const hasQuery = results?.query?.length > 0;

  return (
    <Box
      className={`search-results ${showResult && hasQuery ? "active" : ""}`}
      style={matches ? { width: "100vw", marginTop: isLoggedIn?"55px":"20px" } : {}}
    >
      {showResult && hasResults ? <CustomHits searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> : <p className="no-data">No data found</p>}
    </Box>
  );
};

const CustomSearchBox = ({ onFocus, placeholder, inputRef, setSearchTerm, searchTerm }) => {
  const { query, refine } = useSearchBox();
  const [searchValue, setSearchValue] = useState(query || "");
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
            <img src={searchIcon} alt="Search" style={{height:"20px", width:"20px"}} />
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

const CustomHits = ({ searchTerm, setSearchTerm }) => {
  const { results } = useInstantSearch();
  const hits = results?.hits || [];
  const empty = results.nbHits === 0;

  return empty ? (
    <p className="no-data">No data found</p>
  ) : (
    <SearchProductItemView 
      productList={hits} 
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />
  );
};

export default AlgoliaSearch;