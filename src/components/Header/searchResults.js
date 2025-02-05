import React, { Component } from "react";
import {
  addItemToCart,
  updateItemToCart,
  deleteItemToCart,
} from "../../Redux/Cart/CartThunk";
import { productDetailsData } from "../../Redux/AllProducts/AllProductSlice";
import { connect } from "react-redux";
import {
  Box,
  CircularProgress,
  TextField,
  InputAdornment,
} from "@mui/material";
import searchIcon from "../../assets/img/search-icon.png";
import status from "../../Redux/Constants";
import _ from "lodash";
import { loginDetails } from "Views/Utills/helperFunctions";
import { fetchGlobalSearchItems } from "../../Redux/ProductFilters/ProductFiltersThunk";
import { withRouter } from "components/withRouter";
import { LocalStorageCartService } from "Services/localStorageCartService";
import SearchProductItemView from "../../components/AddRemoveProductComponents/searchProductView";
import { setSearchTerm } from "../../Redux/ProductFilters/ProductFiltersSlice";
import searchBackIcon from "../../assets/img/search-back-icon.png";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: window.matchMedia("(max-width: 600px)").matches,

      // addedProducts: [], // Track added products
      // searchTerm: "", // Track search term
      dataId: "",
      isUpdateIncrease: false,
      productsFiltersData: [],
      searchLoader: false,
      showResult: false,
      placeholderIndex: 0,
    };
    this.searchInputRef = React.createRef();
    this.debouncedSearch = _.debounce((params) => {
      this.props.fetchGlobalSearchItems(params);
    }, 1000);
    this.placeholderTexts = [
      'Search "Pui saag"',
      'Search "Laal Saag"',
      'Search "Gondharaj Nimbu"',
    ];
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        placeholderIndex:
          (prevState.placeholderIndex + 1) % this.placeholderTexts.length,
      }));
    }, 3000);
    window
    .matchMedia("(max-width: 600px)")
    .addEventListener("change", (e) => this.setState({ matches: e.matches }));

    
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.globalSearchRes.status !== this.props.globalSearchRes.status &&
      this.props.globalSearchRes.status === status.SUCCESS
    ) {
      if (this.props.globalSearchRes.data) {
        this.setState({
          searchLoader: false,
          productsFiltersData: this.props.globalSearchRes.data,
        });
      }
    }

    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.handleSearchNavigate();
    }
  }

  searchChange = (event) => {
    const searchTerm = event.target.value;
    this.props.setSearchTerm(searchTerm); // Dispatch to Redux
    if (searchTerm.length) {
      this.setState({ showResult: true });
    }
    this.setState({ searchTerm });

    if (searchTerm.trim() !== "") {
      this.setState({ searchLoader: true });
      const items = loginDetails();
      this.debouncedSearch({ query: searchTerm, userId: items?.userId });
    }
  };

  handleSearchNavigate = () => {
    this.props.setSearchTerm(""); // Reset Redux store
     if (this.searchInputRef.current) {
      this.searchInputRef.current.value = "";
    }
  };

  render() {
    const { cartItemsData, searchTerm } = this.props;
    const {
      matches,
       productsFiltersData,
      searchLoader,
      showResult,
      placeholderIndex,
    } = this.state;

    return (
      <>
        <Box className="search-container">
          <TextField
          onFocus={()=> this.props.navigate('/s')}
            id="outlined-search"
            // inputRef={this.searchInputRef}
            value={this.props.searchTerm} // Controlled by Redux
            className="search"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {window.location.pathname === '/s' ? (
                    <img style={{cursor:'pointer'}} onClick={() => this.props.navigate('/')} src={searchBackIcon} alt="" />
                  ) : (
                    <img src={searchIcon} alt="" />
                  )}

                </InputAdornment>
              ),
            }}
            onChange={this.searchChange}
            placeholder={this.placeholderTexts[placeholderIndex]}
          />
          
        </Box>
        
      </>
    );
  }
}

function mapStateToProps(state) {
  const { additems, cartItems, updateItems, deleteItems } = state.cartitem;
  const { shopCategoryData } = state.allproducts;
  const { globalSearchRes } = state.allproductsfilters;
  return {
    additems,
    cartItems,
    updateItems,
    deleteItems,
    shopCategoryData,
    searchTerm: state.allproductsfilters.searchTerm, 
    globalSearchRes,
  };
}

const mapDispatchToProps = {
  addItemToCart,
  updateItemToCart,
  deleteItemToCart,
  productDetailsData,
  fetchGlobalSearchItems,
  setSearchTerm,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchResults));
