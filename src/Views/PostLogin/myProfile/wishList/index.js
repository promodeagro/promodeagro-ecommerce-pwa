import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Dialog,
  NativeSelect,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import priceIcon from "../../../../assets/img/price-icon.png";
import noImage from "../../../../assets/img/no-image.png";
import ProfileSideBar from "../profileSideBar";
import {
  fetchProductWishList,
  deleteProductWishList,
  setProductWishList,
} from "../../../../Redux/AllProducts/AllProductthunk";
import { connect } from "react-redux";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import status from "../../../../Redux/Constants";
import {
  ErrorMessages,
  Loader,
  loginDetails,
} from "Views/Utills/helperFunctions";
import { OpenInFullTwoTone } from "@mui/icons-material";
import {
  addItemToCart,
  updateItemToCart,
  deleteItemToCart,
} from "../../../../Redux/Cart/CartThunk";
class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wistListData: [],
      deleteItemId: "",
      apiLoader: false,
      open: false,
      deleteId: "",
      productId: "",
      qauntityUnits: [],
      dataId: "",
      isProductSelecting: false,
      unitIdPrices: [],
    };
  }

  componentDidMount() {
    this.setState({
      apiLoader: true,
    });

    this.props.fetchProductWishList({
      userId: loginDetails()?.userId,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.bookMarksData.status !== this.props.bookMarksData.status &&
      this.props.bookMarksData.status === status.SUCCESS
    ) {
      if (this.props.bookMarksData.data.statusCode === 200) {
        this.setState({
          wistListData: this.props.bookMarksData?.data?.data,
          apiLoader: false,
          deleteItemId: "",
          isProductSelecting: false,
          dataId: "",
        });
      } else {
        this.setState({
          wistListData: [],
          apiLoader: false,
          deleteItemId: "",
          isProductSelecting: false,
          dataId: "",
        });
        ErrorMessages.error(this.props.bookMarksData?.data?.message);
      }
    }
    if (
      prevProps.deleteBookMarkData.status !==
        this.props.deleteBookMarkData.status &&
      this.props.deleteBookMarkData.status === status.SUCCESS
    ) {
      this.handleClose();

      if (this.props.deleteBookMarkData.data.statusCode === 200) {
        this.props.fetchProductWishList({
          userId: loginDetails()?.userId,
        });
      } else {
        ErrorMessages.error(this.props.deleteBookMarkData.data.message);
      }
    }

    if (
      prevProps.additems.status !== this.props.additems.status &&
      this.props.additems.status === status.SUCCESS &&
      this.props.additems.data
    ) {
      this.props.fetchProductWishList({
        userId: loginDetails()?.userId,
      });
    }

    if (
      prevProps.updateItems.status !== this.props.updateItems.status &&
      this.props.updateItems.status === status.SUCCESS &&
      this.props.updateItems.data
    ) {
      this.props.fetchProductWishList({
        userId: loginDetails()?.userId,
      });
    }

    if (
      prevProps.deleteItems.status !== this.props.deleteItems.status &&
      this.props.deleteItems.status === status.SUCCESS &&
      this.props.deleteItems.data
    ) {
      this.props.fetchProductWishList({
        userId: loginDetails()?.userId,
      });
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
      this.props.updateItemToCart({
        userId: items.userId,
        productId: id,
        quantity: parseInt(productQuantity),
        quantityUnits: this.state.qauntityUnits[id]
          ? parseInt(this.state.qauntityUnits[id])
          : qty,
      });
    } else {
      this.props.deleteItemToCart({
        userId: items.userId,
        productId: id,
      });
    }
  }

  handleAddToCart(id, qty) {
    const items = loginDetails();
    this.setState({
      dataId: id,
    });

    if (items?.userId) {
      this.props.addItemToCart({
        userId: items.userId,
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

  handleDeleteWishList(id) {
    this.setState({
      deleteItemId: id,
      apiLoader: true,
    });
    this.props.deleteProductWishList(id);
  }

  handleClickOpen = (item) => {
    this.setState({
      open: true,
      deleteId: item?.addressId,
      productId: item?.id,
    });
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

    if (item?.cartItem?.Quantity > 0) {
      this.setState({
        isProductSelecting: true,
        dataId: item?.id,
      });
      this.props.deleteItemToCart({
        userId: items.userId,
        productId: item?.id,
      });
    }
  };

  handleClose = () => {
    this.setState({
      addressId: "",
      open: false,
      productId: "",
    });
  };
  render() {
    const { dataId, isUpdateIncrease, qauntityUnits, unitIdPrices } =
      this.state;
    return (
      <Box className="main-container">
        <Container>
          <Box className="profile-container">
            <Box className="profile-left">
              <ProfileSideBar />
            </Box>
            <Box className="profile-right">
              <Box className="heading">
                <h2>Wish List</h2>
              </Box>
              <Box className="products">
                {this.props.bookMarksData.status === status.IN_PROGRESS &&
                this.state.apiLoader ? (
                  Loader.commonLoader()
                ) : this.state.wistListData?.length > 0 ? (
                  this.state.wistListData?.map((item) => {
                    let prices = unitIdPrices.find((d) => d.id === item.id);
                    return (
                      <Box className="product-box">
                        {item?.savingsPercentage != 0 ? (
                          <Box className="sale">
                            Sale {item?.savingsPercentage}%
                          </Box>
                        ) : (
                          <></>
                        )}

                        <Box
                          className="icon"
                          onClick={(event) => {
                            event.preventDefault();
                            this.handleClickOpen(item);
                            // this.handleDeleteWishList(item.id);
                          }}
                        >
                          <DeleteOutlineOutlinedIcon />
                        </Box>

                        <Box
                          className="image"
                          onClick={() => {
                            this.props.navigate(
                              `/product-details/${item.category}/${item.name}/${item.id}`
                            );
                          }}
                        >
                          <img
                            src={item?.image ? item?.image : noImage}
                            alt=""
                          />
                        </Box>
                        <Box className="name">{item?.productName} </Box>
                        <Box className="price-ratting">
                          <Box className="price">
                            <img src={priceIcon} alt="" />{" "}
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
                            <Box className="select">{item.unit}</Box> // or any other placeholder or message you want to show
                          )}
                        </>

                        {item?.inCart ? (
                          <Box className="number-input-container">
                            {item?.inCart && item?.cartItem.Quantity !== 0 ? (
                              <Box
                                className="symbol"
                                onClick={() => {
                                  let unitqty = "";

                                  if (item?.unitPrices?.length > 0) {
                                    unitqty = item?.cartItem?.QuantityUnits
                                      ? item?.cartItem?.QuantityUnits
                                      : item?.unitPrices[0]?.qty;
                                  } else {
                                    unitqty = 1;
                                  }
                                  if (item?.cartItem.ProductId) {
                                    let d = item?.cartItem.Quantity;
                                    this.handleQuantityChange(
                                      item?.cartItem.ProductId,
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
                                {(this.props.deleteItems.status ===
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
                                )}
                              </Box>
                            ) : (
                              <></>
                            )}

                            <Box className="Number">
                              {item?.cartItem?.Quantity}
                            </Box>
                            <Box
                              className="symbol"
                              onClick={() => {
                                let unitqty = "";
                                if (item?.unitPrices?.length > 0) {
                                  unitqty = item?.cartItem?.QuantityUnits
                                    ? item?.cartItem?.QuantityUnits
                                    : item?.unitPrices[0]?.qty;
                                } else {
                                  unitqty = 1;
                                }
                                if (item?.cartItem?.ProductId) {
                                  let d = item?.cartItem?.Quantity;
                                  this.handleQuantityChange(
                                    item?.cartItem?.ProductId,
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
                              {(this.props.updateItems.status ===
                                status.IN_PROGRESS ||
                                this.props.cartItems.status ===
                                  status.IN_PROGRESS ||
                                this.state?.isProductSelecting) &&
                              item.id === dataId &&
                              isUpdateIncrease ? (
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
                              onClick={() => {
                                let unitqty = "";
                                if (item?.unitPrices?.length > 0) {
                                  unitqty = item?.unitPrices[0]?.qty;
                                } else {
                                  unitqty = 1;
                                }
                                this.handleAddToCart(item.id, unitqty);
                              }}
                              disabled={
                                ((this.props?.deleteItems?.status ==
                                  status?.IN_PROGRESS ||
                                  this.props.cartItems.status ===
                                    status.IN_PROGRESS ||
                                  this.state?.isProductSelecting) &&
                                  item?.id == this.state?.dataId) ||
                                !item?.availability
                              }
                              endIcon={
                                ((this.props?.deleteItems?.status ==
                                  status?.IN_PROGRESS ||
                                  this.props.cartItems.status ===
                                    status.IN_PROGRESS ||
                                  this.state?.isProductSelecting) &&
                                  item?.id == this.state?.dataId) ||
                                (this.props?.additems?.status ==
                                  status?.IN_PROGRESS &&
                                  item?.id == this.state?.dataId) ? (
                                  <CircularProgress className="common-loader" />
                                ) : (
                                  <></>
                                )
                              }
                            >
                              {item?.availability
                                ? "Add to Cart"
                                : "Out Of Stock"}
                            </Button>
                          </Box>
                        )}
                      </Box>
                    );
                  })
                ) : (
                  <Box className="no-data">No Data In Wishlist</Box>
                )}
              </Box>
            </Box>
          </Box>

          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this item from wishlist?
              </DialogContentText>
            </DialogContent>
            <DialogActions
              style={{ justifyContent: "center", paddingBottom: "24px" }}
            >
              <Button
                variant="outlined"
                className="outline-common-btn"
                onClick={this.handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                className="outline-common-btn"
                color="error"
                onClick={(event) => {
                  event.stopPropagation();
                  this.handleDeleteWishList(this.state.productId);
                  // this.props.deleteAddress({
                  //   userId: loginDetails()?.userId,
                  //   addressId: this.state.addressId,
                  // });
                }}
                disabled={
                  this.props.deleteBookMarkData.status == status.IN_PROGRESS
                }
                endIcon={
                  this.props.deleteBookMarkData.status ===
                  status.IN_PROGRESS ? (
                    <CircularProgress className="common-loader delete" />
                  ) : (
                    <></>
                  )
                }
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { setBookmarksData, deleteBookMarkData, bookMarksData } =
    state.allproducts;
  const { additems, cartItems, updateItems, deleteItems } = state.cartitem;
  return {
    setBookmarksData,
    deleteBookMarkData,
    bookMarksData,
    deleteItems,
    additems,
    cartItems,
    updateItems,
  };
}

const mapDispatchToProps = {
  fetchProductWishList,
  deleteProductWishList,
  setProductWishList,
  addItemToCart,
  updateItemToCart,
  deleteItemToCart,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(WishList));
