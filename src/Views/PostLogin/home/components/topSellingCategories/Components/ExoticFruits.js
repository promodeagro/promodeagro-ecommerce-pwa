import React, { Component } from "react";
import { Box, FormControl, NativeSelect, Button } from "@mui/material";
import Slider from "react-slick";
import StarIcon from "@mui/icons-material/Star";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import { Link } from "react-router-dom";

class ExoticFruits extends Component {
  render() {
    const { productImg, priceIcon } = this.props;
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <Slider {...settings}>
        <Box className="product-box">
          <Box className="sale">Sale 50%</Box>
          <Box className="icon">
            <TurnedInNotOutlinedIcon />
          </Box>
          <Box className="image">
            <Link to="/product-details">
              <img src={productImg} alt="" />
            </Link>
          </Box>
          <Box className="name">
            <Link to="/product-details">Green Apple</Link>
          </Box>
          <Box className="price-ratting">
            <Box className="price">
              <img src={priceIcon} alt="" /> 14.99 <span>20.99</span>
            </Box>
            <Box className="ratting">
              <StarIcon /> 4.5
            </Box>
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
          <Box className="sale">Sale 50%</Box>
          <Box className="icon">
            <TurnedInNotOutlinedIcon />
          </Box>
          <Box className="image">
            <Link to="/product-details">
              <img src={productImg} alt="" />
            </Link>
          </Box>
          <Box className="name">
            <Link to="/product-details">Green Apple</Link>
          </Box>
          <Box className="price-ratting">
            <Box className="price">
              <img src={priceIcon} alt="" /> 14.99 <span>20.99</span>
            </Box>
            <Box className="ratting">
              <StarIcon /> 4.5
            </Box>
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
          <Box className="sale">Sale 50%</Box>
          <Box className="icon">
            <TurnedInNotOutlinedIcon />
          </Box>
          <Box className="image">
            <Link to="/product-details">
              <img src={productImg} alt="" />
            </Link>
          </Box>
          <Box className="name">
            <Link to="/product-details">Green Apple</Link>
          </Box>
          <Box className="price-ratting">
            <Box className="price">
              <img src={priceIcon} alt="" /> 14.99 <span>20.99</span>
            </Box>
            <Box className="ratting">
              <StarIcon /> 4.5
            </Box>
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
          <Box className="sale">Sale 50%</Box>
          <Box className="icon">
            <TurnedInNotOutlinedIcon />
          </Box>
          <Box className="image">
            <Link to="/product-details">
              <img src={productImg} alt="" />
            </Link>
          </Box>
          <Box className="name">
            <Link to="/product-details">Green Apple</Link>
          </Box>
          <Box className="price-ratting">
            <Box className="price">
              <img src={priceIcon} alt="" /> 14.99 <span>20.99</span>
            </Box>
            <Box className="ratting">
              <StarIcon /> 4.5
            </Box>
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
          <Box className="sale">Sale 50%</Box>
          <Box className="icon">
            <TurnedInNotOutlinedIcon />
          </Box>
          <Box className="image">
            <Link to="/product-details">
              <img src={productImg} alt="" />
            </Link>
          </Box>
          <Box className="name">
            <Link to="/product-details">Green Apple</Link>
          </Box>
          <Box className="price-ratting">
            <Box className="price">
              <img src={priceIcon} alt="" /> 14.99 <span>20.99</span>
            </Box>
            <Box className="ratting">
              <StarIcon /> 4.5
            </Box>
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
          <Box className="sale">Sale 50%</Box>
          <Box className="icon">
            <TurnedInNotOutlinedIcon />
          </Box>
          <Box className="image">
            <Link to="/product-details">
              <img src={productImg} alt="" />
            </Link>
          </Box>
          <Box className="name">
            <Link to="/product-details">Green Apple</Link>
          </Box>
          <Box className="price-ratting">
            <Box className="price">
              <img src={priceIcon} alt="" /> 14.99 <span>20.99</span>
            </Box>
            <Box className="ratting">
              <StarIcon /> 4.5
            </Box>
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
          <Box className="sale">Sale 50%</Box>
          <Box className="icon">
            <TurnedInNotOutlinedIcon />
          </Box>
          <Box className="image">
            <Link to="/product-details">
              <img src={productImg} alt="" />
            </Link>
          </Box>
          <Box className="name">
            <Link to="/product-details">Green Apple</Link>
          </Box>
          <Box className="price-ratting">
            <Box className="price">
              <img src={priceIcon} alt="" /> 14.99 <span>20.99</span>
            </Box>
            <Box className="ratting">
              <StarIcon /> 4.5
            </Box>
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
          <Box className="sale">Sale 50%</Box>
          <Box className="icon">
            <TurnedInNotOutlinedIcon />
          </Box>
          <Box className="image">
            <Link to="/product-details">
              <img src={productImg} alt="" />
            </Link>
          </Box>
          <Box className="name">
            <Link to="/product-details">Green Apple</Link>
          </Box>
          <Box className="price-ratting">
            <Box className="price">
              <img src={priceIcon} alt="" /> 14.99 <span>20.99</span>
            </Box>
            <Box className="ratting">
              <StarIcon /> 4.5
            </Box>
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
      </Slider>
    );
  }
}

export default ExoticFruits;
