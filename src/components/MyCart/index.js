import { Box, Button, Drawer, Grid, IconButton, Modal, Typography } from '@mui/material'
import React, { Component } from 'react'
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import greenPlusIcon from "../../assets/img/greenPlusIcon.svg"
import ArrowDown from "../../assets/img/ArrowDown.svg"

import closeModal from "../../assets/img/closeModalIcon.svg"
import BackArrow from "../../assets/img/backArrow.svg"
import { Link } from 'react-router-dom';
import { loginDetails } from 'Views/Utills/helperFunctions';
import { LocalStorageCartService } from 'Services/localStorageCartService';
import status from '../../Redux/Constants';
import {
    fetchCartItems,
    deleteItemToCart,
    updateItemToCart,
    addListOfItemsToCartReq,
} from "../../Redux/Cart/CartThunk";
import { saveForLater } from "../../Redux/AllProducts/AllProductthunk";
import { connect } from 'react-redux';
import { navigateRouter } from 'Views/Utills/Navigate/navigateRouter';
import AllAddresses from './Components/AllAddresses';
import AddNewAddress from './Components/AddNewAddress';
import DeliverySlots from './Components/DeliverySlots';

class MyCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matches: window.matchMedia("(max-width: 800px)").matches,
            showAddressPopup: true,
            TabSelectAddressPopupOpen: false,
            TabAddNewAddressOpen: false,
            // carts
            cartList: [],
            dataId: "",
            isUpdateIncrease: null,
            loaderCount: 0,
            deleteItemId: "",

            AddNewAddressOpen: false
            , slotOpen: false
        };
    }
    componentDidMount() {
        window
            .matchMedia("(max-width: 800px)")
            .addEventListener("change", (e) => this.setState({ matches: e.matches }));


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
        const { matches, dataId, isUpdateIncrease } = this.state
        const { open, handleClose } = this.props
        return (
            <>

                <Drawer
                    anchor={"right"}
                    open={open}
                    onClose={handleClose}
                >
                    <Box className="cart_popup">
                        {this.state.showAddressPopup ?
                            <Box className="my_cart_container">

                                <Box className="my_cart">
                                    <h2>My Cart</h2>
                                    <img onClick={handleClose} src={closeModal} alt="" />
                                </Box>

                                <Box className="select_delivery_slot">
                                    <h2>Select Delivery Slot</h2>

                                    {/* <DeliverySlots/> */}
                                    <span className='select_delivery_slot_wrapper'>
                                        <div onClick={() => {
                                            this.setState({
                                                slotOpen: true,
                                            });
                                        }} >
                                            <span>22 Oct, Tue, Between 6:00 AM - 7:00AM</span>
                                            <img src={ArrowDown} alt="" />
                                        </div>

                                        {matches && (
                                            <Button onClick={() => {
                                                this.setState({
                                                    slotOpen: true,
                                                });
                                            }} className='common-btn select_slot_btn'>Select Slot</Button>
                                        )}

                                    </span>
                                </Box>

                                <Box className="item_details_container">
                                    <h2>Item Details</h2>

                                    <Box className="items_container">
                                        {console.log(this.state.cartList)}
                                        {this.state.cartList.length === 0 ? (
                                            <Box sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', height: '100px' }}>No Items In Cart</Box>
                                        ) : (


                                            this.state.cartList.map((item) => {
                                                return (
                                                    <>
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
                                                                <img
                                                                    src={item?.productImage}
                                                                    alt="product-cart-img"
                                                                />
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
                                                                    -
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
                                                                    +
                                                                </IconButton>
                                                            </Box>
                                                        </Box>


                                                    </>

                                                );
                                            })


                                        )}

                                        <Box className="bill_details">
                                            <strong>Bill details</strong>
                                            <div> <span>Item total</span> <strong>₹436</strong></div>
                                            <div><span>Delivery Charges</span> <div ><span className='mrp'>₹25</span> <span className="free">Free</span> </div></div>
                                            <div><strong>Grand Total</strong> <strong>₹436</strong></div>

                                        </Box>
                                        <Box className="space_adder"></Box>

                                    </Box>

                                </Box>

                                {/* <Box className="bill_details">
<strong>Bill details</strong>
<div> <span>Item total</span> <strong>₹436</strong></div>
<div><span>Delivery Charges</span> <div ><span className='mrp'>₹25</span> <span className="free">Free</span> </div></div>
<div><strong>Grand Total</strong> <strong>₹436</strong></div>
</Box> */}

                                <Box className="my_cart_bottom">

                                    <Box className="my_cart_bottom_address">
                                        {/* <img src={LocationIcon} alt="" /> */}
                                        <Box>
                                            <span >
                                                Delivering to Home
                                            </span>
                                            <span>
                                                Plot No.13, Suncity, Near Shadan College..
                                            </span>
                                        </Box>

                                        {!matches && (
                                            <Link onClick={() => {
                                                this.setState({
                                                    showAddressPopup: false,
                                                });
                                            }} href="#" sx={{ marginLeft: 'auto', color: 'green', fontWeight: 'bold' }}>
                                                Change
                                            </Link>
                                        )}
                                        {matches && (
                                            <Link href="#" onClick={() => {
                                                this.setState({
                                                    TabSelectAddressPopupOpen: true,
                                                });
                                            }} sx={{ marginLeft: 'auto', color: 'green', fontWeight: 'bold' }}>
                                                Change
                                            </Link>
                                        )}

                                    </Box>



                                    <Grid item xs={6} lg={4} md={6} sm={6}>


                                        <Button
                                            className="common-btn pay_now_btn"
                                            variant="contained"
                                            fullWidth
                                        >
                                            Pay Now
                                            {/* <img src={buttonArrowIcon} alt="" /> */}
                                        </Button>
                                    </Grid>

                                </Box>

                            </Box>

                            :
                            <Box className="select_delivery_address_container">

                                <Box className="select_delivery_address">
                                    <img onClick={() => {
                                        this.setState({
                                            showAddressPopup: true,
                                        });
                                    }} src={BackArrow} alt="" />
                                    <h2>Select Delivery Address</h2>
                                </Box>

                                <Box className="select_delivery_slot">
                                    <h2>Select Delivery Slot</h2>

                                    <div onClick={() => {
                                        this.setState({
                                            AddNewAddressOpen: true,
                                        });
                                    }} className="add_new_address_btn">
                                        <img src={greenPlusIcon} alt="" />
                                        <span>Add New Address</span>
                                    </div>
                                </Box>

                                <Box className="delivery_slots_container">
                                    <h2>Select Delivery Slot</h2>
                                    <AllAddresses
                                    />
                                </Box>
                            </Box>

                        }
                    </Box>

                </Drawer>




                <Drawer open={this.state.TabSelectAddressPopupOpen}
                    anchor='bottom'
                    onClose={() => {
                        this.setState({
                            TabSelectAddressPopupOpen: false,
                        });
                    }}
                >
                    <Box
                        sx={{
                            borderRadius: "12px 12px 0 0",        // Rounded top corners
                            overflow: "hidden"                    // Prevents child content from overflowing the border radius
                        }}
                        className="tab_popup"
                    >
                        <Box className="tab_select_delivery_container">
                            <h2>Select Delivery Address</h2>
                        </Box>

                        <Button onClick={() => {
                            this.setState({
                                TabAddNewAddressOpen: true,
                            });
                        }} className="tab_address_btn">
                            <img alt="" src={greenPlusIcon} />
                            <span style={{ textTransform: "none" }}>Add new Address</span>
                        </Button>

                        <AllAddresses />
                    </Box>
                </Drawer>


                <Drawer open={this.state.TabAddNewAddressOpen}
                    anchor='bottom'
                    onClose={() => {
                        this.setState({
                            TabAddNewAddressOpen: false,
                        });
                    }}
                >
                    <Box
                        sx={{
                            borderRadius: "12px 12px 0 0",        // Rounded top corners
                            overflow: "scroll"                    // Prevents child content from overflowing the border radius
                            , padding: 0,
                            background: "#fff"
                        }}
                        className="tab_popup_new_address"
                    >
                        <AddNewAddress
                            handleClose={() => {
                                this.setState({
                                    TabAddNewAddressOpen: false,
                                });
                            }}
                        />
                    </Box>
                </Drawer>

                <Modal

                    open={this.state.AddNewAddressOpen}
                    onClose={() => {
                        this.setState({
                            AddNewAddressOpen: false,
                        });
                    }}
                >
                    <Box className="">
                        <AddNewAddress handleClose={() => {
                            this.setState({
                                AddNewAddressOpen: false,
                            });
                        }} />
                    </Box>
                </Modal>
                <Modal open={this.state.slotOpen}
                    onClose={() => {
                        this.setState({
                            slotOpen: false,
                        });
                    }}
                >
                    <>
                        <DeliverySlots />
                    </>
                </Modal>


            </>
        )
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
)(navigateRouter(MyCart));
