import React, { Component } from "react";
import { Box, Container } from "@mui/material";
import productImg from "../../../../../assets/img/product-img.png";
import priceIcon from "../../../../../assets/img/price-icon.png";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { Link } from "react-router-dom";
import All from "./Components/All";
import status from "../../../../../Redux/Constants";
import { getAllProductWithCategory } from "../../../../../Redux/AllProducts/AllProductthunk";
import { connect } from "react-redux";
import { Loader } from "Views/Utills/helperFunctions";

class TopSellingCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      productItems: [],
    };
  }

  componentDidMount() {
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

  scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  renderProductWithCategory = () => {
    const { productItems } = this.state;
    const {
      topSellingProductsList,
      topSellingApiLoader,
      topSellCategoriesList,
    } = this.props;
    return (
      <>
        {productItems.map((calegoryItem) => {
          return (
            <Box className="selling-categories">
              <Box className="heading">
                <h2>{calegoryItem?.category}</h2>
                <Link to={`/category/${calegoryItem?.category}/${calegoryItem?.subcategory}`} onClick={this.scrollToTop}>
                  View All <EastOutlinedIcon />
                </Link>
              </Box>
              <All
                productImg={productImg}
                priceIcon={priceIcon}
                topSellingProductsList={calegoryItem?.items}
                topSellingApiLoader={topSellingApiLoader}
                apiCalls={this.apiCalls}
              />
            </Box>
          );
        })}
      </>
    );
  };

  render() {
    return (
      <Box style={{paddingBottom:"60px"}}  className="top-selling-categories-container">
        <Container>
          {this.state.loading
            ? Loader.commonLoader()
            : this.renderProductWithCategory()}
        </Container>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopSellingCategories);
