import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Container, Grid } from "@mui/material";
import SideBar from "./sideBar";
import List from "./list";
// import RecentlyViewedItems from "./recentlyViewedItems";
import RecentlyViewedItems from "components/RecentlyViewedItems";
import { allProducts } from "../../../Redux/AllProducts/AllProductthunk";
import { productCategories } from "../../../Redux/AllProducts/AllProductSlice";

import { fetchCartItems } from "../../../Redux/Cart/CartThunk";
import status from "../../../Redux/Constants";
import { Loader, loginDetails } from "Views/Utills/helperFunctions";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideFilter: true,
      products: [],
      productsData: [],
      cartList: [],
      filters: {
        minPrice: "",
        maxPrice: "",
        selectedRatings: [],
        selectedDiscounts: [],
        selectedCountry: "",
        selectedProductTypes: [],
        selectedPackSizes: [],
        currentCategory: "",
      },
    };
  }

  componentDidMount() {
    let items = loginDetails();
    if (items?.userId) {
      this.props.fetchCartItems({
        userId: items?.userId,
      });
    }

    this.props.allProducts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.allProductsData.status !== this.props.allProductsData.status &&
      this.props.allProductsData.status === status.SUCCESS &&
      this.props.allProductsData.data
    ) {
      this.setState({
        products: this.props.allProductsData.data,
        productsData: this.props.allProductsData.data,
      });
      let fruits = [];
      let vegetables = [];

      this.props.allProductsData.data.forEach((product) => {
        if (product.category === "FRUITS") {
          fruits.push(product);
        } else if (product.category === "VEGETABLES") {
          vegetables.push(product);
        }
      });

      this.props.productCategories([fruits, vegetables]);
    }

    if (
      prevProps.cartItems.status !== this.props.cartItems.status &&
      this.props.cartItems.status === status.SUCCESS &&
      this.props.cartItems.data
    ) {
      this.setState({
        cartList: this.props.cartItems.data.items,
      });
    }
    if (
      this.props.shopCategoryData?.length > 0 &&
      this.props.allProductsData?.data?.length &&
      this.state.currentCategory != this.props.shopCategoryData?.[1]
    ) {
      let fruits = [];
      let vegetables = [];
      let selectedItem = [];
      this.setState({
        currentCategory: this.props.shopCategoryData?.[1],
      });
      this.props.allProductsData.data.forEach((product) => {
        if (product.category === "FRUITS") {
          fruits.push(product);
        } else if (product.category === "VEGETABLES") {
          vegetables.push(product);
        }
      });

      if (this.props.shopCategoryData[0] == "VEGETABLES") {
        if (this.props.shopCategoryData?.[1]) {
          vegetables?.forEach((product) => {
            if (this.props.shopCategoryData?.[1] == product.subCategory) {
              selectedItem.push(product);
            }
          });
        } else {
          selectedItem = vegetables;
          // this.setState({
          //   productsData:vegetables
          //  })
        }
      } else if (this.props.shopCategoryData[0] == "FRUITS") {
        if (this.props.shopCategoryData?.[1]) {
          fruits?.forEach((product) => {
            if (this.props.shopCategoryData?.[1] == product.subCategory) {
              selectedItem.push(product);
            }
          });
        } else {
          selectedItem = fruits;
          //  this.setState({
          //   productsData:fruits
          //  })
        }
      }
      if (selectedItem.length > 0) {
        this.setState({
          productsData: selectedItem,
        });
      }
    }
  }

  handleFilterChange = (filters) => {
    this.setState({ filters }, this.applyFilters);
  };

  applyFilters = () => {
    const { products, filters } = this.state;
    let productsData = [...products];

    if (filters.minPrice || filters.maxPrice) {
      productsData = productsData.filter((product) => {
        const price = parseFloat(product.price);
        return (
          (!filters.minPrice || price >= parseFloat(filters.minPrice)) &&
          (!filters.maxPrice || price <= parseFloat(filters.maxPrice))
        );
      });
    }

    if (filters.selectedRatings.length > 0) {
      productsData = productsData.filter((product) =>
        filters.selectedRatings.some((rating) => product.ratings >= rating)
      );
    }

    if (filters.selectedDiscounts.length > 0) {
      productsData = productsData.filter((product) => {
        const savingsPercentage = parseInt(product.savingsPercentage);
        return filters.selectedDiscounts.some((discountRange) => {
          if (discountRange === "upto5") return savingsPercentage <= 5;
          if (discountRange === "10to15")
            return savingsPercentage >= 10 && savingsPercentage <= 15;
          if (discountRange === "15to25")
            return savingsPercentage >= 15 && savingsPercentage <= 25;
          if (discountRange === "more25") return savingsPercentage > 25;
        });
      });
    }

    if (filters.selectedCountry) {
      productsData = productsData.filter(
        (product) => product.origin === filters.selectedCountry
      );
    }

    if (filters.selectedProductTypes.length > 0) {
      productsData = productsData.filter((product) =>
        filters.selectedProductTypes.includes(product.type)
      );
    }

    if (filters.selectedPackSizes.length > 0) {
      productsData = productsData.filter((product) =>
        filters.selectedPackSizes.some((size) => product.packSize === size)
      );
    }

    this.setState({ productsData });
  };

  toggleFilter = () => {
    this.setState((prevState) => ({
      hideFilter: !prevState.hideFilter,
    }));
  };
  render() {
    const { productsData, cartList, hideFilter, products } = this.state;
    return (
      <Box className="main-container">
        <Container>
          <Grid container spacing={2} alignItems={"flex-start"}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <SideBar
                onFilterChange={this.handleFilterChange}
                toggleFilter={this.toggleFilter}
                hideFilter={hideFilter}
              />
            </Grid>
            <Grid
              item
              xs={hideFilter ? 12 : 12}
              sm={hideFilter ? 12 : 12}
              md={hideFilter ? 12 : 9}
              lg={hideFilter ? 12 : 9}
            >
              {this.props.cartItems.status === status.IN_PROGRESS.status ||
              this.props.allProductsData.status === status.IN_PROGRESS ? (
                Loader.commonLoader()
              ) : (
                <List
                  data={productsData ? productsData : []}
                  cartItemsData={cartList}
                  hideFilter={hideFilter}
                />
              )}
            </Grid>
          </Grid>
        </Container>
        <RecentlyViewedItems />
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { allProductsData, shopCategoryData } = state.allproducts;
  const { cartItems } = state.cartitem;
  return { allProductsData, cartItems, shopCategoryData };
}

const mapDispatchToProps = { allProducts, fetchCartItems, productCategories };

export default connect(mapStateToProps, mapDispatchToProps)(Category);
