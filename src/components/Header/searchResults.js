import React, { Component } from "react";
import {
  addItemToCart,
  fetchCartItems,
  updateItemToCart,
  deleteItemToCart,
} from "../../Redux/Cart/CartThunk";
import { productDetailsData } from "../../Redux/AllProducts/AllProductSlice";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Grid,
  CircularProgress,
  TextField,
  InputAdornment,
} from "@mui/material";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import StarIcon from "@mui/icons-material/Star";
import priceIcon from "../../assets/img/price-icon.png";
import noImage from "../../assets/img/no-image.png";
import searchIcon from "../../assets/img/search-icon.png";
import status from "../../Redux/Constants";
import _ from "lodash";
import { loginDetails } from "Views/Utills/helperFunctions";
import { Link } from "react-router-dom";
import { allProductsFilters } from "../../Redux/ProductFilters/ProductFiltersThunk";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedProducts: [], // Track added products
      quantities: {}, // Track quantities for each product
      searchTerm: "", // Track search term
      dataId: "",
      isUpdateIncrease: false,
    };
    this.searchInputRef = React.createRef();
    this.debouncedSearch = _.debounce(this.props.allProductsFilters, 2000);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.additems.status !== this.props.additems.status &&
      this.props.additems.status === status.SUCCESS &&
      this.props.additems.data
    ) {
      this.resetState();
      this.fetchUserCartItems();
    }

    if (
      prevProps.updateItems.status !== this.props.updateItems.status &&
      this.props.updateItems.status === status.SUCCESS &&
      this.props.updateItems.data
    ) {
      this.resetState();
      this.fetchUserCartItems();
    }

    if (
      prevProps.deleteItems.status !== this.props.deleteItems.status &&
      this.props.deleteItems.status === status.SUCCESS &&
      this.props.deleteItems.data
    ) {
      this.resetState();
      this.fetchUserCartItems();
    }
  }

  resetState() {
    this.setState({
      addedProducts: [],
      quantities: {},
    });
  }

  fetchUserCartItems() {
    const items = loginDetails();
    this.props.fetchCartItems({
      userId: items.userId,
    });
  }

  handleAddToCart(id) {
    const items = loginDetails();
    this.setState({ dataId: id });
    if (items?.userId) {
      this.props.addItemToCart({
        userId: items.userId,
        productId: id,
        quantity: "1",
      });
    } else {
      this.props.navigate("/signin");
    }
  }

  handleCategories(searchData, dataId, isUpdateIncrease, cartItemsData) {
    return searchData.map((item) => {
      let itemId = cartItemsData?.find((x) => x.ProductId === item.id);
      return (
        <Box className="result-product" key={item.id}>
          <Grid container spacing={2} alignItems={"center"}>
            <Grid item xs={3} sm={3} md={3} lg={3}>
              <Box
                className="image"
                onClick={() => this.navigateToProductDetails(item, itemId)}
              >
                <img src={item?.image ? item?.image : noImage} alt="" />
              </Box>
            </Grid>
            <Grid item xs={5} sm={5} md={5} lg={5}>
              <Box
                className="name"
                onClick={() => this.navigateToProductDetails(item, itemId)}
              >
                <Link to={`/product-details/${item.id}`}>{item?.name}</Link>
              </Box>
              <Box className="price-ratting">
                <Box className="price">
                  <img src={priceIcon} alt="" /> {item?.price}
                  <span>{item?.mrp}</span>
                </Box>
                <Box className="ratting">
                  <StarIcon /> {item?.ratings}
                </Box>
              </Box>
              <Box className="select">{item.unit}</Box>
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4}>
              {itemId ? (
                <Box className="number-input-container">
                  {itemId && itemId.Quantity !== 0 ? (
                    <Box
                      className="symbol"
                      onClick={() => {
                        if (itemId?.ProductId) {
                          let d = itemId.Quantity;
                          this.handleQuantityChange(
                            itemId.ProductId,
                            -1,
                            Number(d)
                          );
                        } else {
                          this.handleQuantityChange(item.id, -1);
                        }
                      }}
                    >
                      {this.isLoading(item.id, isUpdateIncrease, false) ? (
                        <CircularProgress
                          className="common-loader plus-icon"
                          size={24}
                        />
                      ) : (
                        "-"
                      )}
                    </Box>
                  ) : null}
                  <Box className="Number">{itemId?.Quantity}</Box>
                  <Box
                    className="symbol"
                    onClick={() => {
                      if (itemId?.ProductId) {
                        let d = itemId.Quantity;
                        this.handleQuantityChange(
                          itemId.ProductId,
                          1,
                          Number(d)
                        );
                      } else {
                        this.handleQuantityChange(item.id, 1);
                      }
                    }}
                  >
                    {this.isLoading(item.id, isUpdateIncrease, true) ? (
                      <CircularProgress className="common-loader plus-icon" />
                    ) : (
                      "+"
                    )}
                  </Box>
                </Box>
              ) : (
                <Box className="add-cart">
                  <Button
                    variant="outlined"
                    onClick={() => this.handleAddToCart(item.id)}
                    disabled={this.isLoading(item.id)}
                    endIcon={
                      this.isLoading(item.id) ? (
                        <CircularProgress className="common-loader" />
                      ) : null
                    }
                  >
                    Add to cart
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      );
    });
  }

  isLoading(id, isUpdateIncrease = false, isIncrement = true) {
    const { additems, deleteItems, updateItems } = this.props;
    const { dataId } = this.state;
    if (id !== dataId) return false;
    if (additems.status === status.IN_PROGRESS) return true;
    if (
      (deleteItems.status === status.IN_PROGRESS && !isIncrement) ||
      (updateItems.status === status.IN_PROGRESS &&
        isIncrement === isUpdateIncrease)
    )
      return true;
    return false;
  }

  navigateToProductDetails(item, itemId) {
    let data = _.cloneDeep(item);
    data.Quantity = itemId?.Quantity ? itemId?.Quantity : 0;
    this.props.productDetailsData(data);
    this.props.navigate(`/product-details/${item.id}`);
    this.searchBgClick();
  }

  handleQuantityChange(id, increment, productQuantity) {
    const items = loginDetails();
    const isUpdateIncrease = increment > 0;
    this.setState({ dataId: id, isUpdateIncrease });

    let cloneQuantities = _.cloneDeep(this.state.quantities);
    productQuantity = productQuantity + increment;
    if (!productQuantity) {
      cloneQuantities[id] = cloneQuantities[id] + increment;
    }

    if (cloneQuantities[id] || productQuantity !== 0) {
      this.props.updateItemToCart({
        userId: items.userId,
        productId: id,
        quantity: cloneQuantities[id]
          ? cloneQuantities[id]
          : productQuantity.toString(),
      });
    } else {
      this.props.deleteItemToCart({
        userId: items.userId,
        productId: id,
      });
    }
  }

  searchChange = (event) => {
    const searchTerm = event.target.value;
    this.setState({ searchTerm });

    if (searchTerm.trim() !== "") {
      this.debouncedSearch({ name: searchTerm });
    }
  };

  searchBgClick = () => {
    this.setState({ searchTerm: "" });
    if (this.searchInputRef.current) {
      this.searchInputRef.current.value = "";
    }
  };

  handleContextMenu = (event) => {
    event.preventDefault();
  };

  render() {
    const { data, cartItemsData } = this.props;
    const { searchTerm, dataId, isUpdateIncrease } = this.state;

    const searchData = searchTerm
      ? data.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

    return (
      <>
        <Box className="search-container">
          <TextField
            id="outlined-search"
            inputRef={this.searchInputRef}
            className="search"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={searchIcon} alt="" />
                </InputAdornment>
              ),
            }}
            onChange={this.searchChange}
            placeholder="Search Your favorite veggies...  "
          />
          <Box
            className={`search-results ${
              searchTerm && searchData ? "active" : ""
            }`}
          >
            {searchTerm && searchData.length === 0 ? (
              <p className="no-data">There is no data</p>
            ) : (
              this.handleCategories(
                searchData,
                dataId,
                isUpdateIncrease,
                cartItemsData
              )
            )}
          </Box>
        </Box>
        <Box
          className={`search-results-bg ${
            searchTerm && searchData ? "active" : ""
          }`}
          onClick={this.searchBgClick}
        ></Box>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { additems, cartItems, updateItems, deleteItems } = state.cartitem;
  const { shopCategoryData } = state.allproducts;
  return { additems, cartItems, updateItems, deleteItems, shopCategoryData };
}

const mapDispatchToProps = {
  addItemToCart,
  fetchCartItems,
  updateItemToCart,
  deleteItemToCart,
  productDetailsData,
  allProductsFilters,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(SearchResults));
