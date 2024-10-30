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
  FormControl,
  NativeSelect,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import StarIcon from "@mui/icons-material/Star";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import priceIcon from "../../assets/img/price-icon.png";
import noImage from "../../assets/img/no-image.png";
import status from "../../Redux/Constants";
import _ from "lodash";
import { loginDetails } from "Views/Utills/helperFunctions";
import { Link } from "react-router-dom";
import {
  deleteProductWishList,
  setProductWishList,
} from "../../Redux/AllProducts/AllProductthunk";

import { fetchCategories } from "../../Redux/AllProducts/AllProductthunk";
import { fetchDefaultAddress } from "../../Redux/Address/AddressThunk";
import { fetchPersonalDetails } from "../../Redux/Signin/SigninThunk";
import AuthModal from "components/ModalLogin/LoginModal";
import { LocalStorageCartService } from "Services/localStorageCartService";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";

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
      this.props.handleAuthModal();
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

    if (addedProduct[item?.id]?.quantity > 0) {
      this.setState({
        isProductSelecting: true,
        dataId: item?.id,
      });
      LocalStorageCartService.deleteItem(item?.id);
    }
  };

  render() {
    const addedProducts = LocalStorageCartService.getData();
    const { productList } = this.props;
    const { qauntityUnits, unitIdPrices } = this.state;
    return (
      <>
        {productList?.length > 0 ? (
          productList.map((item) => {
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

                {/* {loginDetails()?.userId ? (
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
            )} */}

                <Box
                  className="image"
                  onClick={() => {
                    this.props.navigate(
                      `/product-details/${item?.category}/${item?.name}/${item?.id}`
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
                      `/product-details/${item?.category}/${item?.name}/${item?.id}`
                    );
                  }}
                >
                  <Link>{item?.name}</Link>
                </Box>

                <>
                  {item?.unitPrices?.length > 0 ? (
                    <Box className="select">
                      <select
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
                      </select>
                    </Box>
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
                              this.handleQuantityChange(
                                item?.id,
                                -1,
                                "",
                                unitqty
                              );
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
                        {item?.availability ? "Add" : "Out"}
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            );
          })
        ) : (
          <p className="no-data">There is no data</p>
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
      </>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  fetchCategories,
  fetchDefaultAddress,
  fetchPersonalDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(ProductItemView));
