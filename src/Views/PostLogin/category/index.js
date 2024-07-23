import React, { Component, useEffect, useState } from "react";
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
import { setShopByCategory } from "../../../Redux/AllProducts/AllProductSlice";
import _ from "lodash";
import { useParams, useLocation } from "react-router-dom";
import userEvent from "@testing-library/user-event";
function Category(props) {
  const { category, subcategory } = useParams();
  const [hideFilter, setHideFilter] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [productApiLoader, setProdductApiLoader] = useState(false);
  const [getCartApiLoader, setCartApiLoader] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    selectedRatings: [],
    selectedDiscounts: [],
    selectedCountry: "",
    selectedProductTypes: [],
    selectedPackSizes: [],
  });
  const [APIDataLoaded, setAPIDataLoaded] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  useEffect(() => {
    let items = loginDetails();
    setProdductApiLoader(true);
    setAPIDataLoaded(true);
    setCurrentPath(window.location.pathname);
    if (items?.userId) {
      setCartApiLoader(true);
      props.fetchCartItems({
        userId: items?.userId,
      });

      props.allProducts(items?.userId);
    } else {
      props.allProducts();
    }
  }, []);

  useEffect(() => {
    if (props.allProductsData?.status == status?.SUCCESS && productApiLoader) {
      setProdductApiLoader(false);
      setAPIDataLoaded(false);
      setProductsData(props.allProductsData?.data);
    } else if (
      props.allProductsData?.status == status?.FAILURE &&
      productApiLoader
    ) {
      setProdductApiLoader(false);
    }
  }, [props.allProductsData.status]);

  useEffect(() => {
    if (currentPath != window.location.pathname) {
      setProdductApiLoader(true);
      setAPIDataLoaded(true);
      setCurrentPath(window.location.pathname);
      let items = loginDetails();

      if (items?.userId) {
        setCartApiLoader(true);
        props.fetchCartItems({
          userId: items?.userId,
        });

        props.allProducts(items?.userId);
      } else {
        props.allProducts();
      }
    }
  }, [window.location.pathname]);

  useEffect(() => {
    if (props.allProductsData?.data) {
      const categoryData = props.allProductsData?.data;
      if (subcategory) {
        let selectedItem = [];
        categoryData?.forEach((product) => {
          if (product.subCategory == subcategory) {
            selectedItem.push(product);
          }
        });

        if (selectedItem.length > 0 && productsData !== selectedItem) {
          setProductsData(selectedItem);
        }
      } else if (category && categoryData?.length > 0) {
        let selectedItem = [];
        categoryData?.forEach((product) => {
          if (product.category == category) {
            selectedItem.push(product);
          }
        });
        if (selectedItem.length > 0 && productsData !== selectedItem) {
          setProductsData(selectedItem);
        }
      }
    }
  }, [subcategory, category, props.allProductsData?.status]);

  useEffect(() => {
    if (
      props.cartItems.status === status.SUCCESS &&
      props.cartItems.data &&
      getCartApiLoader
    ) {
      setCartApiLoader(false);
      setCartList(props.cartItems.data.items);
    }
  }, [props.cartItems.status]);

  useEffect(() => {
    if (productsData?.length && filters) {
      applyFilters();
    }
  }, [filters, productsData]);

  const handleFilterChange = (filters) => {
    setFilters(filters);
    // this.setState({ filters }, this.applyFilters);
  };

  const applyFilters = () => {
    // const { products, filters } = this.state;
    // let productsData = [...productsData];
    let res = [];
    if (filters.minPrice || filters.maxPrice) {
      res = productsData?.filter((product) => {
        const price = parseFloat(product.price);
        return (
          (!filters.minPrice || price >= parseFloat(filters.minPrice)) &&
          (!filters.maxPrice || price <= parseFloat(filters.maxPrice))
        );
      });
    }

    if (filters.selectedRatings.length > 0) {
      res = productsData?.filter((product) =>
        filters.selectedRatings.some((rating) => product.ratings >= rating)
      );
    }

    if (filters.selectedDiscounts.length > 0) {
      res = productsData?.filter((product) => {
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
      res = productsData?.filter(
        (product) => product.origin === filters.selectedCountry
      );
    }

    if (filters.selectedProductTypes.length > 0) {
      res = productsData?.filter((product) =>
        filters.selectedProductTypes.includes(product.type)
      );
    }

    if (filters.selectedPackSizes.length > 0) {
      res = productsData?.filter((product) =>
        filters.selectedPackSizes.some((size) => product.packSize === size)
      );
    }
    setProductsData(productsData);
  };

  const toggleFilter = () => {
    setHideFilter(!hideFilter);
    // this.setState((prevState) => ({
    //   hideFilter: !prevState.hideFilter,
    // }));
  };
  const handleCartApiLoader = (apiLoader) => {
    setCartApiLoader(apiLoader);
  };

  const allproducts = () => {
    const items = loginDetails();

    if (items?.userId) {
      setProdductApiLoader(true);
      setCartApiLoader(true);
      props.allProducts(items?.userId);
      props.fetchCartItems({
        userId: items?.userId,
      });
    }
  };

  return (
    <Box className="main-container">
      <Container>
        <Grid container spacing={2} alignItems={"flex-start"}>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <SideBar
              onFilterChange={handleFilterChange}
              toggleFilter={toggleFilter}
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
            {props.allProductsData.status === status.IN_PROGRESS &&
            APIDataLoaded ? (
              Loader.commonLoader()
            ) : (
              <List
                handleCartApiLoader={handleCartApiLoader}
                currentCategory={subcategory ? subcategory : category}
                data={productsData ? productsData : []}
                cartItemsData={cartList}
                hideFilter={hideFilter}
                allproducts={allproducts}
              />
            )}
          </Grid>
        </Grid>
      </Container>
      <RecentlyViewedItems />
    </Box>
  );
}

function mapStateToProps(state) {
  const { allProductsData, shopCategoryData } = state.allproducts;
  const { cartItems } = state.cartitem;
  return { allProductsData, cartItems, shopCategoryData };
}

const mapDispatchToProps = {
  allProducts,
  fetchCartItems,
  productCategories,
  setShopByCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
