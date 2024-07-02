import React, { Component } from 'react'
import { Box, Container, FormControl, NativeSelect, Button, Tab } from "@mui/material";
import Carousel from "react-multi-carousel";
import StarIcon from '@mui/icons-material/Star';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
 class ExoticFruits extends Component {
  render() {
    const {responsive,productImg,priceIcon}=this.props
    return (
        <Carousel
        id="carousel-2"
        showDots={false}
        responsive={responsive}
        containerClass="carousel-banner-container"
        infinite={true} // Make the carousel loop infinitely

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
    )
  }
}

export default ExoticFruits