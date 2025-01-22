import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import noImage from "../../assets/img/no-image.png";
import _ from "lodash";
import { loginDetails, ErrorMessages } from "Views/Utills/helperFunctions";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { fetchCategories } from "../../Redux/AllProducts/AllProductthunk";
import { fetchDefaultAddress } from "../../Redux/Address/AddressThunk";
import { fetchPersonalDetails } from "../../Redux/Signin/SigninThunk";
import AuthModal from "components/ModalLogin/LoginModal";
import { LocalStorageCartService } from "Services/localStorageCartService";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import status from "../../Redux/Constants";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { deleteProductWishList } from "../../Redux/AllProducts/AllProductthunk";

class ProductItemView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataId: "",
      isUpdateIncrease: false,
      qauntityUnits: [],
      isProductSelecting: false,
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
      this.handleClose();

      if (this.props.deleteBookMarkData.data.statusCode === 200) {
        this.props.fetchProductWishList({
          userId: loginDetails()?.userId,
        });
      } else {
        ErrorMessages.error(this.props.deleteBookMarkData.data.message);
      }
    }
  }

  handleAddToCart(id, qty) {
    const items = loginDetails();
    this.setState({
      dataId: id,
    });
    if (items?.userId) {
      LocalStorageCartService.addItem(id, {
        productId: id,
        quantity: 1,
        quantityUnits: this.state.qauntityUnits[id]
          ? parseInt(this.state.qauntityUnits[id])
          : qty,
      });
    } else {
      this.setState({
        authModalOpen: true,
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
      LocalStorageCartService.updateItem(id, {
        productId: id,
        quantity: parseInt(productQuantity),
        quantityUnits: this.state.qauntityUnits[id]
          ? parseInt(this.state.qauntityUnits[id])
          : qty,
      });
    } else {
      LocalStorageCartService.deleteItem(id);
    }
  }

  handleQuantity = (event, item, addedProduct) => {
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

    if (addedProduct && addedProduct[item?.id]?.quantity > 0) {
      this.setState({
        isProductSelecting: true,
        dataId: item?.id,
      });
      LocalStorageCartService.deleteItem(item?.id);
    }
  };

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

  handleContextMenu = (event) => {
    event.preventDefault();
  };

  renderProductItems = (productList, showDeleteWishlist) => {
    const addedProducts = LocalStorageCartService.getData();
    const { qauntityUnits, unitIdPrices } = this.state;
    return productList.map((item) => {
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

          {showDeleteWishlist ? (
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
          ) : null}

          <Box
            className="image"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              this.props.navigate(
                `/product-details/${item?.category}/${item?.name}/${item?.id}`
              );
            }}
          >
            <img src={item?.image ? item?.image : noImage} alt={item?.name} />
          </Box>
          <Box
            className="name"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              this.props.navigate(
                `/product-details/${item?.category}/${item?.name}/${item?.id}`
              );
            }}
          >
            <Link>{item?.name}</Link>
          </Box>


          <>
            {item?.unitPrices?.length > 0 ? (
              <></>
              // <Box className="select">
              //   <select
              //     value={
              //       qauntityUnits[item?.id] ||
              //       item?.cartItem?.QuantityUnits ||
              //       ""
              //     }
              //     onChange={(event) =>
              //       this.handleQuantity(event, item, addedProducts)
              //     }
              //   >
              //     {item?.unitPrices.map((unitItem, index) => {
              //       return (
              //         <option key={index} value={unitItem.qty}>
              //           {/* {unitItem.qty}  */}
              //           {item?.unit}
              //         </option>
              //       );
              //     })}
              //   </select>
              // </Box>
            ) : (
              <Box className="select">{item?.unit}</Box>
            )}
          </>
          <Box className="price-cart">
            <Box className="price">
              <strong>
                <CurrencyRupeeOutlinedIcon />
                {item?.cartItem?.selectedQuantityUnitprice
                  ? item?.cartItem?.selectedQuantityUnitprice
                  : prices?.price?.price
                  ? prices?.price?.price
                  : item?.price}
              </strong>
              <span>
                <CurrencyRupeeOutlinedIcon />
                {item?.cartItem?.selectedQuantityUnitMrp
                  ? item?.cartItem?.selectedQuantityUnitMrp
                  : prices?.price?.mrp
                  ? prices?.price?.mrp
                  : item?.mrp}
              </span>
            </Box>
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
                >
                  {item?.availability ? "Add" : "Out"}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      );
    });
  };

  render() {
    const {
      sliderView = false,
      productList,
      showDeleteWishlist = false,
    } = this.props;
    const settings = {
      dots: false,
      arrows: productList?.length > 5 ? true : false,
      infinite: false,
      speed: 500,
      slidesToShow: 5.05,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2.5,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1.5,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <>
        {sliderView ? (
          <Slider {...settings}>
            {this.renderProductItems(productList, showDeleteWishlist)}
          </Slider>
        ) : (
          <>{this.renderProductItems(productList, showDeleteWishlist)}</>
        )}

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

        {showDeleteWishlist ? (
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
        ) : null}
      </>
    );
  }
}

function mapStateToProps(state) {
  const { deleteBookMarkData } = state.allproducts;
  return { deleteBookMarkData };
}

const mapDispatchToProps = {
  fetchCategories,
  fetchDefaultAddress,
  fetchPersonalDetails,
  deleteProductWishList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(ProductItemView));
