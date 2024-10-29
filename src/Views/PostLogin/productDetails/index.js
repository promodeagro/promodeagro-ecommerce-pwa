import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  FormControl,
  NativeSelect,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import noImage from "../../../assets/img/no-image.png";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import mdiRupee from "../../../assets/img/mdi-rupee.png";
import rupeeIcon from "../../../assets/img/rupee.png";
import deliveryTruck from "../../../assets/img/delivery-truck.png";
import customerSupport from "../../../assets/img/customer-support.png";
import securePayment from "../../../assets/img/secure-payment.png";
import moneyBack from "../../../assets/img/money-back.png";
import { connect } from "react-redux";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import status from "../../../Redux/Constants";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
  allProducts,
  productDetails,
  deleteProductWishList,
  setProductWishList,
  fetchProducReview,
  addProductReview,
  fetchTopSellingProducts,
  fetchToSellingCategories,
} from "../../../Redux/AllProducts/AllProductthunk";
import { setShopByCategory } from "../../../Redux/AllProducts/AllProductSlice";
import {
  addItemToCart,
  fetchCartItems,
  updateItemToCart,
  deleteItemToCart,
} from "../../../Redux/Cart/CartThunk";
import {
  Loader,
  loginDetails,
  ErrorMessages,
} from "Views/Utills/helperFunctions";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import AuthModal from "../../../components/ModalLogin/LoginModal";
import { Link } from "react-router-dom";
import SimilarProducts from "./similarProducts";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  TelegramShareButton,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
  FacebookIcon,
} from "react-share";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params.id,
      productItem: {},
      itemQuantity: null,
      isUpdateIncrease: null,
      loaderCount: 0,
      pathName: "",
      qauntityUnits: "",
      isDeleting: false,
      productReviewData: {},
      open: false,
      currentSelectedImage: "",
      quantityUnitPrice: "",
      authModalOpen: false,
      topSellingProductsList: [],
      topSellCategoriesList: [],
      isShareOpen: false,
    };
  }
  componentDidMount() {
    const items = loginDetails();
    this.setState({
      pathName: window.location.pathname,
    });
    this.props.productDetails({
      productId: this.props.params.id,
      userId: items?.userId ? items?.userId : "",
    });
    this.props.fetchProducReview(this.props.params.id);
    if (items?.userId) {
      this.props.fetchCartItems({
        userId: items?.userId,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const items = loginDetails();

    if (window.location.pathname != this.state.pathName) {
      this.setState({
        pathName: window.location.pathname,
        loaderCount: 0,
      });
      this.props.fetchProducReview(this.props.params.id);

      this.props.productDetails({
        productId: this.props.params.id,
        userId: items?.userId ? items?.userId : "",
      });
    }

    if (
      prevProps.addProductReviewData.status !==
        this.props.addProductReviewData.status &&
      this.props.addProductReviewData.status === status.SUCCESS
    ) {
      this.setState({
        open: false,
      });
      this.props.fetchProducReview(this.props.params.id);
    } else if (this.props.addProductReviewData.status === status.FAILURE) {
      this.setState({
        open: false,
      });
    }
    if (
      prevProps.deleteBookMarkData.status !==
        this.props.deleteBookMarkData.status &&
      this.props.deleteBookMarkData.status === status.SUCCESS
    ) {
      if (this.props.deleteBookMarkData.data.statusCode === 200) {
        this.props.productDetails({
          productId: this.props.params.id,
          userId: items?.userId ? items?.userId : "",
        });
      } else {
        ErrorMessages.error(this.props.deleteBookMarkData?.data?.message);
      }
    }

    if (
      prevProps.productReviewData.status !==
        this.props.productReviewData.status &&
      this.props.productReviewData.status === status.SUCCESS &&
      this.props.productReviewData.data
    ) {
      this.setState({
        productReviewData: this.props.productReviewData.data,
      });
    }

    if (
      prevProps.setBookmarksData.status !==
        this.props.setBookmarksData.status &&
      this.props.setBookmarksData.status === status.SUCCESS
    ) {
      this.props.productDetails({
        productId: this.props.params.id,
        userId: items?.userId ? items?.userId : "",
      });
    }

    if (
      prevProps.productDetailsData.status !==
        this.props.productDetailsData.status &&
      this.props.productDetailsData.status === status.SUCCESS &&
      this.props.productDetailsData?.data
    ) {
      this.setState({
        productItem: this.props.productDetailsData?.data,
        itemQuantity: this.props.productDetailsData?.data?.cartItem?.Quantity
          ? this.props.productDetailsData?.data?.cartItem?.Quantity
          : 0,
        loaderCount: 1,
        qauntityUnits:
          this.props.productDetailsData?.data?.cartItem?.QuantityUnits,
        isDeleting: false,
        currentSelectedImage: this.props?.productDetailsData?.data?.image,
      });
      setTimeout(() => {
        this.setState({
          isUpdateIncrease: null,
        });
      }, 200);

      let data = localStorage.getItem("recentviewitems");
      if (data) {
        let path = window.location.pathname.split("/");

        let recentViewList = JSON.parse(data);
        const isItemInList = recentViewList.some(
          (item) => item.id === path[path.length - 1]
        );

        if (!isItemInList) {
          if (this.props.productDetailsData?.data?.id) {
            recentViewList.unshift(this.props.productDetailsData?.data);
            localStorage.setItem(
              "recentviewitems",
              JSON.stringify(recentViewList.slice(0, 3))
            );
          }
        }
      } else {
        if (this.props.productDetailsData?.data?.id) {
          localStorage.setItem(
            "recentviewitems",
            JSON.stringify([this.props.productDetailsData?.data])
          );
        }
      }
    } else if (this.props.productDetailsData.status === status.FAILURE) {
      this.setState({
        productItem: {},
        itemQuantity: null,
        loaderCount: 1,
        qauntityUnits: null,
        isDeleting: false,
        currentSelectedImage: "",
        isUpdateIncrease: null,
      });
    }

    if (
      prevProps.additems.status !== this.props.additems.status &&
      this.props.additems.status === status.SUCCESS &&
      this.props.additems.data
    ) {
      this.productDetails();
    }

    if (
      prevProps.updateItems.status !== this.props.updateItems.status &&
      this.props.updateItems.status === status.SUCCESS &&
      this.props.updateItems.data
    ) {
      this.productDetails();
    }

    if (
      prevProps.deleteItems.status !== this.props.deleteItems.status &&
      this.props.deleteItems.status === status.SUCCESS &&
      this.props.deleteItems.data
    ) {
      this.productDetails();
    }

    if (
      prevProps.topSellingCategoriesData.status !==
        this.props.topSellingCategoriesData.status &&
      this.props.topSellingCategoriesData.status === status.SUCCESS
    ) {
      if (this.props.topSellingCategoriesData?.data.statusCode === 200) {
        this.setState({
          topSellCategoriesList:
            this.props.topSellingCategoriesData?.data?.data
              ?.topSellingSubcategories,
        });

        if (
          this.props.topSellingCategoriesData?.data?.data
            ?.topSellingSubcategories?.length > 0
        ) {
          this.props.fetchTopSellingProducts({
            userId: loginDetails()?.userId,
            subcategory:
              this.props.topSellingCategoriesData?.data?.data
                ?.topSellingSubcategories[0] == "ALL"
                ? ""
                : this.props.topSellingCategoriesData?.data?.data
                    ?.topSellingSubcategories[0],
          });
        }
      } else {
        ErrorMessages.error(this.props.topSellingCategoriesData?.data.message);
      }
    }

    if (
      prevProps.topSellingProductsData.status !==
        this.props.topSellingProductsData.status &&
      this.props.topSellingProductsData.status === status.SUCCESS
    ) {
      if (this.props.topSellingProductsData.data.statusCode === 200) {
        this.setState({
          topSellingProductsList:
            this.props.topSellingProductsData.data?.data?.topSellingProducts,
          topSellingApiLoader: false,
        });
      } else {
        ErrorMessages.error(this.props?.topSellingProductsData?.data?.message);
        this.setState({
          topSellingApiLoader: false,
        });
      }
    }
  }

  productDetails() {
    const items = loginDetails();
    this.props.productDetails({
      productId: this.props.params.id,
      userId: items?.userId ? items?.userId : "",
    });
    if (items?.userId) {
      this.props.fetchCartItems({
        userId: items?.userId,
      });
    }
  }

  handleAddToCart(id, qty) {
    const items = loginDetails();

    if (items?.userId && id) {
      this.props.addItemToCart({
        userId: items.userId,
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

    productQuantity = productQuantity + increment;
    if (productQuantity != 0) {
      this.props.updateItemToCart({
        userId: items.userId,
        productId: id,
        quantity: productQuantity,
        quantityUnits: this.state.qauntityUnits
          ? parseInt(this.state.qauntityUnits)
          : qty,
      });
    } else {
      this.props.deleteItemToCart({
        userId: items.userId,
        productId: id,
      });
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleQuantity(event, item) {
    const items = loginDetails();
    //
    let priceOfItem = item?.unitPrices?.find(
      (d) => d.qty === parseInt(event.target.value)
    );

    this.setState({
      qauntityUnits: event.target.value,
      quantityUnitPrice: priceOfItem ? priceOfItem : "",
      isDeleting: true,
    });
    if (item.cartItem?.Quantity > 0) {
      this.setState({
        isDeleting: true,
      });
      this.props.deleteItemToCart({
        userId: items.userId,
        productId: this.props.params.id,
        grams: parseInt(event.target.value),
      });
    }
  }

  toggleShareMenu = () => {
    this.setState(prevState => ({ isShareOpen: !prevState.isShareOpen }));
  };

  render() {
    const {
      productItem,
      itemQuantity,
      isUpdateIncrease,
      loaderCount,
      currentSelectedImage,
      quantityUnitPrice,
      topSellingProductsList,
      topSellCategoriesList,
      isShareOpen 
    } = this.state;

    return (
      <Box className="main-container">
        {loaderCount == 0 ? (
          Loader.commonLoader()
        ) : (
          <>
            {productItem?.id ? (
              <Container>
                <Box className="details-container">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={5} lg={5}>
                      <Box className="product-images">
                        <Box className="big-image">
                          <Zoom>
                            <img
                              alt={productItem?.name}
                              src={
                                currentSelectedImage
                                  ? currentSelectedImage
                                  : noImage
                              }
                              width="500"
                            />
                          </Zoom>
                        </Box>
                        {/* <Box className="thumbnail-images">
                          <ul>
                            {productItem?.images?.length > 0 ? (
                              productItem?.images?.map((image) => {
                                return (
                                  <li
                                    className={`${
                                      currentSelectedImage === image
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() => {
                                      this.setState({
                                        currentSelectedImage: image,
                                      });
                                    }}
                                  >
                                    <a>
                                      <img src={image} alt="" />
                                    </a>
                                  </li>
                                );
                              })
                            ) : (
                              <></>
                            )}
                          </ul>
                        </Box> */}
                      </Box>
                      <Box className="product-description">
                        <h3>About Product</h3>
                        <p>{productItem?.description}</p>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={7} lg={7}>
                      <Box className="product-info">
                        <Box className="breadcrum">
                          <ul>
                            <li>
                              <Link to="/">Hone</Link>
                            </li>
                            <li>
                              <span>/</span>
                            </li>
                            <li>
                              <Link
                                to={`/category/${productItem?.category}/${productItem?.subCategory}`}
                              >
                                {productItem?.category}
                              </Link>
                            </li>
                            <li>
                              <span>/</span>
                            </li>
                            <li>
                              <strong>{productItem?.name}</strong>
                            </li>
                          </ul>
                        </Box>
                        <Box className="product-name">
                          <span>{productItem?.name}</span>
                          <Box className="share-icon">
                            <ShareOutlinedIcon onClick={this.toggleShareMenu} />
                            {isShareOpen && (
                            <ul>
                              <li>
                                <FacebookShareButton
                                  url={`https://promodeagro.com/product-details/${productItem?.category}/${productItem?.subCategory}/${productItem?.id}`}
                                  quote={"find best products"}
                                  hashtag={`share your thoughts about ${productItem?.subCategory}`}
                                >
                                  <FacebookIcon size={20} round={true} /> Facebook
                                </FacebookShareButton>
                              </li>
                              <li>
                                <WhatsappShareButton
                                  source={window.location.href}
                                  url={`https://promodeagro.com/product-details/${
                                    productItem?.category
                                  }/${productItem?.subCategory?.replace(
                                    " ",
                                    "%20"
                                  )}/${productItem?.id}`}
                                  quote={"find best products"}
                                  hashtag={`share your thoughts about ${productItem?.subCategory}`}
                                >
                                  <WhatsappIcon size={20} round={true} /> WhatsApp
                                </WhatsappShareButton>
                              </li>
                              <li>
                                <TwitterShareButton
                                  url={`https://promodeagro.com/product-details/${productItem?.category}/${productItem?.subCategory}/${productItem?.id}`}
                                  quote={"Find |Best Products"}
                                  hashtag={`Share Yours Thoughts About ${productItem?.subCategory}`}
                                >
                                  <TwitterIcon size={20} round={true} /> Twitter
                                </TwitterShareButton>
                              </li>
                              <li>
                                <TelegramShareButton
                                  title={productItem?.subCategory}
                                  url={`https://promodeagro.com/product-details/${
                                    productItem?.category
                                  }/${productItem?.subCategory?.replace(
                                    " ",
                                    "%20"
                                  )}/${productItem?.id}`}
                                  quote={"Find |Best Products"}
                                  hashtag={`Share Yours Thoughts About ${productItem?.subCategory}`}
                                >
                                  <TelegramIcon size={20} round={true} /> Telegram
                                </TelegramShareButton>
                              </li>
                            </ul>
                            )}
                          </Box>
                        </Box>
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
                            You save{" "}
                            <span>{productItem?.savingsPercentage} %</span>
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
                                  this.handleQuantity(event, productItem)
                                }
                              >
                                {productItem?.unitPrices?.map(
                                  (unitItem, index) => {
                                    return (
                                      <option key={index} value={unitItem?.qty}>
                                        {unitItem?.qty} {productItem?.unit}
                                      </option>
                                    );
                                  }
                                )}
                              </NativeSelect>
                            </FormControl>
                          </Box>
                        ) : (
                          <Box className="select">{productItem?.unit}</Box>
                        )}
                        <Box className="product-cart-buttons">
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
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
                                          this.props.prodducDetailsData
                                            .status === status.IN_PROGRESS
                                            ? "disableClick"
                                            : "symbol"
                                        }
                                        onClick={() => {
                                          let unitqty = "";
                                          if (
                                            productItem?.unitPrices?.length > 0
                                          ) {
                                            unitqty =
                                              productItem?.unitPrices[0]?.qty;
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

                                      <Box className="Number">
                                        {itemQuantity}
                                      </Box>
                                      <Box
                                        className={
                                          (this.props.updateItems.status ===
                                            status.IN_PROGRESS &&
                                            this.state.isUpdateIncrease) ||
                                          this.props.prodducDetailsData
                                            .status === status.IN_PROGRESS
                                            ? "disableClick"
                                            : "symbol"
                                        }
                                        onClick={() => {
                                          let unitqty = "";
                                          if (
                                            productItem?.unitPrices?.length > 0
                                          ) {
                                            unitqty =
                                              productItem?.unitPrices[0]?.qty;
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
                                        if (
                                          productItem?.unitPrices?.length > 0
                                        ) {
                                          unitqty =
                                            productItem?.unitPrices[0]?.qty;
                                        } else {
                                          unitqty = 1;
                                        }
                                        this.handleAddToCart(
                                          productItem?.id,
                                          unitqty
                                        );
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
                        <Box className="choose-promode">
                          <h4>
                            We choose <span>Promode Agro</span>
                          </h4>
                          <ul>
                            <li>
                              <Box className="image">
                                <img src={deliveryTruck} alt="" />
                              </Box>
                              <Box className="contents">
                                <strong>Free Shipping</strong>
                                <p>Free shipping on all your order</p>
                              </Box>
                            </li>
                            <li>
                              <Box className="image">
                                <img src={customerSupport} alt="" />
                              </Box>
                              <Box className="contents">
                                <strong>Customer Support 24/7</strong>
                                <p>Instant access to Support</p>
                              </Box>
                            </li>
                            <li>
                              <Box className="image">
                                <img src={securePayment} alt="" />
                              </Box>
                              <Box className="contents">
                                <strong>100% Secure Payment</strong>
                                <p>We ensure your money is save</p>
                              </Box>
                            </li>
                            <li>
                              <Box className="image">
                                <img src={moneyBack} alt="" />
                              </Box>
                              <Box className="contents">
                                <strong>Money-Back Guarantee</strong>
                                <p>Same Days Money-Back Guarantee</p>
                              </Box>
                            </li>
                          </ul>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <SimilarProducts
                  topSellingApiLoader={this.state.topSellingApiLoader}
                  topSellingProductsList={topSellingProductsList}
                  fetchTopSellings={this.topSellingApiFromChild}
                  topSellCategoriesList={topSellCategoriesList}
                  apiCalls={this.apiCalls}
                />
              </Container>
            ) : (
              <p>No Item Found</p>
            )}
          </>
        )}
        <AuthModal
          open={this.state.authModalOpen}
          handleClose={() => {
            this.setState({
              authModalOpen: false,
            });
          }}
        />
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const {
    shopCategoryData,
    prodducDetailsData,
    productDetailsData,
    setBookmarksData,
    deleteBookMarkData,
    productReviewData,
    addProductReviewData,
    topSellingProductsData,
    topSellingCategoriesData,
  } = state.allproducts;
  const { additems, cartItems, updateItems, deleteItems } = state.cartitem;
  return {
    additems,
    prodducDetailsData,
    cartItems,
    updateItems,
    deleteItems,
    shopCategoryData,
    productDetailsData,
    setBookmarksData,
    deleteBookMarkData,
    productReviewData,
    addProductReviewData,
    topSellingProductsData,
    topSellingCategoriesData,
  };
}

const mapDispatchToProps = {
  allProducts,
  addItemToCart,
  fetchCartItems,
  updateItemToCart,
  deleteItemToCart,
  productDetails,
  setShopByCategory,
  setProductWishList,
  deleteProductWishList,
  fetchProducReview,
  addProductReview,
  fetchTopSellingProducts,
  fetchToSellingCategories,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(ProductDetails));
