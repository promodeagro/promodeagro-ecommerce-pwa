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

const OrderPlaced = (props) => {
  const [value, setValue] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, null, document.URL);
    window.addEventListener("popstate", function (event) {
      window.location.replace("/");
    });
  }, []);

  return (

    <>
    
    {/* <Container>
      <Box
        className="order-placed-container"
        data-aos="zoom-in-right"
        data-aos-offset="200"
        data-aos-easing="ease-in-sine"
      >
        <Box className="order-placed-message">
          <Box className="d-block w-100">
            <img src={successImg} alt="" />
          </Box>
          <Box className="rating d-flex align-items-center justify-content-center w-100">
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              size="large"
            />
            <span className="d-block rating-info">How was everything ?</span>
          </Box>
          <h1 className="d-block title">Order Placed</h1>
          <p className="thank-you-message d-block">
            Thank’s for your order at Elma e-commerce. Your order will be
            processed as soon as possible. Make sure you make note of your order
            number, which is <strong>{id ?? id}</strong>. You will be receiving
            an email shortly with invoice from your order.
          </p>
          <Box className="d-flex align-items-center order-btn w-100 justify-content-center">
            <Link to={"/"}>
              <Button
                variant="outlined"
                fullWidth
                className="outline-common-btn back-shopping-btn"
                startIcon={<ArrowBackIosIcon fontSize="small" />}
              >
                Back to shopping
              </Button>
            </Link>
            <Link to={"/my-order"}>
              <Button
                variant="contained"
                fullWidth
                className="common-btn trach-order-btn"
                startIcon={<LocalShippingIcon />}
              >
                Track your order
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container> */}
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
  <span>Home 20-5-296 Qazipura, Shah Ali banda, Hyderabad 500065</span>
</Box>

<Box className="select_delivery_address">
<span className="span_lite">
  <img src={TruckIcon} alt="" />
  Shipment Time Slot</span>
<div className="line"></div>
<span>3 Item</span>
<div className="line"></div>
<span>05 Nov, Tuesday 06:00 AM - 07:00 AM </span>
<span>Rs 463</span>
</Box>


<Box className="payment_details_box">
<Box className="payment_details">
  <div>Payment status <span className="cod">Cash on Delivery</span></div>
  <div>Order amount <span className="amount">Rs. 463</span></div>
</Box>
</Box>
</Box>


<Box sx={{marginTop:"20px" , marginBottom:"20px"}}>
  <Button  onClick={()=> navigate("/")} className="common-btn">
  Continue Shopping
  </Button>
</Box>


    </Container>
    </>
  );
};

export default OrderPlaced;
