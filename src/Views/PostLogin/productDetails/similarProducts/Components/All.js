import React, { Component } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import noImage from "../../../../../assets/img/no-image.png";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import {
  Loader,
  loginDetails,
  ErrorMessages,
} from "Views/Utills/helperFunctions";
import status from "../../../../../Redux/Constants";
import { connect } from "react-redux";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import {
  deleteProductWishList,
  setProductWishList,
} from "../../../../../Redux/AllProducts/AllProductthunk";
import {
  deleteItemToCart,
  addItemToCart,
  updateItemToCart,
} from "../../../../../Redux/Cart/CartThunk";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";

class All extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qauntityUnits: [],
      isUpdateIncrease: null,
      dataId: "",
      unitIdPrices: [],
    };
  }

  componentDidUpdate(prevProps) {
    const items = loginDetails();

    if (
      prevProps.additems.status !== this.props.additems.status &&
      this.props.additems.status === status.SUCCESS
    ) {
      this.setState({ isUpdateIncrease: null });
      this.props.apiCalls();
    }

    if (
      prevProps.updateItems.status !== this.props.updateItems.status &&
      this.props.updateItems.status === status.SUCCESS
    ) {
      // this.setState({ isUpdateIncrease: null });

      this.props.apiCalls();
    }

    if (
      prevProps.deleteItems.status !== this.props.deleteItems.status &&
      this.props.deleteItems.status === status.SUCCESS
    ) {
      this.setState({ isUpdateIncrease: null });
      this.props.apiCalls();
    }

    if (
      prevProps.cartItems.status !== this.props.cartItems.status &&
      this.props.cartItems.status === status.SUCCESS
    ) {
      this.setState({
        dataId: "",
        isUpdateIncrease: null,
      });
    }

    if (
      prevProps.deleteBookMarkData.status !==
        this.props.deleteBookMarkData.status &&
      this.props.deleteBookMarkData.status === status.SUCCESS
    ) {
      if (this.props.deleteBookMarkData.data.statusCode === 200) {
        this.props.apiCalls();
      } else {
        ErrorMessages.error(this.props.deleteBookMarkData.data.message);
      }
    }

    if (
      prevProps.setBookmarksData.status !==
        this.props.setBookmarksData.status &&
      this.props.setBookmarksData.status === status.SUCCESS
    ) {
      this.props.apiCalls();
    }
  }

  handleAddToCart = async (id, qty) => {
    const items = loginDetails();
    this.setState({ dataId: id });
    if (items?.userId) {
      await this.props.addItemToCart({
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
  };

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
    const {
      topSellingProductsList,
      topSellingApiLoader,
      productImg,
      priceIcon,
    } = this.props;
    const { qauntityUnits, dataId, isUpdateIncrease, unitIdPrices } =
      this.state;

    const settings = {
      dots: false,
      arrows: topSellingProductsList?.length > 5 ? true : false,
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
        {topSellingApiLoader ? (
          Loader.commonLoader()
        ) : (
          <Slider {...settings}>
            {topSellingProductsList?.length > 0 ? (
              topSellingProductsList?.map((item) => {
                let prices = unitIdPrices.find((d) => d.id === item.id);
                return (
                  <Box
                    className={
                      !item?.availability ? "product-box hide" : "product-box"
                    }
                    key={item.id}
                  >
                    {item?.savingsPercentage != 0 ? (
                      <Box className="sale">Off {item?.savingsPercentage}%</Box>
                    ) : (
                      <></>
                    )}

                    <Box
                      className="image"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        this.props.navigate(
                          `/product-details/${item.category}/${item.name}/${item.id}`
                        );
                      }}
                    >
                      <img
                        src={item?.image ? item?.image : noImage}
                        alt={item?.name}
                      />
                    </Box>
                    <Box
                      className="name"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        this.props.navigate(
                          `/product-details/${item.category}/${item.name}/${item.id}`
                        );
                      }}
                    >
                      <Link>{item?.name}</Link>
                    </Box>
                    {item?.unitPrices?.length > 0 ? (
                      <Box className="select">
                        <select
                          value={
                            qauntityUnits[item.id] ||
                            item?.cartItem?.QuantityUnits ||
                            ""
                          }
                          onChange={(event) => this.handleQuantity(event, item)}
                        >
                          {item?.unitPrices.map((unitItem, index) => {
                            return (
                              <option key={index} value={unitItem.qty}>
                                {unitItem.qty} {item.unit}
                              </option>
                            );
                          })}
                        </select>
                      </Box>
                    ) : (
                      <Box className="select">{item.unit} </Box>
                    )}
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
                              (this.props?.deleteItems?.status ==
                                status?.IN_PROGRESS ||
                                this.props.cartItems.status ===
                                  status.IN_PROGRESS ||
                                this.state?.isProductSelecting) &&
                              item?.id == this.state?.dataId ? (
                                <CircularProgress className="common-loader" />
                              ) : (
                                <></>
                              )
                            }
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
              <Box className="no-data">No products available</Box>
            )}
          </Slider>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  const { setBookmarksData, deleteBookMarkData } = state.allproducts;
  const { additems, cartItems, updateItems, deleteItems } = state.cartitem;
  return {
    additems,
    cartItems,
    updateItems,
    deleteItems,
    setBookmarksData,
    deleteBookMarkData,
  };
};

const mapDispatchToProps = {
  addItemToCart,
  updateItemToCart,
  deleteItemToCart,
  setProductWishList,
  deleteProductWishList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(All));
