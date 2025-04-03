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

  componentDidMount() {
    this.updateSelectedVariant();
  }

  componentDidUpdate() {
    if (this.state.prevSearch !== window.location.search) {
      this.setState({ prevSearch: window.location.search }, () => {
        this.updateSelectedVariant();
      });
    }
  }

  updateSelectedVariant() {
    const queryParams = new URLSearchParams(window.location.search);
    const variantId = queryParams.get("variant");

    if (variantId && this.props.productItem?.variants) {
      const selectedVariant = this.props.productItem.variants.find(
        (variant) => variant.id === variantId
      );

      if (selectedVariant) {
        this.setState({ selectedVariant });
      }
    }
  }

  handleAddToCart() {
    const items = loginDetails();
    const { selectedVariant } = this.state;
    if (!selectedVariant) {
      return; // Ensure a variant is selected before adding to cart
    }

    this.setState({
      dataId: selectedVariant.id,
    });
    const cartItem = {
      productId: selectedVariant.id,
      quantity: 1,
      quantityUnits: `${this.state.qauntityUnits
        ? parseInt(this.state.qauntityUnits)
        : selectedVariant.quantity} ${selectedVariant.unit}`,
    };

    if (items?.userId) {
      LocalStorageCartService.addItem(selectedVariant.id, cartItem);
       
    } else {
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
      const cartData = LocalStorageCartService.getData() || {};
      const currentItem = cartData[id];
      LocalStorageCartService.updateItem(id, {
        productId: id,
        quantity: productQuantity,
        quantityUnits: currentItem?.quantityUnits,
      });
    } else {
      LocalStorageCartService.deleteItem(id);
    }
  }

  handleQuantity(event, item, addedProduct) {
    let priceOfItem = item?.unitPrices?.find(
      (d) => d.qty === parseInt(event.target.value)
    );

    this.setState({
      qauntityUnits: event.target.value,
      quantityUnitPrice: priceOfItem ? priceOfItem : "",
    });
    if (addedProduct && addedProduct[this.props.params.id]?.quantity > 0) {
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
    const { selectedVariant } = this.state;
    const productDetails = selectedVariant || this.props.productItem;

    return (
      <>
        {" "}
        <Box className="mainboxforthescroll">
          {productItem?.variants?.map((variant) => (
            <div
              key={variant.id}
              onClick={() => {
                if (!variant.availability) return; // Prevent click if out of stock
                this.setState({ selectedVariant: variant });

                this.props.navigate(
                  `/product-details/${encodeURIComponent(
                    productItem?.category
                  )}/${encodeURIComponent(productItem?.name)}/${
                    productItem?.groupId
                  }?variant=${variant.id}`
                );
              }}
              style={{
                height: "auto",
                width: "110px",
                flexShrink: 0,
                border: `2px solid ${
                  selectedVariant?.id === variant.id ? "#1f9151" : "#cacaca"
                }`,
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "5px",
                fontSize: "14px",
                cursor: variant.availability ? "pointer" : "not-allowed", // Change cursor
                gap: "4px",
                marginTop: "10px",
                marginRight: "5px",
                opacity: variant.availability ? "1" : "0.6", // Dim out of stock items
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "2px",
                  fontWeight: "400",
                  marginBottom: "3px",
                  justifyContent: "center", // Center horizontally
                  alignItems: "center", // Align items centrally
                }}
              >
                <span>{variant.quantity}</span>
                <span>{variant.unit}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  justifyContent: "center", // Center horizontally
                  alignItems: "center", // Align items centrally
                }}
              >
                {!variant.availability ? (
                  <button className="out-of-stock-btn1">Out of Stock</button>
                ) : (
                  <>
                    <span style={{ fontWeight: "600" }}> ₹{variant.price}</span>
                    {variant.mrp > 0 && (
                      <span className="mrpstyle">₹{variant.mrp}</span>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </Box>
        {productDetails?.savingsPercentage &&
          productDetails?.savingsPercentage !== "-Infinity" &&
          productDetails?.savingsPercentage !== 0 && (
            <Box className="product-save">
              You save <span>{productDetails?.savingsPercentage} %</span>
            </Box>
          )}
        <Box className="product-cart-buttons">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
              {productItem?.variants?.every(
                (variant) => !variant.availability
              ) ? (
                // If all variants are out of stock, show "Out of Stock" button
                <Button className="add-cart-btn" variant="contained" disabled>
                  Out Of Stock
                  <ShoppingCartOutlinedIcon style={{ marginLeft: "10px" }} />
                </Button>
              ) : addedProducts &&
                addedProducts[this.state.selectedVariant?.id]?.quantity &&
                addedProducts[this.state.selectedVariant?.id]?.quantity !==
                  0 ? (
                // Quantity adjustment UI if the product is already in the cart
                <Box className="number-input-container">
                  <Box
                    className={"symbol"}
                    onClick={() => {
                      let unitqty = this.state.selectedVariant?.quantity || 1;
                      this.handleQuantityChange(
                        this.state.selectedVariant?.id,
                        -1,
                        Number(
                          addedProducts[this.state.selectedVariant?.id]
                            ?.quantity
                        ),
                        unitqty
                      );
                    }}
                  >
                    -
                  </Box>

                  <Box className="Number">
                    {addedProducts[this.state.selectedVariant?.id]?.quantity}
                  </Box>

                  <Box
                    className={"symbol"}
                    onClick={() => {
                      let unitqty = this.state.selectedVariant?.quantity || 1;
                      this.handleQuantityChange(
                        this.state.selectedVariant?.id,
                        1,
                        Number(
                          addedProducts[this.state.selectedVariant?.id]
                            ?.quantity || 1
                        ),
                        unitqty
                      );
                    }}
                  >
                    +
                  </Box>
                </Box>
              ) : (
                // "Add to Cart" button for available variants
                <Button
                  className="add-cart-btn"
                  variant="contained"
                  onClick={() => {
                    let unitqty = this.state.selectedVariant?.quantity || 1;
                    this.handleAddToCart(
                      this.state.selectedVariant?.id,
                      unitqty
                    );
                  }}
                >
                  Add to Cart
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
  const { localStorageCartItems } = state.cartitem;

  return {localStorageCartItems};
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
