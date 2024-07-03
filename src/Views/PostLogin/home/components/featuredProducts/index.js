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
import noImage from "../../../../../assets/img/no-image.png";
import { addDataInCart } from "../../../../../Redux/Home/HomeSlice";
import { allProducts } from "../../../../../Redux/AllProducts/AllProductthunk";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import status from "../../../../../Redux/Constants";

class FeaturedProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartData: [],
      productsData: [],
    };
  }

  componentDidMount() {
    this.props.allProducts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.allProductsData.status !== this.props.allProductsData.status &&
      this.props.allProductsData.status === status.SUCCESS &&
      this.props.allProductsData.data
    ) {
      console.log(this.props.allProductsData.data);
      this.setState({
        productsData: this.props.allProductsData.data,
      });
    }
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
    const { productsData } = this.state;
    return (
      <Box className="featured-products-container">
        <Container>
          <Box className="heading">Featured Products</Box>
          <Box className="products">
            {productsData?.length &&
              productsData.slice(0, 5).map((item, index) => {
                return (
                  <Box className="product-box" key={index}>
                    <Box className="sale">Sale 50%</Box>
                    <Box className="icon">
                      <TurnedInNotOutlinedIcon />
                    </Box>
                    <Box className="image">
                      <Link to="/product-details">
                        <img src={item?.image ? item?.image : noImage} alt="" />
                      </Link>
                    </Box>
                    <Box className="name">
                      <Link to="/product-details">{item?.category}</Link>
                    </Box>
                    <Box className="price-ratting">
                      <Box className="price">
                        <img src={priceIcon} alt="" /> {item?.price}
                        <span>20.99</span>
                      </Box>
                      <Box className="ratting">
                        <StarIcon /> 4.5
                      </Box>
                    </Box>
                    <Box className="select">{item.unit}</Box>
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
            <Link to="/category">Load More</Link>
          </Box>
        </Container>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { homeData } = state.home;
  const { allProductsData } = state.allproducts;
  return { allProductsData, homeData };
}

const mapDispatchToProps = { allProducts, addDataInCart };

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedProducts);
