import React, { Component } from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import RecentlyViewedItems from "./recentlyViewedItems";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import AttachmentIcon from "@mui/icons-material/Attachment";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import productBigImage from "../../../assets/img/product-big-image.png";
import productThumbnailImage from "../../../assets/img/product-big-image.png";
import mdiRupee from "../../../assets/img/mdi-rupee.png";
import rupeeIcon from "../../../assets/img/rupee.png";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
              <Grid item xs={6} sm={6} md={6}>
                <Box className="product-images">
                  <Box className="big-image">
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
              <Grid item xs={6} sm={6} md={6}>
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
                      <Grid item xs={6} sm={6} md={8}>
                        <Button className="add-cart-btn" variant="contained">
                          Add to Cart <ShoppingCartOutlinedIcon />
                        </Button>
                      </Grid>
                      <Grid item xs={6} sm={6} md={4}>
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
                      justifyContent={"flex-start"}
                      width={"100%"}
                    >
                      <Box className="pack-box">
                        <Grid container spacing={2}>
                          <Grid item xs={6} sm={6} md={6}>
                            <Box className="left-contents"></Box>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <Box className="left-contents"></Box>
                          </Grid>
                        </Grid>
                      </Box>
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
