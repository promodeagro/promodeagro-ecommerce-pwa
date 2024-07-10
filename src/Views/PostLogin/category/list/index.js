import React, { Component } from "react";
import {
  addItemToCart,
  fetchCartItems,
  updateItemToCart,
  deleteItemToCart,
} from "../../../../Redux/Cart/CartThunk";
import { connect } from "react-redux";
import {
  Box,
  FormControl,
  NativeSelect,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import StarIcon from "@mui/icons-material/Star";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import priceIcon from "../../../../assets/img/price-icon.png";
import noImage from "../../../../assets/img/no-image.png";
import status from "../../../../Redux/Constants";
import _ from "lodash";
import { loginDetails } from "../../../Utills/helperFunctions";
import { Link } from "react-router-dom";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedProducts: [], // Track added products
      quantities: {}, // Track quantities for each product
      sortOrder: null, // Track sort order
      dataId: "",
      isUpdateIncrease: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.additems.status !== this.props.additems.status &&
      this.props.additems.status === status.SUCCESS &&
      this.props.additems.data
    ) {
      this.setState({
        addedProducts: [],
        quantities: {},
      });
      const items = loginDetails();
      this.props.fetchCartItems({
        userId: items.userId,
      });
    }

    if (
      prevProps.updateItems.status !== this.props.updateItems.status &&
      this.props.updateItems.status === status.SUCCESS &&
      this.props.updateItems.data
    ) {
      this.setState({
        addedProducts: [],
        quantities: {},
      });
      const items = loginDetails();
      this.props.fetchCartItems({
        userId: items.userId,
      });
    }

    if (
      prevProps.deleteItems.status !== this.props.deleteItems.status &&
      this.props.deleteItems.status === status.SUCCESS &&
      this.props.deleteItems.data
    ) {
      this.setState({
        addedProducts: [],
        quantities: {},
      });
      const items = loginDetails();
      this.props.fetchCartItems({
        userId: items.userId,
      });
    }
  }

  handleAddToCart(id) {
    const items = loginDetails();
    this.setState({
      dataId: id
    })
    if (items?.userId) {
      this.props.addItemToCart({
        userId: items.userId,
        productId: id,
        quantity: "1",
      });
    } else {
      this.props.navigate("/signin");
    }
  }



  handleCategories(sortedData, dataId, addedProducts, isUpdateIncrease, quantities, cartItemsData) {
    let returnData = sortedData.length > 0 && sortedData.map((item) => {
      let itemId = cartItemsData?.find((x) => x.ProductId === item.id);

      return <Box
        className={this.props.hideFilter ? "product-box hide-filter-box" : "product-box"}
        key={item.id}
      >
        {item.savingsPercentage && (
          <Box className="sale">
            Sale {item.savingsPercentage}%
          </Box>
        )}

        <Box className="icon">
          <TurnedInNotOutlinedIcon />
        </Box>
        <Box className="image">
          <Link to="/product-details">
            <img src={item.image ? item.image : noImage} alt="" />
          </Link>
        </Box>
        <Box className="name">
          <Link to="/product-details">{item.name}</Link>
        </Box>
        <Box className="price-ratting">
          <Box className="price">
            <img src={priceIcon} alt="" /> {item.price}
            <span>{item.mrp}</span>
          </Box>
          {item.ratings && (
            <Box className="ratting">
              <StarIcon /> {item.ratings}
            </Box>
          )}
        </Box>
        <Box className="select">{item.unit}</Box>
        {addedProducts.includes(item.id) || itemId ? (
          <Box className="number-input-container">
            {itemId && itemId.Quantity !== 0 ? (
              <Box
                className="symbol"
                onClick={() => {
                  if (itemId?.ProductId) {
                    let d = itemId.Quantity;
                    this.handleQuantityChange(itemId.ProductId, -1, Number(d));
                  } else {
                    this.handleQuantityChange(item.id, -1);
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

            <Box className="Number">
              {quantities[item.id] ? quantities[item.id] : itemId?.Quantity || 0}
            </Box>
            <Box
              className="symbol"
              onClick={() => {
                if (itemId?.ProductId) {
                  let d = itemId.Quantity;
                  this.handleQuantityChange(itemId.ProductId, 1, Number(d));
                } else {
                  this.handleQuantityChange(item.id, 1);
                }
              }}
            >
              {this.props.updateItems.status === status.IN_PROGRESS &&
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

                this.handleAddToCart(item.id);
              }}
              disabled={
                this.props.additems.status === status.IN_PROGRESS &&
                item.id === this.state.dataId
              }
            >
              {this.props.additems.status === status.IN_PROGRESS &&
                item.id === this.state.dataId ? (
                <CircularProgress className="common-loader" />
              ) : (
                "Add to cart "
              )}
            </Button>
          </Box>
        )}
      </Box>
    });

    if (returnData.length > 0) {
      return returnData
    } else {
      return <p className="data-not-found-text">There is no data</p>
    }

  }




  handleQuantityChange(id, increment, productQuantity) {
    const items = loginDetails();
    if (increment < 0) {
      this.setState({ isUpdateIncrease: false });
    } else {
      this.setState({ isUpdateIncrease: true });
    }
    this.setState({
      dataId: id,
    });
    let cloneQuantities = _.cloneDeep(this.state.quantities);

    if (!productQuantity) {
      cloneQuantities[id] = cloneQuantities[id] + increment;
    } else {
      productQuantity = productQuantity + increment;
    }
    if (cloneQuantities[id] || productQuantity !== 0) {
      this.props.updateItemToCart({
        userId: items.userId,
        productId: id,
        quantity: cloneQuantities[id]
          ? cloneQuantities[id]
          : productQuantity.toString(),
      });
    } else {
      this.props.deleteItemToCart({
        userId: items.userId,
        productId: id,
      });
    }
  }

  handleSortChange = (event) => {
    this.setState({ sortOrder: event.target.value });
  };

  render() {
    const { data, cartItemsData } = this.props;
    const { addedProducts, quantities, sortOrder, dataId, isUpdateIncrease } =
      this.state;

    // Sort data based on sortOrder
    const sortedData = sortOrder
      ? _.orderBy(data, ["price"], [sortOrder === "lowToHigh" ? "asc" : "desc"])
      : data;

    return (
      <Box className="listing-container">
        <Box className="heading">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <h2>
                {this.props.shopCategoryData.length
                  ? this.props.shopCategoryData[1]
                  : ""}
              </h2>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box className="d-flex w-100 justify-content-end flex-wrap">
                <Box className="sort-by">
                  <FormControl fullWidth>
                    <NativeSelect
                      value={sortOrder || ""}
                      onChange={this.handleSortChange}
                    >
                      <option value="">Sort by Default</option>
                      <option value="lowToHigh">
                        Sort by Price - Low to High
                      </option>
                      <option value="highToLow">
                        Sort by Price - High to Low
                      </option>
                    </NativeSelect>
                  </FormControl>
                </Box>
                <Box className="results-text">
                  <strong>{data.length}</strong> Results Found
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="products">

          <>
            {this.handleCategories(
              sortedData,
              dataId,
              addedProducts,
              isUpdateIncrease,
              quantities,
              cartItemsData
            )}
          </>

        </Box>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { additems, cartItems, updateItems, deleteItems } = state.cartitem;
  const { shopCategoryData } = state.allproducts;
  return { additems, cartItems, updateItems, deleteItems, shopCategoryData };
}

const mapDispatchToProps = {
  addItemToCart,
  fetchCartItems,
  updateItemToCart,
  deleteItemToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(navigateRouter(List));
