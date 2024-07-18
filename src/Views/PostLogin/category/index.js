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
import _ from "lodash"
import { useParams, useLocation } from "react-router-dom";
function Category(props) {

  const location = useLocation();
  const [hideFilter, setHideFilter] = useState(true)
  const [products, setProducts] = useState([])
  const [productsData, setProductsData] = useState([])
  const [cartList, setCartList] = useState([])
  const [categoryName, setCategoryName] = useState("")
  const [productApiLoader, setProdductApiLoader] = useState(false)
  const [getCartApiLoader, setCartApiLoader] = useState(false)
  const [locationName, setLocationName] = useState("")
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    selectedRatings: [],
    selectedDiscounts: [],
    selectedCountry: "",
    selectedProductTypes: [],
    selectedPackSizes: [],
    currentCategory: "",


  })
  const [loaderCount, setLoaderCount] = useState(0)

  useEffect(() => {
    let items = loginDetails();
    setProdductApiLoader(true)

    if (items?.userId) {
      setCartApiLoader(true)
      props.fetchCartItems({
        userId: items?.userId,
      });

      props.allProducts(items?.userId);
    } else {
      props.allProducts();
    }

    // let path = _.cloneDeep(window.location.pathname)
    // let pathArr = path.substring(path.lastIndexOf("/") + 1).replace("-", " ").split(" ")

    // if (pathArr.length > 0) {
    //   this.setState({
    //     categoryName: pathArr?.[1]?.replaceAll("-", " ")
    //   })
    // }



  }, [])


  useEffect(() => {
    if (location.pathname && props.allProductsData?.data) {

      let path = location.pathname;
      if (path.split("/")?.[3] && locationName !== location.pathname) {
        setLocationName(location.pathname)
        setCategoryName(path.split("/")?.[3].replaceAll("%20", " "))
        let selectedItem = []
        let catName = path.split("/")?.[3].replaceAll("%20", " ")
        props.allProductsData?.data?.forEach((product) => {
          if (product.subCategory == catName) {
            selectedItem.push(product);
          }
        });



        if (selectedItem.length > 0 && productsData !== selectedItem) {

          setProductsData(selectedItem)
        }



      } else if (path.split("/")?.[2] && props.allProductsData?.data?.length > 0 && locationName !== location.pathname) {
        setLocationName(location.pathname)

        setCategoryName(path.split("/")?.[2].replaceAll("%20", " "))
        let selectedItem = []
        props.allProductsData?.data?.forEach((product) => {
          if (product.category == path.split("/")?.[2]) {
            selectedItem.push(product);
          }
        });



        if (selectedItem.length > 0 && productsData !== selectedItem) {

          setProductsData(selectedItem)
        }



      } else if (props.allProductsData?.data?.length > 0 && locationName !== location.pathname) {
        setCategoryName("")
        setProductsData(props.allProductsData?.data)
      }
      setLoaderCount(1)
    }
  }, [location.pathname, productsData, props.allProductsData.data]);


  useEffect(() => {
    if (props.allProductsData.status == status.SUCCESS && props.allProductsData.data && productApiLoader) {
      setProdductApiLoader(false)
      // setProductsData(props.allProductsData.data)
      // setProducts(props.allProductsData.data)
      // let fruits = [];
      // let vegetables = [];

      // props.allProductsData.data.forEach((product) => {
      //   if (product.category === "FRUITS") {
      //     fruits.push(product);
      //   } else if (product.category === "VEGETABLES") {
      //     vegetables.push(product);
      //   }
      // });

      // props.productCategories([fruits, vegetables]);
    }

  }, [props.allProductsData.status])


  useEffect(() => {
    if (

      props.cartItems.status === status.SUCCESS &&
      props.cartItems.data && getCartApiLoader
    ) {
      setCartApiLoader(false)
      setCartList(props.cartItems.data.items)

    }
  }, [props.cartItems.status])


  // useEffect(() => {
  //   let path = _.cloneDeep(window.location.pathname)
  //   let pathArr = path.substring(path.lastIndexOf("/") + 1).replace("-", " ").split(" ")

  //   if (

  //     props.allProductsData?.data?.length &&
  //     categoryName != pathArr[1]?.replaceAll("%20", "")
  //   ) {

  //     let fruits = [];
  //     let vegetables = [];
  //     let selectedItem = [];

  //     if (pathArr.length > 0) {
  //       setCategoryName(pathArr[1]?.replaceAll("%20", " "))
  //     }
  //     props.allProductsData.data.forEach((product) => {
  //       if (product.category === "FRUITS") {
  //         fruits.push(product);
  //       } else if (product.category === "VEGETABLES") {
  //         vegetables.push(product);
  //       }
  //     });

  //     if (pathArr[0] == "VEGETABLES") {
  //       if (pathArr[1]?.replaceAll("-", " ")) {
  //         vegetables?.forEach((product) => {
  //           if (pathArr[1]?.replaceAll("%20", " ") == product.subCategory) {
  //             selectedItem.push(product);
  //           }
  //         });
  //       } else {
  //         selectedItem = vegetables;

  //       }
  //     } else if (pathArr[0] == "FRUITS") {
  //       if (pathArr[1]?.replaceAll("%20", " ")) {
  //         fruits?.forEach((product) => {
  //           if (pathArr[1]?.replaceAll("%20", " ") == product.subCategory) {
  //             selectedItem.push(product);
  //           }
  //         });
  //       } else {
  //         selectedItem = fruits;

  //       }
  //     }

  //     if (selectedItem.length > 0) {
  //       // setProductsData(selectedItem)
  //     }
  //   }
  // }, [])



  const handleFilterChange = (filters) => {

    // this.setState({ filters }, this.applyFilters);
  };

  const applyFilters = () => {
    // const { products, filters } = this.state;
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
    setProductsData(productsData)

  };

  const toggleFilter = () => {
    setHideFilter(!hideFilter)
    // this.setState((prevState) => ({
    //   hideFilter: !prevState.hideFilter,
    // }));
  };
  const handleCartApiLoader = (apiLoader) => {
    setCartApiLoader(apiLoader)
  }

  const allproducts = () => {
    const items = loginDetails();

    if (items?.userId) {

      setProdductApiLoader(true)
      setCartApiLoader(true)
      props.allProducts(items?.userId);
      props.fetchCartItems({
        userId: items?.userId,
      });

    }
  }


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
            {
              props.allProductsData.status === status.IN_PROGRESS && loaderCount == 0 ? (
                Loader.commonLoader()
              ) :

                <List
                  handleCartApiLoader={handleCartApiLoader}
                  currentCategory={categoryName}
                  data={productsData ? productsData : []}
                  cartItemsData={cartList}
                  hideFilter={hideFilter}
                  allproducts={allproducts}
                />
            }
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

const mapDispatchToProps = { allProducts, fetchCartItems, productCategories, setShopByCategory };

export default connect(mapStateToProps, mapDispatchToProps)(Category);
