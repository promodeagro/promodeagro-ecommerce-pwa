import { Box, Button, CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { Component } from "react";
import { connect } from "react-redux";
import status from "../../../../Redux/Constants";
import { LocalStorageCartService } from "Services/localStorageCartService";
import { Loader, loginDetails } from "Views/Utills/helperFunctions";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import { saveForLater } from "../../../../Redux/AllProducts/AllProductthunk";
import {
    fetchCartItems,
    deleteItemToCart,
    updateItemToCart,
    addListOfItemsToCartReq,
} from "../../../../Redux/Cart/CartThunk";
class Carts extends Component {
    constructor(props , handkeDrawerCloze) {
        super(props);
        this.state = {
            cartList: [],
            dataId: "",
            isUpdateIncrease: null,
            loaderCount: 0,
            deleteItemId: "",
        };
    }

    componentDidMount() {
        const items = loginDetails();
        if (items?.userId) {
            let cartData = LocalStorageCartService.getData() || {};
            this.props.addListOfItemsToCartReq({
                userId: items.userId,
                cartItems: Object.values(cartData).length
                    ? Object.values(cartData)
                    : [],
            });
            this.props.fetchCartItems({
                userId: items.userId,
            });
        }
    }
    componentDidUpdate(prevProps, prevState) {
        const items = loginDetails();
        if (
            prevProps.addListOfItemRes.status !== this.props.addListOfItemRes.status
        ) {
            if (this.props.addListOfItemRes.status === status.SUCCESS) {
                this.props.fetchCartItems({
                    userId: items.userId,
                });
            } else if (this.props.addListOfItemRes.status === status.FAILURE) {
            }
        }
        if (
            prevProps.cartItems.status !== this.props.cartItems.status &&
            this.props.cartItems.status === status.SUCCESS &&
            this.props.cartItems.data
        ) {
            this.setState({
                cartList: this.props.cartItems.data.items,
                loaderCount: 1,
            });
        } else if (this.props.cartItems.status === status.FAILURE) {
            this.setState({
                cartList: [],
                loaderCount: 1,
            });
        }
        if (
            prevProps.saveForLaterData.status !==
            this.props.saveForLaterData.status &&
            this.props.saveForLaterData.status === status.SUCCESS
        ) {
            this.props.fetchCartItems({
                userId: items.userId,
            });
            this.setState({
                bookMarkId: "",
            });
            if (
                this.state.deleteItemId &&
                typeof this.state.deleteItemId === "string"
            ) {
                LocalStorageCartService.deleteItem(this.state.deleteItemId);
            }
        } else if (this.props.saveForLaterData.status === status.FAILURE) {
            this.setState({
                bookMarkId: "",
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
            if (
                this.state.deleteItemId &&
                typeof this.state.deleteItemId === "object" &&
                this.state.deleteItemId.productId
            ) {
                LocalStorageCartService.updateItem(
                    this.state.deleteItemId.productId,
                    this.state.deleteItemId
                );
                this.setState({ deleteItemId: null });
            }
        } else if (this.props.updateItems.status === status.FAILURE) {
        }
        if (
            prevProps.deleteItems.status !== this.props.deleteItems.status &&
            this.props.deleteItems.status === status.SUCCESS &&
            this.props.deleteItems.data
        ) {
            this.props.fetchCartItems({
                userId: items.userId,
            });
            if (
                this.state.deleteItemId &&
                typeof this.state.deleteItemId === "string" &&
                this.state.deleteItemId.length
            ) {
                LocalStorageCartService.deleteItem(this.state.deleteItemId);
                this.setState({ deleteItemId: null });
            }
        } else if (this.props.deleteItems.status === status.FAILURE) {
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
        if (productQuantity > 0) {
            this.setState({
                deleteItemId: {
                    productId: id,
                    quantity: parseInt(productQuantity),
                    quantityUnits: qty,
                },
            });
            this.props.updateItemToCart({
                userId: items.userId,
                productId: id,
                quantity: parseInt(productQuantity),
                quantityUnits: qty,
            });
        } else {
            this.props.deleteItemToCart({
                userId: items.userId,
                productId: id,
            });
            this.setState({
                deleteItemId: id,
            });
        }
    }

    render() {
        const { dataId, isUpdateIncrease } = this.state;
        return (
            <div className="items_container">
            {this.state.cartList?.length > 0 ? (
              this.state.cartList.map((item) => {
                return (
                  <Box className="cart_item" key={item?.ProductId}>
                    {/* Image */}
                    <Box
                      className="img_box"
                      onClick={() => {
                        this.props.navigate(
                          `/product-details/${item?.category}/${item?.subcategory}/${item?.ProductId}`
                        );
                      }}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 1,
                        marginRight: 2,
                      }}
                    >
                      <img src={item?.productImage} alt="product-cart-img" />
                    </Box>
          
                    {/* Product Details */}
                    <Box className="item_details" flexGrow={1}>
                      <span>{item?.productName}</span>
                      <span>Piece</span>
                      <Box display="flex" alignItems="center">
                        <span className="price">₹ {item?.Price}</span>
                        <span className="mrp">{item?.Mrp}</span>
                      </Box>
                    </Box>
          
                    {/* Quantity Controls */}
                    <Box
                      display="flex"
                      alignItems="center"
                      borderRadius={1}
                      bgcolor="#1F9151"
                      color="white"
                    >
                      <IconButton
                        onClick={() => {
                          let d = item.Quantity;
          
                          this.handleQuantityChange(
                            item.ProductId,
                            -1,
                            Number(d),
                            item.QuantityUnits
                          );
                        }}
                        size="small"
                        color="inherit"
                      >
                        {(this.props.deleteItems.status === status.IN_PROGRESS &&
                          item.ProductId === dataId &&
                          !isUpdateIncrease) ||
                        (this.props.updateItems.status === status.IN_PROGRESS &&
                          item.ProductId === dataId &&
                          !isUpdateIncrease) ? (
                          <CircularProgress
                            size={24}
                          />
                        ) : (
                          "-"
                        )}
                      </IconButton>
                      <Typography variant="body1" mx={1}>
                        {item?.Quantity}
                      </Typography>
                      <IconButton
                        onClick={() => {
                          let d = item.Quantity;
                          this.handleQuantityChange(
                            item.ProductId,
                            1,
                            Number(d),
                            item.QuantityUnits
                          );
                        }}
                        size="small"
                        color="inherit"
                      >
                        {this.props.updateItems.status === status.IN_PROGRESS &&
                        item.ProductId === dataId &&
                        isUpdateIncrease ? (
                          <CircularProgress
                           
                            size={24}
                          />
                        ) : (
                          "+"
                        )}
                      </IconButton>
                    </Box>
                  </Box>
                );
              })
            ) : (
            
                <Box sx={{display:"flex" , justifyContent:"center" , minHeight:"100px" , alignItems:"center"}}>No Items In Cart</Box>
            )}
          </div>
          
        );
    }
}


function mapStateToProps(state) {
    const { cartItems, deleteItems, updateItems, addListOfItemRes } =
        state.cartitem;
    const { loginData } = state.login;
    const { saveForLaterData } = state.allproducts;
    return {
        cartItems,
        loginData,
        deleteItems,
        updateItems,
        saveForLaterData,
        addListOfItemRes,
    };
}


const mapDispatchToProps = {
    fetchCartItems,
    deleteItemToCart,
    updateItemToCart,
    saveForLater,
    addListOfItemsToCartReq,
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(navigateRouter(Carts));
