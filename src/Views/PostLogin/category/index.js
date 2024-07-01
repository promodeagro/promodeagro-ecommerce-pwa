import React, { Component } from "react";
import { connect } from "react-redux"
import { Box, Container, Grid } from "@mui/material";
import SideBar from "./sideBar";
import List from "./list";
import RecentlyViewedItems from "./recentlyViewedItems";
import { allProducts } from "../../../Redux/AllProducts/AllProductthunk";
import status from "../../../Redux/Constants";
import { Loader } from "Views/Utills/helperFunctions";
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsData: []
    };
  }
  componentDidMount() {
    this.props.allProducts()
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.allProductsData.status !==
      this.props.allProductsData.status &&
      this.props.allProductsData.status === status.SUCCESS &&
      this.props.allProductsData.data
    ) {
      this.setState({
        productsData: this.props.allProductsData.data
      })

    }
  }


  render() {
    const {productsData}=this.state
    return (
      <Box className="main-container">
        <Container>
          <Grid container spacing={2} alignItems={'flex-start'}>
            <Grid item xs={6} sm={6} md={3}>
              <SideBar />
            </Grid>
            <Grid item xs={6} sm={6} md={9}>
              {
                this.props.allProductsData.status === status.IN_PROGRESS ?
                  Loader.commonLoader() :
                  <List   data={productsData}/>
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
  const { allProductsData } = state.allproducts;
  return { allProductsData };
}

const mapDispatchToProps = { allProducts };

export default connect(mapStateToProps, mapDispatchToProps)(Category);


