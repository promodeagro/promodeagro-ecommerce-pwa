import React, { Component } from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import productCartImg from "../../../../assets/img/product-cart-img.png";
import priceIcon from "../../../../assets/img/price-icon.png"


class RecentlyViewedItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Box className="recently-container">
        <Container>
          <Box className="heading">
            <h2>Recently Viewed Items</h2>
            <Button>Show All</Button>
          </Box>
          <Box className="recently-products">
            <Box className="product-box">
              <Grid container spacing={2} alignItems={'center'}>
                <Grid item xs={6} sm={6} md={4}>
                  <Box className="image"><img src={productCartImg} alt="" /></Box>
                </Grid>
                <Grid item xs={6} sm={6} md={8}>
                  <Box className="contents">
                    <Box className="name"><a href="#">Green Apple</a></Box>
                    <Box className="price"><img src={priceIcon} alt="" /> 14.99 <span>20.99</span></Box>
                    <Box display={'flex'} width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                      <Box className="ratting"><StarIcon /> 4.5</Box>
                      <Box className="buttons">
                        <Button><TurnedInNotOutlinedIcon /></Button>
                        <Button><ShoppingCartOutlinedIcon /></Button>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box className="product-box">
              <Grid container spacing={2} alignItems={'center'}>
                <Grid item xs={6} sm={6} md={4}>
                  <Box className="image"><img src={productCartImg} alt="" /></Box>
                </Grid>
                <Grid item xs={6} sm={6} md={8}>
                  <Box className="contents">
                    <Box className="name"><a href="#">Green Apple</a></Box>
                    <Box className="price"><img src={priceIcon} alt="" /> 14.99 <span>20.99</span></Box>
                    <Box display={'flex'} width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                      <Box className="ratting"><StarIcon /> 4.5</Box>
                      <Box className="buttons">
                        <Button><TurnedInNotOutlinedIcon /></Button>
                        <Button><ShoppingCartOutlinedIcon /></Button>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box className="product-box">
              <Grid container spacing={2} alignItems={'center'}>
                <Grid item xs={6} sm={6} md={4}>
                  <Box className="image"><img src={productCartImg} alt="" /></Box>
                </Grid>
                <Grid item xs={6} sm={6} md={8}>
                  <Box className="contents">
                    <Box className="name"><a href="#">Green Apple</a></Box>
                    <Box className="price"><img src={priceIcon} alt="" /> 14.99 <span>20.99</span></Box>
                    <Box display={'flex'} width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                      <Box className="ratting"><StarIcon /> 4.5</Box>
                      <Box className="buttons">
                        <Button><TurnedInNotOutlinedIcon /></Button>
                        <Button><ShoppingCartOutlinedIcon /></Button>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}


export default RecentlyViewedItems;