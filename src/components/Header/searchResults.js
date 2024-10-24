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
  Button,
  Grid,
  CircularProgress,
  TextField,
  InputAdornment,
  FormControl,
  NativeSelect,
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
import { fetchGlobalSearchItems } from "../../Redux/ProductFilters/ProductFiltersThunk";
import { withRouter } from "components/withRouter";
import { LocalStorageCartService } from "Services/localStorageCartService";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // addedProducts: [], // Track added products
      quantities: {}, // Track quantities for each product
      searchTerm: "", // Track search term
      dataId: "",
      isUpdateIncrease: false,
      productsFiltersData: [],
      qauntityUnits: [],
      searchLoader: false,
      showResult: false,
      unitIdPrices: [],
    };
    this.searchInputRef = React.createRef();
    this.debouncedSearch = _.debounce((params) => {
      this.props.fetchGlobalSearchItems(params);
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.globalSearchRes.status !== this.props.globalSearchRes.status &&
      this.props.globalSearchRes.status === status.SUCCESS
    ) {
      if (this.props.globalSearchRes.data) {
        this.setState({
          dataId: "",
          searchLoader: false,
          productsFiltersData: this.props.globalSearchRes.data,
          isUpdateIncrease: false,
        });
      }
    }

    // if (
    //   prevProps.additems.status !== this.props.additems.status &&
    //   this.props.additems.status === status.SUCCESS &&
    //   this.props.additems.data
    // ) {
    //   this.resetState();
    //   this.fetchUserCartItems();
    // }

    // if (
    //   prevProps.updateItems.status !== this.props.updateItems.status &&
    //   this.props.updateItems.status === status.SUCCESS &&
    //   this.props.updateItems.data
    // ) {
    //   this.resetState();
    //   this.fetchUserCartItems();
    // }

    // if (
    //   prevProps.deleteItems.status !== this.props.deleteItems.status &&
    //   this.props.deleteItems.status === status.SUCCESS &&
    //   this.props.deleteItems.data
    // ) {
    //   this.resetState();
    //   this.fetchUserCartItems();
    // }

    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.searchBgClick();
    }
  }

  resetState() {
    this.setState({
      // addedProducts: [],
      quantities: {},
    });
  }

  fetchUserCartItems() {
    const items = loginDetails();
    if (items?.userId && this.state.searchTerm) {
      this.props.fetchGlobalSearchItems({
        query: this.state.searchTerm,
        userId: items?.userId,
      });
    }
  }

  handleAddToCart(id, qty) {
    const items = loginDetails();
    this.setState({ dataId: id });
    if (items?.userId) {
      // this.props.addItemToCart({
      //   userId: items.userId,
      //   productId: id,
      //   quantity: 1,
      //   quantityUnits: this.state.qauntityUnits[id]
      //     ? parseInt(this.state.qauntityUnits[id])
      //     : qty,
      // });
      LocalStorageCartService.addItem(id, {
        productId: id,
        quantity: 1,
        quantityUnits: this.state.qauntityUnits[id]
          ? parseInt(this.state.qauntityUnits[id])
          : qty,
      });
    } else {
      this.props.navigate("/signin");
    }
  }

  handleCategories(
    sortedData,
    dataId,
    cartItems,
    isUpdateIncrease,
    quantities,
    cartItemsData,
    qauntityUnits,
    unitIdPrices
  ) {
    let returnData =
      sortedData.length > 0 &&
      sortedData.map((item) => {
        let prices = unitIdPrices.find((d) => d.id === item.id);
        return (
          <Box
            className="result-product"
            key={item.id}
            onContextMenu={this.handleContextMenu}
          >
            <Grid container spacing={2} alignItems={"center"}>
              <Grid item xs={3} sm={3} md={3} lg={3}>
                <Box
                  className="image"
                  onClick={() => {
                    this.props.navigate(
                      `/product-details/${item.category}/${item.name}/${item.id}`
                    );
                  }}
                >
                  {/* <Link to={`/product-details/${item.id}`}> */}
                  <img src={item.image ? item.image : noImage} alt="" />
                  {/* </Link> */}
                </Box>
              </Grid>
              <Grid item xs={5} sm={5} md={5} lg={5}>
                <Box
                  className="name"
                  onClick={() => {
                    this.props.navigate(
                      `/product-details/${item.category}/${item.name}/${item.id}`
                    );
                  }}
                >
                  <Link>{item.name}</Link>
                </Box>
                <Box className="price-ratting">
                  <Box className="price">
                    <img src={priceIcon} alt="" />
                    {item?.cartItem?.selectedQuantityUnitprice
                      ? item?.cartItem?.selectedQuantityUnitprice
                      : prices?.price?.price
                      ? prices?.price?.price
                      : item?.price}

                    <span>
                      {" "}
                      {item?.cartItem?.selectedQuantityUnitMrp
                        ? item?.cartItem?.selectedQuantityUnitMrp
                        : prices?.price?.mrp
                        ? prices?.price?.mrp
                        : item?.mrp}
                    </span>
                  </Box>
                  {item.ratings && (
                    <Box className="ratting">
                      <StarIcon /> {item.ratings}
                    </Box>
                  )}
                </Box>
                {item?.unitPrices?.length > 0 ? (
                  <Box className="select">
                    <FormControl fullWidth>
                      <NativeSelect
                        value={
                          qauntityUnits[item.id] ||
                          item?.cartItem?.QuantityUnits ||
                          ""
                        }
                        onChange={(event) => this.handleQuantity(event, item)}
                      >
                        {item.unitPrices.map((unitItem, index) => {
                          return (
                            <option key={index} value={unitItem.qty}>
                              {unitItem?.qty} {item?.unit}
                            </option>
                          );
                        })}
                      </NativeSelect>
                    </FormControl>
                  </Box>
                ) : (
                  <Box className="select">{item.unit}</Box>
                )}
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                {cartItems && cartItems[item?.id] ? (
                  <Box className="number-input-container">
                    {cartItems[item?.id]?.quantity !== 0 ? (
                      <Box
                        className="symbol"
                        onClick={() => {
                          let unitqty = "";
                          if (item?.unitPrices?.length > 0) {
                            unitqty = cartItems[item?.id]?.quantityUnits
                              ? cartItems[item?.id]?.quantityUnits
                              : item?.unitPrices[0]?.qty;
                          } else {
                            unitqty = 1;
                          }
                          if (cartItems[item?.id]?.productId) {
                            let d = cartItems[item?.id]?.quantity;
                            this.handleQuantityChange(
                              cartItems[item?.id]?.productId,
                              -1,
                              Number(d),
                              unitqty
                            );
                          } else {
                            this.handleQuantityChange(item.id, -1, "", unitqty);
                          }
                        }}
                      >
                        {/* {(this.props.deleteItems.status ===
                          status.IN_PROGRESS ||
                          this.props.globalSearchRes.status ===
                            status.IN_PROGRESS ||
                          this.props.updateItems.status ===
                            status.IN_PROGRESS) &&
                        item.id === dataId &&
                        !isUpdateIncrease ? (
                          <CircularProgress
                            className="common-loader plus-icon"
                            size={24}
                          />
                        ) : (
                          "-"
                        )} */}
                        -
                      </Box>
                    ) : (
                      <></>
                    )}

                    <Box className="Number">
                      {cartItems[item?.id]?.quantity}
                    </Box>
                    <Box
                      className="symbol"
                      onClick={() => {
                        let unitqty = "";
                        if (item?.unitPrices?.length > 0) {
                          unitqty = cartItems[item?.id]?.quantityUnits
                            ? cartItems[item?.id]?.quantityUnits
                            : item?.unitPrices[0]?.qty;
                        } else {
                          unitqty = 1;
                        }

                        if (cartItems[item?.id]?.productId) {
                          let d = cartItems[item?.id]?.quantity;
                          this.handleQuantityChange(
                            cartItems[item?.id]?.productId,
                            1,
                            Number(d),
                            unitqty
                          );
                        } else {
                          this.handleQuantityChange(item.id, 1, "", unitqty);
                        }
                      }}
                    >
                      {/* {(this.props.updateItems.status === status.IN_PROGRESS ||
                        this.props.globalSearchRes.status ===
                          status.IN_PROGRESS) &&
                      item.id === dataId &&
                      isUpdateIncrease ? (
                        <CircularProgress className="common-loader plus-icon" />
                      ) : (
                        "+"
                      )} */}
                      +
                    </Box>
                  </Box>
                ) : (
                  <Box className="add-cart">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        let unitqty = "";
                        if (item?.unitPrices?.length > 0) {
                          unitqty = item?.unitPrices[0]?.qty;
                        } else {
                          unitqty = 1;
                        }

                        this.handleAddToCart(item.id, unitqty);
                      }}
                      // disabled={
                      //   this.props.additems.status === status.IN_PROGRESS &&
                      //   item.id === this.state.dataId
                      // }
                      // endIcon={
                      //   this.props.additems.status == status.IN_PROGRESS &&
                      //   item.id == this.state.dataId ? (
                      //     <CircularProgress className="common-loader" />
                      //   ) : (
                      //     <></>
                      //   )
                      // }
                    >
                      Add to cart
                    </Button>
                  </Box>
                )}
              </Grid>
            </Grid>
            {/* {item.savingsPercentage && (
              <Box className="sale">Sale {item.savingsPercentage}%</Box>
            )}

            <Box className="icon">
              <TurnedInNotOutlinedIcon />
            </Box> */}
          </Box>
        );
      });

    if (returnData.length > 0) {
      return returnData;
    } else {
      return <p className="no-data">There is no data</p>;
    }
  }

  // isLoading(id, isUpdateIncrease = false, isIncrement = true) {
  //   const { additems, deleteItems, updateItems } = this.props;
  //   const { dataId } = this.state;
  //   if (id !== dataId) return false;
  //   if (additems.status === status.IN_PROGRESS) return true;
  //   if (
  //     (deleteItems.status === status.IN_PROGRESS && !isIncrement) ||
  //     (updateItems.status === status.IN_PROGRESS &&
  //       isIncrement === isUpdateIncrease)
  //   )
  //     return true;
  //   return false;
  // }

  navigateToProductDetails(item, itemId) {
    let data = _.cloneDeep(item);
    data.Quantity = itemId?.Quantity ? itemId?.Quantity : 0;
    this.props.productDetailsData(data);
    this.props.navigate(`/product-details/${item.id}`);
    this.searchBgClick();
  }

  handleQuantityChange(id, increment, productQuantity = 0, qty) {
    const items = loginDetails();
    if (increment < 0 && productQuantity != 0) {
      this.setState({ isUpdateIncrease: false });
    } else if (productQuantity > 0) {
      this.setState({ isUpdateIncrease: true });
    }
    this.setState({
      dataId: id,
    });

    productQuantity = productQuantity + increment;
    if (productQuantity > 0) {
      // this.props.updateItemToCart({
      //   userId: items.userId,
      //   productId: id,
      //   quantity: parseInt(productQuantity),
      //   quantityUnits: this.state.qauntityUnits[id]
      //     ? parseInt(this.state.qauntityUnits[id])
      //     : qty,
      // });
      LocalStorageCartService.updateItem(id, {
        productId: id,
        quantity: parseInt(productQuantity),
        quantityUnits: this.state.qauntityUnits[id]
          ? parseInt(this.state.qauntityUnits[id])
          : qty,
      });
    } else {
      // this.props.deleteItemToCart({
      //   userId: items.userId,
      //   productId: id,
      // });
      LocalStorageCartService.deleteItem(id);
    }
  }

  searchChange = (event) => {
    const searchTerm = event.target.value;
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

  searchBgClick = () => {
    this.setState({ showResult: false, searchTerm: "" });
    if (this.searchInputRef.current) {
      this.searchInputRef.current.value = "";
    }
  };

  handleContextMenu = (event) => {
    event.preventDefault();
  };

  handleQuantity = (event, item) => {
    const items = loginDetails();
    const { value } = event.target;
    let dupQty = this.state.qauntityUnits;

    dupQty[item?.id] = value;
    const parsedValue = parseInt(value, 10);

    this.setState((prevState) => {
      const newPrice = item?.unitPrices?.find((d) => d?.qty === parsedValue);

      const updatedPrices = prevState.unitIdPrices.map((price) =>
        price.id === item?.id ? { ...price, price: newPrice } : price
      );

      if (!updatedPrices.some((price) => price.id === item?.id)) {
        updatedPrices.push({ id: item?.id, price: newPrice });
      }

      return {
        qauntityUnits: dupQty,
        unitIdPrices: updatedPrices,
      };
    });

    if ((LocalStorageCartService.getData() || {})[item?.id]?.quantity > 0) {
      this.setState({
        isProductSelecting: true,
        dataId: item?.id,
      });
      // this.props.deleteItemToCart({
      //   userId: items.userId,
      //   productId: item?.id,
      // });
      LocalStorageCartService.deleteItem(item?.id);
    }
  };

  render() {
    const { cartItemsData } = this.props;
    const {
      searchTerm,
      dataId,
      isUpdateIncrease,
      productsFiltersData,
      // addedProducts,
      quantities,
      qauntityUnits,
      searchLoader,
      showResult,
      unitIdPrices,
    } = this.state;

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
            placeholder={`Search "Pui saag"`}
          />
          <Box
            className={`search-results ${
              searchTerm && productsFiltersData ? "active" : ""
            }`}
          >
            {showResult ? (
              searchLoader && !dataId ? (
                <Box className="search-loader">
                  <CircularProgress className="common-loader" />
                </Box>
              ) : searchTerm && productsFiltersData.length === 0 ? (
                <p className="no-data">There is no data</p>
              ) : (
                this.handleCategories(
                  productsFiltersData,
                  dataId,
                  LocalStorageCartService.getData() || {},
                  isUpdateIncrease,
                  quantities,
                  cartItemsData,
                  qauntityUnits,
                  unitIdPrices
                )
              )
            ) : null}
          </Box>
        </Box>
        <Box
          className={`search-results-bg ${
            searchTerm && productsFiltersData ? "active" : ""
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
  const { globalSearchRes } = state.allproductsfilters;
  return {
    additems,
    cartItems,
    updateItems,
    deleteItems,
    shopCategoryData,
    globalSearchRes,
  };
}

const mapDispatchToProps = {
  addItemToCart,
  updateItemToCart,
  deleteItemToCart,
  productDetailsData,
  fetchGlobalSearchItems,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchResults));
