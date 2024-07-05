import React, { Component } from "react";
import { connect } from "react-redux";
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
      },
    };
  }

  componentDidMount() {
    let items = loginDetails();

    this.props.fetchCartItems({
      userId: items.userId,
    });
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
  }

  handleFilterChange = (filters) => {
    this.setState({ filters }, this.applyFilters);
  };

  applyFilters = () => {
    const { products, filters } = this.state;
    let productsData = products;

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
    const { productsData, cartList, hideFilter } = this.state;
    return (
      <Box className="main-container">
        <Container>
          <Grid container spacing={2} alignItems={"flex-start"}>
            <Grid item xs={5} sm={4} md={3} lg={3}>
              <SideBar
                onFilterChange={this.handleFilterChange}
                toggleFilter={this.toggleFilter}
                hideFilter={hideFilter}
              />
            </Grid>

            <Grid
              item
              xs={hideFilter ? 12 : 7}
              sm={hideFilter ? 12 : 8}
              md={hideFilter ? 12 : 9}
              lg={hideFilter ? 12 : 9}
            >
              {this.props.cartItems.status === status.IN_PROGRESS.status ||
              this.props.allProductsData.status === status.IN_PROGRESS ? (
                Loader.commonLoader()
              ) : (
                <List
                  data={productsData}
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
  const { allProductsData } = state.allproducts;
  const { cartItems } = state.cartitem;
  return { allProductsData, cartItems };
}

const mapDispatchToProps = { allProducts, fetchCartItems };

export default connect(mapStateToProps, mapDispatchToProps)(Category);
