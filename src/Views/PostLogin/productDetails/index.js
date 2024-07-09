import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Rating,
  TextField,
  InputAdornment,
} from "@mui/material";
import RecentlyViewedItems from "./recentlyViewedItems";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import AttachmentIcon from "@mui/icons-material/Attachment";
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

const labels = {
  0.5: "0.5 out of 5",
  1: "1 out of 5",
  1.5: "1.5 out of 5",
  2: "2 out of 5",
  2.5: "2.5 out of 5",
  3: "3 out of 5",
  3.5: "3.5 out of 5",
  4: "4 out of 5",
  4.5: "4.5 out of 5",
  5: "5 out of 5",
};

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const value = 4.5;
    return (
      <Box className="main-container">
        <Container>
          <Box className="share-icons-container">
            <span>Share on</span>
            <ul>
              <li>
                <a href="#">
                  <FacebookOutlinedIcon />
                </a>
              </li>
              <li>
                <a href="#">
                  <TwitterIcon />
                </a>
              </li>
              <li>
                <a href="#">
                  <InstagramIcon />
                </a>
              </li>
              <li>
                <a href="#">
                  <AttachmentIcon />
                </a>
              </li>
            </ul>
          </Box>
          <Box className="details-container">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <Box className="product-images">
                  <Box className="big-image">
                    <Box className="icon">
                      <TurnedInNotOutlinedIcon />
                    </Box>
                    <img src={productBigImage} alt="" />
                  </Box>
                  <Box className="thumbnail-images">
                    <ul>
                      <li className="active">
                        <a href="#">
                          <img src={productThumbnailImage} alt="" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={productThumbnailImage} alt="" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={productThumbnailImage} alt="" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={productThumbnailImage} alt="" />
                        </a>
                      </li>
                    </ul>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={7} lg={7}>
                <Box className="product-info">
                  <Box className="product-name">Green Apple</Box>
                  <Box className="product-review">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon className="gray" />
                    <span>4 Review</span>
                  </Box>
                  <Box className="product-price">
                    <Box className="mrp">
                      MRP <img src={mdiRupee} alt="" /> <span>320.99</span>
                    </Box>
                    <Box className="price">
                      <img src={rupeeIcon} alt="" /> 200.12{" "}
                      <span>230 / Kg</span>
                    </Box>
                  </Box>
                  <Box className="product-save">
                    You save <span>20% OFF</span>
                  </Box>
                  <Box className="product-cart-buttons">
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={6} lg={8}>
                        <Button className="add-cart-btn" variant="contained">
                          Add to Cart <ShoppingCartOutlinedIcon />
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Button className="view-cart-btn" variant="outlined">
                          View Cart Items
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box className="pack-size">
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
                  </Box>
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
            <p>
              Granny Smith apples are light green in colour. They are popularly
              used in manyapple dishes, such asapple pie, applecobbler,apple
              crisp, andapple cake. They are also commonly eaten raw astable
              apples. Granny Smith are high in antioxidant activity, and they
              boast the highest concentration of phenols amongst the apple
              breeds, efficient source of antioxidants, particularly the
              flavonoids cyanidin and epicatechin, especially if eaten with the
              skin intact. Granny Smiths are also naturally low in calories and
              high in dietary fiber and potassium, making them commonly
              recommended as a component of healthy and weight-loss diets. Click
              here for delicious fruit recipes
            </p>
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
          <Box className="reviews-container">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Box className="heading">Customer Reviews</Box>
                <Box className="rating">
                  <Rating
                    name="text-feedback"
                    value={value}
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0 }} fontSize="inherit" />
                    }
                  />
                  <Box sx={{ ml: 1 }}>{labels[value]}</Box>
                </Box>
                <Box className="star-lines">
                  <Box className="line">
                    <span>5 Star</span>
                    <Box className="percent-line">
                      <Box className="percent" style={{ width: "67%" }}></Box>
                    </Box>
                    <p>67%</p>
                  </Box>
                  <Box className="line">
                    <span>4 Star</span>
                    <Box className="percent-line">
                      <Box className="percent" style={{ width: "13%" }}></Box>
                    </Box>
                    <p>13%</p>
                  </Box>
                  <Box className="line">
                    <span>3 Star</span>
                    <Box className="percent-line">
                      <Box className="percent" style={{ width: "10%" }}></Box>
                    </Box>
                    <p>10%</p>
                  </Box>
                  <Box className="line">
                    <span>2 Star</span>
                    <Box className="percent-line">
                      <Box className="percent" style={{ width: "6%" }}></Box>
                    </Box>
                    <p>6%</p>
                  </Box>
                  <Box className="line">
                    <span>1 Star</span>
                    <Box className="percent-line">
                      <Box className="percent" style={{ width: "4%" }}></Box>
                    </Box>
                    <p>4%</p>
                  </Box>
                </Box>
                <Box className="write-review">
                  <strong>Review this product</strong>
                  <p>Share your thoughts with other customers</p>
                  <Button>Write a product Review</Button>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={8} lg={8}>
                <Box className="reviews">
                  <Box className="search-box">
                    <TextField
                      id="outlined-search"
                      className="search"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <img src={searchIcon} alt="" />
                          </InputAdornment>
                        ),
                      }}
                      defaultValue="Search in reviews"
                    />
                  </Box>
                  <Box className="review-boxes">
                    <Box className="review-box">
                      <Grid container spacing={2}>
                        <Grid item xs={2} sm={2} md={1} lg={1}>
                          <Box className="image">
                            <img src={reviewImg} alt="" />
                          </Box>
                        </Grid>
                        <Grid item xs={10} sm={10} md={11} lg={11}>
                          <Box className="contents">
                            <Rating
                              defaultValue={5}
                              readOnly
                              className="rating"
                            />
                            <p>
                              "We love Landingfolio! Our designers were using it
                              for their projects, so we already knew what kind
                              of design they want."
                            </p>
                            <strong>Devon Lane</strong>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box className="review-box">
                      <Grid container spacing={2}>
                        <Grid item xs={2} sm={2} md={1} lg={1}>
                          <Box className="image">
                            <img src={reviewImg} alt="" />
                          </Box>
                        </Grid>
                        <Grid item xs={10} sm={10} md={11} lg={11}>
                          <Box className="contents">
                            <Rating
                              defaultValue={5}
                              readOnly
                              className="rating"
                            />
                            <p>
                              "We love Landingfolio! Our designers were using it
                              for their projects, so we already knew what kind
                              of design they want."
                            </p>
                            <strong>Devon Lane</strong>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <RecentlyViewedItems />
      </Box>
    );
  }
}

export default ProductDetails;
