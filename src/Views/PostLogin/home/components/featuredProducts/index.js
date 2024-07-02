import React, { Component } from "react";
import {
  Box,
  Container,
  FormControl,
  NativeSelect,
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import priceIcon from "../../../../../assets/img/price-icon.png";
import { addDataInCart } from "../../../../../Redux/Home/HomeSlice";
import { connect } from "react-redux";
import _ from "lodash";
class FeaturedProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartData: [],
    };
  }

  handleAddToCart = (item) => {
    const { cartData } = this.state;
    let temp = _.cloneDeep(cartData);
    temp.push(item);
    this.props.addDataInCart(item);
    this.setState({
      cartData: temp,
    });
  };

  render() {
    const { data } = this.props;
    return (
      <Box className="featured-products-container">
        <Container>
          <Box className="heading">Featured Products</Box>
          <Box className="products">
            {data?.length &&
              data.slice(0, 5).map((item, index) => {
                return (
                  <Box className="product-box">
                    <Box className="sale">Sale 50%</Box>
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
                      <Box className="price">
                        <img src={priceIcon} alt="" /> {item?.price}{" "}
                        <span>20.99</span>
                      </Box>
                      <Box className="ratting">
                        <StarIcon /> {item?.rating.rate}
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
                      <Button
                        variant="outlined"
                        onClick={() => this.handleAddToCart(item)}
                      >
                        Add to cart
                      </Button>
                    </Box>
                  </Box>
                );
              })}
          </Box>
          <Box className="load-more-btn">
            <Button variant="outlined">Load More</Button>
          </Box>
        </Container>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { homeData } = state.home;
  console.log("home data", state.home);
  return { homeData };
}

const mapDispatchToProps = { addDataInCart };

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedProducts);
