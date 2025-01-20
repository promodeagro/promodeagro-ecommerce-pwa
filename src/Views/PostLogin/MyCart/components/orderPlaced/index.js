import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Rating,
  Button,
} from "@mui/material";
import successImg from "../../../../../assets/img/success.png";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import PlaceOrderTick from "../../../../../assets/img/PlaceOrderTick.png";
import TruckIcon from "../../../../../assets/img/TruckIcon.svg";
import locationIcon from "../../../../../assets/img/LocationImg.svg";
import { fetchOrderById } from "../../../../../Redux/Order/PlaceOrderThunk";
import { useDispatch, useSelector } from "react-redux";
import { Loader, loginDetails } from "Views/Utills/helperFunctions";
import status from "../../../../../Redux/Constants";
import { LocalStorageCartService } from "Services/localStorageCartService";
import { addListOfItemsToCartReq } from "../../../../../Redux/Cart/CartThunk";

import Invoice from "Views/PostLogin/myProfile/notification/invoice";
const OrderPlaced = (props) => {
  const HideDirectlySeeInvoice=true
  const [value, setValue] = useState(0);
  const [apiLoader, setApiLoader] = useState(false);

  const placedOrderDetails = useSelector(
    (state) => state.placeorder.orderByIdData
  );

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setApiLoader(true);
    dispatch(fetchOrderById(id));
  }, []);

  if (id) {
    localStorage.removeItem("cartItem");
    localStorage.removeItem("address");
    LocalStorageCartService.saveData({});
  }

  useEffect(() => {
    let login = loginDetails();
    dispatch(addListOfItemsToCartReq({ userId: login.userId, cartItems: [] }));
  }, []);

  console.log(placedOrderDetails.message, "order details by id");

  useEffect(() => {
    window.history.pushState(null, null, document.URL);
    window.addEventListener("popstate", function (event) {
      window.location.replace("/");
    });
  }, []);

  // Scroll to top when the component loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const orderData = useSelector(
    (state) => state.placeorder.orderByIdData?.data?.order
  );
  


  return (
    <>
      {fetchOrderById.status === status.IN_PROGRESS ? (
        Loader.commonLoader() // Show loader while data is being fetched
      ) : (
        <Container
          className="order_placed_container"
          data-aos="zoom-in-right"
          data-aos-offset="200"
          data-aos-easing="ease-in-sine"
          sx={{
            minHeight: "80vh",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            className="order_placed_box"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={PlaceOrderTick} alt="" />
            <h2>Your Order Placed !</h2>

            <Box className="rating_box rating d-flex align-items-center justify-content-center w-100">
              <span className="rating-info">Rate Your Experience!</span>
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
                Delivery Address
              </span>
              <div className="line"></div>
              <span>
                {placedOrderDetails.data?.order?.address?.address_type}{" "}
                {placedOrderDetails.data?.order?.address?.house_number},{" "}
                {placedOrderDetails.data?.order?.address?.landmark_area},{" "}
                {placedOrderDetails.data?.order?.address?.address}{" "}
                {placedOrderDetails.data?.order?.address?.zipCode}
              </span>
            </Box>

            <Box className="select_delivery_address">
              <span className="span_lite">
                <img src={TruckIcon} alt="" />
                Shipment Time Slot
              </span>
              <div className="line"></div>
              <span>
                05 Nov, Tuesday{" "}
                {placedOrderDetails.data?.order?.deliverySlot?.startTime} -{" "}
                {placedOrderDetails.data?.order?.deliverySlot?.endTime}{" "}
                ({placedOrderDetails.data?.order?.items?.length} Items)
              </span>
         
             
            </Box>

            <Box className="payment_details_box">
              <Box className="payment_details">
                <div>
                  Payment method{" "}
                  <span className="cod">
                    {placedOrderDetails.data?.order?.paymentDetails?.method}
                  </span>
                </div>
                <div>
                  Payment status{" "}
                  <span className="cod">
                    {placedOrderDetails.data?.order?.paymentDetails?.status}
                  </span>
                </div>
                <div>
                  Order amount{" "}
                  <span className="amount">
                    Rs. {placedOrderDetails.data?.order?.finalTotal}
                  </span>
                </div>
               
              </Box>
            </Box>
          <Invoice flag={HideDirectlySeeInvoice} orderData={orderData}/>
          </Box>

          <Box sx={{ marginTop: "20px", marginBottom: "20px" }}>
            <Button onClick={() => navigate("/")} className="common-btn">
              Continue Shopping
            </Button>
          </Box>
        </Container>
      )}
    </>
  );
};

export default OrderPlaced;

