import React, { Component } from "react";
import {
  Box,
  Container,
} from "@mui/material";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import { fetchCategories } from "../../../../../Redux/AllProducts/AllProductthunk";
import { fetchDefaultAddress } from "../../../../../Redux/Address/AddressThunk";
import { fetchPersonalDetails } from "../../../../../Redux/Signin/SigninThunk";
import {
  setShopByCategory,
  productDetailsData,
} from "../../../../../Redux/AllProducts/AllProductSlice";
import {
  setProductWishList,
  deleteProductWishList,
} from "../../../../../Redux/AllProducts/AllProductthunk";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import status from "../../../../../Redux/Constants";
import {
  loginDetails,
  ErrorMessages,
} from "Views/Utills/helperFunctions";
import ProductItemView from "../../../../../components/AddRemoveProductComponents/allItemProducts";

class FeaturedProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookMarkId: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const items = loginDetails();

    if (
      prevProps.deleteBookMarkData.status !==
        this.props.deleteBookMarkData.status &&
      this.props.deleteBookMarkData.status === status.SUCCESS
    ) {
      this.setState({
        bookMarkId: "",
      });

      if (this.props.deleteBookMarkData.data.statusCode === 200) {
        this.getAllProduct();
      } else {
        ErrorMessages.error(this.props.deleteBookMarkData?.data?.message);
      }
    }

    if (
      prevProps.setBookmarksData.status !==
        this.props.setBookmarksData.status &&
      this.props.setBookmarksData.status === status.SUCCESS
    ) {
      this.getAllProduct();
      this.setState({
        bookMarkId: "",
      });
    }

    if (
      prevProps.cartItems.status !== this.props.cartItems.status &&
      this.props.cartItems.status === status.SUCCESS
    ) {
    }
  }

  getAllProduct() {
    this.props.fetchHome();
  }
  handleContextMenu = (event) => {
    event.preventDefault();
  };

  handleWishList(id, isBookMarked) {
    const item = loginDetails();
    this.setState({
      bookMarkId: id,
    });
    if (item?.userId) {
      if (isBookMarked) {
        this.props.deleteProductWishList(id);
      } else {
        this.props.setProductWishList({
          userId: item?.userId,
          productId: id,
        });
      }
    }
  }

  render() {
    const { data } = this.props;

    return (
      <Box
        className="featured-products-container"
        onContextMenu={this.handleContextMenu}
      >
        <Container>
          <Box className="heading">Featured Products</Box>
          <Box className="products">
            {data?.length ? (
              <ProductItemView productList={data.slice(0, 5)} />
            ) : null}
          </Box>
          {data?.length ? (
            <Box
              className="load-more-btn"
              onClick={() => this.props.setShopByCategory([])}
            >
              <Link to="/category">Load More</Link>
            </Box>
          ) : (
            <></>
          )}
        </Container>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { shopCategoryData } = state.allproducts;
  const {cartItems} = state.cartitem;
  const { setBookmarksData, deleteBookMarkData } = state.allproducts;
  return {
    cartItems,
    shopCategoryData,
    setBookmarksData,
    deleteBookMarkData,
  };
}

const mapDispatchToProps = {
  setShopByCategory,
  productDetailsData,
  setProductWishList,
  deleteProductWishList,
  fetchCategories,
  fetchDefaultAddress,
  fetchPersonalDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(FeaturedProducts));
