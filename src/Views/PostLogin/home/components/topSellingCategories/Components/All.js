import React, { Component } from "react";
import { Box } from "@mui/material";
import Slider from "react-slick";
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

    const settings = {
      dots: false,
      arrows: topSellingProductsList?.length > 5 ? true : false,
      infinite: false,
      speed: 500,
      slidesToShow: 5.05,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2.5,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1.5,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <>
        {topSellingApiLoader ? (
          Loader.commonLoader()
        ) : (
          <Slider {...settings}>
            {topSellingProductsList?.length > 0 ? (
              <ProductItemView productList={topSellingProductsList} />
            ) : (
              <Box className="no-data">No products available</Box>
            )}
          </Slider>
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
