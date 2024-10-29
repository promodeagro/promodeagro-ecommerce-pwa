import React, { Component } from "react";
import { Box, Container } from "@mui/material";
import productImg from "../../../../assets/img/product-img.png";
import priceIcon from "../../../../assets/img/price-icon.png";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { Link } from "react-router-dom";
import All from "./Components/All";
import status from "../../../../Redux/Constants";
import { getAllProductWithCategory } from "../../../../Redux/AllProducts/AllProductthunk";
import { connect } from "react-redux";
import { Loader } from "Views/Utills/helperFunctions";

class SimilarProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      productItems: [],
      matches: window.matchMedia("(max-width: 600px)").matches,
    };
  }

  componentDidMount() {
    window
      .matchMedia("(max-width: 600px)")
      .addEventListener("change", (e) => this.setState({ matches: e.matches }));
    this.props.getAllProductWithCategory();
    this.setState({ loading: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.allProductWithCategory.status !==
      this.props.allProductWithCategory.status
    ) {
      if (
        this.props.allProductWithCategory.status === status.SUCCESS ||
        this.props.allProductWithCategory.status === status.FAILURE
      ) {
        this.setState({
          loading: false,
          productItems: this.props.allProductWithCategory.data,
        });
      }
    }
  }

  apiCalls = () => {
    this.props.apiCalls();
  };

  renderProductWithCategory = () => {
    const { productItems, matches } = this.state;
    const { topSellingApiLoader } = this.props;
    return (
      <>
        {productItems.map((categoryItem) => {
          if (
            matches
              ? categoryItem.category === "Fresh Fruits"
              : categoryItem.category === "Fresh Fruits" ||
                categoryItem.category === "Fresh Vegetables"
          ) {
            return (
              <Box className="selling-categories" key={categoryItem.category}>
                <Box className="heading">
                  <h2>
                    {categoryItem.category === "Fresh Fruits"
                      ? "Similar Products"
                      : "you might also like"}
                  </h2>
                </Box>
                <All
                  productImg={productImg}
                  priceIcon={priceIcon}
                  topSellingProductsList={categoryItem.items}
                  topSellingApiLoader={topSellingApiLoader}
                  apiCalls={this.apiCalls}
                />
              </Box>
            );
          }
          return null;
        })}
      </>
    );
  };

  render() {
    return (
      <Box className="top-selling-categories-container">
        {this.state.loading
          ? Loader.commonLoader()
          : this.renderProductWithCategory()}
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { allProductWithCategory } = state.allproducts;
  const { personalDetailsData } = state.login;
  return {
    allProductWithCategory,
    personalDetailsData,
  };
}

const mapDispatchToProps = {
  getAllProductWithCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(SimilarProducts);
