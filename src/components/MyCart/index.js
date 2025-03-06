import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  Modal,
  Typography,
  Radio,
} from "@mui/material";
import React, { Component } from "react";
import ArrowDown from "../../assets/img/ArrowDown.svg";
import closeModal from "../../assets/img/closeModalIcon.svg";
import BackArrow from "../../assets/img/backArrow.svg";
import cashIcon from "../../assets/img/cashIcon.svg";
import { Link } from "react-router-dom";
import AddNewAddressModal from "../../../src/components/AddressModal/addnewaddressmodal";
import { ErrorMessages, loginDetails } from "Views/Utills/helperFunctions";
import { LocalStorageCartService } from "Services/localStorageCartService";
import status from "../../Redux/Constants";
import {
  fetchCartItems,
  deleteItemToCart,
  updateItemToCart,
  addListOfItemsToCartReq,
} from "../../Redux/Cart/CartThunk";
import LocationIcon from "../../assets/img/LocationImg.svg";
import { placeOrder } from "../../Redux/Order/PlaceOrderThunk";
import { saveForLater } from "../../Redux/AllProducts/AllProductthunk";
import { connect } from "react-redux";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import AllAddresses from "./Components/AllAddresses";
import AddNewAddress from "./Components/AddNewAddress";
import DeliverySlots from "./Components/DeliverySlots";
import CartItems from "./Components/CartItems";
import { fetchDefaultAddress } from "../../Redux/Address/AddressThunk";
class MyCart extends Component {
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
      selectedPaymentMethod: "online",
      paymentLink: null,
      ListData: [],
      itemListArr: [],
      cartListArr: [],
      totalPrice: "",
      defaultSelectedAddress: {},
    };
  }

  componentDidMount() {
    const items = loginDetails();
    if (items?.userId) {
      // Fetch the default address (assuming it updates props synchronously)
      this.props.fetchDefaultAddress(items.userId);

      // Optionally add any items already in the cart
      const cartData = LocalStorageCartService.getData() || {};
      this.props.addListOfItemsToCartReq({
        userId: items.userId,
        cartItems: Object.values(cartData).length
          ? Object.values(cartData)
          : [],
      });
      const addressId = localStorage.getItem("addressId") || ""; // Get addressId from localStorage
      if (addressId) {
        this.props.fetchCartItems({
          userId: items.userId,
          addressId: addressId,
        });
      } else {
        console.warn("defaultAddress not available; addressId is undefined");
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const items = loginDetails();
    const { handleClose } = this.props;
    if (
      prevProps.defaultAddressData?.status !==
        this.props?.defaultAddressData?.status &&
      this.props?.defaultAddressData?.status === status.SUCCESS &&
      this.props?.defaultAddressData?.data
    ) {
      this.setState({
        defaultSelectedAddress: this.props?.defaultAddressData?.data,
      });
      // localStorage.setItem(
      //   "address",
      //   this.props?.defaultAddressData?.data?.addressId
      // );
    }

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

      this.setState({
        cartList: this.props.cartItems.data.items,
        ListData: this.props.cartItems.data.items,
        cartListArr: cartListData,
        itemListArr: itemListData,
        totalPrice: this.props.cartItems.data.finalTotal,
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
    if (
      prevProps.placeOrderData.status !== this.props.placeOrderData.status &&
      this.props.placeOrderData.status === status.SUCCESS
    ) {
      if (this.props.placeOrderData.data?.statuscode === 200) {
        if (this.props.placeOrderData.data?.orderId) {
          this.props.navigate(
            `/mycart/address/order-placed/${this.props.placeOrderData.data.orderId}`
          );
          handleClose();
          localStorage.removeItem("cartItem");
          localStorage.removeItem("address");
          LocalStorageCartService.saveData({});
          this.setState({ selectedSlot: "" });
          this.setState({ selectedPaymentMethod: "online" });
          let login = loginDetails();
          if (login?.userId) {
            this.props.addListOfItemsToCartReq({
              userId: login.userId,
              cartItems: [],
            });
            this.props.fetchCartItems({
              userId: login.userId,
            });
          }
          this.setState({ cartList: [] });
        }
        if (this.props.placeOrderData.data?.paymentLink) {
          this.setState({
            paymentLink: this.props.placeOrderData.data.paymentLink,
          });
          const openPaymentLink = async () => {
            if (this.props.placeOrderData.data?.paymentLink) {
              await new Promise((resolve) => {
                this.setState(
                  {
                    paymentLink: this.props.placeOrderData.data.paymentLink,
                  },
                  resolve
                );
              });
              if (this.state.paymentLink) {
                window.location.href = this.state.paymentLink;
              }
            }
          };
          openPaymentLink();
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

    if (defaultAddressData?.status === status.SUCCESS && defaultAddressData?.data) {
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

  toggleAddNewAddressModal = (e) => {
    if (e?.stopPropagation) {
      e.stopPropagation();
    }
    this.setState((prevState) => ({
      isAddNewAddressModalOpen: !prevState.isAddNewAddressModalOpen,
    }));
  };

  handleAddNewAddressClose = () => {
    this.setState({
      isAddNewAddressModalOpen: false,
    });
  };

  render() {
    const { matches, selectedPaymentMethod } = this.state;
    const { open, handleClose } = this.props;
    const { isAddNewAddressModalOpen, defaultSelectedAddress } = this.state;

    return (
      <>
        <Drawer anchor={"right"} open={open} onClose={handleClose}>
          <Box className="cart_popup">
            {this.state.showAddressPopup ? (
              <Box className="my_cart_container">
                <Box className="my_cart">
                  <h2>My Cart</h2>
                  <img onClick={handleClose} src={closeModal} alt="" />
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
      className={this.state.showAddressError ? "address-error" : ""}
      onClick={() => {
        const hasValidAddress =
          this.state.selectedAddress?.addressId ||
          (this.getDefaultAddress() && this.getDefaultAddress() !== "No Address Selected");

        if (!hasValidAddress) {
          this.setState({ showAddressError: true });
          ErrorMessages.error("Please select an address before selecting a slot.");
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
                          Please select a delivery slot before placing the
                          order.
                        </Typography>
                      )}
                    </Box>
                  </>
                ) : null}

                <Box className="item_details_container">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h2>Item Details</h2>
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
                  <CartItems />

                  {this.state.cartList?.length > 0 ? (
                    <>
                      <div
                        className="bill_details"
                        style={{ marginBottom: "8px" }}
                      >
                        <strong>Bill details</strong>

                        <div>
                          <span>Item total</span>
                          <strong>
                            ₹{this.props.cartItems.data?.subTotal}
                          </strong>
                        </div>
                        <div>
                          <span>Delivery Charges</span>
                          <div>
                            {this.props.cartItems.data?.deliveryCharges <= 0 ? (
                              <>
                                <span className="mrp">₹50</span>
                                <span className="free">Free</span>
                              </>
                            ) : (
                              <strong style={{ marginLeft: "5px" }}>
                                ₹{this.props.cartItems.data?.deliveryCharges}
                              </strong>
                            )}
                          </div>
                        </div>
                        <div>
                          <strong>Grand Total</strong>{" "}
                          <strong>₹{this.state.totalPrice}</strong>
                        </div>
                      </div>
                      {this.state.selectedAddress?.zipCode == "500091" ||
                      this.state.selectedAddress?.zipCode == "500030" ||
                      this.state.selectedAddress?.zipCode == "500086" ? (
                        <span
                          style={{
                            color: "#005F41",
                            fontWeight: "600",
                            fontSize: "16px",
                            marginLeft: "5px",
                          }}
                        >
                          "Unlock free shipping on purchases over ₹100"
                        </span>
                      ) : (
                        <span
                          style={{
                            color: "#005F41",
                            fontWeight: "600",
                            fontSize: "16px",
                            marginLeft: "5px",
                          }}
                        >
                          "Unlock free shipping on purchases over ₹300"
                        </span>
                      )}

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
                                variant="contained"
                                fullWidth
                                className="common-btn pay_now_btn"
                                onClick={this.handlePlaceOrder}
                                disabled={
                                  this.props.placeOrderData.status ===
                                  status.IN_PROGRESS
                                }
                                endIcon={
                                  this.props.placeOrderData.status ===
                                  status.IN_PROGRESS ? (
                                    <CircularProgress className="common-loader" />
                                  ) : (
                                    <></>
                                  )
                                }
                              >
                                Place Order
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
                <Box className="delivery_slots_container">
                  <AllAddresses
                    onAddressSelect={(address) =>
                      this.setState({ selectedAddress: address })
                    }
                  />
                </Box>
              </Box>
            )}
          </Box>
        </Drawer>
        <Drawer
          open={this.state.TabSelectAddressPopupOpen}
          anchor="bottom"
          onClose={() => {
            this.setState({
              TabSelectAddressPopupOpen: false,
            });
          }}
        >
          <Box className="tab_popup">
            <Box className="tab_select_delivery_container">
              <h2>Select Delivery Address</h2>
            </Box>
            <AllAddresses
              onAddressSelect={(address) =>
                this.setState({ selectedAddress: address })
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
)(navigateRouter(MyCart));
