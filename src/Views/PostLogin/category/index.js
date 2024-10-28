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
import { fetchCategories } from "../../../Redux/AllProducts/AllProductthunk";

function Category(props) {
  const { category, subcategory, id } = useParams();
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
  const [pageSize, setPageSize] = useState(12);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState(null);
  const [personalDetailsLoader, setPersonalDetailsLoader] = useState(false);
  const [profileName, setProfileName] = useState(null);
  const [totalPages, setTotalPage] = useState("");
  const [categories, setCategories] = useState([]);

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

  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  useEffect(() => {
    if (subcategory) {
      setSubCatergoryLoader(true);
      setAPIDataLoaded(true);
      const data = {
        subcategory: subcategory.replaceAll("%20", ""),
        userId: loginDetails()?.userId,
        pageSize: pageSize,
        pageNumber: currentPage,
        exclusiveStartKey: lastEvaluatedKey,
      };
      if (data.pageNumber === 1) {
        delete data.exclusiveStartKey;
      }
      props.fetchProductBySubCategory(data);
    } else if (category) {
      setAPIDataLoaded(true);
      setCatergoryLoader(true);

      const data = {
        category: toTitleCase(category),
        userId: loginDetails()?.userId,
        pageSize: pageSize,
        pageNumber: currentPage,
        exclusiveStartKey: lastEvaluatedKey,
      };
      if (data.pageNumber === 1) {
        delete data?.exclusiveStartKey;
      }

      props.fetchProductByCategory(data);
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
      if (data.pageNumber === 1) {
        delete data?.exclusiveStartKey;
      }
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
      if (data.pageNumber === 1) {
        delete data?.exclusiveStartKey;
      }
      props.allProducts(data);
    }
  }, [subcategory, category, id, window.location.pathname]);

  useEffect(() => {
    if (
      props.allCategories.status === status.SUCCESS &&
      props.allCategories.data
    ) {
      setCategories(props.allCategories.data);
    }
  });
  useEffect(() => {
    if (
      props.filteredProductData?.status == status?.SUCCESS &&
      filteredProductApiLoader &&
      props.filteredProductData?.data
    ) {
      setFilteredProductApiLoader(false);
      setAPIDataLoaded(false);

      if (
        props.filteredProductData?.data?.response?.status == 500 ||
        props.filteredProductData?.data?.response?.status == 401
      ) {
        setProductsData([]);
        setCurrentPage(1);
      } else {
        setLastEvaluatedKey(
          props.filteredProductData?.data?.pagination?.lastEvaluatedKey
        );

        setTotalPage(
          Math.ceil(
            props.allProductsData?.data?.pagination?.TotalProducts
              ? props.allProductsData?.data?.pagination?.TotalProducts /
                  pageSize
              : ""
          )
        );

        setProductsData(props.filteredProductData?.data?.products);
      }
    } else if (
      props.filteredProductData?.status == status?.FAILURE &&
      filteredProductApiLoader
    ) {
      setFilteredProductApiLoader(false);
    } else {
      setTotalPage("");
      setProductsData([]);
    }
  }, [props.filteredProductData.status]);

  useEffect(() => {
    if (props.allProductsData?.status == status?.SUCCESS && productApiLoader) {
      setProdductApiLoader(false);
      setAPIDataLoaded(false);
      if (props.allProductsData.data.statusCode === 200) {
        setLastEvaluatedKey(
          props.allProductsData?.data?.data?.pagination?.lastEvaluatedKey
        );
        setTotalPage(
          Math.ceil(
            props.allProductsData?.data?.data?.pagination?.TotalProducts /
              pageSize
          )
        );

        setCurrentPage(
          props.allProductsData?.data?.data?.pagination?.currentPage
        );
        setProductsData(props.allProductsData?.data?.data?.products);
      } else {
        ErrorMessages.error(props.allProductsData?.data.message);
        setProductsData([]);
        setCurrentPage(1);
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
      props.productBySubCategoryData?.status === status?.SUCCESS &&
      subCategoryApiLoader
    ) {
      setSubCatergoryLoader(false);
      setAPIDataLoaded(false);

      if (props.productBySubCategoryData.data.statusCode === 200) {
        setLastEvaluatedKey(
          props.productBySubCategoryData?.data?.data?.pagination
            ?.lastEvaluatedKey
        );
        setTotalPage(
          Math.ceil(
            props.productBySubCategoryData?.data?.data?.pagination
              ?.TotalProducts / pageSize
          )
        );
        setCurrentPage(
          props.productBySubCategoryData?.data?.data?.pagination?.currentPage
        );
        setProductsData(props.productBySubCategoryData?.data?.data?.products);
      } else {
        setProductsData([]);
        setCurrentPage(1);
        ErrorMessages.error(props.productBySubCategoryData?.data?.message);
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
      props.productByCategoryData?.status === status.SUCCESS &&
      categoryApiLoader
    ) {
      setAPIDataLoaded(false);
      setCatergoryLoader(false);

      if (props.productByCategoryData?.data.statusCode === 200) {
        setLastEvaluatedKey(
          props.productByCategoryData?.data?.data?.pagination?.lastEvaluatedKey
        );

        setTotalPage(
          Math.ceil(
            props.productByCategoryData?.data?.data?.pagination?.TotalProducts /
              pageSize
          )
        );

        setCurrentPage(
          props.productByCategoryData?.data?.data?.pagination?.currentPage
        );
        setProductsData(props.productByCategoryData?.data?.data?.products);
      } else {
        setProductsData([]);
        setCurrentPage(1);
        ErrorMessages.error(props.productByCategoryData?.data?.message);
      }
    } else if (
      props.productByCategoryData?.status === status.FAILURE &&
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

  function selectedFilters(data) {
    const retData = {};
    if (data.maxPrice) {
      retData.maxPrice = data.maxPrice;
    }
    if (data.minPrice) {
      retData.minPrice = data.minPrice;
    }
    if (data.selectedCountry) {
      retData.selectedCountry = data.selectedCountry;
    }
    if (data.selectedDiscounts?.length > 0) {
      retData.selectedDiscounts = data.selectedDiscounts;
    }
    if (data.selectedPackSizes?.length > 0) {
      retData.selectedPackSizes = data.selectedPackSizes;
    }

    if (data.selectedProductTypes?.length > 0) {
      retData.selectedProductTypes = data.selectedProductTypes;
    }
    if (data.selectedRatings?.length > 0) {
      retData.selectedRatings = data.selectedRatings;
    }
    return retData;
  }
  const handleChange = (event, value) => {
    setCurrentPage(value);

    if (
      !filters.maxPrice &&
      !filters.minPrice &&
      !filters.selectedCountry &&
      filters.selectedDiscounts.length === 0 &&
      filters.selectedPackSizes.length === 0 &&
      filters.selectedProductTypes.length === 0 &&
      filters.selectedRatings.length === 0
    ) {
      setAPIDataLoaded(true);
      let data = {
        userId: loginDetails()?.userId,
        pageSize: pageSize,
        pageNumber: value,
        exclusiveStartKey: lastEvaluatedKey,
      };
      if (value === 1) {
        delete data.exclusiveStartKey;
      }
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
        const d = {
          userId: loginDetails()?.userId ? loginDetails()?.userId : "",
          offerId: id,
          minPrice: "",
          maxPrice: "",
          subcategory: "",
          ratingFilter: "",
          category: "",
          discounts: "",
          pageSize: pageSize,
          pageNumber: value,
        };
        if (value === 1) {
          delete d.exclusiveStartKey;
        }
        props.fetchFilteredProducts(d);
      } else {
        setProdductApiLoader(true);

        props.allProducts(data);
      }
      // props.fetchProductBySubCategory(data);
    } else if (Object.keys(selectedFilters(filters)).length > 0) {
      let d = selectedFilters(filters);
      setAPIDataLoaded(true);
      setFilteredProductApiLoader(true);
      props.fetchFilteredProducts({
        category: category ? category : "",
        subcategory: subcategory ? subcategory : "",
        id: id ? id : "",
        minPrice: d.minPrice ? d.minPrice : "",
        maxPrice: d.maxPrice ? d.maxPrice : "",

        discounts: d.selectedDiscounts ? d.selectedDiscounts : "",
        ratingFilter: d.selectedRatings ? d.selectedRatings : "",
        userId: loginDetails()?.userId,
        pageNumber: value,
        pageSize: pageSize,
      });
    }
  };

  const handleFilterChange = (filters) => {
    setFilters(filters);
    const data = { ...filters };
    data.userId = loginDetails()?.userId;
    setCurrentPage(1);

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
      const data = {
        subcategory: subcategory.replaceAll("%20", ""),
        userId: loginDetails()?.userId,
        pageSize: pageSize,
        pageNumber: currentPage,
        exclusiveStartKey: lastEvaluatedKey,
      };
      setSubCatergoryLoader(true);
      if (data.pageNumber === 1) {
        delete data.exclusiveStartKey;
      }
      props.fetchProductBySubCategory(data);
    } else if (category) {
      const data = {
        category: category,
        userId: loginDetails()?.userId,
        pageSize: pageSize,
        pageNumber: currentPage,
        exclusiveStartKey: lastEvaluatedKey,
      };
      if (data.pageNumber === 1) {
        delete data.exclusiveStartKey;
      }

      setCatergoryLoader(true);
      props.fetchProductByCategory(data);
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
      };
      if (data.pageNumber === 1) {
        delete data?.exclusiveStartKey;
      }

      props.fetchFilteredProducts(data);
    } else {
      setProdductApiLoader(true);
      const data = {
        userId: loginDetails()?.userId,
        pageSize: pageSize,
        pageNumber: nextPageStatus ? currentPage + 1 : currentPage,
        exclusiveStartKey: lastEvaluatedKey,
      };
      if (data.pageNumber === 1) {
        delete data.exclusiveStartKey;
      }

      props.allProducts(data);
    }
  };

  const handleFilterApiLoader = (status) => {
    setAPIDataLoaded(true);
    setFilteredProductApiLoader(status);
  };

  return (
    <Box className="main-container categories">
      <Box className="current-category">
        {subcategory ? subcategory : category}
      </Box>
      <Container>
        <Grid container spacing={2} alignItems={"flex-start"}>
          <Grid item xs={4} sm={3} md={2} lg={2}>
            <SideBar
              onFilterChange={handleFilterChange}
              toggleFilter={toggleFilter}
              hideFilter={hideFilter}
              category={category}
              subcategory={subcategory}
              offerId={id}
              handleFilterApiLoader={handleFilterApiLoader}
              allproducts={allproducts}
              pageSize={pageSize}
              lastEvaluatedKey={lastEvaluatedKey}
              categories={categories}
            />
          </Grid>
          <Grid item xs={8} sm={9} md={10} lg={10}>
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
                  <Box
                    display={"flex"}
                    justifyContent="flex-end"
                    marginBottom={"30px"}
                  >
                    <Pagination
                      count={totalPages}
                      showFirstButton
                      showLastButton
                      page={currentPage}
                      onChange={(event, value) => {
                        handleChange(event, value);
                      }}
                    />
                  </Box>
                ) : (
                  <></>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Container>
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
    allCategories,
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
    allCategories,
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
  fetchCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
