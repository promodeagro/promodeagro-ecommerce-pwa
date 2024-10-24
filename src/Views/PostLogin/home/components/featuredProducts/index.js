import React, { Component } from "react";
import {
  Box,
  Container,
  FormControl,
  NativeSelect,
  Button,
  CircularProgress,
} from "@mui/material";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import AuthModal from "components/ModalLogin/LoginModal";
import { fetchCategories } from "../../../../../Redux/AllProducts/AllProductthunk";
import { fetchDefaultAddress } from "../../../../../Redux/Address/AddressThunk";
import { fetchPersonalDetails } from "../../../../../Redux/Signin/SigninThunk";
import {
  addItemToCart,
  updateItemToCart,
  deleteItemToCart,
} from "../../../../../Redux/Cart/CartThunk";
import StarIcon from "@mui/icons-material/Star";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import priceIcon from "../../../../../assets/img/price-icon.png";
import noImage from "../../../../../assets/img/no-image.png";
import { addDataInCart } from "../../../../../Redux/Home/HomeSlice";
import {
  setShopByCategory,
  productDetailsData,
} from "../../../../../Redux/AllProducts/AllProductSlice";
import {
  setProductWishList,
  deleteProductWishList,
} from "../../../../../Redux/AllProducts/AllProductthunk";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import status from "../../../../../Redux/Constants";
import {
  Loader,
  loginDetails,
  ErrorMessages,
} from "Views/Utills/helperFunctions";
import { LocalStorageCartService } from "Services/localStorageCartService";

class FeaturedProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartData: [],

      cartList: [],
      dataId: "",
      isUpdateIncrease: null,
      qauntityUnits: [],
      unitIdPrices: [],
      qauantites: [],
      isProductSelecting: false,
      bookMarkId: "",
      productsData: [],
      authModalOpen: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const items = loginDetails();

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
    //   this.getAllProduct();
    // }

    // if (
    //   prevProps.updateItems.status !== this.props.updateItems.status &&
    //   this.props.updateItems.status === status.SUCCESS &&
    //   this.props.updateItems.data
    // ) {
    //   this.getAllProduct();
    // }

    // if (
    //   prevProps.deleteItems.status !== this.props.deleteItems.status &&
    //   this.props.deleteItems.status === status.SUCCESS &&
    //   this.props.deleteItems.data
    // ) {
    //   this.getAllProduct();
    // }

    if (
      prevProps.cartItems.status !== this.props.cartItems.status &&
      this.props.cartItems.status === status.SUCCESS
    ) {
      this.setState({
        dataId: "",
        isUpdateIncrease: null,
        isProductSelecting: false,
      });
    }
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
      // this.props.navigate("/signin");
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

  getAllProduct() {
    this.props.fetchHome();
  }
  handleContextMenu = (event) => {
    event.preventDefault();
  };
  // handleQuantity = (event, id, qty) => {
  //   const items = loginDetails();
  //   const { value } = event.target;
  //   let dupQty = this.state.qauntityUnits;
  //   dupQty[id] = value;
  //   this.setState({
  //     qauntityUnits: dupQty,
  //   });
  //   if (qty > 0) {
  //     this.setState({
  //       isProductSelecting: true,
  //       dataId: id,
  //     });
  //     this.props.deleteItemToCart({
  //       userId: items.userId,
  //       productId: id,
  //     });
  //   }
  // };

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
    const { data, cartList } = this.props;
    const {
      productsData,
      dataId,
      isUpdateIncrease,
      qauntityUnits,
      bookMarkId,
      unitIdPrices,
    } = this.state;
    const cartItems = LocalStorageCartService.getData() || {};

    return (
      <Box
        className="featured-products-container"
        onContextMenu={this.handleContextMenu}
      >
        <Container>
          <Box className="heading">Featured Products</Box>
          <Box className="products">
            {data?.length ? (
              data.slice(0, 5).map((item, index) => {
                let prices = unitIdPrices.find((d) => d.id === item.id);
                return (
                  <Box className="product-box" key={index}>
                    {item.savingsPercentage != 0 ? (
                      <Box className="sale">Sale {item.savingsPercentage}%</Box>
                    ) : (
                      <></>
                    )}

                    {loginDetails()?.userId ? (
                      <Box
                        className="icon"
                        onClick={(event) => {
                          event.preventDefault();
                          this.handleWishList(item.id, item?.inWishlist);
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
                          `/product-details/${item.category}/${item.name}/${item.id}`
                        );
                      }}
                    >
                      {/* <Link to={`/product-details/${item.id}`}> */}
                      <img
                        src={item?.image ? item?.image : noImage}
                        alt={item?.name}
                      />
                      {/* </Link> */}
                    </Box>
                    <Box
                      className="name"
                      onClick={() => {
                        this.props.navigate(
                          `/product-details/${item.category}/${item.name}/${item.id}`
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
                      <Box className="ratting">
                        <StarIcon /> {item?.ratings}
                      </Box>
                    </Box>
                    <>
                      {item?.unitPrices?.length > 0 ? (
                        <Box className="select">
                          <FormControl fullWidth>
                            <NativeSelect
                              value={
                                qauntityUnits[item.id] ||
                                item?.cartItem?.QuantityUnits ||
                                ""
                              }
                              onChange={(event) =>
                                this.handleQuantity(event, item)
                              }
                            >
                              {item.unitPrices.map((unitItem, index) => {
                                return (
                                  <option key={index} value={unitItem.qty}>
                                    {unitItem.qty} {item.unit}
                                  </option>
                                );
                              })}
                            </NativeSelect>
                          </FormControl>
                        </Box>
                      ) : (
                        <Box className="select">{item.unit} </Box>
                      )}
                    </>

                    {cartItems && cartItems[item?.id] ? (
                      <Box className="number-input-container">
                        {cartItems[item?.id].quantity !== 0 ? (
                          <Box
                            className="symbol"
                            onClick={() => {
                              let unitqty = "";

                              if (item?.unitPrices?.length > 0) {
                                unitqty = cartItems[item?.id].quantityUnits
                                  ? cartItems[item?.id].quantityUnits
                                  : item?.unitPrices[0]?.qty;
                              } else {
                                unitqty = 1;
                              }
                              if (cartItems[item?.id].productId) {
                                let d = cartItems[item?.id].quantity;
                                this.handleQuantityChange(
                                  cartItems[item?.id].productId,
                                  -1,
                                  d,
                                  unitqty
                                );
                              } else {
                                this.handleQuantityChange(
                                  item.id,
                                  -1,
                                  "",
                                  unitqty
                                );
                              }
                            }}
                          >
                            {/* {(this.props.deleteItems.status ===
                              status.IN_PROGRESS ||
                              this.props.updateItems.status ===
                                status.IN_PROGRESS ||
                              this.props.cartItems.status ===
                                status.IN_PROGRESS ||
                              this.state?.isProductSelecting) &&
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
                          {cartItems[item?.id].quantity}
                        </Box>
                        <Box
                          className="symbol"
                          onClick={() => {
                            let unitqty = "";
                            if (item?.unitPrices?.length > 0) {
                              unitqty = cartItems[item?.id].quantityUnits
                                ? cartItems[item?.id].quantityUnits
                                : item?.unitPrices[0]?.qty;
                            } else {
                              unitqty = 1;
                            }
                            if (cartItems[item?.id]?.productId) {
                              let d = cartItems[item?.id].quantity;
                              this.handleQuantityChange(
                                cartItems[item?.id].productId,
                                1,
                                Number(d),
                                unitqty
                              );
                            } else {
                              this.handleQuantityChange(
                                item.id,
                                1,
                                "",
                                unitqty
                              );
                            }
                          }}
                        >
                          {/* {(this.props.updateItems.status ===
                            status.IN_PROGRESS ||
                            this.props.cartItems.status ===
                              status.IN_PROGRESS ||
                            this.state?.isProductSelecting) &&
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
                          //   ((this.props.additems.status ===
                          //     status.IN_PROGRESS ||
                          //     this.props?.deleteItems?.status ==
                          //       status?.IN_PROGRESS ||
                          //     this.props.cartItems.status ===
                          //       status.IN_PROGRESS ||
                          //     this.state?.isProductSelecting) &&
                          //     item?.id == this.state?.dataId) ||
                          //   !item?.availability
                          // }
                          // endIcon={
                          //   (this.props?.deleteItems?.status ==
                          //     status?.IN_PROGRESS ||
                          //     this.props.cartItems.status ===
                          //       status.IN_PROGRESS ||
                          //     this.state?.isProductSelecting) &&
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
              })
            ) : (
              <></>
            )}
          </Box>
          {data?.length ? (
            <Box
              className="load-more-btn"
              onClick={() => this.props.setShopByCategory([])}
            >
              <Link to="/category">Load More</Link>
            </Box>
          ) : (
            <></>
          )}
        </Container>

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
  const { shopCategoryData } = state.allproducts;
  const { additems, cartItems, updateItems, deleteItems } = state.cartitem;
  const { setBookmarksData, deleteBookMarkData } = state.allproducts;
  return {
    additems,
    cartItems,
    updateItems,
    deleteItems,
    shopCategoryData,
    setBookmarksData,
    deleteBookMarkData,
  };
}

const mapDispatchToProps = {
  addItemToCart,
  updateItemToCart,
  deleteItemToCart,
  setShopByCategory,
  productDetailsData,
  setProductWishList,
  deleteProductWishList,
  fetchCategories,
  fetchDefaultAddress,
  fetchPersonalDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(FeaturedProducts));
