import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Rating,
  TextField,
  InputAdornment,
  FormControl,
  NativeSelect,
  Modal,
} from "@mui/material";
import ReactImageMagnify from "react-image-magnify";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
// import RecentlyViewedItems from "./recentlyViewedItems";
import RecentlyViewedItems from "components/RecentlyViewedItems";
// import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import AttachmentIcon from "@mui/icons-material/Attachment";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import productBigImage from "../../../assets/img/product-big-image.png";
import productThumbnailImage from "../../../assets/img/product-big-image.png";
import mdiRupee from "../../../assets/img/mdi-rupee.png";
import rupeeIcon from "../../../assets/img/rupee.png";
import deliveryTruck from "../../../assets/img/delivery-truck.png";
import timeIcon from "../../../assets/img/time-icon.png";
import returnIcon from "../../../assets/img/return-icon.png";
import organicIcon from "../../../assets/img/organic-icon.png";
import searchIcon from "../../../assets/img/search-icon.png";
import reviewImg from "../../../assets/img/review-img.png";
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
} from "../../../Redux/AllProducts/AllProductthunk";
import { setShopByCategory } from "../../../Redux/AllProducts/AllProductSlice";
import {
  addItemToCart,
  fetchCartItems,
  updateItemToCart,
  deleteItemToCart,
} from "../../../Redux/Cart/CartThunk";
import { Loader, loginDetails } from "Views/Utills/helperFunctions";
import { yellow } from "@mui/material/colors";
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
      recentList: [],
      loaderCount: 0,
      pathName: "",
      qauntityUnits: "",
      isDeleting: false,
      productReviewData: {},
      open: false,
      openReviews: false,
      review: "",
      rating: "",
      visibleReviews: 3,
      currentSelectedImage: "",
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
      this.props.productDetails({
        productId: this.props.params.id,
        userId: items?.userId ? items?.userId : "",
      });
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
      this.props.navigate("/signin");
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

  handleQuantity(event, qty) {
    const items = loginDetails();
    this.setState({
      qauntityUnits: event.target.value,
      isDeleting: true,
    });
    if (qty > 0) {
      this.setState({
        isDeleting: true,
      });
      this.props.deleteItemToCart({
        userId: items.userId,
        productId: this.props.params.id,
      });
    }
  }
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

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleValueChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;
    this.setState({ [name]: val });
  };

  handleWriteReview = () => {
    const items = loginDetails();
    if (items?.userId) {
      this.props.addProductReview({
        productId: this.props.params.id,
        userId: items?.userId,
        rating: this.state.rating,
        review: this.state.review,
      });
    }
  };

  loadMoreReviews = () => {
    this.setState({
      openReviews: true,
    });
  };
  closeReviews = () => {
    this.setState({
      openReviews: false,
    });
  };

  render() {
    const {
      productItem,
      itemQuantity,
      isUpdateIncrease,
      loaderCount,
      isDeleting,
      visibleReviews,
      currentSelectedImage,
    } = this.state;

    const value = 4.5;
    return (
      <Box className="main-container">
        {loaderCount == 0 ? (
          Loader.commonLoader()
        ) : (
          <>
            {productItem?.id ? (
              <>
                <Container>
                  <Box className="share-icons-container">
                    <span>Share on</span>
                    <ul>
                      <li>
                        <a>
                          <FacebookShareButton
                            url={`https://promodeagro.com`}
                            // url={`https://promodeagro.com/product-details/${productItem?.category}/${productItem?.subCategory}/${productItem?.id}`}
                            quote={"find best products"}
                            hashtag={`share your thoughts about ${productItem?.subCategory}`}
                          >
                            <FacebookIcon size={40} round={true} />
                          </FacebookShareButton>
                        </a>
                      </li>
                      <li>
                        <a>
                          <WhatsappShareButton
                             url={`https://promodeagro.com/product-details/FRUITS/Summer%20Strawberries/1589842061624`}
                            // url={`https://promodeagro.com/product-details/${productItem?.category.replace(
                            //   / /g,
                            //   "%20"
                            // )}/${productItem?.subCategory
                            //   .replace(/ /g, "%20")}/${productItem?.id}`}
                            // url={`https://promodeagro.com/product-details/${productItem?.category}/${productItem?.subCategory}/${productItem?.id}`}
                            quote={"find best products"}
                            hashtag={`share your thoughts about ${productItem?.subCategory}`}
                          >
                            <WhatsappIcon size={40} round={true} />
                          </WhatsappShareButton>
                        </a>
                      </li>
                      <li>
                        <a>
                          <TwitterShareButton
                            url={`https://promodeagro.com`}
                            // url={`https://promodeagro.com/product-details/${productItem?.category}/${productItem?.subCategory}/${productItem?.id}`}
                            quote={"Find |Best Products"}
                            hashtag={`Share Yours Thoughts About ${productItem?.subCategory}`}
                          >
                            <TwitterIcon size={40} round={true} />
                          </TwitterShareButton>
                        </a>
                      </li>
                      <li>
                        <a>
                          <TelegramShareButton
                            url={`https://promodeagro.com`}
                            // url={`https://promodeagro.com/product-details/${productItem?.category}/${productItem?.subCategory}/${productItem?.id}`}
                            quote={"Find |Best Products"}
                            hashtag={`Share Yours Thoughts About ${productItem?.subCategory}`}
                          >
                            <TelegramIcon size={40} round={true} />
                          </TelegramShareButton>
                        </a>
                      </li>
                    </ul>
                  </Box>
                  <Box className="details-container">
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={5} lg={5}>
                        <Box className="product-images">
                          <Box className="big-image">
                            {loginDetails()?.userId ? (
                              <Box
                                className="icon"
                                onClick={() =>
                                  this.handleWishList(
                                    productItem?.id,
                                    productItem?.inWishlist
                                  )
                                }
                              >
                                {productItem?.inWishlist ? (
                                  <BookmarkOutlinedIcon />
                                ) : (
                                  <TurnedInNotOutlinedIcon />
                                )}
                              </Box>
                            ) : (
                              <></>
                            )}

                            <Zoom>
                              <img
                                alt={productItem?.name}
                                src={currentSelectedImage}
                                width="500"
                              />
                            </Zoom>
                            {/* <ReactImageMagnify
                              {...{
                                smallImage: {
                                  alt: productItem?.name,
                                  isFluidWidth: true,
                                  src: currentSelectedImage,
                                },
                                largeImage: {
                                  src: currentSelectedImage,
                                  // hoverOffDelayInMs: 150,
                                  width: 800,
                                  height: 600,
                                  // pressMoveThreshold: 1,
                                  // isActivatedOnTouch: true,
                                  // fadeDurationInMs: 200,

                                  // enlargedImageContainerDimensions: {
                                  //   width: "200%",
                                  //   height: "100%",
                                  // },
                                  // enlargedImagePortalId: "portal",
                                },
                                enlargedImageContainerStyle: {
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  top: "10%",
                                  left: "110%",
                                  zIndex: 1000,
                                  backgroundColor: "white",
                                  border: "1px solid #ddd",
                                  padding: "50px",
                                  width: "1000px",
                                  height: "1200px",
                                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                },
                                lensStyle: {
                                  background: "hsla(0, 0%, 100%, .3)",
                                },
                              }}
                            /> */}
                          </Box>
                          <Box className="thumbnail-images">
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
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={7} lg={7}>
                        <Box className="product-info">
                          <Box className="product-name">
                            {productItem?.name}
                          </Box>
                          <Box className="product-review">
                            <Rating
                              name="text-feedback"
                              value={productItem?.ratings?.toString()}
                              readOnly
                              precision={0.5}
                              emptyIcon={
                                <StarIcon
                                  style={{ opacity: 0 }}
                                  fontSize="inherit"
                                />
                              }
                            />
                            <span className="text">
                              {productItem?.ratings} Review
                            </span>
                          </Box>
                          <Box className="product-price">
                            <Box className="mrp">
                              MRP <img src={mdiRupee} alt="" />{" "}
                              <span>{productItem?.mrp}</span>
                            </Box>
                            <Box className="price">
                              <img src={rupeeIcon} alt="" />{" "}
                              {productItem?.price}
                              {/* <span>230 / Kg</span> */}
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

                          <>
                            {productItem?.unitPrices?.length > 0 ? (
                              <Box className="select">
                                <FormControl fullWidth>
                                  <NativeSelect
                                    value={this.state.qauntityUnits}
                                    onChange={(event) =>
                                      this.handleQuantity(
                                        event,
                                        productItem?.cartItem?.Quantity
                                      )
                                    }
                                  >
                                    {productItem?.unitPrices?.map(
                                      (unitItem, index) => {
                                        return (
                                          <option
                                            key={index}
                                            value={unitItem?.qty}
                                          >
                                            {unitItem?.qty} {productItem?.unit}
                                          </option>
                                        );
                                      }
                                    )}
                                  </NativeSelect>
                                </FormControl>
                              </Box>
                            ) : (
                              <Box className="select">{productItem?.unit}</Box> // or any other placeholder or message you want to show
                            )}
                          </>
                          <Box className="product-cart-buttons">
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6} md={6} lg={8}>
                                {productItem?.availability ? (
                                  <>
                                    {parseInt(itemQuantity) != 0 ? (
                                      <Box className="number-input-container">
                                        <Box
                                          className="symbol"
                                          onClick={() => {
                                            let unitqty = "";
                                            if (
                                              productItem?.unitPrices?.length >
                                              0
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
                                          className="symbol"
                                          onClick={() => {
                                            let unitqty = "";
                                            if (
                                              productItem?.unitPrices?.length >
                                              0
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
                              <Grid item xs={12} sm={6} md={6} lg={4}>
                                <Button
                                  className="view-cart-btn"
                                  variant="outlined"
                                  onClick={() => {
                                    const items = loginDetails();
                                    if (items?.userId) {
                                      this.props.navigate("/mycart");
                                    } else {
                                      this.props.navigate("/signin");
                                    }
                                  }}
                                >
                                  View Cart Items
                                </Button>
                              </Grid>
                            </Grid>
                          </Box>
                          {/* <Box className="pack-size">
                     <h3>Pack Size</h3>
                     <Box
                       display={"flex"}
                       alignItems={"flex-start"}
                       justifyContent={"space-between"}
                       width={"100%"}
                       flexWrap={"wrap"}
                     >
                       <Grid container spacing={2}>
                         <Grid item xs={12} sm={6} md={12} lg={6}>
                           <Box className="pack-box active">
                             <Box className="check">
                               <CheckCircleOutlinedIcon />
                             </Box>
                             <Grid container spacing={0}>
                               <Grid item xs={5} sm={5} md={5} lg={5}>
                                 <Box className="left-contents">
                                   <strong>2x4 pcs</strong>
                                   <span>Multipack</span>
                                 </Box>
                               </Grid>
                               <Grid item xs={7} sm={7} md={7} lg={7}>
                                 <Box className="right-contents">
                                   <Box className="product-price">
                                     <Box className="price">
                                       <img src={rupeeIcon} alt="" /> 200.12
                                       <span>
                                         <img src={mdiRupee} alt="" />
                                         30.12 / pc
                                       </span>
                                     </Box>
                                   </Box>
                                   <Box className="product-save">
                                     <p>
                                       <img src={mdiRupee} alt="" /> 320.99
                                     </p>
                                     <span>20% OFF</span>
                                   </Box>
                                 </Box>
                               </Grid>
                             </Grid>
                           </Box>
                         </Grid>
                         <Grid item xs={12} sm={6} md={12} lg={6}>
                           <Box className="pack-box">
                             <Grid container spacing={0}>
                               <Grid item xs={5} sm={5} md={5} lg={5}>
                                 <Box className="left-contents">
                                   <strong>4 pcs</strong>
                                   <span>Approx. 500-600gm</span>
                                 </Box>
                               </Grid>
                               <Grid item xs={7} sm={7} md={7} lg={7}>
                                 <Box className="right-contents">
                                   <Box className="product-price">
                                     <Box className="price">
                                       <img src={rupeeIcon} alt="" /> 200.12
                                       <span>
                                         <img src={mdiRupee} alt="" />
                                         30.12 / pc
                                       </span>
                                     </Box>
                                   </Box>
                                   <Box className="product-save">
                                     <p>
                                       <img src={mdiRupee} alt="" /> 320.99
                                     </p>
                                     <span>20% OFF</span>
                                   </Box>
                                 </Box>
                               </Grid>
                             </Grid>
                           </Box>
                         </Grid>
                         <Grid item xs={12} sm={6} md={12} lg={6}>
                           <Box className="pack-box">
                             <Box className="check">
                               <CheckCircleOutlinedIcon />
                             </Box>
                             <Grid container spacing={0}>
                               <Grid item xs={5} sm={5} md={5} lg={5}>
                                 <Box className="left-contents">
                                   <strong>4 pcs</strong>
                                   <span>Multipack</span>
                                 </Box>
                               </Grid>
                               <Grid item xs={7} sm={7} md={7} lg={7}>
                                 <Box className="right-contents">
                                   <Box className="product-price">
                                     <Box className="price">
                                       <img src={rupeeIcon} alt="" /> 200.12
                                       <span>
                                         <img src={mdiRupee} alt="" />
                                         30.12 / pc
                                       </span>
                                     </Box>
                                   </Box>
                                   <Box className="product-save">
                                     <p>
                                       <img src={mdiRupee} alt="" /> 320.99
                                     </p>
                                     <span>20% OFF</span>
                                   </Box>
                                 </Box>
                               </Grid>
                             </Grid>
                           </Box>
                         </Grid>
                         <Grid item xs={12} sm={6} md={12} lg={6}>
                           <Box className="pack-box">
                             <Grid container spacing={0}>
                               <Grid item xs={5} sm={5} md={5} lg={5}>
                                 <Box className="left-contents">
                                   <strong>4 pcs</strong>
                                   <span>Approx. 500-600gm</span>
                                 </Box>
                               </Grid>
                               <Grid item xs={7} sm={7} md={7} lg={7}>
                                 <Box className="right-contents">
                                   <Box className="product-price">
                                     <Box className="price">
                                       <img src={rupeeIcon} alt="" /> 200.12
                                       <span>
                                         <img src={mdiRupee} alt="" />
                                         30.12 / pc
                                       </span>
                                     </Box>
                                   </Box>
                                   <Box className="product-save">
                                     <p>
                                       <img src={mdiRupee} alt="" /> 320.99
                                     </p>
                                     <span>20% OFF</span>
                                   </Box>
                                 </Box>
                               </Grid>
                             </Grid>
                           </Box>
                         </Grid>
                       </Grid>
                     </Box>
                     <Box className="combos-btn">
                       <Button>
                         <p>+2</p> More Combos
                       </Button>
                     </Box>
                   </Box> */}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    width={"100%"}
                    className="choose-container"
                  >
                    <Box className="heading">Why Choose us ?</Box>
                    <Grid container spacing={3} justifyContent={"center"}>
                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Box className="choose-box">
                          <Box className="box">
                            <img src={deliveryTruck} alt="" />
                          </Box>
                          <span>Free Shipping</span>
                          <p>Delivery at your door step</p>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Box className="choose-box">
                          <Box className="box">
                            <img src={timeIcon} alt="" />
                          </Box>
                          <span>On Time</span>
                          <p>Guarantee</p>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Box className="choose-box">
                          <Box className="box">
                            <img src={returnIcon} alt="" />
                          </Box>
                          <span>Easy Return</span>
                          <p>No Questions Asked</p>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Box className="choose-box">
                          <Box className="box">
                            <img src={organicIcon} alt="" />
                          </Box>
                          <span>100% Organic</span>
                          <p>You can Trust</p>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box className="product-contents">
                    <h3>About the Product</h3>
                    <p>{productItem?.about}</p>
                    <Box className="other-info">
                      <h4>
                        Other Product Info <ExpandCircleDownOutlinedIcon />
                      </h4>
                      <ul>
                        <li>EAN Code: 1203789</li>
                        <li>Country of origin: India</li>
                      </ul>
                    </Box>
                  </Box>
                  {this.state.productReviewData?.reviews?.length > 0 && (
                    <Box className="reviews-container">
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                          {this.state.productReviewData?.reviews?.length ? (
                            <Box className="heading">Customer Reviews</Box>
                          ) : null}
                          <Box className="rating">
                            {this.state.productReviewData?.averageRating ? (
                              <>
                                <Rating
                                  name="text-feedback"
                                  value={this.state.productReviewData?.averageRating?.toString()}
                                  readOnly
                                  precision={0.5}
                                  emptyIcon={
                                    <StarIcon
                                      style={{ opacity: 0 }}
                                      fontSize="inherit"
                                    />
                                  }
                                />
                                <Box sx={{ ml: 1 }}>
                                  {this.state.productReviewData?.averageRating}{" "}
                                  out of 5
                                </Box>
                              </>
                            ) : (
                              <></>
                            )}
                          </Box>
                          <Box className="star-lines">
                            {this.state.productReviewData?.ratingDistribution
                              ?.length > 0 ? (
                              this.state.productReviewData?.ratingDistribution.map(
                                (item) => {
                                  return (
                                    <Box className="line">
                                      <span>{item?.rating} Star</span>
                                      <Box className="percent-line">
                                        <Box
                                          className="percent"
                                          style={{
                                            width: `${item?.percentage}%`,
                                          }}
                                        ></Box>
                                      </Box>
                                      <p>{item?.percentage}%</p>
                                    </Box>
                                  );
                                }
                              )
                            ) : (
                              <></>
                            )}
                          </Box>
                          {loginDetails()?.userId ? (
                            <Box className="write-review">
                              <strong>Review this product</strong>
                              <p>Share your thoughts with other customers</p>
                              <Button onClick={this.handleOpen}>
                                Write a product Review
                              </Button>
                            </Box>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                          <Box className="reviews">
                            <Box className="review-boxes">
                              {this.state.productReviewData?.reviews?.length
                                ? this.state.productReviewData?.reviews
                                    ?.slice(0, visibleReviews)
                                    .map((item) => {
                                      return (
                                        <Box className="review-box">
                                          <Grid container spacing={2}>
                                            <Grid
                                              item
                                              xs={2}
                                              sm={2}
                                              md={1}
                                              lg={1}
                                            >
                                              <Box className="image">
                                                <img src={reviewImg} alt="" />
                                              </Box>
                                            </Grid>
                                            <Grid
                                              item
                                              xs={10}
                                              sm={10}
                                              md={11}
                                              lg={11}
                                            >
                                              <Box className="contents">
                                                <Rating
                                                  defaultValue={item?.rating}
                                                  readOnly
                                                  className="rating"
                                                />
                                                <p>{item.review}</p>
                                                <strong>
                                                  {item?.username}
                                                </strong>
                                              </Box>
                                            </Grid>
                                          </Grid>
                                        </Box>
                                      );
                                    })
                                : null}
                              {this.state.productReviewData?.reviews?.length >
                                3 && (
                                <Box className="load-more">
                                  <Button onClick={this.loadMoreReviews}>
                                    Load More
                                  </Button>
                                </Box>
                              )}

                              <Modal
                                open={this.state.openReviews}
                                onClose={this.closeReviews}
                                className="product-reviews-modal"
                              >
                                <Box className="reviews-modal">
                                  <Box className="reviews-modal-header">
                                    Product All Reviews
                                    <CloseIcon onClick={this.closeReviews} />
                                  </Box>
                                  <Box className="review-boxes">
                                    {this.state.productReviewData?.reviews
                                      ?.length
                                      ? this.state.productReviewData?.reviews?.map(
                                          (item) => {
                                            return (
                                              <Box className="review-box">
                                                <Grid container spacing={2}>
                                                  <Grid
                                                    item
                                                    xs={2}
                                                    sm={2}
                                                    md={1}
                                                    lg={1}
                                                  >
                                                    <Box className="image">
                                                      <img
                                                        src={reviewImg}
                                                        alt=""
                                                      />
                                                    </Box>
                                                  </Grid>
                                                  <Grid
                                                    item
                                                    xs={10}
                                                    sm={10}
                                                    md={11}
                                                    lg={11}
                                                  >
                                                    <Box className="contents">
                                                      <Rating
                                                        defaultValue={
                                                          item?.rating
                                                        }
                                                        readOnly
                                                        className="rating"
                                                      />
                                                      <p>{item.review}</p>
                                                      <strong>
                                                        {item?.username}
                                                      </strong>
                                                    </Box>
                                                  </Grid>
                                                </Grid>
                                              </Box>
                                            );
                                          }
                                        )
                                      : null}
                                  </Box>
                                </Box>
                              </Modal>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </Container>
                <RecentlyViewedItems />
              </>
            ) : (
              <p>No Item Found</p>
            )}
          </>
        )}
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          className="write-review-modal"
        >
          <Box className="review-modal">
            <Box display={"block"} width={"100%"} marginBottom={"10px"}>
              <strong>
                Write your review{" "}
                <CloseIcon onClick={() => this.handleClose()} />
              </strong>
            </Box>
            <Box display={"block"} width={"100%"} marginBottom={"10px"}>
              <Rating
                required
                name="rating"
                value={this.state.rating}
                className="rating"
                precision={0.5}
                onChange={this.handleValueChange}
              />
            </Box>
            <Box display={"block"} width={"100%"} marginBottom={"20px"}>
              <TextField
                className="write-review-message"
                multiline
                rows={4}
                placeholder="Type in here…"
                onChange={this.handleValueChange}
                name="review"
                value={this.state.review}
              />
            </Box>
            <Box display={"block"} width={"100%"} textAlign={"right"}>
              <Button
                onClick={() => this.handleWriteReview()}
                disabled={
                  this.props.addProductReviewData.status === status.IN_PROGRESS
                }
                endIcon={
                  this.props.addProductReviewData.status ===
                  status.IN_PROGRESS ? (
                    <CircularProgress className="common-loader " />
                  ) : (
                    <></>
                  )
                }
              >
                Add Review
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { homeData } = state.home;
  const {
    allProductsData,
    shopCategoryData,
    prodducDetailsData,
    productDetailsData,
    setBookmarksData,
    deleteBookMarkData,
    productReviewData,
    addProductReviewData,
  } = state.allproducts;
  const { additems, cartItems, updateItems, deleteItems } = state.cartitem;
  return {
    allProductsData,
    homeData,
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(ProductDetails));
