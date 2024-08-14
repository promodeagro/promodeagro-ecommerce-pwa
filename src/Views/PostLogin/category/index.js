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
  const [pageSize, setPageSize] = useState(10);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState(null);
  const [personalDetailsLoader, setPersonalDetailsLoader] = useState(false);
  const [profileName, setProfileName] = useState(null);
  const [totalPages, setTotalPage] = useState("");

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

      props.fetchProductBySubCategory({
        subcategory: subcategory.replaceAll("%20", ""),
        userId: loginDetails()?.userId,
        pageSize: pageSize,
        pageNumber: currentPage,
        exclusiveStartKey: lastEvaluatedKey,
      });
    } else if (category) {
      setAPIDataLoaded(true);
      setCatergoryLoader(true);

      props.fetchProductByCategory({
        category: category,
        userId: loginDetails()?.userId,
        pageSize: pageSize,
        pageNumber: currentPage,
        exclusiveStartKey: lastEvaluatedKey,
      });
    } else if (id) {
      setAPIDataLoaded(true);
      setFilteredProductApiLoader(true);
      const data = {
        userId: loginDetails()?.userId ? loginDetails()?.userId : "",
        offerId: id,
        minPrice: "",
        maxPrice: "",
        subcategory: "",
        ratingFilter: "",
        category: "",
        discounts: "",
        pageSize: pageSize,
        pageNumber: currentPage,
        exclusiveStartKey: lastEvaluatedKey,
      };
      props.fetchFilteredProducts(data);
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
        setTotalPage(props.allProductsData?.data?.pagination?.totalPages);
        setCurrentPage(props.allProductsData?.data?.pagination?.currentPage);
        setProductsData(props.allProductsData?.data?.products);
      }
    } else if (
      props.allProductsData?.status == status?.FAILURE &&
      productApiLoader
    ) {
      setTotalPage("");
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

      if (
        props.productBySubCategoryData?.data?.response?.status == 500 ||
        props.productBySubCategoryData?.data?.response?.status == 401
      ) {
        setProductsData([]);
        setCurrentPage(1);
      } else {
        setLastEvaluatedKey(
          props.productBySubCategoryData?.data?.pagination?.lastEvaluatedKey
        );
        setTotalPage(
          props.productBySubCategoryData?.data?.pagination?.totalPages
        );
        setCurrentPage(
          props.productBySubCategoryData?.data?.pagination?.currentPage
        );
        setProductsData(props.productBySubCategoryData?.data?.products);
      }
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
      setCatergoryLoader(false);
      if (
        props.productByCategoryData?.data?.response?.status == 500 ||
        props.productByCategoryData?.data?.response?.status == 401
      ) {
        setProductsData([]);
        setCurrentPage(1);
      } else if (props.productByCategoryData?.data?.products) {
        setLastEvaluatedKey(
          props.productByCategoryData?.data?.pagination?.lastEvaluatedKey
        );
        setTotalPage(props.productByCategoryData?.data?.pagination?.totalPages);
        setCurrentPage(
          props.productByCategoryData?.data?.pagination?.currentPage
        );
        setProductsData(props.productByCategoryData?.data?.products);
      }
    } else if (
      props.productByCategoryData?.status == status.FAILURE &&
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

  const handleChange = (event, value) => {
    setAPIDataLoaded(true);
    setCurrentPage(value);
    let data = {
      userId: loginDetails()?.userId,
      pageSize: pageSize,
      pageNumber: value,
      exclusiveStartKey: lastEvaluatedKey,
    };
    if (subcategory) {
      setSubCatergoryLoader(true);
      data.subcategory = subcategory.replaceAll("%20", "");
      props.fetchProductBySubCategory(data);
    } else if (category) {
      setCatergoryLoader(true);
      data.category = category;
      props.fetchProductByCategory(data);
    } else if (id) {
      setFilteredProductApiLoader(true);
      const data = {
        userId: loginDetails()?.userId ? loginDetails()?.userId : "",
        offerId: id,
        minPrice: "",
        maxPrice: "",
        subcategory: "",
        ratingFilter: "",
        category: "",
        discounts: "",
        // pageSize: pageSize,
        // pageNumber: value,
        // exclusiveStartKey: lastEvaluatedKey,
      };
      props.fetchFilteredProducts(data);
    } else {
      setProdductApiLoader(true);

      props.allProducts(data);
    }
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
    // TO DO 
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
      props.fetchProductBySubCategory({
        subcategory: subcategory.replaceAll("%20", ""),
        userId: loginDetails()?.userId,
        pageSize: pageSize,
        pageNumber: currentPage,
        exclusiveStartKey: lastEvaluatedKey,
      });
    } else if (category) {
      setCatergoryLoader(true);
      props.fetchProductByCategory({
        category: category,
        userId: loginDetails()?.userId,
        pageSize: pageSize,
        pageNumber: currentPage,
        exclusiveStartKey: lastEvaluatedKey,
      });
    }    else {
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

                {totalPages ? (
                  <Stack spacing={2} direction="row" justifyContent="flex-end">
                    <Pagination
                      count={totalPages}
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
