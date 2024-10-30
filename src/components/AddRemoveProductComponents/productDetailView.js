import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Button } from "@mui/material";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import noImage from "../../assets/img/no-image.png";
import _ from "lodash";
import { loginDetails } from "Views/Utills/helperFunctions";
import { Link } from "react-router-dom";

import { fetchCategories } from "../../Redux/AllProducts/AllProductthunk";
import { fetchDefaultAddress } from "../../Redux/Address/AddressThunk";
import { fetchPersonalDetails } from "../../Redux/Signin/SigninThunk";
import AuthModal from "components/ModalLogin/LoginModal";
import { LocalStorageCartService } from "Services/localStorageCartService";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";

class ProductDetailCartUpdateView extends Component {
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
        quantityUnits: this.state.qauntityUnits
          ? parseInt(this.state.qauntityUnits)
          : qty,
      });
    } else if (!items?.userId) {
      // this.props.navigate("/signin");
      this.setState({
        authModalOpen: true,
      });
    }
  }

  handleQuantityChange(id, increment, productQuantity, qty) {
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
        quantity: productQuantity,
        quantityUnits: this.state.qauntityUnits
          ? parseInt(this.state.qauntityUnits)
          : qty,
      });
    } else {
      LocalStorageCartService.deleteItem(id);
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleQuantity(event, item, addedProduct) {
    //
    let priceOfItem = item?.unitPrices?.find(
      (d) => d.qty === parseInt(event.target.value)
    );

    this.setState({
      qauntityUnits: event.target.value,
      quantityUnitPrice: priceOfItem ? priceOfItem : "",
    });
    if (addedProduct[this.props.params.id]?.quantity > 0) {
      this.setState({
        dataId: this.props.params.id,
      });
      LocalStorageCartService.deleteItem(this.props.params.id);
    }
  }

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
              <>
                <Box className="product-price">
                  <Box className="price">
                    <img src={rupeeIcon} alt="" />{" "}
                    {productItem?.cartItem?.selectedQuantityUnitprice
                      ? productItem?.cartItem?.selectedQuantityUnitprice
                      : quantityUnitPrice?.price
                      ? quantityUnitPrice?.price
                      : productItem?.price}
                  </Box>
                  <Box className="mrp">
                    <img src={mdiRupee} alt="" />{" "}
                    <span>
                      {productItem?.cartItem?.selectedQuantityUnitMrp
                        ? productItem?.cartItem?.selectedQuantityUnitMrp
                        : quantityUnitPrice?.mrp
                        ? quantityUnitPrice?.mrp
                        : productItem?.mrp}
                    </span>
                  </Box>
                </Box>
                {productItem?.savingsPercentage != 0 ? (
                  <Box className="product-save">
                    You save <span>{productItem?.savingsPercentage} %</span>
                  </Box>
                ) : (
                  <></>
                )}
                {productItem?.unitPrices?.length > 0 ? (
                  <Box className="select">
                    <FormControl fullWidth>
                      <NativeSelect
                        value={this.state.qauntityUnits}
                        onChange={(event) =>
                          this.handleQuantity(event, productItem, addedProducts)
                        }
                      >
                        {productItem?.unitPrices?.map((unitItem, index) => {
                          return (
                            <option key={index} value={unitItem?.qty}>
                              {unitItem?.qty} {productItem?.unit}
                            </option>
                          );
                        })}
                      </NativeSelect>
                    </FormControl>
                  </Box>
                ) : (
                  <Box className="select">{productItem?.unit}</Box>
                )}
                <Box className="product-cart-buttons">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={8} md={6} lg={4}>
                      {productItem?.availability ? (
                        <>
                          {parseInt(itemQuantity) != 0 ? (
                            <Box className="number-input-container">
                              <Box
                                className={
                                  (this.props.updateItems.status ===
                                    status.IN_PROGRESS &&
                                    !isUpdateIncrease) ||
                                  (this.props.deleteItems.status ===
                                    status.IN_PROGRESS &&
                                    !isUpdateIncrease) ||
                                  this.props.prodducDetailsData.status ===
                                    status.IN_PROGRESS
                                    ? "disableClick"
                                    : "symbol"
                                }
                                onClick={() => {
                                  let unitqty = "";
                                  if (productItem?.unitPrices?.length > 0) {
                                    unitqty = productItem?.unitPrices[0]?.qty;
                                  } else {
                                    unitqty = 1;
                                  }
                                  this.handleQuantityChange(
                                    this.props.params.id,
                                    -1,
                                    Number(itemQuantity),
                                    unitqty
                                  );
                                }}
                              >
                                {(this.props.deleteItems.status ===
                                  status.IN_PROGRESS &&
                                  !isUpdateIncrease) ||
                                (this.props.updateItems.status ===
                                  status.IN_PROGRESS &&
                                  !isUpdateIncrease) ? (
                                  <CircularProgress
                                    className="common-loader plus-icon"
                                    size={24}
                                  />
                                ) : (
                                  "-"
                                )}
                              </Box>

                              <Box className="Number">{itemQuantity}</Box>
                              <Box
                                className={
                                  (this.props.updateItems.status ===
                                    status.IN_PROGRESS &&
                                    this.state.isUpdateIncrease) ||
                                  this.props.prodducDetailsData.status ===
                                    status.IN_PROGRESS
                                    ? "disableClick"
                                    : "symbol"
                                }
                                onClick={() => {
                                  let unitqty = "";
                                  if (productItem?.unitPrices?.length > 0) {
                                    unitqty = productItem?.unitPrices[0]?.qty;
                                  } else {
                                    unitqty = 1;
                                  }
                                  this.handleQuantityChange(
                                    this.props.params.id,
                                    1,
                                    Number(itemQuantity),
                                    unitqty
                                  );
                                }}
                              >
                                {this.props.updateItems.status ===
                                  status.IN_PROGRESS &&
                                this.state.isUpdateIncrease ? (
                                  <CircularProgress className="common-loader plus-icon" />
                                ) : (
                                  "+"
                                )}
                              </Box>
                            </Box>
                          ) : (
                            <Button
                              className="add-cart-btn"
                              variant="contained"
                              disabled={
                                this.props.additems.status ===
                                  status.IN_PROGRESS ||
                                !productItem?.availability
                              }
                              onClick={() => {
                                let unitqty = "";
                                if (productItem?.unitPrices?.length > 0) {
                                  unitqty = productItem?.unitPrices[0]?.qty;
                                } else {
                                  unitqty = 1;
                                }
                                this.handleAddToCart(productItem?.id, unitqty);
                              }}
                              endIcon={
                                this.props.additems.status ===
                                status.IN_PROGRESS ? (
                                  <CircularProgress className="common-loader " />
                                ) : (
                                  <></>
                                )
                              }
                            >
                              {productItem?.availability
                                ? "Add to Cart"
                                : "Out Of Stock"}
                              <ShoppingCartOutlinedIcon
                                style={{ marginLeft: "10px" }}
                              />
                            </Button>
                          )}
                        </>
                      ) : (
                        <Button
                          className="add-cart-btn"
                          variant="contained"
                          disabled={!productItem?.availability}
                        >
                          Out Of Stock
                          <ShoppingCartOutlinedIcon
                            style={{ marginLeft: "10px" }}
                          />
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </>
            );
          })
        ) : (
          <p className="no-data">There is no data</p>
        )}
        <AuthModal
          open={this.state.authModalOpen}
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
)(navigateRouter(ProductDetailCartUpdateView));
