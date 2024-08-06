import React, { Component } from "react";
import {
  Box,
  FormControl,
  NativeSelect,
  Button,
  CircularProgress,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Loader, loginDetails } from "Views/Utills/helperFunctions";
import status from "../../../../../../Redux/Constants";
import { connect } from "react-redux";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import {
  deleteProductWishList,
  setProductWishList,
} from "../../../../../../Redux/AllProducts/AllProductthunk";
import {
  deleteItemToCart,
  addItemToCart,
  updateItemToCart,
} from "../../../../../../Redux/Cart/CartThunk";

class All extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qauntityUnits: [],
      isUpdateIncrease: null,
      dataId: "",
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
      this.props.apiCalls();
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

  handleQuantity = (event, id, qty) => {
    const items = loginDetails();
    const { value } = event.target;
    this.setState((prevState) => ({
      qauntityUnits: {
        ...prevState.qauntityUnits,
        [id]: value,
      },
      dataId: id,
    }));

    if (qty > 0) {
      this.props.deleteItemToCart({
        userId: items.userId,
        productId: id,
      });
    }
  };

  render() {
    const {
      topSellingProductsList,
      topSellingApiLoader,
      productImg,
      priceIcon,
    } = this.props;
    const { qauntityUnits, dataId, isUpdateIncrease } = this.state;

    const settings = {
      dots: false,
      arrows: topSellingProductsList?.length > 5 ? true : false,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
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
                return (
                  <Box className="product-box" key={item.id}>
                    {item?.savingsPercentage != 0 ? (
                      <Box className="sale">
                        Sale {item?.savingsPercentage}%
                      </Box>
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
                      <img src={item?.image} alt={item?.name} />
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
                        <img src={priceIcon} alt="" /> {item?.price}{" "}
                        <span>{item?.mrp}</span>
                      </Box>
                      <Box className="ratting">
                        <StarIcon /> {item?.ratings}
                      </Box>
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
                              this.handleQuantity(
                                event,
                                item.id,
                                item?.cartItem?.Quantity
                              )
                            }
                          >
                            {item?.unitPrices.map((unitItem, index) => {
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

                        <Box className="Number">{item?.cartItem?.Quantity}</Box>
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
                          {item?.availability ? "Add to Cart" : "Out Of Stock"}
                        </Button>
                      </Box>
                    )}
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
  const { homeData } = state.home;
  const { allProductsData, setBookmarksData, deleteBookMarkData } =
    state.allproducts;
  const { additems, cartItems, updateItems, deleteItems } = state.cartitem;
  return {
    allProductsData,
    homeData,
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
