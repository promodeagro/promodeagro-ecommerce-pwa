import React, { Component } from "react";
import {
  Box,
  Container,
  FormControl,
  NativeSelect,
  Button,
  CircularProgress,
} from "@mui/material";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import {
  addItemToCart,
  fetchCartItems,
  updateItemToCart,
  deleteItemToCart,
} from "../../../../../Redux/Cart/CartThunk";
import StarIcon from "@mui/icons-material/Star";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import priceIcon from "../../../../../assets/img/price-icon.png";
import noImage from "../../../../../assets/img/no-image.png";
import { addDataInCart } from "../../../../../Redux/Home/HomeSlice";
import { allProducts } from "../../../../../Redux/AllProducts/AllProductthunk";
import { setShopByCategory, productDetailsData } from "../../../../../Redux/AllProducts/AllProductSlice";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import status from "../../../../../Redux/Constants";
import { loginDetails } from "Views/Utills/helperFunctions";

class FeaturedProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartData: [],
      productsData: [],
      cartList: [],
      dataId: "",
      isUpdateIncrease: null,
      qauntityUnits: []

    };
  }

  componentDidMount() {
    this.props.setShopByCategory([])

    // const items = loginDetails();
    // if (items?.userId) {

    //   this.props.fetchCartItems({
    //     userId: items.userId,
    //   });
    // }

    // this.props.allProducts();
  }

  componentDidUpdate(prevProps, prevState) {
    const items = loginDetails();

    if (
      prevProps.allProductsData.status !== this.props.allProductsData.status &&
      this.props.allProductsData.status === status.SUCCESS &&
      this.props.allProductsData.data
    ) {
      this.setState({
        productsData: this.props.allProductsData.data,
      });
    }

    if (
      prevProps.additems.status !== this.props.additems.status &&
      this.props.additems.status === status.SUCCESS &&
      this.props.additems.data
    ) {
      this.props.fetchCartItems({
        userId: items.userId,
      });
      this.setState({
        dataId: "",
      });
    }

    if (
      prevProps.updateItems.status !== this.props.updateItems.status &&
      this.props.updateItems.status === status.SUCCESS &&
      this.props.updateItems.data
    ) {
      this.props.fetchCartItems({
        userId: items.userId,
      });
      this.setState({
        dataId: "",
        isUpdateIncrease: null

      });
    }

    if (
      prevProps.deleteItems.status !== this.props.deleteItems.status &&
      this.props.deleteItems.status === status.SUCCESS &&
      this.props.deleteItems.data
    ) {
      this.props.fetchCartItems({
        userId: items.userId,
      });
      this.setState({
        dataId: "",
        isUpdateIncrease: null

      });
    }


  }



  handleAddToCart(id, qty) {
    const items = loginDetails();
    this.setState({
      dataId: id
    })



    if (items?.userId) {
      this.props.addItemToCart({
        userId: items.userId,
        productId: id,
        quantity: 1,
        quantityUnits: this.state.qauntityUnits[id] ? parseInt(this.state.qauntityUnits[id]) : qty
      });
    } else {
      this.props.navigate("/signin")
    }

  }

  handleQuantityChange(id, increment, productQuantity = 0, qty) {
    const items = loginDetails();
    if (increment < 0 && productQuantity != 0) {
      this.setState({ isUpdateIncrease: false });
    } else if (productQuantity != 0) {
      this.setState({ isUpdateIncrease: true });
    }
    this.setState({
      dataId: id,
    });


    productQuantity = productQuantity + increment;



    if (productQuantity != 0) {
      this.props.updateItemToCart({
        userId: items.userId,
        productId: id,
        quantity: parseInt(productQuantity),
        quantityUnits: this.state.qauntityUnits[id] ? parseInt(this.state.qauntityUnits[id]) : qty
      });
    } else {
      this.props.deleteItemToCart({
        userId: items.userId,
        productId: id,
      });
    }
  }
  handleContextMenu = (event) => {
    event.preventDefault();
  };
  handleQuantity = (event, id) => {
    const { value } = event.target;
    let dupQty = this.state.qauntityUnits
    dupQty[id] = value;


    this.setState({
      qauntityUnits: dupQty
    })
  };

  render() {
    const { data, cartList } = this.props;
    const { productsData, dataId, isUpdateIncrease, qauntityUnits } = this.state;
    console.log("qauntityUnits", qauntityUnits);
    return (
      <Box className="featured-products-container" onContextMenu={this.handleContextMenu}>
        <Container>
          <Box className="heading">Featured Products</Box>
          <Box className="products">
            {data?.length &&
              data.slice(0, 5).map((item, index) => {
                let itemId = cartList?.find((x) => x.ProductId === item.id);
                return (
                  <Box className="product-box" key={index}>
                    <Box className="sale">Sale {item.savingsPercentage}%</Box>
                    <Box className="icon">
                      <TurnedInNotOutlinedIcon />
                    </Box>
                    <Box className="image" onClick={() => {
                      // let data = _.cloneDeep(item)

                      // data.Quantity = itemId?.Quantity ? itemId?.Quantity : 0
                      // this.props.productDetailsData(data);

                      this.props.setShopByCategory([[item.category], [item.name]])
                      this.props.navigate(`/product-details/${item.id}`)
                    }

                    }>
                      {/* <Link to={`/product-details/${item.id}`}> */}
                      <img src={item?.image ? item?.image : noImage} alt="" />
                      {/* </Link> */}
                    </Box>
                    <Box className="name" onClick={() => {
                      // let data = _.cloneDeep(item)
                      // data.Quantity = itemId?.Quantity ? itemId?.Quantity : 0
                      // this.props.productDetailsData(data);
                      // this.props.productDetailsData(data)
                      this.props.setShopByCategory([[item.category], [item.name]])
                      this.props.navigate(`/product-details/${item.id}`)
                    }}>
                      <Link to={`/product-details/${item.id}`}>{item?.name}</Link>
                    </Box>
                    <Box className="price-ratting">
                      <Box className="price">
                        <img src={priceIcon} alt="" /> {item?.price}
                        <span>{item?.mrp}</span>
                      </Box>
                      <Box className="ratting">
                        <StarIcon /> {item?.ratings}
                      </Box>

                      <>
                        {item?.unitPrices?.length > 0 ? (
                          <Box className="select">
                            <FormControl fullWidth>
                              <NativeSelect value={qauntityUnits[item.id] || ""} onChange={(event) => this.handleQuantity(event, item.id)}>
                                {item.unitPrices.map((unitItem, index) => {

                                  return <option key={index} value={unitItem.qty} >
                                    {unitItem.qty}
                                  </option>
                                })}
                              </NativeSelect>
                            </FormControl>
                          </Box>
                        ) : (
                          <></> // or any other placeholder or message you want to show
                        )}
                      </>

                    </Box>
                    <Box className="select">{item.unit}</Box>
                    {itemId ? (
                      <Box className="number-input-container">
                        {itemId && itemId.Quantity !== 0 ? (


                          <Box
                            className="symbol"
                            onClick={() => {
                              let unitqty = item.unitPrices[0].qty
                              if (itemId?.ProductId) {
                                let d = itemId.Quantity;
                                this.handleQuantityChange(
                                  itemId.ProductId,
                                  -1,
                                  Number(d),
                                  unitqty
                                );
                              } else {
                                this.handleQuantityChange(item.id, -1, "", unitqty);
                              }
                            }}
                          >
                            {(this.props.deleteItems.status === status.IN_PROGRESS && item.id === dataId && !isUpdateIncrease) ||
                              (this.props.updateItems.status === status.IN_PROGRESS && item.id === dataId && !isUpdateIncrease) ? (
                              <CircularProgress className="common-loader plus-icon" size={24} />
                            ) : (
                              "-"
                            )}
                          </Box>
                        ) : (
                          <></>
                        )}

                        <Box className="Number">{itemId?.Quantity}</Box>
                        <Box
                          className="symbol"
                          onClick={() => {
                            let unitqty = item.unitPrices[0].qty
                            if (itemId?.ProductId) {
                              let d = itemId.Quantity;
                              this.handleQuantityChange(
                                itemId.ProductId,
                                1,
                                Number(d),
                                unitqty
                              );
                            } else {
                              this.handleQuantityChange(item.id, 1, "", unitqty);
                            }
                          }}
                        >
                          {this.props.updateItems.status ===
                            status.IN_PROGRESS &&
                            item.id === dataId &&
                            isUpdateIncrease ? (
                            <CircularProgress className="common-loader plus-icon" />
                          ) : (
                            "+"
                          )}
                        </Box>
                      </Box>
                    ) : (
                      <Box className="add-cart">
                        <Button
                          variant="outlined"
                          onClick={() => {
                            let unitqty = item.unitPrices[0].qty

                            this.handleAddToCart(item.id, unitqty);
                          }}
                          disabled={
                            this.props.additems.status === status.IN_PROGRESS &&
                            item.id === this.state.dataId
                          }
                          endIcon={
                            this.props.additems.status == status.IN_PROGRESS &&
                              item.id == this.state.dataId ? (
                              <CircularProgress className="common-loader" />
                            ) : (
                              <></>
                            )
                          }
                        >
                          Add to cart
                        </Button>
                      </Box>
                    )}
                  </Box>
                );
              })}
          </Box>
          <Box className="load-more-btn" onClick={() => this.props.setShopByCategory([])}>
            <Link to="/category">Load More</Link>
          </Box>
        </Container>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { homeData } = state.home;
  const { allProductsData, shopCategoryData } = state.allproducts;
  const { additems, cartItems, updateItems, deleteItems } = state.cartitem;
  return {
    allProductsData,
    homeData,
    additems,
    cartItems,
    updateItems,
    deleteItems,
    shopCategoryData
  };
}

const mapDispatchToProps = {
  allProducts,
  addItemToCart,
  fetchCartItems,
  updateItemToCart,
  deleteItemToCart,
  setShopByCategory,
  productDetailsData
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(FeaturedProducts));

