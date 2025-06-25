import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  Modal,
  Radio,
  Typography,
} from "@mui/material";
import React, { Component } from "react";
import ArrowDown from "../../../assets/img/ArrowDown.svg";
import iconclosesvg from "../../../assets/img/Iconclosesvg.svg";
import BackArrow from "../../../assets/img/backArrow.svg";
import cashIcon from "../../../assets/img/cashIcon.svg";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ErrorMessages, loginDetails } from "Views/Utills/helperFunctions";
import { LocalStorageCartService } from "Services/localStorageCartService";
import status from "../../../Redux/Constants";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";

import {
  fetchCartItems,
  deleteItemToCart,
  updateItemToCart,
  addListOfItemsToCartReq,
} from "../../../Redux/Cart/CartThunk";
import LocationIcon from "../../../assets/img/LocationImg.svg";
import { placeOrder } from "../../../Redux/Order/PlaceOrderThunk";
import { saveForLater } from "../../../Redux/AllProducts/AllProductthunk";
import { connect } from "react-redux";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";

import { fetchDefaultAddress } from "../../../Redux/Address/AddressThunk";
import AddNewAddressModal from "../../../components/AddressModal/addnewaddressmodal";
import CartItems from "components/MyCart/Components/CartItems";
import DeliverySlots from "components/MyCart/Components/DeliverySlots";
import AddNewAddress from "components/MyCart/Components/AddNewAddress";
import AllAddresses from "components/MyCart/Components/AllAddresses";
import "../../../assets/sass/components/myCart.scss";
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: window.matchMedia("(max-width: 800px)").matches,
      showAddressPopup: true,
      TabSelectAddressPopupOpen: false,
      TabAddNewAddressOpen: false,
      cartList: [],
      dataId: "",
      isUpdateIncrease: null,
      loaderCount: 0,
      deleteItemId: "",
      AddNewAddressOpen: false,
      slotOpen: false,
      defaultAddress: "",
      selectedPaymentMethod: "cash",
      paymentLink: null,
      ListData: [],
      itemListArr: [],
      cartListArr: [],
      totalPrice: "",
      defaultSelectedAddress: {},
      triggerFetchCart: false, // New state to trigger fetch
    };
  }

  componentDidMount() {
    window
      .matchMedia("(max-width: 800px)")
      .addEventListener("change", (e) => this.setState({ matches: e.matches }));

    const items = loginDetails();
    if (items?.userId) {
      this.props.fetchDefaultAddress(items.userId);
      const cartData = LocalStorageCartService.getData() || {};
      this.props.addListOfItemsToCartReq({
        userId: items.userId,
        cartItems: Object.values(cartData).length
          ? Object.values(cartData)
          : [],
      });
      const addressId = localStorage.getItem("address");
      this.props.fetchCartItems({
        userId: items.userId,
        addressId: addressId !== null ? addressId : undefined,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const items = loginDetails();
    const addressId = localStorage.getItem("address") || undefined;
    const { handleClose } = this.props;

    if (
      prevProps.defaultAddressData?.status !==
        this.props?.defaultAddressData?.status &&
      this.props?.defaultAddressData?.status === status.SUCCESS &&
      this.props?.defaultAddressData?.data
    ) {
      if (
        JSON.stringify(this.state.defaultSelectedAddress) !==
        JSON.stringify(this.props.defaultAddressData.data)
      ) {
        this.setState({
          defaultSelectedAddress: this.props.defaultAddressData.data,
        });
      }
    }
    if (
      prevProps.addListOfItemRes.status !==
        this.props.addListOfItemRes.status &&
      this.props.addListOfItemRes.status === status.SUCCESS &&
      addressId
    ) {
      this.props.fetchCartItems({ userId: items.userId, addressId });
    }

    if (
      prevProps.cartItems.status !== this.props.cartItems.status &&
      this.props.cartItems.status === status.SUCCESS &&
      this.props.cartItems.data
    ) {
      let cartListData = [];
      let itemListData = [];

      this.props?.cartItems?.data?.items?.forEach((item) => {
        let data = {
          mrp: item.Mrp,
          price: item.Price,
          id: item.ProductId,
          Quantity: item.Quantity,
          savingsPercentage: item.Savings,
          subtotal: item.Subtotal,
          userId: item.UserId,
          image: item.productImage,
          name: item.productName,
        };

        let data1 = {
          productId: item.ProductId,
          quantity: item.Quantity,
          quantityUnits: item.QuantityUnits,
        };

        itemListData.push(data1);
        cartListData.push(data);
      });

      if (
        JSON.stringify(this.state.cartListArr) !==
          JSON.stringify(cartListData) ||
        JSON.stringify(this.state.itemListArr) !== JSON.stringify(itemListData)
      ) {
        this.setState({
          cartList: this.props.cartItems.data.items,
          ListData: this.props.cartItems.data.items,
          cartListArr: cartListData,
          itemListArr: itemListData,
          totalPrice: this.props.cartItems.data.finalTotal,
          loaderCount: 1,
        });
      }
    }

    if (
      prevProps.saveForLaterData.status !==
        this.props.saveForLaterData.status &&
      this.props.saveForLaterData.status === status.SUCCESS &&
      addressId
    ) {
      this.props.fetchCartItems({ userId: items.userId, addressId });
      this.setState({ bookMarkId: "" });

      if (
        this.state.deleteItemId &&
        typeof this.state.deleteItemId === "string"
      ) {
        LocalStorageCartService.deleteItem(this.state.deleteItemId);
      }
    }

    if (
      prevProps.updateItems.status !== this.props.updateItems.status &&
      this.props.updateItems.status === status.SUCCESS &&
      this.props.updateItems.data &&
      addressId
    ) {
      this.props.fetchCartItems({ userId: items.userId, addressId });

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
    }

    if (
      prevProps.deleteItems.status !== this.props.deleteItems.status &&
      this.props.deleteItems.status === status.SUCCESS &&
      this.props.deleteItems.data &&
      addressId
    ) {
      this.props.fetchCartItems({ userId: items.userId, addressId });

      if (
        this.state.deleteItemId &&
        typeof this.state.deleteItemId === "string"
      ) {
        LocalStorageCartService.deleteItem(this.state.deleteItemId);
        this.setState({ deleteItemId: null });
      }
    }

    if (
      prevProps.placeOrderData.status !== this.props.placeOrderData.status &&
      this.props.placeOrderData.status === status.SUCCESS
    ) {
      if (this.props.placeOrderData.data?.statuscode === 200) {
        const { orderId, paymentLink } = this.props.placeOrderData.data;
        if (this.state.selectedPaymentMethod === "online" && paymentLink) {
          window.location.href = paymentLink;
        } else if (orderId) {
          this.props.navigate(
            `/mycart/address/order-placed/${orderId}`
          );
          localStorage.removeItem("cartItem");
          localStorage.removeItem("address");
          LocalStorageCartService.saveData({});
          this.setState({
            selectedSlot: "",
            selectedPaymentMethod: "cash",
            cartList: [],
          });

          if (items?.userId && addressId) {
            this.props.addListOfItemsToCartReq({
              userId: items.userId,
              cartItems: [],
            });
            this.props.fetchCartItems({ userId: items.userId, addressId });
          }
        }
      }
    }
  }

  handlePlaceOrder = () => {
    let login = loginDetails();
    let addressId = localStorage.getItem("address"); // Only getting from localStorage

    const { selectedPaymentMethod, itemListArr, selectedSlot } = this.state;

    // Check if a slot is selected
    if (!selectedSlot) {
      this.setState({ showSlotError: true });
      ErrorMessages.error("Please select a delivery slot.");
      return;
    }

    // Ensure addressId is available before proceeding
    if (!addressId) {
      ErrorMessages.error("No address selected. Please choose an address.");
      return;
    }

    const Data = {
      addressId: addressId, // Only using addressId from localStorage
      deliverySlotId: selectedSlot.id,
      items: itemListArr,
      paymentDetails: {
        method: selectedPaymentMethod,
      },
      userId: login.userId,
    };

    this.props.placeOrder(Data);
  };

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

  getDefaultAddress() {
    const { defaultAddressData } = this.props; // Get default address from props

    if (
      defaultAddressData?.status === status.SUCCESS &&
      defaultAddressData?.data
    ) {
      return `${defaultAddressData.data.house_number}, ${defaultAddressData.data.landmark_area}...`;
    }

    return "No Address Selected";
  }

  getDefaultAddresstype() {
    const { defaultAddressData } = this.props;

    if (
      defaultAddressData?.status === status.SUCCESS &&
      defaultAddressData?.data
    ) {
      return defaultAddressData.data.address_type;
    }

    return "No Address Selected";
  }

  handleAddNewAddressClose = () => {
    this.setState({
      isAddNewAddressModalOpen: false,
    });
  };

  handleDrawerClose = () => {
    this.setState(
      { TabSelectAddressPopupOpen: false, triggerFetchCart: true },
      () => {
        setTimeout(() => this.setState({ triggerFetchCart: false }), 500); // Reset trigger after a short delay
      }
    );
  };
  St;

  render() {
    const { matches, selectedPaymentMethod } = this.state;
    const { open, handleClose } = this.props;
    const { isAddNewAddressModalOpen, defaultSelectedAddress } = this.state;

    return (
      <>
        <Box className="cart_popup">
          {this.state.showAddressPopup ? (
            <Box className="my_cart_container">
              <Box className="my_cart">
                <h2>My Cart</h2>
                <img
                style={{height:"18ox",
                  width:"18px"
                }}
                  onClick={() => this.props.navigate("/")}
                  src={iconclosesvg}
                  alt=""
                />
              </Box>

              {defaultSelectedAddress?.addressId ? (
                <>
                  <Box className="my_cart_bottom_address">
                    <img src={LocationIcon} alt="" />
                    <Box>
                      <span>
                        Delivering to {""}
                        {this.state.selectedAddress
                          ? this.state.selectedAddress.address_type
                          : this.getDefaultAddresstype()}
                      </span>
                      <span>
                        {this.state.selectedAddress
                          ? `${this.state.selectedAddress.house_number}, ${this.state.selectedAddress.landmark_area}...`
                          : this.getDefaultAddress()}
                      </span>
                    </Box>
                    {!matches && (
                      <Link
                        onClick={() => {
                          this.setState({
                            showAddressPopup: false,
                            selectedSlot: null,
                          });
                        }}
                        href="#"
                        sx={{
                          marginLeft: "auto",
                          color: "green",
                          fontWeight: "bold",
                        }}
                      >
                        Change
                      </Link>
                    )}
                    {matches && (
                      <Link
                        href="#"
                        onClick={() => {
                          this.setState({
                            TabSelectAddressPopupOpen: true,
                            selectedSlot: null,
                          });
                        }}
                        sx={{
                          marginLeft: "auto",
                          color: "green",
                          fontWeight: "bold",
                        }}
                      >
                        Change
                      </Link>
                    )}
                  </Box>
                  <Box className="select_delivery_slot">
                    <h2>Select Delivery Slot</h2>
                    <span className="select_delivery_slot_wrapper">
                      <div
                        className={`${
                          this.state.showAddressError ? "address-error" : ""
                        } ${this.state.showSlotError ? "slot-error" : ""}`}
                        onClick={() => {
                          const hasValidAddress =
                            this.state.selectedAddress?.addressId ||
                            (this.getDefaultAddress() &&
                              this.getDefaultAddress() !==
                                "No Address Selected");

                          if (!hasValidAddress) {
                            this.setState({ showAddressError: true });
                            ErrorMessages.error(
                              "Please select an address before selecting a slot."
                            );
                            return;
                          }

                          this.setState({
                            slotOpen: true,
                            showSlotError: false, // Reset slot error if applicable
                            showAddressError: false, // Reset address error
                          });
                        }}
                      >
                        <span>
                          {this.state.selectedSlot
                            ? `${this.state.selectedSlot.start} ${this.state.selectedSlot.startAmPm} - ${this.state.selectedSlot.end} ${this.state.selectedSlot.endAmPm}`
                            : "Select Slot"}
                        </span>
                        <img src={ArrowDown} alt="Open Slots" />
                      </div>
                      {matches && (
                        <Button
                          onClick={() => {
                            this.setState({
                              slotOpen: true,
                              showSlotError: false, // Reset error when opening the slot selection
                            });
                          }}
                          className="common-btn select_slot_btn"
                        >
                          Select Slot
                        </Button>
                      )}
                    </span>
                    {/* Error message */}
                    {this.state.showSlotError && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: "red",
                          marginTop: "4px",
                          fontSize: "12px",
                        }}
                      >
                        Please select a delivery slot before placing the order.
                      </Typography>
                    )}
                  </Box>
                </>
              ) : null}

              <Box className="item_details_container">
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <h2>Item Details ({this.state.cartList.length})</h2>
                  <Button
                    sx={{
                      color: "#1f9151",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                    onClick={() => {
                      const login = loginDetails();
                      localStorage.removeItem("cartItem");
                      LocalStorageCartService.saveData({});
                      this.props.addListOfItemsToCartReq({
                        userId: login.userId,
                        cartItems: [],
                      });
                    }}
                  >
                    Clear Cart
                  </Button>
                </Box>
                <CartItems triggerFetchCart={this.state.triggerFetchCart} />
                {this.state.cartList?.length > 0 ? (
                  <>
                    <div
                      className="bill_details"
                      style={{ marginBottom: "8px" }}
                    >
                      <strong>Bill details</strong>
                      <div>
                        <span>Item total</span>
                        {console.log(
                          this.props.cartItems.data,
                          "delivery s;pts"
                        )}
                        <strong>
                          {" "}
                          <CurrencyRupeeOutlinedIcon
                            style={{
                              fontSize:
                                "14px" /* Adjusted size to better match text */,
                              display: "inline-flex",
                              alignItems: "center",
                              position: "relative",
                              top: "1px" /* Small vertical adjustment if needed */,
                            }}
                          />
                          {this.props.cartItems.data?.subTotal}
                        </strong>
                      </div>
                      <div>
                        <span>Delivery Charges</span>
                        <div>
                          {this.props.cartItems.data?.deliveryCharges <= 0 ? (
                            <>
                              {this.state.selectedAddress?.zipCode ===
                                "500091" ||
                              this.state.selectedAddress?.zipCode ===
                                "500030" ||
                              this.state.selectedAddress?.zipCode ===
                                "500093" ||
                              this.state.selectedAddress?.zipCode ===
                                "500086" ? (
                                <span className="mrp">
                                  {" "}
                                  <CurrencyRupeeOutlinedIcon
                                    style={{
                                      fontSize:
                                        "14px" /* Adjusted size to better match text */,
                                      display: "inline-flex",
                                      alignItems: "center",
                                      position: "relative",
                                      top: "1px" /* Small vertical adjustment if needed */,
                                    }}
                                  />
                                  20
                                </span>
                              ) : this.state.selectedAddress?.zipCode !==
                                  "500091" &&
                                this.state.selectedAddress?.zipCode !==
                                  "500030" &&
                                this.state.selectedAddress?.zipCode !==
                                  "500093" &&
                                this.state.selectedAddress?.zipCode !==
                                  "500086" ? (
                                <span className="mrp">
                                  {" "}
                                  <CurrencyRupeeOutlinedIcon
                                    style={{
                                      fontSize:
                                        "14px" /* Adjusted size to better match text */,
                                      display: "inline-flex",
                                      alignItems: "center",
                                      position: "relative",
                                      top: "1px" /* Small vertical adjustment if needed */,
                                    }}
                                  />
                                  50
                                </span>
                              ) : null}
                              <span className="free">Free</span>
                            </>
                          ) : (
                            <strong style={{ marginLeft: "5px" }}>
                              <CurrencyRupeeOutlinedIcon
                                style={{
                                  fontSize:
                                    "14px" /* Adjusted size to better match text */,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  position: "relative",
                                  top: "1px" /* Small vertical adjustment if needed */,
                                }}
                              />
                              {this.props.cartItems.data?.deliveryCharges}
                            </strong>
                          )}
                        </div>
                      </div>
                      <div>
                        <strong>Grand Total</strong>
                        <strong>
                          <CurrencyRupeeOutlinedIcon
                            style={{
                              fontSize:
                                "14px" /* Adjusted size to better match text */,
                              display: "inline-flex",
                              alignItems: "center",
                              position: "relative",
                              top: "1px" /* Small vertical adjustment if needed */,
                            }}
                          />
                          {this.props.cartItems.data?.finalTotal}
                        </strong>
                      </div>
                    </div>
                    <span
                      style={{
                        color: "#005F41",
                        fontWeight: "600",
                        fontSize: "13px",
                        marginLeft: "5px",
                      }}
                    >
                      "{this.props.cartItems.data?.chargestag}"{" "}
                    </span>
                    {defaultSelectedAddress?.addressId ? (
                      <>
                        <div className="payment_container">
                          <Box className="Payment_methods_box">
                            <h2>Payment Method</h2>
                            <div
                             onClick={() =>
                               this.setState({
                                 selectedPaymentMethod: "online",
                               })
                             }
                           >
                             <span>
                               <span>Online Payment Options</span>
                             </span>
                             <Radio
                               checked={selectedPaymentMethod === "online"}
                               color="success"
                             />
                           </div>
 

                            <div
                              onClick={() =>
                                this.setState({
                                  selectedPaymentMethod: "cash",
                                })
                              }
                            >
                              <span>
                                <img src={cashIcon} alt="" />
                                <span>Cash on Delivery</span>
                              </span>
                              <Radio
                                checked={selectedPaymentMethod === "cash"}
                                color="success"
                              />
                            </div>
                          </Box>
                          <Grid
                            sx={{ paddingBottom: "20px" }}
                            item
                            xs={6}
                            lg={4}
                            md={6}
                            sm={6}
                          >
                            <Button
                              sx={{
                                justifyContent: "space-between",
                                background: "#1F9151",
                                marginTop: "20px",
                                "&:hover": {
                                  background: "#007A55", // Change this to your desired hover color
                                  boxShadow: "none",
                                },
                              }}
                              variant="contained"
                              fullWidth
                              onClick={this.handlePlaceOrder}
                              disabled={
                                this.props.placeOrderData.status ===
                                status.IN_PROGRESS
                              }
                              startIcon={
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "15px",
                                      fontWeight: "500",
                                      fontFamily: "sans-serif",
                                    }}
                                  >
                                    ₹{this.state.totalPrice}
                                  </span>
                                  <span
                                    style={{
                                      fontSize: "11px",
                                      fontWeight: "400",
                                      opacity: 0.8,
                                    }}
                                  >
                                    Total
                                  </span>
                                </Box>
                              }
                              endIcon={
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    textTransform: "none",
                                    borderRadius: "8px",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "16px",
                                    }}
                                  >
                                    Place Order
                                  </span>

                                  <ArrowForwardIosIcon />
                                </Box>
                              }
                            >
                              {this.props.placeOrderData.status ===
                              status.IN_PROGRESS ? (
                                <CircularProgress className="common-loader" />
                              ) : null}
                            </Button>
                          </Grid>
                        </div>
                      </>
                    ) : (
                      <div className="payment_container">
                        <Grid
                          sx={{ paddingBottom: "20px" }}
                          item
                          xs={6}
                          lg={4}
                          md={6}
                          sm={6}
                        >
                          <Button
                            variant="contained"
                            fullWidth
                            className="common-btn pay_now_btn"
                            onClick={() =>
                              this.setState({
                                isAddNewAddressModalOpen: true,
                              })
                            }
                          >
                            Add address to proceed
                          </Button>
                        </Grid>
                      </div>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          ) : (
            <Box className="select_delivery_address_container">
              <Box className="select_delivery_address">
                <img
                  onClick={() => {
                    this.setState({
                      showAddressPopup: true,
                    });
                  }}
                  src={BackArrow}
                  alt=""
                />
                <h2>Select Delivery Address</h2>
              </Box>
              <Box className="select_delivery_slot"></Box>
              <Box className="delivery_slots_container">
                <AllAddresses
                  onAddressSelect={(address) =>
                    this.setState({
                      selectedAddress: address,
                      showAddressPopup: true,
                    })
                  }
                />
              </Box>
            </Box>
          )}
        </Box>

        <Drawer
          open={this.state.TabSelectAddressPopupOpen}
          anchor="bottom"
          onClose={() => {
            this.setState({ TabSelectAddressPopupOpen: false }, () => {
              this.setState({ triggerFetchCart: true }, () => {
                setTimeout(
                  () => this.setState({ triggerFetchCart: false }),
                  500
                );
              });
            });
          }}
        >
          <Box className="tab_popup">
            <Box className="tab_select_delivery_container">
              <h2>Select Delivery Address</h2>
            </Box>
            <AllAddresses
              onAddressSelect={(address) =>
                this.setState({
                  selectedAddress: address,
                  showAddressPopup: true,
                  TabSelectAddressPopupOpen: false,
                })
              }
            />
          </Box>
        </Drawer>
        <Drawer
          open={this.state.TabAddNewAddressOpen}
          anchor="bottom"
          onClose={() => {
            this.setState({
              TabAddNewAddressOpen: false,
            });
          }}
        >
          <Box
            sx={{
              borderRadius: "12px 12px 0 0",
              overflow: "scroll",
              padding: 0,
              background: "#fff",
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
            <AddNewAddress
              handleClose={() => {
                this.setState({
                  AddNewAddressOpen: false,
                });
              }}
            />
          </Box>
        </Modal>
        <Modal
          open={this.state.slotOpen}
          onClose={() => {
            this.setState({
              slotOpen: false,
            });
          }}
        >
          <>
            <DeliverySlots
              onSlotSelect={(selectedSlot) => this.setState({ selectedSlot })}
              handleClose={() =>
                this.setState({
                  slotOpen: false,
                })
              }
            />
          </>
        </Modal>
        {console.log(this.state.selectedSlot, "slotttt id")}
        {isAddNewAddressModalOpen && (
          <AddNewAddressModal
            open={isAddNewAddressModalOpen}
            handleClose={this.handleAddNewAddressClose}
          />
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  const { cartItems, deleteItems, updateItems, addListOfItemRes } =
    state.cartitem;
  const { loginData } = state.login;
  const { saveForLaterData } = state.allproducts;
  const { placeOrderData } = state.placeorder;
  const { allAddress, selectedAddressData, defaultAddressData } =
    state.alladdress;
  return {
    cartItems,
    loginData,
    deleteItems,
    updateItems,
    saveForLaterData,
    placeOrderData,
    addListOfItemRes,
    defaultAddressData,
  };
}

const mapDispatchToProps = {
  placeOrder,
  fetchCartItems,
  deleteItemToCart,
  updateItemToCart,
  fetchDefaultAddress,
  saveForLater,
  addListOfItemsToCartReq,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(Cart));
