import React, { Component } from "react";
import { Box } from "@mui/material";

import { Loader, loginDetails } from "Views/Utills/helperFunctions";
import status from "../../../../../../Redux/Constants";
import { connect } from "react-redux";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import {
  deleteProductWishList,
  setProductWishList,
} from "../../../../../../Redux/AllProducts/AllProductthunk";
import ProductItemView from "../../../../../../components/AddRemoveProductComponents/allItemProducts";
class All extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidUpdate(prevProps) {
    const items = loginDetails();

    if (
      prevProps.cartItems.status !== this.props.cartItems.status &&
      this.props.cartItems.status === status.SUCCESS
    ) {
    }
  }

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
    const { topSellingProductsList, topSellingApiLoader } = this.props;
    return (
      <>
        {topSellingApiLoader ? (
          Loader.commonLoader()
        ) : (
          <>
            {topSellingProductsList?.length > 0 ? (
              <ProductItemView
                productList={topSellingProductsList}
                sliderView={true}
              />
            ) : (
              <Box className="no-data">No products available</Box>
            )}
          </>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  const { setBookmarksData, deleteBookMarkData } = state.allproducts;
  const { additems, cartItems, updateItems, deleteItems } = state.cartitem;
  return {
    additems,
    cartItems,
    updateItems,
    deleteItems,
    setBookmarksData,
    deleteBookMarkData,
  };
};

const mapDispatchToProps = {
  setProductWishList,
  deleteProductWishList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(All));
