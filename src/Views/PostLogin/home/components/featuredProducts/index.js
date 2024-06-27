import React, { Component } from "react";
import { Box, Container, FormControl, NativeSelect, Button } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import productImg from "../../../../../assets/img/product-img.png";
import priceIcon from "../../../../../assets/img/price-icon.png"
import { ErrorMessages } from "Views/Utills/helperFunctions";
class FeaturedProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  handleAddToCart = (id) => {
    ErrorMessages.success("added to cart")

  }

  render() {
    const { data } = this.props
    return (
      <Box className="featured-products-container">
        <Container>
          <Box className="heading">Featured Products</Box>
          <Box className="products">
            {data?.length && data.slice(0, 5).map((item, index) => {
              debugger
              return <Box className="product-box">
                <Box className="sale">
                  Sale 50%
                </Box>
                <Box className="icon">
                  <TurnedInNotOutlinedIcon />
                </Box>
                <Box className="image">
                  <img src={item?.image} alt="" />
                </Box>
                <Box className="name">
                  <a href="#">{item?.category}</a>
                </Box>
                <Box className="price-ratting">
                  <Box className="price"><img src={priceIcon} alt="" /> {item?.price} <span>20.99</span></Box>
                  <Box className="ratting"><StarIcon /> {item?.rating.rate}</Box>
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
                  <Button variant="outlined" onClick={() => this.handleAddToCart()}>Add to cart</Button>
                </Box>
              </Box>
            })}

            {/* <Box className="product-box">
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
            </Box> */}
          </Box>
          <Box className="load-more-btn">
            <Button variant="outlined">Load More</Button>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default FeaturedProducts;
