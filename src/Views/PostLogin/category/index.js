import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box, Container, Grid } from "@mui/material";
import SideBar from "./sideBar";
import List from "./list";
// import RecentlyViewedItems from "./recentlyViewedItems";
import RecentlyViewedItems from "components/RecentlyViewedItems";
import Pagination from "@mui/material/Pagination";

import {
  allProducts,
  fetchProductBySubCategory,
  fetchProductByCategory,
  fetchFilteredProducts,
} from "../../../Redux/AllProducts/AllProductthunk";
import { fetchPersonalDetails } from "../../../Redux/Signin/SigninThunk";
import { ErrorMessages } from "Views/Utills/helperFunctions";
import { fetchCartItems } from "../../../Redux/Cart/CartThunk";
import status from "../../../Redux/Constants";
import { Loader, loginDetails } from "Views/Utills/helperFunctions";
import { setShopByCategory } from "../../../Redux/AllProducts/AllProductSlice";
import _ from "lodash";
import { useParams, useLocation } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Stack from "@mui/material/Stack";
function Category(props) {
  const { category, subcategory, id } = useParams();
  console.log("data", id);
  const [hideFilter, setHideFilter] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [productApiLoader, setProdductApiLoader] = useState(false);
  const [subCategoryApiLoader, setSubCatergoryLoader] = useState(false);
  const [categoryApiLoader, setCatergoryLoader] = useState(false);
  const [filteredProductApiLoader, setFilteredProductApiLoader] =
    useState(false);
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState(null);
  const [personalDetailsLoader, setPersonalDetailsLoader] = useState(false);
  const [profileName, setProfileName] = useState(null);

  useEffect(() => {
    // setCurrentPath(window.location.pathname);
    if (loginDetails()?.userId) {
      setCartApiLoader(true);
      setPersonalDetailsLoader(true);
      props.fetchCartItems({
        userId: loginDetails()?.userId ? loginDetails()?.userId : "",
      });
      props.fetchPersonalDetails({
        userId: loginDetails()?.userId ? loginDetails()?.userId : "",
      });
    }
  }, []);

  useEffect(() => {
    if (subcategory) {
      setSubCatergoryLoader(true);
      setAPIDataLoaded(true);

      props.fetchProductBySubCategory(
        subcategory.replaceAll("%20", ""),
        loginDetails()?.userId ? loginDetails()?.userId : ""
      );
    } else if (category) {
      setAPIDataLoaded(true);
      setCatergoryLoader(true);

      props.fetchProductByCategory(
        category,
        loginDetails()?.userId ? loginDetails()?.userId : ""
      );
    } else if (id) {
      setAPIDataLoaded(true);
      setFilteredProductApiLoader(true);
      props.fetchFilteredProducts({
        userId: loginDetails()?.userId ? loginDetails()?.userId : "",
        offerId: id,
        minPrice: "",
        maxPrice: "",
        subcategory: "",
        ratingFilter: "",
        category: "",
        discounts: "",
      });
    } else {
      setAPIDataLoaded(true);
      setProdductApiLoader(true);

      const data = {
        userId: loginDetails()?.userId,
        pageSize: pageSize,
        pageNumber: currentPage,
        exclusiveStartKey: lastEvaluatedKey,
      };
      props.allProducts(data);
    }
  }, [subcategory, category, id, window.location.pathname]);

  useEffect(() => {
    if (
      props.filteredProductData?.status == status?.SUCCESS &&
      filteredProductApiLoader &&
      props.filteredProductData?.data
    ) {
      setFilteredProductApiLoader(false);
      setAPIDataLoaded(false);
      setProductsData(props.filteredProductData?.data);
    } else if (
      props.filteredProductData?.status == status?.FAILURE &&
      filteredProductApiLoader
    ) {
      setFilteredProductApiLoader(false);
    }
  }, [props.filteredProductData.status]);

  useEffect(() => {
    if (
      props.allProductsData?.status == status?.SUCCESS &&
      productApiLoader &&
      props.allProductsData?.data
    ) {
      debugger;

      setProdductApiLoader(false);
      setAPIDataLoaded(false);
      if (
        props.allProductsData?.data?.response?.status == 500 ||
        props.allProductsData?.data?.response?.status == 401
      ) {
        setProductsData([]);
        setCurrentPage(1);
      } else {
        setLastEvaluatedKey(
          props.allProductsData?.data?.pagination?.lastEvaluatedKey
        );
        setCurrentPage(props.allProductsData?.data?.pagination?.currentPage);
        setProductsData(props.allProductsData?.data?.products);
      }
    } else if (
      props.allProductsData?.status == status?.FAILURE &&
      productApiLoader
    ) {
      setProductsData([]);
      setCurrentPage(1);
      setProdductApiLoader(false);
    }
  }, [props.allProductsData.status]);

  useEffect(() => {
    if (
      props.productBySubCategoryData?.status == status?.SUCCESS &&
      subCategoryApiLoader
    ) {
      setSubCatergoryLoader(false);
      setAPIDataLoaded(false);
      setProductsData(props.productBySubCategoryData?.data);
    } else if (
      props.productBySubCategoryData?.status == status?.FAILURE &&
      subCategoryApiLoader
    ) {
      setProdductApiLoader(false);
    }
  }, [props.productBySubCategoryData.status]);

  useEffect(() => {
    if (
      props.productByCategoryData?.status == status.SUCCESS &&
      categoryApiLoader &&
      props.productByCategoryData?.data
    ) {
      setAPIDataLoaded(false);
      setProductsData(props.productByCategoryData?.data);
      setCatergoryLoader(false);
    } else if (
      props.productByCategoryData?.status == status.FAILUREs &&
      categoryApiLoader
    ) {
      setAPIDataLoaded(false);
      setCatergoryLoader(false);
    }
  }, [props.productByCategoryData?.status]);

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
    if (filters) {
      // applyFilters();
    }
  }, [filters]);

  const handleChange = (event, value) => {
    setCurrentPage(value);
    setProdductApiLoader(true);
    const data = {
      userId: loginDetails()?.userId,
      pageSize: pageSize,
      pageNumber: value,
      exclusiveStartKey: lastEvaluatedKey,
    };
    props.allProducts(data);
  };

  const handleFilterChange = (filters) => {
    setFilters(filters);
    const data = { ...filters };
    data.userId = loginDetails()?.userId;

    // setTimeout(() => {
    //   props.fetchFilteredProducts(data);
    // }, 500);
    // applyFilters();
  };

  const applyFilters = () => {
    // const { products, filters } = this.state;
    // let productData = [...productsData];
    // let res = [];
    // if (filters.minPrice || filters.maxPrice) {
    //   res = productData?.filter((product) => {
    //     const price = parseFloat(product.price);
    //     debugger;
    //     return (
    //       (!filters.minPrice || price >= parseFloat(filters.minPrice)) &&
    //       (!filters.maxPrice || price <= parseFloat(filters.maxPrice))
    //     );
    //   });
    // }
    // if (filters.selectedRatings.length > 0) {
    //   res = productData?.filter((product) =>
    //     filters.selectedRatings.some((rating) => product.ratings >= rating)
    //   );
    // }
    // if (filters.selectedDiscounts.length > 0) {
    //   res = productData?.filter((product) => {
    //     const savingsPercentage = parseInt(product.savingsPercentage);
    //     return filters.selectedDiscounts.some((discountRange) => {
    //       if (discountRange === "upto5") return savingsPercentage <= 5;
    //       if (discountRange === "10to15")
    //         return savingsPercentage >= 10 && savingsPercentage <= 15;
    //       if (discountRange === "15to25")
    //         return savingsPercentage >= 15 && savingsPercentage <= 25;
    //       if (discountRange === "more25") return savingsPercentage > 25;
    //     });
    //   });
    // }
    // if (filters.selectedCountry) {
    //   res = productData?.filter(
    //     (product) => product.origin === filters.selectedCountry
    //   );
    // }
    // if (filters.selectedProductTypes.length > 0) {
    //   res = productData?.filter((product) =>
    //     filters.selectedProductTypes.includes(product.type)
    //   );
    // }
    // if (filters.selectedPackSizes.length > 0) {
    //   res = productData?.filter((product) =>
    //     filters.selectedPackSizes.some((size) => product.packSize === size)
    //   );
    // }
    // setProductsData(productData);
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

  const allproducts = (nextPageStatus) => {
    if (loginDetails()?.userId) {
      setCartApiLoader(true);
      props.fetchCartItems({
        userId: loginDetails()?.userId,
      });
    }

    if (subcategory) {
      // const data = {
      //   subcategory: ,
      //   userId: ,
      // };
      setSubCatergoryLoader(true);
      props.fetchProductBySubCategory(
        subcategory.replaceAll("%20", ""),
        loginDetails()?.userId ? loginDetails()?.userId : ""
      );
    } else if (category) {
      setCatergoryLoader(true);
      props.fetchProductByCategory(
        category,
        loginDetails()?.userId ? loginDetails()?.userId : ""
      );
    } else {
      setProdductApiLoader(true);
      const data = {
        userId: loginDetails()?.userId,
        pageSize: pageSize,
        pageNumber: nextPageStatus ? currentPage + 1 : currentPage,
        exclusiveStartKey: lastEvaluatedKey,
      };
      props.allProducts(data);
    }
  };

  const handleFilterApiLoader = (status) => {
    setAPIDataLoaded(true);
    setFilteredProductApiLoader(status);
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
              category={category}
              subcategory={subcategory}
              offerId={id}
              handleFilterApiLoader={handleFilterApiLoader}
              allproducts={allproducts}
            />
          </Grid>
          <Grid
            item
            xs={hideFilter ? 12 : 12}
            sm={hideFilter ? 12 : 12}
            md={hideFilter ? 12 : 9}
            lg={hideFilter ? 12 : 9}
          >
            {APIDataLoaded ? (
              Loader.commonLoader()
            ) : (
              <>
                <List
                  handleCartApiLoader={handleCartApiLoader}
                  currentCategory={subcategory ? subcategory : category}
                  data={productsData ? productsData : []}
                  cartItemsData={cartList}
                  hideFilter={hideFilter}
                  allproducts={allproducts}
                />

                {lastEvaluatedKey ? (
                  <Stack spacing={2}>
                    <div>Content for currentPage {currentPage}</div>
                    <Pagination
                      count={10}
                      showFirstButton
                      showLastButton
                      page={currentPage}
                      onChange={handleChange}
                    />
                  </Stack>
                ) : (
                  <></>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Container>
      <RecentlyViewedItems />
    </Box>
  );
}

function mapStateToProps(state) {
  const {
    allProductsData,
    shopCategoryData,
    filteredProductData,
    productByCategoryData,
    productBySubCategoryData,
  } = state.allproducts;
  const { cartItems } = state.cartitem;
  const { personalDetailsData } = state.login;
  return {
    allProductsData,
    cartItems,
    shopCategoryData,
    filteredProductData,
    productByCategoryData,
    productBySubCategoryData,
    personalDetailsData,
  };
}

const mapDispatchToProps = {
  allProducts,
  fetchCartItems,
  setShopByCategory,
  fetchProductBySubCategory,
  fetchProductByCategory,
  fetchFilteredProducts,
  fetchPersonalDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
