import React, { Component } from "react";
import {
  addItemToCart,
  fetchCartItems,
  updateItemToCart,
  deleteItemToCart,
} from "../../../../Redux/Cart/CartThunk";
import { productDetailsData } from "../../../../Redux/AllProducts/AllProductSlice";
import { connect } from "react-redux";
import {
  Box,
  FormControl,
  NativeSelect,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import StarIcon from "@mui/icons-material/Star";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import priceIcon from "../../../../assets/img/price-icon.png";
import noImage from "../../../../assets/img/no-image.png";
import status from "../../../../Redux/Constants";
import _ from "lodash";
import { loginDetails, ErrorMessages } from "../../../Utills/helperFunctions";
import { Link } from "react-router-dom";
import {
  deleteProductWishList,
  setProductWishList,
} from "../../../../Redux/AllProducts/AllProductthunk";

import { fetchCategories } from "../../../../Redux/AllProducts/AllProductthunk";
import { fetchDefaultAddress } from "../../../../Redux/Address/AddressThunk";
import { fetchPersonalDetails } from "../../../../Redux/Signin/SigninThunk";
import AuthModal from "components/ModalLogin/LoginModal";
import { LocalStorageCartService } from "Services/localStorageCartService";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import ProductItemView from "../../../../components/AddRemoveProductComponents/allItemProducts";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantities: {}, 
      sortOrder: null,
      isUpdateIncrease: false,
      qauntityUnits: [],
      isProductSelecting: false,
      bookMarkId: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
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
      this.setState({
        quantities: {},
        isUpdateIncrease: null,
      });
    }
  }

  getAllProduct() {
    this.props.allproducts();
  }

  handleContextMenu = (event) => {
    event.preventDefault();
  };

  handleSortChange = (event) => {
    this.setState({ sortOrder: event.target.value });
  };

  render() {
    const { data } = this.props;
    const { sortOrder } = this.state;

    // Sort data based on sortOrder
    const sortedData = sortOrder
      ? _.orderBy(data, ["price"], [sortOrder === "lowToHigh" ? "asc" : "desc"])
      : data;

    return (
      <Box className="listing-container">
        <Box className="heading">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <h2>{this.props.currentCategory}</h2>
            </Grid>
          </Grid>
        </Box>
        <Box className="products">
          <ProductItemView productList={sortedData} />
        </Box>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { additems, cartItems, updateItems, deleteItems } = state.cartitem;
  const { shopCategoryData } = state.allproducts;
  const { setBookmarksData, deleteBookMarkData } = state.allproducts;
  return {
    additems,
    cartItems,
    updateItems,
    deleteItems,
    shopCategoryData,
    deleteBookMarkData,
    setBookmarksData,
  };
}

const mapDispatchToProps = {
  addItemToCart,
  fetchCartItems,
  updateItemToCart,
  deleteItemToCart,
  productDetailsData,
  deleteProductWishList,
  setProductWishList,
  fetchCategories,
  fetchDefaultAddress,
  fetchPersonalDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(List));
