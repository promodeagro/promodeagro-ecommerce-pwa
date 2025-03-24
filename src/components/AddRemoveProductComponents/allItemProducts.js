import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Modal,
  Drawer,
} from "@mui/material";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import noImage from "../../assets/img/no-image.png";
import _ from "lodash";
import { loginDetails, ErrorMessages } from "Views/Utills/helperFunctions";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { fetchCategories } from "../../Redux/AllProducts/AllProductthunk";
import { fetchDefaultAddress } from "../../Redux/Address/AddressThunk";
import { fetchPersonalDetails } from "../../Redux/Signin/SigninThunk";
import AuthModal from "components/ModalLogin/LoginModal";
import { LocalStorageCartService } from "Services/localStorageCartService";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import status from "../../Redux/Constants";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { deleteProductWishList } from "../../Redux/AllProducts/AllProductthunk";
import selecticon from "../../assets/img/dropdown3.svg";
import closeicon from "../../assets/img/closeModalIcon.svg";

class ProductItemView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataId: "",
      isUpdateIncrease: false,
      qauntityUnits: [],
      isProductSelecting: false,
      unitIdPrices: [],
      authModalOpen: false,
      modalOpen: false,
      selectedProduct: null,
      drawerOpen: false, // New state for drawer
      selectedVariants: {}, // Stores selected variant per product ID
    };
  }

  componentDidMount() {
    document.addEventListener("touchstart", this.handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", this.handleTouchMove, {
      passive: false,
    });
  }

  componentWillUnmount() {
    document.removeEventListener("touchstart", this.handleTouchStart);
    document.removeEventListener("touchmove", this.handleTouchMove);
  }

  handleTouchStart = (e) => {
    this.startY = e.touches[0].clientY;
    this.isSwipeInsideDrawer = e.target.closest(".drawerbox"); // Check if touch starts inside drawer
  };

  handleTouchMove = (e) => {
    const moveY = e.touches[0].clientY;
    if (this.state.drawerOpen && !this.isSwipeInsideDrawer) {
      e.preventDefault(); // Prevent screen scrolling
      if (moveY - this.startY > 50) {
        this.handleDrawerClose();
      }
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.deleteBookMarkData.status !==
        this.props.deleteBookMarkData.status &&
      this.props.deleteBookMarkData.status === status.SUCCESS
    ) {
      this.handleClose();

      if (this.props.deleteBookMarkData.data.statusCode === 200) {
        this.props.fetchProductWishList({
          userId: loginDetails()?.userId,
        });
      } else {
        ErrorMessages.error(this.props.deleteBookMarkData.data.message);
      }
    }
  }

  handleAddToCart(groupId, qty) {
    const items = loginDetails();
    this.setState({
      dataId: groupId,
    });
    if (items?.userId) {
      LocalStorageCartService.addItem(groupId, {
        productId: groupId,
        quantity: 1,
        quantityUnits: this.state.qauntityUnits[groupId]
          ? parseInt(this.state.qauntityUnits[groupId])
          : qty,
      });
    } else {
      this.setState({
        authModalOpen: true,
      });
    }
  }

  handleQuantityChange(groupId, increment, productQuantity = 0, qty) {
    const items = loginDetails();
    if (increment < 0 && productQuantity != 0) {
      this.setState({ isUpdateIncrease: false });
    } else if (productQuantity != 0) {
      this.setState({ isUpdateIncrease: true });
    }
    this.setState({
      dataId: groupId,
    });

    productQuantity = productQuantity + increment;

    if (productQuantity != 0) {
      LocalStorageCartService.updateItem(groupId, {
        productId: groupId,
        quantity: parseInt(productQuantity),
        quantityUnits: this.state.qauntityUnits[groupId]
          ? parseInt(this.state.qauntityUnits[groupId])
          : qty,
      });
    } else {
      LocalStorageCartService.deleteItem(groupId);
    }
  }

  handleQuantity = (event, item, addedProduct) => {
    const items = loginDetails();
    const { value } = event.target;
    let dupQty = this.state.qauntityUnits;
    dupQty[item?.groupId] = value;
    const parsedValue = parseInt(value, 10);
    this.setState((prevState) => {
      const newPrice = item?.unitPrices?.find((d) => d?.qty === parsedValue);
      const updatedPrices = prevState.unitIdPrices.map((price) =>
        price.groupId === item?.groupId ? { ...price, price: newPrice } : price
      );
      if (!updatedPrices.some((price) => price.groupId === item?.groupId)) {
        updatedPrices.push({ groupId: item?.groupId, price: newPrice });
      }

      return {
        qauntityUnits: dupQty,
        unitIdPrices: updatedPrices,
      };
    });

    if (addedProduct && addedProduct[item?.groupId]?.quantity > 0) {
      this.setState({
        isProductSelecting: true,
        dataId: item?.groupId,
      });
      LocalStorageCartService.deleteItem(item?.groupId);
    }
  };

  // handleTouchStart = (e) => {
  //   this.startY = e.touches[0].clientY;
  // };

  // handleTouchMove = (e) => {
  //   const moveY = e.touches[0].clientY;
  //   if (this.state.drawerOpen && moveY - this.startY > 50) {
  //     this.handleDrawerClose();
  //   }
  // };

  handleDeleteWishList(groupId) {
    this.setState({
      deleteItemId: groupId,
      apiLoader: true,
    });
    this.props.deleteProductWishList(groupId);
  }

  handleClickOpen = (item) => {
    this.setState({
      open: true,
      deleteId: item?.addressId,
      productId: item?.groupId,
    });
  };

  handleClose = () => {
    this.setState({
      addressId: "",
      open: false,
      productId: "",
    });
  };

  handleContextMenu = (event) => {
    event.preventDefault();
  };

  handleModalOpen = (product) => {
    if (window.innerWidth <= 600) {
      // Adjust breakpoint as needed
      this.setState({
        drawerOpen: true,
        selectedProduct: product,
      });
    } else {
      this.setState({
        modalOpen: true,
        selectedProduct: product,
      });
    }
  };

  handleDrawerClose = () => {
    this.setState({
      drawerOpen: false,
      selectedProduct: null,
    });
  };

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
      selectedProduct: null, // Clear the selected product when modal is closed
    });
  };

  handleVariantSelect = (
    productId,
    variantId,
    variantUnit,
    variantQuantity,
    variantMrp,
    variantPrice
  ) => {
    console.log(
      "Selected Variant Updated:",
      productId,
      variantId,
      variantUnit,
      variantQuantity,
      variantMrp,
      variantPrice
    );
    this.setState((prevState) => ({
      selectedVariants: {
        ...prevState.selectedVariants,
        [productId]: {
          id: variantId,
          unit: variantUnit,
          quantity: variantQuantity,
          mrp: variantMrp,
          price: variantPrice,
        }, // Store both ID and name
      },
      modalOpen: false, // Close modal when variant is selected
    }));
  };

  renderProductItems = (productList, showDeleteWishlist) => {
    const addedProducts = LocalStorageCartService.getData();
    const { qauntityUnits, unitIdPrices } = this.state;

    return productList.map((item) => {
      let prices = unitIdPrices.find((d) => d.id === item.groupId);
      const allVariationsOutOfStock = item?.variations?.every(
        (variant) => !variant.availability
      );

      return (
        <Box
          className={`product-box ${
            allVariationsOutOfStock ? "out-of-stock" : ""
          }`}
          key={item?.groupId}
          onContextMenu={this.handleContextMenu}
        >
          {item?.savingsPercentage &&
            item?.savingsPercentage !== "-Infinity" &&
            item?.savingsPercentage !== 0 && (
              <Box className="sale">Sale {item?.savingsPercentage}%</Box>
            )}

          {showDeleteWishlist ? (
            <Box
              className="icon"
              onClick={(event) => {
                event.preventDefault();
                this.handleClickOpen(item);
              }}
            >
              <DeleteOutlineOutlinedIcon />
            </Box>
          ) : null}
          <Box
            className="image"
            onClick={() => {
              const displayedVariantId =
                this.state.selectedVariants[item.groupId]?.id ||
                item.variations?.[0]?.id;

              window.scrollTo({ top: 0, behavior: "smooth" });
              this.props.navigate(
                `/product-details/${item?.category}/${item?.name}/${item?.groupId}?variant=${displayedVariantId}`
              );
            }}
          >
            <img src={item?.image ? item?.image : noImage} alt={item?.name} />
          </Box>
          <Box
            className="name"
            onClick={() => {
              const displayedVariantId =
                this.state.selectedVariants[item.groupId]?.id ||
                item.variations?.[0]?.id;

              window.scrollTo({ top: 0, behavior: "smooth" });
              this.props.navigate(
                `/product-details/${item?.category}/${item?.name}/${item?.groupId}?variant=${displayedVariantId}`
              );
            }}
          >
            <Link>{item?.name}</Link>
          </Box>
          <>
            {item?.variations?.length > 0 ? (
              <Box className="select">
                <button
                  className="selettobutton"
                  onClick={() => this.handleModalOpen(item)}
                >
                  {(this.state.selectedVariants[item.groupId]?.quantity ||
                    item.variations?.[0]?.quantity ||
                    0) + " "}
                  {this.state.selectedVariants[item.groupId]?.unit ||
                    item.variations?.[0]?.unit}
                  <img
                    src={selecticon}
                    alt="Select Icon"
                    className="selecticon"
                  />
                </button>
              </Box>
            ) : (
              <Box className="select">{item?.unit}</Box>
            )}
          </>

          <Box className="price-cart">
            <Box className="price">
              <strong>
                <CurrencyRupeeOutlinedIcon />
                {this.state.selectedVariants[item.groupId]?.price ||
                  item.variations?.[0]?.price ||
                  item?.price}
              </strong>
              {(this.state.selectedVariants[item.groupId]?.mrp ||
                item.variations?.[0]?.mrp ||
                item?.mrp) > 0 && (
                <span>
                  <CurrencyRupeeOutlinedIcon />
                  {this.state.selectedVariants[item.groupId]?.mrp ||
                    item.variations?.[0]?.mrp ||
                    item?.mrp}
                </span>
              )}
            </Box>
            {addedProducts &&
            addedProducts[
              this.state.selectedVariants[item.groupId]?.id ||
                item?.variations?.[0]?.id ||
                item?.groupId
            ] ? (
              <Box className="number-input-container">
                {addedProducts[
                  this.state.selectedVariants[item.groupId]?.id ||
                    item?.variations?.[0]?.id ||
                    item?.groupId
                ]?.quantity !== 0 ? (
                  <Box
                    className="symbol"
                    onClick={() => {
                      let unitqty =
                        item?.unitPrices?.length > 0
                          ? item?.unitPrices[0]?.qty
                          : 1;
                      let selectedVariantId =
                        this.state.selectedVariants[item.groupId]?.id ||
                        item?.variations?.[0]?.id ||
                        item?.groupId;

                      this.handleQuantityChange(
                        selectedVariantId,
                        -1,
                        addedProducts[selectedVariantId]?.quantity,
                        unitqty
                      );
                    }}
                  >
                    -
                  </Box>
                ) : null}
                <Box className="Number">
                  {
                    addedProducts[
                      this.state.selectedVariants[item.groupId]?.id ||
                        item?.variations?.[0]?.id ||
                        item?.groupId
                    ]?.quantity
                  }
                </Box>
                <Box
                  className="symbol"
                  onClick={() => {
                    let unitqty =
                      item?.unitPrices?.length > 0
                        ? item?.unitPrices[0]?.qty
                        : 1;
                    let selectedVariantId =
                      this.state.selectedVariants[item.groupId]?.id ||
                      item?.variations?.[0]?.id ||
                      item?.groupId;

                    this.handleQuantityChange(
                      selectedVariantId,
                      1,
                      addedProducts[selectedVariantId]?.quantity,
                      unitqty
                    );
                  }}
                >
                  +
                </Box>
              </Box>
            ) : (
              <Box className="add-cart">
                <Button
                  variant="outlined"
                  onClick={() => {
                    let unitqty =
                      item?.unitPrices?.length > 0
                        ? item?.unitPrices[0]?.qty
                        : 1;
                    let selectedVariantId =
                      this.state.selectedVariants[item.groupId]?.id ||
                      item?.variations?.[0]?.id ||
                      item?.groupId;

                    this.setState({ isUpdateIncrease: true });
                    this.handleAddToCart(selectedVariantId, unitqty);
                  }}
                >
                  {addedProducts[
                    this.state.selectedVariants[item.groupId]?.id ||
                      item?.variations?.[0]?.id ||
                      item?.groupId
                  ]
                    ? `Added (${
                        addedProducts[
                          this.state.selectedVariants[item.groupId]?.id ||
                            item?.variations?.[0]?.id ||
                            item?.groupId
                        ]?.quantity
                      })`
                    : "Add"}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      );
    });
  };

  render() {
    const {
      sliderView = false,
      productList,
      showDeleteWishlist = false,
    } = this.props;
    const settings = {
      dots: false,
      arrows: productList?.length > 5 ? true : false,
      infinite: false,
      speed: 500,
      slidesToShow: 5.05,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2.5,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1.5,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <>
        {sliderView ? (
          <Slider {...settings}>
            {this.renderProductItems(productList, showDeleteWishlist)}
          </Slider>
        ) : (
          <>{this.renderProductItems(productList, showDeleteWishlist)}</>
        )}
        <AuthModal
          open={this.state.authModalOpen}
          handleDefaultAddress={() => {
            this.props.fetchCategories();
            this.props.fetchDefaultAddress(loginDetails()?.userId);
            this.props.fetchPersonalDetails({
              userId: loginDetails()?.userId,
            });
            this.props.navigate(0);
          }}
          handleClose={() => {
            this.setState({
              authModalOpen: false,
            });
          }}
        />
        <Modal open={this.state.modalOpen} onClose={this.handleModalClose}>
          <Box
            className="common-modal"
            sx={{
              width: "36vw",
              padding: 2,
              borderRadius: "10px",
              height: "auto",
            }}
          >
            {this.state.selectedProduct ? (
              <Box>
                <Box
                  sx={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {this.state.selectedProduct.name}
                  <img
                    src={closeicon}
                    alt="Close Icon"
                    className="closeiconofmodal"
                    onClick={this.handleModalClose}
                  />
                </Box>
                <Box
                  sx={{
                    maxHeight: "18vw", // Set a max height for scrolling
                    overflowY: "auto", // Enable vertical scrolling
                    scrollbarWidth: "none", // Hide scrollbar for Firefox
                    msOverflowStyle: "none", // Hide scrollbar for IE/Edge
                  }}
                >
                  {this.state.selectedProduct.variations.map((variant) => {
                    const variantId = variant.id;
                    const addedProduct =
                      LocalStorageCartService.getData()?.[variantId] || null;
                    return (
                      <Box
                        key={variantId}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "10px",
                          padding: "8px",
                          border: "1px solid #ddd",
                          borderRadius: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "14px",
                            gap: "8px",
                          }}
                        >
                          <img
                            onClick={() => {
                              const displayedVariantId = variant.id; // Use the clicked variant's ID
                              window.scrollTo({ top: 0, behavior: "smooth" });
                              this.props.navigate(
                                `/product-details/${this.state.selectedProduct?.category}/${this.state.selectedProduct?.name}/${this.state.selectedProduct?.groupId}?variant=${displayedVariantId}`
                              );
                            }}
                            src={variant.image || noImage}
                            alt={variant.name}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                              borderRadius: "5px",
                              cursor: "pointer",
                              cursor: variant.availability
                                ? "pointer"
                                : "not-allowed", // Show danger cursor
                              opacity: variant.availability ? "1" : "0.5", // Reduce opacity for out-of-stock variants
                            }}
                          />
                          <div
                            style={{
                              display: "flex",
                              height: "42px",
                              alignItems: "center", // Vertically center children
                              cursor: variant.availability
                                ? "pointer"
                                : "not-allowed", // Show danger cursor
                              opacity: variant.availability ? "1" : "0.5", // Reduce opacity for out-of-stock variants
                            }}
                            onClick={() => {
                              if (!variant.availability) return; // Prevent selection
                              this.handleVariantSelect(
                                this.state.selectedProduct.groupId,
                                variant.id,
                                variant.unit,
                                variant.quantity,
                                variant.mrp,
                                variant.price
                              );
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                gap: "3px",
                                width: "150px",
                              }}
                            >
                              <span className="namestyle">
                                {variant.quantity}
                              </span>
                              <span className="namestyle">{variant.unit}</span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                width: "150px",
                                gap: "3px",
                              }}
                            >
                              <span className="pricebold">
                                ₹{variant.price}
                              </span>
                              {variant.mrp > 0 && (
                                <span className="mrpstyle">₹{variant.mrp}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        {addedProduct ? (
                          <Box className="number-input-containermodal">
                            {addedProduct.quantity !== 0 ? (
                              <Box
                                className="symbolbutton"
                                onClick={() => {
                                  let unitqty =
                                    variant?.unitPrices?.length > 0
                                      ? variant?.unitPrices[0]?.qty
                                      : 1;
                                  this.handleQuantityChange(
                                    variantId,
                                    -1,
                                    addedProduct.quantity,
                                    unitqty
                                  );
                                }}
                              >
                                -
                              </Box>
                            ) : null}
                            <Box className="Numberbutton">
                              {addedProduct.quantity}
                            </Box>
                            <Box
                              className="symbolbutton"
                              onClick={() => {
                                let unitqty =
                                  variant?.unitPrices?.length > 0
                                    ? variant?.unitPrices[0]?.qty
                                    : 1;
                                this.handleQuantityChange(
                                  variantId,
                                  1,
                                  addedProduct.quantity,
                                  unitqty
                                );
                              }}
                            >
                              +
                            </Box>
                          </Box>
                        ) : (
                          <Box className="add-cart">
                            <button
                              className={`buttonvaradd ${
                                !variant?.availability
                                  ? "out-of-stock-button"
                                  : ""
                              }`}
                              variant="outlined"
                              disabled={!variant?.availability} // Disable button for out of stock items
                              onClick={() => {
                                if (!variant?.availability) return;
                                let unitqty =
                                  variant?.unitPrices?.length > 0
                                    ? variant?.unitPrices[0]?.qty
                                    : 1;
                                this.setState(
                                  { isUpdateIncrease: true },
                                  () => {
                                    this.handleAddToCart(variantId, unitqty);
                                  }
                                );
                              }}
                            >
                              {variant?.availability ? "Add" : "Out of Stock"}
                            </button>
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            ) : (
              <p>No product selected</p>
            )}
          </Box>
        </Modal>
        <Drawer
          anchor="bottom"
          open={this.state.drawerOpen}
          onClose={this.handleDrawerClose}
          onTouchStart={(e) => (this.startY = e.touches[0].clientY)}
          onTouchMove={(e) => {
            const moveY = e.touches[0].clientY;
            if (moveY - this.startY > 50) {
              this.handleDrawerClose();
            }
          }}
        >
          <Box className="drawerbox">
            {this.state.selectedProduct ? (
              <Box>
                <Box
                  sx={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    marginBottom: "15px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {this.state.selectedProduct.name}
                </Box>
                <Box
                  sx={{
                    maxHeight: "70vw", // Set a max height for scrolling
                    overflowY: "auto", // Enable vertical scrolling
                    scrollbarWidth: "none", // Hide scrollbar for Firefox
                    msOverflowStyle: "none", // Hide scrollbar for IE/Edge
                  }}
                >
                  {this.state.selectedProduct.variations.map((variant) => {
                    const variantId = variant.id;
                    const addedProduct =
                      LocalStorageCartService.getData()?.[variantId] || null;
                    return (
                      <Box
                        key={variantId}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "10px",
                          padding: "8px",
                          border: "1px solid #ddd",
                          borderRadius: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "14px",
                            gap: "10px",
                          }}
                        >
                          <img
                            onClick={() => {
                              const displayedVariantId = variant.id; // Use the clicked variant's ID
                              window.scrollTo({ top: 0, behavior: "smooth" });
                              this.props.navigate(
                                `/product-details/${this.state.selectedProduct?.category}/${this.state.selectedProduct?.name}/${this.state.selectedProduct?.groupId}?variant=${displayedVariantId}`
                              );
                            }}
                            src={variant.image || noImage}
                            alt={variant.name}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                              borderRadius: "5px",
                              cursor: variant.availability
                                ? "pointer"
                                : "not-allowed", // Show danger cursor
                              opacity: variant.availability ? "1" : "0.5", // Reduce opacity for out-of-stock variants
                            }}
                          />
                          <div
                            style={{
                              display: "flex",
                              height: "42px",
                              alignItems: "center", // Vertically center children
                              cursor: variant.availability
                                ? "pointer"
                                : "not-allowed", // Show danger cursor
                              opacity: variant.availability ? "1" : "0.5", // Reduce opacity for out-of-stock variants
                            }}
                            onClick={() => {
                              if (!variant.availability) return; // Prevent selection
                              this.handleVariantSelect(
                                this.state.selectedProduct.groupId,
                                variant.id,
                                variant.unit,
                                variant.quantity,
                                variant.mrp,
                                variant.price
                              );
                              this.setState({ drawerOpen: false }); // Close the drawer
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                gap: "3px",
                                width: "100px",
                              }}
                            >
                              <span className="namestyle">
                                {variant.quantity}
                              </span>
                              <span className="namestyle">{variant.unit}</span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                width: "100px",
                                gap: "3px",
                              }}
                            >
                              {variant.mrp > 0 && (
                                <span className="mrpstyle">₹{variant.mrp}</span>
                              )}
                              <span className="pricebold">
                                ₹{variant.price}
                              </span>
                            </div>
                          </div>
                        </div>
                        {addedProduct ? (
                          <Box className="number-input-containermodal">
                            {addedProduct.quantity !== 0 ? (
                              <Box
                                className="symbolbutton"
                                onClick={() => {
                                  let unitqty =
                                    variant?.unitPrices?.length > 0
                                      ? variant?.unitPrices[0]?.qty
                                      : 1;
                                  this.handleQuantityChange(
                                    variantId,
                                    -1,
                                    addedProduct.quantity,
                                    unitqty
                                  );
                                }}
                              >
                                -
                              </Box>
                            ) : null}
                            <Box className="Numberbutton">
                              {addedProduct.quantity}
                            </Box>
                            <Box
                              className="symbolbutton"
                              onClick={() => {
                                let unitqty =
                                  variant?.unitPrices?.length > 0
                                    ? variant?.unitPrices[0]?.qty
                                    : 1;
                                this.handleQuantityChange(
                                  variantId,
                                  1,
                                  addedProduct.quantity,
                                  unitqty
                                );
                              }}
                            >
                              +
                            </Box>
                          </Box>
                        ) : (
                          <Box className="add-cart">
                            <button
                              className={`buttonvaradd ${
                                !variant?.availability
                                  ? "out-of-stock-button"
                                  : ""
                              }`}
                              variant="outlined"
                              disabled={!variant?.availability} // Disable button for out of stock items
                              onClick={() => {
                                if (!variant?.availability) return;
                                let unitqty =
                                  variant?.unitPrices?.length > 0
                                    ? variant?.unitPrices[0]?.qty
                                    : 1;
                                this.setState(
                                  { isUpdateIncrease: true },
                                  () => {
                                    this.handleAddToCart(variantId, unitqty);
                                  }
                                );
                              }}
                            >
                              {variant?.availability ? "Add" : "Out of Stock"}
                            </button>
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            ) : (
              <p>No product selected</p>
            )}
          </Box>
        </Drawer>
        {showDeleteWishlist ? (
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this item from wishlist?
              </DialogContentText>
            </DialogContent>
            <DialogActions
              style={{ justifyContent: "center", paddingBottom: "24px" }}
            >
              <Button
                variant="outlined"
                className="outline-common-btn"
                onClick={this.handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                className="outline-common-btn"
                color="error"
                onClick={(event) => {
                  event.stopPropagation();
                  this.handleDeleteWishList(this.state.productId);
                }}
                disabled={
                  this.props.deleteBookMarkData.status == status.IN_PROGRESS
                }
                endIcon={
                  this.props.deleteBookMarkData.status ===
                  status.IN_PROGRESS ? (
                    <CircularProgress className="common-loader delete" />
                  ) : (
                    <></>
                  )
                }
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        ) : null}
      </>
    );
  }
}

function mapStateToProps(state) {
  const { deleteBookMarkData } = state.allproducts;
  return { deleteBookMarkData };
}

const mapDispatchToProps = {
  fetchCategories,
  fetchDefaultAddress,
  fetchPersonalDetails,
  deleteProductWishList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(ProductItemView));
