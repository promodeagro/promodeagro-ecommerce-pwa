import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Button, Grid, FormControl, NativeSelect } from "@mui/material";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import _ from "lodash";
import { loginDetails } from "Views/Utills/helperFunctions";

import { fetchCategories } from "../../Redux/AllProducts/AllProductthunk";
import { fetchDefaultAddress } from "../../Redux/Address/AddressThunk";
import { fetchPersonalDetails } from "../../Redux/Signin/SigninThunk";
import { LocalStorageCartService } from "Services/localStorageCartService";
import CircularProgress from "@mui/material/CircularProgress";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import mdiRupee from "../../assets/img/mdi-rupee.png";
import rupeeIcon from "../../assets/img/rupee.png";
import status from "../../Redux/Constants";
import "react-medium-image-zoom/dist/styles.css";
import AuthModal from "../../components/ModalLogin/LoginModal";

class ProductDetailCartUpdateView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantityUnitPrice: "",
      dataId: "",
      isUpdateIncrease: false,
      qauntityUnits: "",
      authModalOpen: false,
    };
  }

  handleAddToCart(id, qty) {
    debugger
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
    const { productItem } = this.props;
    const { quantityUnitPrice } = this.state;

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
                  {addedProducts[this.props.params.id]?.quantity &&
                  addedProducts[this.props.params.id]?.quantity != 0 ? (
                    <Box className="number-input-container">
                      <Box
                        className={"symbol"}
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
                            Number(
                              addedProducts[this.props.params.id]?.quantity
                            ),
                            unitqty
                          );
                        }}
                      >
                        -
                      </Box>

                      <Box className="Number">
                        {addedProducts[this.props.params.id]?.quantity}
                      </Box>
                      <Box
                        className={"symbol"}
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
                            Number(
                              addedProducts[this.props.params.id]?.quantity || 1
                            ),
                            unitqty
                          );
                        }}
                      >
                        +
                      </Box>
                    </Box>
                  ) : (
                    <Button
                      className="add-cart-btn"
                      variant="contained"
                      onClick={() => {
                        let unitqty = "";
                        if (productItem?.unitPrices?.length > 0) {
                          unitqty = productItem?.unitPrices[0]?.qty;
                        } else {
                          unitqty = 1;
                        }
                        this.handleAddToCart(productItem?.id, unitqty);
                      }}
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
                  <ShoppingCartOutlinedIcon style={{ marginLeft: "10px" }} />
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
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
