import React, { Component } from "react";
import { Box, FormControl, NativeSelect, Button, Grid } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import productImg from "../../../../assets/img/product-img.png";
import priceIcon from "../../../../assets/img/price-icon.png"

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Box className="listing-container">
        <Box className="heading">
          <Grid container spacing={2} alignItems={'center'}>
            <Grid item xs={6} sm={6} md={6}>
              <h2>Leafy Vegetable</h2>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <Box className="d-flex w-100 justify-content-end">
                <Box className="sort-by">
                  <FormControl fullWidth>
                    <NativeSelect
                      defaultValue={10}
                      inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                      }}
                    >
                      <option value={10}>Sort by  Price - Low to High</option>
                      <option value={20}>Sort by  Price - High to Low</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
                <Box className="results-text"><strong>52</strong> Results Found</Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="products">
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
        </Box>
      </Box>
    );
  }
}


export default List;

