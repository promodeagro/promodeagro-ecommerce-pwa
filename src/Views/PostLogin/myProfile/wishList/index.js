import React, { Component } from "react";
import {
  Box,
  Container,
} from "@mui/material";
import ProfileSideBar from "../profileSideBar";
import {
  fetchProductWishList,
  deleteProductWishList,
  setProductWishList,
} from "../../../../Redux/AllProducts/AllProductthunk";
import { connect } from "react-redux";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import status from "../../../../Redux/Constants";
import {
  ErrorMessages,
  Loader,
  loginDetails,
} from "Views/Utills/helperFunctions";
import {
  addItemToCart,
  updateItemToCart,
  deleteItemToCart,
} from "../../../../Redux/Cart/CartThunk";
import ProductItemView from "../../../../components/AddRemoveProductComponents/allItemProducts";

class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wistListData: [],
      deleteItemId: "",
      apiLoader: false,
      open: false,
      deleteId: "",
      productId: "",
      qauntityUnits: [],
      dataId: "",
      isProductSelecting: false,
      unitIdPrices: [],
    };
  }

  componentDidMount() {
    this.setState({
      apiLoader: true,
    });

    this.props.fetchProductWishList({
      userId: loginDetails()?.userId,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.bookMarksData.status !== this.props.bookMarksData.status &&
      this.props.bookMarksData.status === status.SUCCESS
    ) {
      if (this.props.bookMarksData.data.statusCode === 200) {
        this.setState({
          wistListData: this.props.bookMarksData?.data?.data,
          apiLoader: false,
          deleteItemId: "",
          isProductSelecting: false,
          dataId: "",
        });
      } else {
        this.setState({
          wistListData: [],
          apiLoader: false,
          deleteItemId: "",
          isProductSelecting: false,
          dataId: "",
        });
        ErrorMessages.error(this.props.bookMarksData?.data?.message);
      }
    }

    if (
      prevProps.deleteBookMarkData.status !==
        this.props.deleteBookMarkData.status &&
      this.props.deleteBookMarkData.status === status.SUCCESS
    ) {
      this.setState({
        apiLoader: true,
      });

      this.props.fetchProductWishList({
        userId: loginDetails()?.userId,
      });
    }
  }

  render() {
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
                {this.props.bookMarksData.status === status.IN_PROGRESS &&
                this.state.apiLoader ? (
                  Loader.commonLoader()
                ) : this.state.wistListData?.length > 0 ? (
                  <ProductItemView productList={this.state.wistListData} />
                ) : (
                  <Box className="no-data">No Data In Wishlist</Box>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { setBookmarksData, deleteBookMarkData, bookMarksData } =
    state.allproducts;
  const { additems, cartItems, updateItems, deleteItems } = state.cartitem;
  return {
    setBookmarksData,
    deleteBookMarkData,
    bookMarksData,
    deleteItems,
    additems,
    cartItems,
    updateItems,
  };
}

const mapDispatchToProps = {
  fetchProductWishList,
  deleteProductWishList,
  setProductWishList,
  addItemToCart,
  updateItemToCart,
  deleteItemToCart,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(WishList));
