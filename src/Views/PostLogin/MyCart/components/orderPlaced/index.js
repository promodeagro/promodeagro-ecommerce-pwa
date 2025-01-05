import React, { useEffect, useState } from "react";
import { Box, Container, Rating, Button } from "@mui/material";
import successImg from "../../../../../assets/img/success.png";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import PlaceOrderTick from "../../../../../assets/img/PlaceOrderTick.png"
import TruckIcon from "../../../../../assets/img/TruckIcon.svg"
import locationIcon from "../../../../../assets/img/LocationImg.svg"
import { fetchOrderById } from "../../../../../Redux/Order/PlaceOrderThunk";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "Views/Utills/helperFunctions";
import status from "../../../../../Redux/Constants";
import { LocalStorageCartService } from "Services/localStorageCartService";

const OrderPlaced = (props) => {
  const [value, setValue] = useState(0);
  const [apiLoader, setApiLoader] = useState(false);

  const placedOrderDetails = useSelector((state) => state.placeorder.orderByIdData);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setApiLoader(true);
    dispatch(
      fetchOrderById(id)
    );
  }, []);
console.log(placedOrderDetails.message , 'order details by id')

  useEffect(() => {
    window.history.pushState(null, null, document.URL);
    window.addEventListener("popstate", function (event) {
      window.location.replace("/");
    });
  }, []);

  if (id) {
    // If 'id' exists in the URL, clear the cart from localStorage
    localStorage.removeItem('cartItem'); // Replace 'cart' with your cart's key
    localStorage.removeItem('address'); // Replace 'cart' with your cart's key
    LocalStorageCartService.saveData({});
    console.log('Cart cleared from localStorage because ID is present in the URL.');
  }

  // Scroll to top when the component loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (

    <>
      {fetchOrderById.status === status.IN_PROGRESS ? (
    Loader.commonLoader() // Show loader while data is being fetched
  ) : (
            
    <Container className="order_placed_container"   data-aos="zoom-in-right"
        data-aos-offset="200"
        data-aos-easing="ease-in-sine" sx={{minHeight:'80vh' ,display:"flex",justifyContent:"center",flexDirection:"column", alignItems:"center"}}>

      <Box className="order_placed_box" sx={{display:"flex" , flexDirection:"column" , alignItems:"center"}}>
        <img src={PlaceOrderTick} alt="" />
<h2>Your Order Placed !</h2>

<Box  className="rating_box rating d-flex align-items-center justify-content-center w-100">
<span className="rating-info">How was everything ?</span>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              size="large"
            />
          </Box>
      </Box>

<Box className="Delivery_details_box w-100">

<Box className="select_delivery_address">
  <span className="span_lite">
    <img src={locationIcon} alt="" />
    Delivery Address</span>
  <div className="line"></div>
  <span> 
    {placedOrderDetails.data?.order?.address?.address_type } {placedOrderDetails.data?.order?.address?.house_number}, {placedOrderDetails.data?.order?.address?.landmark_area}, {placedOrderDetails.data?.order?.address?.address} {placedOrderDetails.data?.order?.address?.zipCode}
  </span>
</Box>

<Box className="select_delivery_address">
<span className="span_lite">
  <img src={TruckIcon} alt="" />
  Shipment Time Slot</span>
<div className="line"></div>
<span>{placedOrderDetails.data?.order?.items?.length} Items</span>
 <div className="line"></div>
<span>05 Nov, Tuesday {placedOrderDetails.data?.order?.deliverySlot?.startTime} - {placedOrderDetails.data?.order?.deliverySlot?.endTime} </span>
<span>Rs {placedOrderDetails.data?.order?.totalPrice}</span>
</Box>


<Box className="payment_details_box">
<Box className="payment_details">
  <div>Payment status <span className="cod">{placedOrderDetails.data?.order?.paymentDetails?.status}</span></div>
  <div>Order amount <span className="amount">Rs. {placedOrderDetails.data?.order?.totalPrice}</span></div>
</Box>
</Box>
</Box>


<Box sx={{marginTop:"20px" , marginBottom:"20px"}}>
    
  <Button  onClick={()=> navigate("/")} className="common-btn">
  Continue Shopping
  </Button>
</Box>


    </Container>


)}
    </>
  );
};

export default OrderPlaced;
