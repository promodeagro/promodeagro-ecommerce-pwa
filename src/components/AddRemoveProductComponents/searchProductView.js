import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Grid,
  FormControl,
  NativeSelect,
} from "@mui/material";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import StarIcon from "@mui/icons-material/Star";
import priceIcon from "../../assets/img/price-icon.png";
import noImage from "../../assets/img/no-image.png";
import _ from "lodash";
import { loginDetails } from "Views/Utills/helperFunctions";
import { Link } from "react-router-dom";
import { LocalStorageCartService } from "Services/localStorageCartService";
import { fetchCategories } from "../../Redux/AllProducts/AllProductthunk";
import { fetchDefaultAddress } from "../../Redux/Address/AddressThunk";
import { fetchPersonalDetails } from "../../Redux/Signin/SigninThunk";

class SearchProductItemView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataId: "",
      isUpdateIncrease: false,
      qauntityUnits: [],
      isProductSelecting: false,
      unitIdPrices: [],
      authModalOpen: false,
      quantities: "",
    };
  }

  handleAddToCart(id, qty) {
    const items = loginDetails();
    this.setState({ dataId: id });
    if (items?.userId) {
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
      LocalStorageCartService.deleteItem(item?.id);
    }
  };

  render() {
    const addedProducts = LocalStorageCartService.getData();
    const { productList } = this.props;
    const { qauntityUnits, unitIdPrices } = this.state;
    return (
      <>
        {productList.length > 0 ? (
          productList.map((item) => {
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
                      <img src={item.image ? item.image : noImage} alt="" />
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
                            onChange={(event) =>
                              this.handleQuantity(event, item)
                            }
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
                    {addedProducts && addedProducts[item?.id] ? (
                      <Box className="number-input-container">
                        {addedProducts[item?.id]?.quantity !== 0 ? (
                          <Box
                            className="symbol"
                            onClick={() => {
                              let unitqty = "";
                              if (item?.unitPrices?.length > 0) {
                                unitqty = addedProducts[item?.id]?.quantityUnits
                                  ? addedProducts[item?.id]?.quantityUnits
                                  : item?.unitPrices[0]?.qty;
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
                                  item.id,
                                  -1,
                                  "",
                                  unitqty
                                );
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
                              unitqty = addedProducts[item?.id]?.quantityUnits
                                ? addedProducts[item?.id]?.quantityUnits
                                : item?.unitPrices[0]?.qty;
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
                              this.handleQuantityChange(
                                item.id,
                                1,
                                "",
                                unitqty
                              );
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

                            this.handleAddToCart(item.id, unitqty);
                          }}
                        >
                          Add to cart
                        </Button>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Box>
            );
          })
        ) : (
          <p className="no-data">There is no data</p>
        )}
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
  )(navigateRouter(SearchProductItemView));