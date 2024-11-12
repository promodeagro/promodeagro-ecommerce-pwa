import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box, Container, Grid } from "@mui/material";
import SideBar from "./sideBar";
import List from "./list";
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
import { useParams } from "react-router-dom";
import { fetchCategories } from "../../../Redux/AllProducts/AllProductthunk";

function Category(props) {
  const { category, subcategory, id } = useParams();
  const [productsData, setProductsData] = useState([]);
  const [productApiLoader, setProdductApiLoader] = useState(false);
  const [subCategoryApiLoader, setSubCatergoryLoader] = useState(false);

  const [getCartApiLoader, setCartApiLoader] = useState(false);
  const [APIDataLoaded, setAPIDataLoaded] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (subcategory) {
      setSubCatergoryLoader(true);
      setAPIDataLoaded(true);
      const data = {
        subcategory: subcategory.replaceAll("%20", ""),
      };
      props.fetchProductBySubCategory(data);
    } else if (category) {
      setAPIDataLoaded(true);
      props.fetchProductByCategory();
    } else if (id) {
      setAPIDataLoaded(true);
      props.fetchFilteredProducts();
    } else {
      setAPIDataLoaded(true);
      setProdductApiLoader(true);
      props.allProducts();
    }
  }, [subcategory, category]);

  useEffect(() => {
    if (
      props.allCategories.status === status.SUCCESS &&
      props.allCategories.data
    ) {
      setCategories(props.allCategories.data);
    }
  });

  useEffect(() => {
    if (props.allProductsData?.status == status?.SUCCESS && productApiLoader) {
      setProdductApiLoader(false);
      setAPIDataLoaded(false);
      if (props.allProductsData.data.statusCode === 200) {
        setProductsData(props.allProductsData?.data?.data?.products);
      } else {
        ErrorMessages.error(props.allProductsData?.data.message);
        setProductsData([]);
      }
    } else if (
      props.allProductsData?.status == status?.FAILURE &&
      productApiLoader
    ) {
      setProductsData([]);
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
        setProductsData(props.productBySubCategoryData?.data?.data?.products);
      } else {
        setProductsData([]);
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
      props.cartItems.status === status.SUCCESS &&
      props.cartItems.data &&
      getCartApiLoader
    ) {
      setCartApiLoader(false);
    }
  }, [props.cartItems.status]);

  const allproducts = () => {
    if (subcategory) {
      props.fetchProductBySubCategory();
    } else if (category) {
      const data = {
        category: category,
      };
      props.fetchProductByCategory(data);
    } else if (id) {
      setAPIDataLoaded(true);
      props.fetchFilteredProducts();
    } else {
      setProdductApiLoader(true);
      props.allProducts();
    }
  };

  return (
    <Box className="main-container categories">
      <Box className="current-category">
        {subcategory ? subcategory : category}
      </Box>
      <Container>
        <Grid container spacing={2} alignItems={"flex-start"}>
          <Grid item xs={3} sm={3} md={2} lg={2}>
            <SideBar
              category={category}
              categories={categories}
              subcategory={subcategory}
            />
          </Grid>
          <Grid item xs={9} sm={9} md={10} lg={10}>
            {APIDataLoaded ? (
              Loader.commonLoader()
            ) : (
              <>
                <List
                  currentCategory={subcategory ? subcategory : category}
                  data={productsData ? productsData : []}
                  allproducts={allproducts}
                />
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function mapStateToProps(state) {
  const { allProductsData, productBySubCategoryData, allCategories } =
    state.allproducts;
  const { cartItems } = state.cartitem;
  return {
    allProductsData,
    cartItems,
    productBySubCategoryData,
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
