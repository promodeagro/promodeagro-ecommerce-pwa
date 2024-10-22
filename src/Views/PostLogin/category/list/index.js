import React, { Component } from "react";
import {
  addItemToCart,
  fetchCartItems,
  updateItemToCart,
  deleteItemToCart,
} from "../../../../Redux/Cart/CartThunk";
import { productDetailsData } from "../../../../Redux/AllProducts/AllProductSlice";
import { connect } from "react-redux";
import {
  Box,
  FormControl,
  NativeSelect,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import StarIcon from "@mui/icons-material/Star";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import priceIcon from "../../../../assets/img/price-icon.png";
import noImage from "../../../../assets/img/no-image.png";
import status from "../../../../Redux/Constants";
import _ from "lodash";
import { loginDetails, ErrorMessages } from "../../../Utills/helperFunctions";
import { Link } from "react-router-dom";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import {
  deleteProductWishList,
  setProductWishList,
} from "../../../../Redux/AllProducts/AllProductthunk";

import { fetchCategories } from "../../../../Redux/AllProducts/AllProductthunk";
import { fetchDefaultAddress } from "../../../../Redux/Address/AddressThunk";
import { fetchPersonalDetails } from "../../../../Redux/Signin/SigninThunk";
import AuthModal from "components/ModalLogin/LoginModal";
import { LocalStorageCartService } from "Services/localStorageCartService";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // addedProducts: [], // Track added products
      quantities: {}, // Track quantities for each product
      sortOrder: null, // Track sort order
      dataId: "",
      isUpdateIncrease: false,
      qauntityUnits: [],
      isProductSelecting: false,
      bookMarkId: "",
      unitIdPrices: [],
      authModalOpen: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.deleteBookMarkData.status !==
        this.props.deleteBookMarkData.status &&
      this.props.deleteBookMarkData.status === status.SUCCESS
    ) {
      this.setState({
        bookMarkId: "",
      });
      if (this.props.deleteBookMarkData.data.statusCode === 200) {
        this.getAllProduct();
      } else {
        ErrorMessages.error(this.props.deleteBookMarkData?.data?.message);
      }
    }

    if (
      prevProps.setBookmarksData.status !==
        this.props.setBookmarksData.status &&
      this.props.setBookmarksData.status === status.SUCCESS
    ) {
      this.getAllProduct();
      this.setState({
        bookMarkId: "",
      });
    }

    // if (
    //   prevProps.additems.status !== this.props.additems.status &&
    //   this.props.additems.status === status.SUCCESS &&
    //   this.props.additems.data
    // ) {
    //   this.props.handleCartApiLoader(true);
    //   this.getAllProduct();
    // }

    // if (
    //   prevProps.updateItems.status !== this.props.updateItems.status &&
    //   this.props.updateItems.status === status.SUCCESS &&
    //   this.props.updateItems.data
    // ) {
    //   this.props.handleCartApiLoader(true);
    //   this.getAllProduct();
    // }

    // if (
    //   prevProps.deleteItems.status !== this.props.deleteItems.status &&
    //   this.props.deleteItems.status === status.SUCCESS &&
    //   this.props.deleteItems.data
    // ) {
    //   this.props.handleCartApiLoader(true);
    //   this.getAllProduct();
    // }

    if (
      prevProps.cartItems.status !== this.props.cartItems.status &&
      this.props.cartItems.status === status.SUCCESS
    ) {
      this.setState({
        // addedProducts: [],
        quantities: {},
        dataId: "",
        isUpdateIncrease: null,
      });
    }
  }

  getAllProduct(nextPage) {
    this.props.allproducts(nextPage);
  }

  handleAddToCart(id, qty) {
    const items = loginDetails();
    this.setState({
      dataId: id,
    });
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
      this.setState({ authModalOpen: true });
    }
  }

  handleContextMenu = (event) => {
    event.preventDefault();
  };
  handleCategories(
    sortedData,
    dataId,
    addedProducts,
    isUpdateIncrease,
    quantities,
    cartItemsData,
    qauntityUnits,
    unitIdPrices
  ) {
    let returnData =
      sortedData?.length > 0 &&
      sortedData.map((item) => {
        let prices = unitIdPrices.find((d) => d.id === item.id);
        return (
          <Box
            className={
              this.props.hideFilter
                ? "product-box hide-filter-box"
                : "product-box"
            }
            key={item?.id}
            onContextMenu={this.handleContextMenu}
          >
            {item?.savingsPercentage != 0 && (
              <Box className="sale">Sale {item?.savingsPercentage}%</Box>
            )}

            {loginDetails()?.userId ? (
              <Box
                className="icon"
                onClick={(event) => {
                  event.preventDefault();
                  this.handleWishList(item?.id, item?.inWishlist);
                }}
              >
                {item?.inWishlist ? (
                  <BookmarkOutlinedIcon />
                ) : (
                  <TurnedInNotOutlinedIcon />
                )}
              </Box>
            ) : (
              <></>
            )}

            <Box
              className="image"
              onClick={() => {
                this.props.navigate(
                  `/product-details/${item?.category}/${item?.name}/${item?.id}`
                );
              }}
            >
              {/* <Link to={`/product-details/${item.id}`}> */}
              <img src={item?.image ? item?.image : noImage} alt={item?.name} />
              {/* </Link> */}
            </Box>
            <Box
              className="name"
              onClick={() => {
                this.props.navigate(
                  `/product-details/${item?.category}/${item?.name}/${item?.id}`
                );
              }}
            >
              <Link>{item?.name}</Link>
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
                  {item?.cartItem?.selectedQuantityUnitMrp
                    ? item?.cartItem?.selectedQuantityUnitMrp
                    : prices?.price?.mrp
                    ? prices?.price?.mrp
                    : item?.mrp}
                </span>
              </Box>
              {item?.ratings && (
                <Box className="ratting">
                  <StarIcon /> {item?.ratings}
                </Box>
              )}
            </Box>
            <>
              {item?.unitPrices?.length > 0 ? (
                <Box className="select">
                  <FormControl fullWidth>
                    <NativeSelect
                      value={
                        qauntityUnits[item?.id] ||
                        item?.cartItem?.QuantityUnits ||
                        ""
                      }
                      onChange={(event) =>
                        this.handleQuantity(event, item, addedProducts)
                      }
                    >
                      {item?.unitPrices.map((unitItem, index) => {
                        return (
                          <option key={index} value={unitItem.qty}>
                            {unitItem.qty} {item?.unit}
                          </option>
                        );
                      })}
                    </NativeSelect>
                  </FormControl>
                </Box>
              ) : (
                <Box className="select">{item?.unit}</Box>
              )}
            </>

            {addedProducts && addedProducts[item?.id] ? (
              <Box className="number-input-container">
                {addedProducts[item?.id].quantity !== 0 ? (
                  <Box
                    className="symbol"
                    onClick={() => {
                      let unitqty = "";
                      if (item?.unitPrices?.length > 0) {
                        unitqty = item?.unitPrices[0]?.qty;
                      } else {
                        unitqty = 1;
                      }

                      if (addedProducts[item?.id]?.productId) {
                        let d = addedProducts[item?.id]?.quantity;
                        this.handleQuantityChange(
                          addedProducts[item?.id]?.productId,
                          -1,
                          Number(d),
                          unitqty
                        );
                      } else {
                        this.handleQuantityChange(item?.id, -1, "", unitqty);
                      }
                    }}
                  >
                    {/* {(this.props.deleteItems.status === status.IN_PROGRESS ||
                      this.state?.isProductSelecting ||
                      this.props.cartItems.status === status.IN_PROGRESS ||
                      this.props.updateItems.status === status.IN_PROGRESS) &&
                    item?.id === dataId &&
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
                  {addedProducts[item?.id]?.quantity}
                </Box>
                <Box
                  className="symbol"
                  onClick={() => {
                    let unitqty = "";
                    if (item?.unitPrices?.length > 0) {
                      unitqty = item?.unitPrices[0]?.qty;
                    } else {
                      unitqty = 1;
                    }

                    if (addedProducts[item?.id]?.productId) {
                      let d = addedProducts[item?.id]?.quantity;

                      this.handleQuantityChange(
                        addedProducts[item?.id]?.productId,
                        1,
                        Number(d),
                        unitqty
                      );
                    } else {
                      this.handleQuantityChange(item?.id, 1, "", unitqty);
                    }
                  }}
                >
                  {/* {(this.props.updateItems.status === status.IN_PROGRESS ||
                    this.state?.isProductSelecting ||
                    this.props.cartItems.status === status.IN_PROGRESS) &&
                  item?.id === dataId &&
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
                    this.setState({ isUpdateIncrease: true });
                    this.handleAddToCart(item?.id, unitqty);
                  }}
                  // disabled={
                  //   (this.props.additems.status === status.IN_PROGRESS &&
                  //     item?.id === this.state.dataId) ||
                  //   !item?.availability
                  // }
                  // endIcon={
                  //   this.props.additems.status == status.IN_PROGRESS &&
                  //   item?.id == this.state?.dataId ? (
                  //     <CircularProgress className="common-loader" />
                  //   ) : (
                  //     <></>
                  //   )
                  // }
                >
                  {item?.availability ? "Add to Cart" : "Out Of Stock"}
                </Button>
              </Box>
            )}
          </Box>
        );
      });

    if (returnData.length > 0) {
      return returnData;
    } else {
      return <p className="no-data">There is no data</p>;
    }
  }

  handleQuantityChange(id, increment, productQuantity = 0, qty) {
    const items = loginDetails();
    if (increment < 0 && productQuantity != 0) {
      this.setState({ isUpdateIncrease: false });
    } else if (productQuantity != 0) {
      this.setState({ isUpdateIncrease: true });
    }
    this.setState({
      dataId: id,
    });

    productQuantity = productQuantity + increment;

    if (productQuantity != 0) {
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

  handleSortChange = (event) => {
    this.setState({ sortOrder: event.target.value });
  };

  handleQuantity = (event, item, addedProducts) => {
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

    if (addedProducts[item?.id]?.quantity > 0) {
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

  handleWishList(id, isBookMarked) {
    const item = loginDetails();
    this.setState({
      bookMarkId: id,
    });
    if (item?.userId) {
      if (isBookMarked) {
        this.props.deleteProductWishList(id);
      } else {
        this.props.setProductWishList({
          userId: item?.userId,
          productId: id,
        });
      }
    }
  }

  render() {
    const { data, cartItemsData } = this.props;
    const {
      // addedProducts,
      quantities,
      sortOrder,
      dataId,
      isUpdateIncrease,
      qauntityUnits,
      unitIdPrices,
      authModalOpen,
    } = this.state;

    // Sort data based on sortOrder
    const sortedData = sortOrder
      ? _.orderBy(data, ["price"], [sortOrder === "lowToHigh" ? "asc" : "desc"])
      : data;

    return (
      <Box className="listing-container">
        <Box className="heading">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <h2>{this.props.currentCategory}</h2>
            </Grid>
            {sortedData?.length ? (
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box className="d-flex w-100 justify-content-end flex-wrap">
                  <Box className="sort-by">
                    <FormControl fullWidth>
                      <NativeSelect
                        value={sortOrder || ""}
                        onChange={this.handleSortChange}
                      >
                        <option value="">Sort by Default</option>
                        <option value="lowToHigh">
                          Sort by Price - Low to High
                        </option>
                        <option value="highToLow">
                          Sort by Price - High to Low
                        </option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
                  <Box className="results-text">
                    <strong>{data.length}</strong> Results Found
                  </Box>
                </Box>
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
        </Box>
        <Box className="products">
          {this.handleCategories(
            sortedData,
            dataId,
            LocalStorageCartService.getData(),
            isUpdateIncrease,
            quantities,
            cartItemsData,
            qauntityUnits,
            unitIdPrices
          )}
        </Box>

        <AuthModal
          open={this.state.authModalOpen}
          handleDefaultAddress={() => {
            this.props.fetchCategories();
            this.props.fetchDefaultAddress(loginDetails()?.userId);
            this.props.fetchPersonalDetails({
              userId: loginDetails()?.userId,
            });
            this.props.navigate(0);
          }}
          handleClose={() => {
            this.setState({
              authModalOpen: false,
            });
          }}
        />
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { additems, cartItems, updateItems, deleteItems } = state.cartitem;
  const { shopCategoryData } = state.allproducts;
  const { setBookmarksData, deleteBookMarkData } = state.allproducts;
  return {
    additems,
    cartItems,
    updateItems,
    deleteItems,
    shopCategoryData,
    deleteBookMarkData,
    setBookmarksData,
  };
}

const mapDispatchToProps = {
  addItemToCart,
  fetchCartItems,
  updateItemToCart,
  deleteItemToCart,
  productDetailsData,
  deleteProductWishList,
  setProductWishList,
  fetchCategories,
  fetchDefaultAddress,
  fetchPersonalDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(List));
