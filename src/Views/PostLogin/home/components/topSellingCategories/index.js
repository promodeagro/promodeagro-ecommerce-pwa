import React, { Component } from "react";
import { Box, Container, FormControl, NativeSelect, Button } from "@mui/material";
import Carousel from "react-multi-carousel";
import StarIcon from '@mui/icons-material/Star';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import productImg from "../../../../../assets/img/product-img.png";
import priceIcon from "../../../../../assets/img/price-icon.png"

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

class TopSellingCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Box className="top-selling-categories-container">
        <Container>
          <Box className="heading">Top Selling Categories</Box>

          <Carousel
            id="carousel-2"
            showDots={true}
            responsive={responsive}
            containerClass="carousel-banner-container"
          >
            <Box className="product-box">
              <Box className="sale">
                Sale 50%
              </Box>
              <Box className="icon">
                <TurnedInNotOutlinedIcon />
              </Box>
              <Box className="image">
                <img src={productImg} alt="" />
              </Box>
              <Box className="name">
                <a href="#">Green Apple</a>
              </Box>
              <Box className="price-ratting">
                <Box className="price"><img src={priceIcon} alt="" /> 14.99 <span>20.99</span></Box>
                <Box className="ratting"><StarIcon /> 4.5</Box>
              </Box>
              <Box className="select">
                <FormControl fullWidth>
                  <NativeSelect defaultValue={10}>
                    <option value={10}>1Kg</option>
                    <option value={20}>500 Gm</option>
                    <option value={30}>2Kg</option>
                  </NativeSelect>
                </FormControl>
              </Box>
              <Box className="add-cart">
                <Button variant="outlined">Add to cart</Button>
              </Box>
            </Box>
            <Box className="product-box">
              <Box className="sale">
                Sale 50%
              </Box>
              <Box className="icon">
                <TurnedInNotOutlinedIcon />
              </Box>
              <Box className="image">
                <img src={productImg} alt="" />
              </Box>
              <Box className="name">
                <a href="#">Green Apple</a>
              </Box>
              <Box className="price-ratting">
                <Box className="price"><img src={priceIcon} alt="" /> 14.99 <span>20.99</span></Box>
                <Box className="ratting"><StarIcon /> 4.5</Box>
              </Box>
              <Box className="select">
                <FormControl fullWidth>
                  <NativeSelect defaultValue={10}>
                    <option value={10}>1Kg</option>
                    <option value={20}>500 Gm</option>
                    <option value={30}>2Kg</option>
                  </NativeSelect>
                </FormControl>
              </Box>
              <Box className="add-cart">
                <Button variant="outlined">Add to cart</Button>
              </Box>
            </Box>
            <Box className="product-box">
              <Box className="sale">
                Sale 50%
              </Box>
              <Box className="icon">
                <TurnedInNotOutlinedIcon />
              </Box>
              <Box className="image">
                <img src={productImg} alt="" />
              </Box>
              <Box className="name">
                <a href="#">Green Apple</a>
              </Box>
              <Box className="price-ratting">
                <Box className="price"><img src={priceIcon} alt="" /> 14.99 <span>20.99</span></Box>
                <Box className="ratting"><StarIcon /> 4.5</Box>
              </Box>
              <Box className="select">
                <FormControl fullWidth>
                  <NativeSelect defaultValue={10}>
                    <option value={10}>1Kg</option>
                    <option value={20}>500 Gm</option>
                    <option value={30}>2Kg</option>
                  </NativeSelect>
                </FormControl>
              </Box>
              <Box className="add-cart">
                <Button variant="outlined">Add to cart</Button>
              </Box>
            </Box>
            <Box className="product-box">
              <Box className="sale">
                Sale 50%
              </Box>
              <Box className="icon">
                <TurnedInNotOutlinedIcon />
              </Box>
              <Box className="image">
                <img src={productImg} alt="" />
              </Box>
              <Box className="name">
                <a href="#">Green Apple</a>
              </Box>
              <Box className="price-ratting">
                <Box className="price"><img src={priceIcon} alt="" /> 14.99 <span>20.99</span></Box>
                <Box className="ratting"><StarIcon /> 4.5</Box>
              </Box>
              <Box className="select">
                <FormControl fullWidth>
                  <NativeSelect defaultValue={10}>
                    <option value={10}>1Kg</option>
                    <option value={20}>500 Gm</option>
                    <option value={30}>2Kg</option>
                  </NativeSelect>
                </FormControl>
              </Box>
              <Box className="add-cart">
                <Button variant="outlined">Add to cart</Button>
              </Box>
            </Box>
            <Box className="product-box">
              <Box className="sale">
                Sale 50%
              </Box>
              <Box className="icon">
                <TurnedInNotOutlinedIcon />
              </Box>
              <Box className="image">
                <img src={productImg} alt="" />
              </Box>
              <Box className="name">
                <a href="#">Green Apple</a>
              </Box>
              <Box className="price-ratting">
                <Box className="price"><img src={priceIcon} alt="" /> 14.99 <span>20.99</span></Box>
                <Box className="ratting"><StarIcon /> 4.5</Box>
              </Box>
              <Box className="select">
                <FormControl fullWidth>
                  <NativeSelect defaultValue={10}>
                    <option value={10}>1Kg</option>
                    <option value={20}>500 Gm</option>
                    <option value={30}>2Kg</option>
                  </NativeSelect>
                </FormControl>
              </Box>
              <Box className="add-cart">
                <Button variant="outlined">Add to cart</Button>
              </Box>
            </Box>
            <Box className="product-box">
              <Box className="sale">
                Sale 50%
              </Box>
              <Box className="icon">
                <TurnedInNotOutlinedIcon />
              </Box>
              <Box className="image">
                <img src={productImg} alt="" />
              </Box>
              <Box className="name">
                <a href="#">Green Apple</a>
              </Box>
              <Box className="price-ratting">
                <Box className="price"><img src={priceIcon} alt="" /> 14.99 <span>20.99</span></Box>
                <Box className="ratting"><StarIcon /> 4.5</Box>
              </Box>
              <Box className="select">
                <FormControl fullWidth>
                  <NativeSelect defaultValue={10}>
                    <option value={10}>1Kg</option>
                    <option value={20}>500 Gm</option>
                    <option value={30}>2Kg</option>
                  </NativeSelect>
                </FormControl>
              </Box>
              <Box className="add-cart">
                <Button variant="outlined">Add to cart</Button>
              </Box>
            </Box>
            <Box className="product-box">
              <Box className="sale">
                Sale 50%
              </Box>
              <Box className="icon">
                <TurnedInNotOutlinedIcon />
              </Box>
              <Box className="image">
                <img src={productImg} alt="" />
              </Box>
              <Box className="name">
                <a href="#">Green Apple</a>
              </Box>
              <Box className="price-ratting">
                <Box className="price"><img src={priceIcon} alt="" /> 14.99 <span>20.99</span></Box>
                <Box className="ratting"><StarIcon /> 4.5</Box>
              </Box>
              <Box className="select">
                <FormControl fullWidth>
                  <NativeSelect defaultValue={10}>
                    <option value={10}>1Kg</option>
                    <option value={20}>500 Gm</option>
                    <option value={30}>2Kg</option>
                  </NativeSelect>
                </FormControl>
              </Box>
              <Box className="add-cart">
                <Button variant="outlined">Add to cart</Button>
              </Box>
            </Box>
            <Box className="product-box">
              <Box className="sale">
                Sale 50%
              </Box>
              <Box className="icon">
                <TurnedInNotOutlinedIcon />
              </Box>
              <Box className="image">
                <img src={productImg} alt="" />
              </Box>
              <Box className="name">
                <a href="#">Green Apple</a>
              </Box>
              <Box className="price-ratting">
                <Box className="price"><img src={priceIcon} alt="" /> 14.99 <span>20.99</span></Box>
                <Box className="ratting"><StarIcon /> 4.5</Box>
              </Box>
              <Box className="select">
                <FormControl fullWidth>
                  <NativeSelect defaultValue={10}>
                    <option value={10}>1Kg</option>
                    <option value={20}>500 Gm</option>
                    <option value={30}>2Kg</option>
                  </NativeSelect>
                </FormControl>
              </Box>
              <Box className="add-cart">
                <Button variant="outlined">Add to cart</Button>
              </Box>
            </Box>
            <Box className="product-box">
              <Box className="sale">
                Sale 50%
              </Box>
              <Box className="icon">
                <TurnedInNotOutlinedIcon />
              </Box>
              <Box className="image">
                <img src={productImg} alt="" />
              </Box>
              <Box className="name">
                <a href="#">Green Apple</a>
              </Box>
              <Box className="price-ratting">
                <Box className="price"><img src={priceIcon} alt="" /> 14.99 <span>20.99</span></Box>
                <Box className="ratting"><StarIcon /> 4.5</Box>
              </Box>
              <Box className="select">
                <FormControl fullWidth>
                  <NativeSelect defaultValue={10}>
                    <option value={10}>1Kg</option>
                    <option value={20}>500 Gm</option>
                    <option value={30}>2Kg</option>
                  </NativeSelect>
                </FormControl>
              </Box>
              <Box className="add-cart">
                <Button variant="outlined">Add to cart</Button>
              </Box>
            </Box>
            <Box className="product-box">
              <Box className="sale">
                Sale 50%
              </Box>
              <Box className="icon">
                <TurnedInNotOutlinedIcon />
              </Box>
              <Box className="image">
                <img src={productImg} alt="" />
              </Box>
              <Box className="name">
                <a href="#">Green Apple</a>
              </Box>
              <Box className="price-ratting">
                <Box className="price"><img src={priceIcon} alt="" /> 14.99 <span>20.99</span></Box>
                <Box className="ratting"><StarIcon /> 4.5</Box>
              </Box>
              <Box className="select">
                <FormControl fullWidth>
                  <NativeSelect defaultValue={10}>
                    <option value={10}>1Kg</option>
                    <option value={20}>500 Gm</option>
                    <option value={30}>2Kg</option>
                  </NativeSelect>
                </FormControl>
              </Box>
              <Box className="add-cart">
                <Button variant="outlined">Add to cart</Button>
              </Box>
            </Box>
          </Carousel>

        </Container>
      </Box>
    );
  }
}

export default TopSellingCategories;
