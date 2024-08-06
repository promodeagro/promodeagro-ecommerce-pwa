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
import { Loader, loginDetails } from "Views/Utills/helperFunctions";
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
    };
  }

  componentDidMount() {
    this.setState({
      apiLoader: true,
    });
    this.props.fetchProductWishList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.bookMarksData.status !== this.props.bookMarksData.status &&
      this.props.bookMarksData.status === status.SUCCESS &&
      this.props.bookMarksData?.data
    ) {
      this.setState({
        wistListData: this.props.bookMarksData?.data,
        apiLoader: false,
        deleteItemId: "",
        isProductSelecting: false,
        dataId: "",
      });
    }
    if (
      prevProps.deleteBookMarkData.status !==
        this.props.deleteBookMarkData.status &&
      this.props.deleteBookMarkData.status === status.SUCCESS
    ) {
      this.handleClose();
      this.props.fetchProductWishList();
    }

    if (
      prevProps.additems.status !== this.props.additems.status &&
      this.props.additems.status === status.SUCCESS &&
      this.props.additems.data
    ) {
      this.props.fetchProductWishList();
    }

    if (
      prevProps.updateItems.status !== this.props.updateItems.status &&
      this.props.updateItems.status === status.SUCCESS &&
      this.props.updateItems.data
    ) {
      this.props.fetchProductWishList();
    }

    if (
      prevProps.deleteItems.status !== this.props.deleteItems.status &&
      this.props.deleteItems.status === status.SUCCESS &&
      this.props.deleteItems.data
    ) {
      this.props.fetchProductWishList();
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

  handleClose = () => {
    this.setState({
      addressId: "",
      open: false,
      productId: "",
    });
  };

  handleQuantity = (event, id, qty) => {
    const items = loginDetails();
    const { value } = event.target;
    let dupQty = this.state.qauntityUnits;
    dupQty[id] = value;
    this.setState({
      qauntityUnits: dupQty,
    });
    if (qty > 0) {
      this.setState({
        isProductSelecting: true,
        dataId: id,
      });
      this.props.deleteItemToCart({
        userId: items.userId,
        productId: id,
      });
    }
  };
  render() {
    const { dataId, isUpdateIncrease, qauntityUnits } = this.state;
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
                ) : this.state.wistListData.length > 0 ? (
                  this.state.wistListData?.map((item) => {
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
                            <img src={priceIcon} alt="" /> {item?.price}
                            <span>{item?.mrp}</span>
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
                                    this.handleQuantity(
                                      event,
                                      item.id,
                                      item?.cartItem?.Quantity
                                    )
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
                                    unitqty = item?.unitPrices[0]?.qty;
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
                                  unitqty = item?.unitPrices[0]?.qty;
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

                {/* <Box className="product-box">
                  <Box className="sale">Sale 50%</Box>
                  <Box className="icon">
                    <DeleteOutlineOutlinedIcon />
                  </Box>
                  <Box className="image">
                    <img src={noImage} alt="" />
                  </Box>
                  <Box className="name">Green Apple</Box>
                  <Box className="price-ratting">
                    <Box className="price">
                      <img src={priceIcon} alt="" /> 14.99
                      <span>20.99</span>
                    </Box>
                    <Box className="ratting">
                      <StarIcon /> 4.5
                    </Box>
                  </Box>
                  <Box className="select">
                    <FormControl fullWidth>
                      <NativeSelect>
                        <option value={"1"}>250</option>
                        <option value={"2"}>500</option>
                        <option value={"1"}>1kg</option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
                  <Box className="add-cart">
                    <Button variant="outlined">Add to cart</Button>
                  </Box>
                </Box>
                <Box className="product-box">
                  <Box className="sale">Sale 50%</Box>
                  <Box className="icon">
                    <DeleteOutlineOutlinedIcon />
                  </Box>
                  <Box className="image">
                    <img src={noImage} alt="" />
                  </Box>
                  <Box className="name">Green Apple</Box>
                  <Box className="price-ratting">
                    <Box className="price">
                      <img src={priceIcon} alt="" /> 14.99
                      <span>20.99</span>
                    </Box>
                    <Box className="ratting">
                      <StarIcon /> 4.5
                    </Box>
                  </Box>
                  <Box className="select">
                    <FormControl fullWidth>
                      <NativeSelect>
                        <option value={"1"}>250</option>
                        <option value={"2"}>500</option>
                        <option value={"1"}>1kg</option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
                  <Box className="add-cart">
                    <Button variant="outlined">Add to cart</Button>
                  </Box>
                </Box>
                <Box className="product-box">
                  <Box className="sale">Sale 50%</Box>
                  <Box className="icon">
                    <DeleteOutlineOutlinedIcon />
                  </Box>
                  <Box className="image">
                    <img src={noImage} alt="" />
                  </Box>
                  <Box className="name">Green Apple</Box>
                  <Box className="price-ratting">
                    <Box className="price">
                      <img src={priceIcon} alt="" /> 14.99
                      <span>20.99</span>
                    </Box>
                    <Box className="ratting">
                      <StarIcon /> 4.5
                    </Box>
                  </Box>
                  <Box className="select">
                    <FormControl fullWidth>
                      <NativeSelect>
                        <option value={"1"}>250</option>
                        <option value={"2"}>500</option>
                        <option value={"1"}>1kg</option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
                  <Box className="add-cart">
                    <Button variant="outlined">Add to cart</Button>
                  </Box>
                </Box>
                <Box className="product-box">
                  <Box className="sale">Sale 50%</Box>
                  <Box className="icon">
                    <DeleteOutlineOutlinedIcon />
                  </Box>
                  <Box className="image">
                    <img src={noImage} alt="" />
                  </Box>
                  <Box className="name">Green Apple</Box>
                  <Box className="price-ratting">
                    <Box className="price">
                      <img src={priceIcon} alt="" /> 14.99
                      <span>20.99</span>
                    </Box>
                    <Box className="ratting">
                      <StarIcon /> 4.5
                    </Box>
                  </Box>
                  <Box className="select">
                    <FormControl fullWidth>
                      <NativeSelect>
                        <option value={"1"}>250</option>
                        <option value={"2"}>500</option>
                        <option value={"1"}>1kg</option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
                  <Box className="add-cart">
                    <Button variant="outlined">Add to cart</Button>
                  </Box>
                </Box>
                <Box className="product-box">
                  <Box className="sale">Sale 50%</Box>
                  <Box className="icon">
                    <DeleteOutlineOutlinedIcon />
                  </Box>
                  <Box className="image">
                    <img src={noImage} alt="" />
                  </Box>
                  <Box className="name">Green Apple</Box>
                  <Box className="price-ratting">
                    <Box className="price">
                      <img src={priceIcon} alt="" /> 14.99
                      <span>20.99</span>
                    </Box>
                    <Box className="ratting">
                      <StarIcon /> 4.5
                    </Box>
                  </Box>
                  <Box className="select">
                    <FormControl fullWidth>
                      <NativeSelect>
                        <option value={"1"}>250</option>
                        <option value={"2"}>500</option>
                        <option value={"1"}>1kg</option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
                  <Box className="add-cart">
                    <Button variant="outlined">Add to cart</Button>
                  </Box>
                </Box> */}
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
