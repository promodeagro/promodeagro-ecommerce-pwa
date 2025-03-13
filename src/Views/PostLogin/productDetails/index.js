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
import ProductDetailCartUpdateView from "../../../components/AddRemoveProductComponents/productDetailView";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupId: this.props.params.groupId,
      productItem: {},
      loaderCount: 0,
      pathName: "",
      currentSelectedImage: "",
      topSellingProductsList: [],
      topSellCategoriesList: [],
      isShareOpen: false,
      matches: window.matchMedia("(max-width: 600px)").matches,
    };
  }
  componentDidMount() {
    window
      .matchMedia("(max-width: 600px)")
      .addEventListener("change", (e) => this.setState({ matches: e.matches }));
    const items = loginDetails();
    this.setState({
      pathName: window.location.pathname,
    });
    this.props.productDetails({
      productId: this.props.params.groupId,
      userId: items?.userId ? items?.userId : "",
    });
    this.props.fetchProducReview(this.props.params.groupId);
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
      this.props.fetchProducReview(this.props.params.groupId);

      this.props.productDetails({
        productId: this.props.params.groupId,
        userId: items?.userId ? items?.userId : "",
      });
    }

    if (
      prevProps.addProductReviewData.status !==
        this.props.addProductReviewData.status &&
      this.props.addProductReviewData.status === status.SUCCESS
    ) {
      this.props.fetchProducReview(this.props.params.groupId);
    } else if (this.props.addProductReviewData.status === status.FAILURE) {
    }
    if (
      prevProps.deleteBookMarkData.status !==
        this.props.deleteBookMarkData.status &&
      this.props.deleteBookMarkData.status === status.SUCCESS
    ) {
      if (this.props.deleteBookMarkData.data.statusCode === 200) {
        this.props.productDetails({
          productId: this.props.params.groupId,
          userId: items?.userId ? items?.userId : "",
        });
      } else {
        ErrorMessages.error(this.props.deleteBookMarkData?.data?.message);
      }
    }

    if (
      prevProps.setBookmarksData.status !==
        this.props.setBookmarksData.status &&
      this.props.setBookmarksData.status === status.SUCCESS
    ) {
      this.props.productDetails({
        productId: this.props.params.groupId,
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
        loaderCount: 1,
        currentSelectedImage: this.props?.productDetailsData?.data?.image,
      });

      let data = localStorage.getItem("recentviewitems");
      if (data) {
        let path = window.location.pathname.split("/");

        let recentViewList = JSON.parse(data);
        const isItemInList = recentViewList.some(
          (item) => item.id === path[path.length - 1]
        );

        if (!isItemInList) {
          if (this.props.productDetailsData?.data?.groupId) {
            recentViewList.unshift(this.props.productDetailsData?.data);
            localStorage.setItem(
              "recentviewitems",
              JSON.stringify(recentViewList.slice(0, 3))
            );
          }
        }
      } else {
        if (this.props.productDetailsData?.data?.groupId) {
          localStorage.setItem(
            "recentviewitems",
            JSON.stringify([this.props.productDetailsData?.data])
          );
        }
      }
    } else if (this.props.productDetailsData.status === status.FAILURE) {
      this.setState({
        productItem: {},
        loaderCount: 1,
        currentSelectedImage: "",
      });
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
      productId: this.props.params.groupId,
      userId: items?.userId ? items?.userId : "",
    });
    if (items?.userId) {
      this.props.fetchCartItems({
        userId: items?.userId,
      });
    }
  }

  toggleShareMenu = () => {
    this.setState((prevState) => ({ isShareOpen: !prevState.isShareOpen }));
  };

  render() {
    const {
      productItem,
      loaderCount,
      currentSelectedImage,
      topSellingProductsList,
      topSellCategoriesList,
      isShareOpen,
      matches,
    } = this.state;

    return (
      <Box className="main-container">
        {loaderCount == 0 ? (
          Loader.commonLoader()
        ) : (
          <>
            {productItem?.groupId ? (
              <Container>
                <Box className="details-container">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={5} lg={5}>
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
                    </Grid>
                    <Grid item xs={12} sm={6} md={7} lg={7}>
                      <Box className="product-info">
                        {!matches && (
                          <Box className="breadcrum">
                            <ul>
                              <li>
                                <Link to="/">Home</Link>
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
                        )}
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
                                    <FacebookIcon size={20} round={true} />{" "}
                                    Facebook
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
                                    )}/${productItem?.groupId}`}
                                    quote={"find best products"}
                                    hashtag={`share your thoughts about ${productItem?.subCategory}`}
                                  >
                                    <WhatsappIcon size={20} round={true} />{" "}
                                    WhatsApp
                                  </WhatsappShareButton>
                                </li>
                                <li>
                                  <TwitterShareButton
                                    url={`https://promodeagro.com/product-details/${productItem?.category}/${productItem?.subCategory}/${productItem?.groupId}`}
                                    quote={"Find |Best Products"}
                                    hashtag={`Share Yours Thoughts About ${productItem?.subCategory}`}
                                  >
                                    <TwitterIcon size={20} round={true} />{" "}
                                    Twitter
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
                                    )}/${productItem?.groupId}`}
                                    quote={"Find |Best Products"}
                                    hashtag={`Share Yours Thoughts About ${productItem?.subCategory}`}
                                  >
                                    <TelegramIcon size={20} round={true} />{" "}
                                    Telegram
                                  </TelegramShareButton>
                                </li>
                              </ul>
                            )}
                          </Box>
                        </Box>
                        <ProductDetailCartUpdateView
                          productItem={productItem}
                        />

                        {!matches && (
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
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                {!matches && (
                  <Box className="product-description22">
                    <h3>About Product</h3>
                    <p>{productItem?.description}</p>
                  </Box>
                )}
                <SimilarProducts
                  topSellingApiLoader={this.state.topSellingApiLoader}
                  topSellingProductsList={topSellingProductsList}
                  fetchTopSellings={this.topSellingApiFromChild}
                  topSellCategoriesList={topSellCategoriesList}
                  apiCalls={this.apiCalls}
                />
                <Box className="details-container">
                  {matches && (
                    <Box className="product-description">
                      <h4>About Product</h4>
                      <p>{productItem?.description}</p>
                    </Box>
                  )}
                  {matches && (
                    <Box className="choose-promode">
                      <h4>Why Choose us ?</h4>
                      <ul>
                        <li>
                          <Box className="image">
                            <img src={deliveryTruck} alt="" />
                          </Box>
                          <Box className="contents">
                            <strong>Free Shipping</strong>
                            <p>Delivery at your door step</p>
                          </Box>
                        </li>
                        <li>
                          <Box className="image">
                            <img src={customerSupport} alt="" />
                          </Box>
                          <Box className="contents">
                            <strong>On Time</strong>
                            <p>Guarantee</p>
                          </Box>
                        </li>
                        <li>
                          <Box className="image">
                            <img src={securePayment} alt="" />
                          </Box>
                          <Box className="contents">
                            <strong>Easy Return</strong>
                            <p>No Questions Asked</p>
                          </Box>
                        </li>
                        <li>
                          <Box className="image">
                            <img src={moneyBack} alt="" />
                          </Box>
                          <Box className="contents">
                            <strong>100% Organic </strong>
                            <p>You can Trust</p>
                          </Box>
                        </li>
                      </ul>
                    </Box>
                  )}
                </Box>
              </Container>
            ) : (
              <p>No Item Found</p>
            )}
          </>
        )}
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
