import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box, Container, Grid } from "@mui/material";
import SideBar from "./sideBar";
import List from "./list";
import {
  allProducts,
  fetchProductBySubCategory,
} from "../../../Redux/AllProducts/AllProductthunk";
import { ErrorMessages } from "Views/Utills/helperFunctions";
import status from "../../../Redux/Constants";
import { Loader, loginDetails } from "Views/Utills/helperFunctions";
import _ from "lodash";
import { useParams, useNavigate } from "react-router-dom"; // updated
import { fetchCategories } from "../../../Redux/AllProducts/AllProductthunk";
import backarrow from "../../../assets/img/accountbackicon.svg"

function Category(props) {
  const { category, subcategory } = useParams();
  const [productsData, setProductsData] = useState([]);
  const [productApiLoader, setProdductApiLoader] = useState(false);
  const [subCategoryApiLoader, setSubCatergoryLoader] = useState(false);
  const [APIDataLoaded, setAPIDataLoaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // added
  const isLoggedIn = loginDetails()?.token; // adjust this based on your actual login check
const isSmallScreen = window.innerWidth <= 600;

const currentCategoryStyle = isSmallScreen
  ? {
      top: isLoggedIn ? "105px" : "64px",
    }
  : {};

  useEffect(() => {
    if (subcategory) {
      setSubCatergoryLoader(true);
      setAPIDataLoaded(true);
      const data = {
        subcategory: subcategory.replaceAll("%20", ""),
      };
      props.fetchProductBySubCategory(data);
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

  return (
    <Box className="main-container categories">
<Box className="current-category" style={currentCategoryStyle}>
  <img
    onClick={() => navigate("/")}
    src={backarrow}
    alt="Back"
    style={{
      width: "18px",
      height: "16px",
      cursor: "pointer",
      objectFit: "contain",
      zIndex: 2,
    }}
  />
  <span className="category-title">
    {subcategory ? subcategory : category}
  </span>
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
                {productsData && productsData.length > 0 ? (
                  <List
                    currentCategory={subcategory ? subcategory : category}
                    data={productsData}
                  />
                ) : (
                  <div className="noproductdiv">
                    Products Coming Soon...
                  </div>
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
  const { allProductsData, productBySubCategoryData, allCategories } =
    state.allproducts;
  return {
    allProductsData,
    productBySubCategoryData,
    allCategories,
  };
}

const mapDispatchToProps = {
  allProducts,
  fetchProductBySubCategory,
  fetchCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
