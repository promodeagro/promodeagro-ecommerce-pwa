import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  NativeSelect,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import priceIcon from "../../../../assets/img/price-icon.png";
import noImage from "../../../../assets/img/no-image.png";
import ProfileSideBar from "../profileSideBar";

class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.state;
    return (
      <Box className="main-container">
        <Container>
          <Box className="profile-container">
            <Box className="profile-left">
              <ProfileSideBar />
            </Box>
            <Box className="profile-right">
              <Box className="heading">
                <h2>Wish List</h2>
              </Box>
              <Box className="products">
                <Box className="product-box">
                  <Box className="sale">Sale 50%</Box>
                  <Box className="icon">
                    <DeleteOutlineOutlinedIcon />
                  </Box>
                  <Box className="image">
                    <img src={noImage} alt="" />
                  </Box>
                  <Box className="name">Green Apple</Box>
                  <Box className="price-ratting">
                    <Box className="price">
                      <img src={priceIcon} alt="" /> 14.99
                      <span>20.99</span>
                    </Box>
                    <Box className="ratting">
                      <StarIcon /> 4.5
                    </Box>
                  </Box>
                  <Box className="select">
                    <FormControl fullWidth>
                      <NativeSelect>
                        <option value={"1"}>250</option>
                        <option value={"2"}>500</option>
                        <option value={"1"}>1kg</option>
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
                    <DeleteOutlineOutlinedIcon />
                  </Box>
                  <Box className="image">
                    <img src={noImage} alt="" />
                  </Box>
                  <Box className="name">Green Apple</Box>
                  <Box className="price-ratting">
                    <Box className="price">
                      <img src={priceIcon} alt="" /> 14.99
                      <span>20.99</span>
                    </Box>
                    <Box className="ratting">
                      <StarIcon /> 4.5
                    </Box>
                  </Box>
                  <Box className="select">
                    <FormControl fullWidth>
                      <NativeSelect>
                        <option value={"1"}>250</option>
                        <option value={"2"}>500</option>
                        <option value={"1"}>1kg</option>
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
                    <DeleteOutlineOutlinedIcon />
                  </Box>
                  <Box className="image">
                    <img src={noImage} alt="" />
                  </Box>
                  <Box className="name">Green Apple</Box>
                  <Box className="price-ratting">
                    <Box className="price">
                      <img src={priceIcon} alt="" /> 14.99
                      <span>20.99</span>
                    </Box>
                    <Box className="ratting">
                      <StarIcon /> 4.5
                    </Box>
                  </Box>
                  <Box className="select">
                    <FormControl fullWidth>
                      <NativeSelect>
                        <option value={"1"}>250</option>
                        <option value={"2"}>500</option>
                        <option value={"1"}>1kg</option>
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
                    <DeleteOutlineOutlinedIcon />
                  </Box>
                  <Box className="image">
                    <img src={noImage} alt="" />
                  </Box>
                  <Box className="name">Green Apple</Box>
                  <Box className="price-ratting">
                    <Box className="price">
                      <img src={priceIcon} alt="" /> 14.99
                      <span>20.99</span>
                    </Box>
                    <Box className="ratting">
                      <StarIcon /> 4.5
                    </Box>
                  </Box>
                  <Box className="select">
                    <FormControl fullWidth>
                      <NativeSelect>
                        <option value={"1"}>250</option>
                        <option value={"2"}>500</option>
                        <option value={"1"}>1kg</option>
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
                    <DeleteOutlineOutlinedIcon />
                  </Box>
                  <Box className="image">
                    <img src={noImage} alt="" />
                  </Box>
                  <Box className="name">Green Apple</Box>
                  <Box className="price-ratting">
                    <Box className="price">
                      <img src={priceIcon} alt="" /> 14.99
                      <span>20.99</span>
                    </Box>
                    <Box className="ratting">
                      <StarIcon /> 4.5
                    </Box>
                  </Box>
                  <Box className="select">
                    <FormControl fullWidth>
                      <NativeSelect>
                        <option value={"1"}>250</option>
                        <option value={"2"}>500</option>
                        <option value={"1"}>1kg</option>
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
                    <DeleteOutlineOutlinedIcon />
                  </Box>
                  <Box className="image">
                    <img src={noImage} alt="" />
                  </Box>
                  <Box className="name">Green Apple</Box>
                  <Box className="price-ratting">
                    <Box className="price">
                      <img src={priceIcon} alt="" /> 14.99
                      <span>20.99</span>
                    </Box>
                    <Box className="ratting">
                      <StarIcon /> 4.5
                    </Box>
                  </Box>
                  <Box className="select">
                    <FormControl fullWidth>
                      <NativeSelect>
                        <option value={"1"}>250</option>
                        <option value={"2"}>500</option>
                        <option value={"1"}>1kg</option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
                  <Box className="add-cart">
                    <Button variant="outlined">Add to cart</Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default WishList;
