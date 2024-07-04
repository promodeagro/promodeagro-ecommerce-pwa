import React, { Component } from "react";
import { Box, Button, Container, Grid, IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import realtedProdctImg1 from "../../../../assets/img/realted-product-1.png";
import { Link } from "react-router-dom";
import starIcon from "../../../../assets/img/star.png";

class RecentlyViewedItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      // <Box className="recently-container">
      //   <Container>
      //     <Box className="heading">
      //       <h2>Recently Viewed Items</h2>
      //       <Button>Show All</Button>
      //     </Box>
      //     <Box className="recently-products">
      //       <Box className="product-box">
      //         <Grid container spacing={2} alignItems={'center'}>
      //           <Grid item xs={6} sm={6} md={4}>
      //             <Box className="image"><img src={productCartImg} alt="" /></Box>
      //           </Grid>
      //           <Grid item xs={6} sm={6} md={8}>
      //             <Box className="contents">
      //               <Box className="name"><a href="#">Green Apple</a></Box>
      //               <Box className="price"><img src={priceIcon} alt="" /> 14.99 <span>20.99</span></Box>
      //               <Box display={'flex'} width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
      //                 <Box className="ratting"><StarIcon /> 4.5</Box>
      //                 <Box className="buttons">
      //                   <Button><TurnedInNotOutlinedIcon /></Button>
      //                   <Button><ShoppingCartOutlinedIcon /></Button>
      //                 </Box>
      //               </Box>
      //             </Box>
      //           </Grid>
      //         </Grid>
      //       </Box>
      //       <Box className="product-box">
      //         <Grid container spacing={2} alignItems={'center'}>
      //           <Grid item xs={6} sm={6} md={4}>
      //             <Box className="image"><img src={productCartImg} alt="" /></Box>
      //           </Grid>
      //           <Grid item xs={6} sm={6} md={8}>
      //             <Box className="contents">
      //               <Box className="name"><a href="#">Green Apple</a></Box>
      //               <Box className="price"><img src={priceIcon} alt="" /> 14.99 <span>20.99</span></Box>
      //               <Box display={'flex'} width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
      //                 <Box className="ratting"><StarIcon /> 4.5</Box>
      //                 <Box className="buttons">
      //                   <Button><TurnedInNotOutlinedIcon /></Button>
      //                   <Button><ShoppingCartOutlinedIcon /></Button>
      //                 </Box>
      //               </Box>
      //             </Box>
      //           </Grid>
      //         </Grid>
      //       </Box>
      //       <Box className="product-box">
      //         <Grid container spacing={2} alignItems={'center'}>
      //           <Grid item xs={6} sm={6} md={4}>
      //             <Box className="image"><img src={productCartImg} alt="" /></Box>
      //           </Grid>
      //           <Grid item xs={6} sm={6} md={8}>
      //             <Box className="contents">
      //               <Box className="name"><a href="#">Green Apple</a></Box>
      //               <Box className="price"><img src={priceIcon} alt="" /> 14.99 <span>20.99</span></Box>
      //               <Box display={'flex'} width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
      //                 <Box className="ratting"><StarIcon /> 4.5</Box>
      //                 <Box className="buttons">
      //                   <Button><TurnedInNotOutlinedIcon /></Button>
      //                   <Button><ShoppingCartOutlinedIcon /></Button>
      //                 </Box>
      //               </Box>
      //             </Box>
      //           </Grid>
      //         </Grid>
      //       </Box>
      //     </Box>
      //   </Container>
      // </Box>
      <Box className="Related-products-container">
        <Container>
          <Box className="heading-part d-flex align-items-center justify-content-between">
            <span className="d-block title">Recently Viewed Items</span>
            <Link to="">
              <span className="d-block">Show All</span>
            </Link>
          </Box>
          <Grid container spacing={2} data-aos="zoom-in">
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Box className="product-details d-flex align-items-center ">
                <img src={realtedProdctImg1} alt="" />
                <Box className="product-price-info">
                  <span className="d-block product-name">Green Apple</span>
                  <Box className="amount-info d-flex align-items-center">
                    <span className="drop-amount">₹ 14.99</span>
                    <s className="final-amount">₹ 20.99</s>
                  </Box>
                  <Box className="rating-info d-flex align-items-center justify-content-between">
                    <Box className="rating d-flex align-items-center">
                      <img src={starIcon} alt="star-icon" />
                      <span className="rating-number">4.5</span>
                    </Box>
                    <Box className="d-flex align-items-center justify-content-between">
                      <IconButton aria-label="bookmark" className="icon-btn">
                        <BookmarkBorderIcon />
                      </IconButton>
                      <IconButton aria-label="bookmark" className="icon-btn">
                        <ShoppingCartIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Box className="product-details d-flex align-items-center ">
                <img src={realtedProdctImg1} alt="" />
                <Box className="product-price-info">
                  <span className="d-block product-name">Green Apple</span>
                  <Box className="amount-info d-flex align-items-center">
                    <span className="drop-amount">₹ 14.99</span>
                    <s className="final-amount">₹ 20.99</s>
                  </Box>
                  <Box className="rating-info d-flex align-items-center justify-content-between">
                    <Box className="rating d-flex align-items-center">
                      <img src={starIcon} alt="star-icon" />
                      <span className="rating-number">4.5</span>
                    </Box>
                    <Box className="d-flex align-items-center justify-content-between">
                      <IconButton aria-label="bookmark" className="icon-btn">
                        <BookmarkBorderIcon />
                      </IconButton>
                      <IconButton aria-label="bookmark" className="icon-btn">
                        <ShoppingCartIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Box className="product-details d-flex align-items-center ">
                <img src={realtedProdctImg1} alt="" />
                <Box className="product-price-info">
                  <span className="d-block product-name">Green Apple</span>
                  <Box className="amount-info d-flex align-items-center">
                    <span className="drop-amount">₹ 14.99</span>
                    <s className="final-amount">₹ 20.99</s>
                  </Box>
                  <Box className="rating-info d-flex align-items-center justify-content-between">
                    <Box className="rating d-flex align-items-center">
                      <img src={starIcon} alt="star-icon" />
                      <span className="rating-number">4.5</span>
                    </Box>
                    <Box className="d-flex align-items-center justify-content-between">
                      <IconButton aria-label="bookmark" className="icon-btn">
                        <BookmarkBorderIcon />
                      </IconButton>
                      <IconButton aria-label="bookmark" className="icon-btn">
                        <ShoppingCartIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }
}

export default RecentlyViewedItems;
