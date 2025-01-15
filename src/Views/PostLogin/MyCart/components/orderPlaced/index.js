import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Rating,
  Button,
  useMediaQuery,
  Divider,
  Typography,
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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import promodeicon from "../../../../../assets/img/promodagro-icon.png";
const OrderPlaced = (props) => {
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
  const items = orderData?.items || [];
  const [showInvoice, setShowInvoice] = useState(false);
  const toggleInvoice = () => {
    setShowInvoice((prev) => !prev);
  };
  const downloadPDF = () => {
    const invoiceElement = document.getElementById("invoice-content");
    html2canvas(invoiceElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    });
  };
  const isMobile = useMediaQuery("(max-width:600px)"); // Detect mobile screen size
  console.log(orderData, "order data");

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
              <span>{placedOrderDetails.data?.order?.items?.length} Items</span>
              <div className="line"></div>
              <span>
                05 Nov, Tuesday{" "}
                {placedOrderDetails.data?.order?.deliverySlot?.startTime} -{" "}
                {placedOrderDetails.data?.order?.deliverySlot?.endTime}{" "}
              </span>
              <span>Rs {placedOrderDetails.data?.order?.totalPrice}</span>
            </Box>

            <Box className="payment_details_box">
              <Box className="payment_details">
                <div>
                  Payment status{" "}
                  <span className="cod">
                    {placedOrderDetails.data?.order?.paymentDetails?.status}
                  </span>
                </div>
                <div>
                  Order amount{" "}
                  <span className="amount">
                    Rs. {placedOrderDetails.data?.order?.totalPrice}
                  </span>
                </div>
              </Box>
            </Box>
            {!isMobile ? (
              <Button
                variant="contained"
                color="primary"
                onClick={toggleInvoice}
                sx={{ textTransform: "none" }}
              >
                {showInvoice ? "Hide Invoice" : "See Your Invoice"}
              </Button>
            ) : (
              <Button
                // variant="contained"
                color="primary"
                onClick={downloadPDF}
                sx={{ textTransform: "none" }}
              >
                View Invoice
              </Button>
            )}

            <div
              id="invoice-content"
              style={{
                position: showInvoice ? "relative" : "absolute",
                top: showInvoice ? "20px" : "-9999px",
                left: showInvoice ? "20px" : "-9999px",
                backgroundColor: "#fff",
                padding: "20px",
                width: "950px",
              }}
            >
              <div class="logo-container">
                <div class="logo-box">
                  <img src={promodeicon} alt="Logo" class="logo-img"></img>
                  <div class="text-box">
                    <h2 class="main-title">PROMODE AGRO FARMS</h2>
                    <p class="subtitle">Deliver Season's Best</p>
                  </div>
                </div>
              </div>

              <div class="content">
                <div class="divider"></div>
                <div class="grid-container">
                  <div class="invoice-title">Invoice</div>
                  <div class="payment-details-box">
                    <div class="payment-method">
                      {orderData?.paymentDetails?.method || "N/A"}
                    </div>
                  </div>
                </div>
                <div class="details">
                  <div class="left">
                    <div style={{ display: "flex" }}>
                      <strong>Order ID:</strong>
                      <strong style={{ width: "200px" }}>
                        {orderData?.id || "N/A"}
                      </strong>
                    </div>

                    <p>
                      <strong>Customer Name:</strong>
                      {orderData?.customerName || "N/A"}
                    </p>
                    <p>
                      <strong>Phone Number:</strong>
                      {orderData?.customerNumber || "N/A"}
                    </p>
                    <p>
                      <strong>Address:</strong>
                      {`${orderData?.address?.address || "N/A"} ${
                        orderData?.address?.landmark_area || ""
                      }, ${orderData?.address?.zipCode || ""}`}
                    </p>
                    <p>
                      <strong>Date & Time:</strong>
                      {orderData?.createdAt
                        ? new Date(orderData.createdAt).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{ marginTop: "15px" }}
                  />

                  <div class="right">
                    <div style={{ display: "flex" }}>
                      <strong style={{ width: "146px" }}>Biller Name:</strong>
                      <div>Uttam Chavan</div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <strong style={{ width: "315px" }}>
                        Billing Address:
                      </strong>
                      <div>
                        Dargah khaleej khan, Kismatpur, Hyderabad, Telangana
                        500028, 9701610033
                      </div>
                    </div>
                  </div>
                </div>
                <div class="items">
                  <div class="watermark">PROMODE AGRO FARMS</div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Typography variant="body1" gutterBottom>
                      Items: {items.length || 0}
                    </Typography>
                  </div>

                  <table>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        <th>Total Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={index}>
                          <td> {index + 1}</td>
                          <td> {item.productName}</td>
                          <td>
                            {" "}
                            {item.quantity} {item.unit}
                          </td>
                          <td> ₹{item.price}</td>
                          <td> ₹{item.subtotal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div class="summary"></div>{" "}
                <div class="footer-links">
                  <span>Discount</span>
                  <span> ₹{orderData?.totalSavings || "0.00"}</span>
                </div>
                <div class="footer-links">
                  <span>Shipping Charges</span>
                  <span> ₹{orderData?.deliveryCharges || "0.00"}</span>
                </div>
                <div class="footer-links">
                  <span>Grand Total</span>
                  <span> ₹{orderData?.totalPrice || "0.00"}</span>
                </div>
                <div class="divider"></div>
                <div className="footer-links">
                  <span>Received</span>
                  <span>
                    ₹
                    {orderData?.paymentDetails?.method === "online"
                      ? orderData?.totalPrice // Display total price if online
                      : "0.00"}
                  </span>
                </div>
                <div className="footer-links">
                  <span>Balanced</span>
                  <span>
                    ₹
                    {orderData?.paymentDetails?.method === "cash"
                      ? orderData?.totalPrice // Display total price if cash
                      : "0.00"}
                  </span>
                </div>
                <footer>
                  <div class="footer-container">
                    <span class="footer-left">&lt;</span>

                    <div class="footer-content">
                      <div class="dashed-line"></div>

                      <h3 class="text-spacing">Thank You</h3>

                      <div class="dashed-line"></div>
                    </div>

                    <span class="footer-right">&gt;</span>
                  </div>

                  <div class="footer-links">
                    <span>www.promodeagro.com</span>
                    <span>FSSAI NO: 13624010000109</span>
                  </div>

                  <div class="footer-links">
                    <span>support@promodeagro.com</span>
                    <span>GSTIN NO: 36ABCFP1254A1ZS</span>
                  </div>
                </footer>
              </div>
            </div>

            {showInvoice && !isMobile && (
              <Button
                variant="contained"
                color="secondary"
                onClick={downloadPDF}
                sx={{ textTransform: "none", marginTop: "20px" }}
              >
                Download PDF
              </Button>
            )}
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

