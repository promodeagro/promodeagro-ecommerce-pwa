import React, { Component } from "react";
import { connect } from "react-redux"
import { Box, Container, Grid } from "@mui/material";
import SideBar from "./sideBar";
import List from "./list";
import RecentlyViewedItems from "./recentlyViewedItems";
import { allProducts } from "../../../Redux/AllProducts/AllProductthunk";
import { fetchCartItems } from "../../../Redux/Cart/CartThunk";
import status from "../../../Redux/Constants";
import { Loader, loginDetails } from "Views/Utills/helperFunctions";
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsData: [],
      cartList: []
    };
  }
  componentDidMount() {

    let items = loginDetails()

    this.props.fetchCartItems({
      userId: items.userId
    })
    this.props.allProducts()
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.allProductsData.status !==
      this.props.allProductsData.status &&
      this.props.allProductsData.status === status.SUCCESS &&
      this.props.allProductsData.data
    ) {
      debugger
      this.setState({
        productsData: this.props.allProductsData.data
      })

    }


    if (
      prevProps.cartItems.status !==
      this.props.cartItems.status &&
      this.props.cartItems.status === status.SUCCESS &&
      this.props.cartItems.data
    ) {


      this.setState({
        cartList: this.props.cartItems.data.items
      })

    }


  }











  render() {
    const { productsData, cartList } = this.state
    return (
      <Box className="main-container">
        <Container>
          <Grid container spacing={2} alignItems={'flex-start'}>
            <Grid item xs={6} sm={6} md={3}>
              <SideBar />
            </Grid>
            <Grid item xs={6} sm={6} md={9}>
              {
                this.props.cartItems.status === status.IN_PROGRESS.status || this.props.allProductsData.status === status.IN_PROGRESS ?
                  Loader.commonLoader() :
                  <List data={productsData} cartItemsData={cartList} />
              }

            </Grid>
          </Grid>
        </Container>
        <RecentlyViewedItems />
      </Box>
    );
  }
}



function mapStateToProps(state) {
  const { allProductsData, } = state.allproducts;
  const { cartItems } = state.cartitem;
  return { allProductsData, cartItems };

}

const mapDispatchToProps = { allProducts, fetchCartItems };

export default connect(mapStateToProps, mapDispatchToProps)(Category);


