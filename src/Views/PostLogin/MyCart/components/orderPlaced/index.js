import React, { useEffect, useState } from "react";
import { Box, Container, Rating, Button,  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider } from "@mui/material";
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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import promodeicon from "../../../../../assets/img/promodagro-icon.png";
const OrderPlaced = (props) => {
  const [value, setValue] = useState(0);
  const [apiLoader, setApiLoader] = useState(false);

  const placedOrderDetails = useSelector((state) => state.placeorder.orderByIdData);
  const orderData = useSelector(
        (state) => state.placeorder.orderByIdData?.data?.order
      );

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = JSON.parse(sessionStorage.getItem("login"));
  const contact = userData?.contact;
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
    console.log(contact,"for sharing pdf");
  };
  const items = orderData?.items || [];
    useEffect(() => {
   
    
      // Generate a user-specific storage key for downloaded orders
      const storageKey = `downloadedOrders_${contact}`;
      const downloadedOrders = JSON.parse(sessionStorage.getItem(storageKey) || "[]");
    
      if (!downloadedOrders.includes(id)) {
        const timer = setTimeout(() => {
          downloadPDF();
          downloadedOrders.push(id); // Add the current order ID to the list
          sessionStorage.setItem(storageKey, JSON.stringify(downloadedOrders)); // Save the updated list
        }, 5000);
    
        // Clear the timeout when the component unmounts
        return () => clearTimeout(timer);
      }
    }, []);

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
<>
<Container
        id="invoice-content"
        maxWidth="md"
        sx={{
          padding: "20px",
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          position: "relative",
        }}
      >
        {/* Invoice Content */}
        <Box sx={{ position: "relative" }}>
          {/* Watermark */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              opacity: 0.1,
            }}
          >
            <Typography
              align="center"
              sx={{
                fontSize: "54.2px",
                fontStyle: "italic",
                fontWeight: "600",
                color: "rgba(0, 95, 65, 0.6)",
                
              }}
            >
              PROMODE AGRO FARMS
            </Typography>
          </Box>

          {/* Content */}
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Box
              sx={{
            

                display: "flex",
                justifyContent: "center",
                alignItems: "center", // Centers items vertically
                gap: "12px", // Space between the logo and the text
              }}
            >
              <Box
                component="img"
                src={promodeicon} // Replace with your logo path
                alt="Logo"
                sx={{
                  width: "40px", // Adjust size as needed
                  height: "40px", // Keep aspect ratio
                }}
              />
              <div>
                <Typography
                  variant="h6"
                  align="center" // Centers text within its own box
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    margin: 0, // Remove margin to help with alignment
                    lineHeight: 1.5, // Adjust line height for tighter spacing
                  }}
                >
                  PROMODE AGRO FARMS
                </Typography>
                <Typography
                  variant="subtitle1"
                  align="center"
                  sx={{
                    margin: 0, // Remove margin for subtitle
                    lineHeight: 1, // Adjust line height for tighter spacing
                  }}
                >
                  Deliver Season's Best
                </Typography>
              </div>
            </Box>

            <div
              style={{
                flex: 1,
                margin: "8px",
                borderBottom: "1.5px dashed black",
              }}
            ></div>

            {/* Customer and Order Details */}

            {/* Main Grid Container */}
            <Grid
              container
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Typography variant="body1" sx={{ marginBottom: 0 }}>
                Invoice
              </Typography>
              <Box
                sx={{
                  paddingTop: 1,
                  paddingBottom: 1,
                  paddingRight: 2,
                  paddingLeft: 2,
                  border: "1px solid #ccc", // Sets a border around the box
                  borderRadius: 1, // Rounds the corners of the box
                  backgroundColor: "#f9f9f9", // Light background color for the box
                  display: "inline-block", // Ensures the box takes up only as much width as needed
                  marginBottom: 1, // Adds spacing below the box
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ marginBottom: 0, fontWeight: "500" }}
                >
                  {orderData?.paymentDetails?.method || "N/A"}
                </Typography>
              </Box>
            </Grid>

            <Grid container spacing={2} alignItems="flex-start">
              {/* Left Section: Customer and Order Details */}
              <Grid item xs={6}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Typography variant="body1" sx={{ marginBottom: 0 }}>
                      <strong>Order ID:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1" sx={{ marginBottom: 0 }}>
                      <strong>{orderData?.id || "N/A"}</strong>
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="body1" sx={{ marginBottom: 0 }}>
                      Customer Name:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1" sx={{ marginBottom: 0 }}>
                      {orderData?.customerName || "N/A"}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="body1" sx={{ marginBottom: 0 }}>
                      Phone Number:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1" sx={{ marginBottom: 0 }}>
                      {orderData?.customerNumber || "N/A"}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="body1" sx={{ marginBottom: 0 }}>
                      Address:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1" sx={{ marginBottom: 0 }}>
                      {`${orderData?.address?.address || "N/A"} ${
                        orderData?.address?.landmark_area || ""
                      }, ${orderData?.address?.zipCode || ""}`}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="body1" sx={{ marginBottom: 0 }}>
                      Date & Time:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1" sx={{ marginBottom: 0 }}>
                      {orderData?.createdAt
                        ? new Date(orderData.createdAt).toLocaleString()
                        : "N/A"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              {/* Vertical Divider */}
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ marginTop: "15px" }}
              />

              {/* Right Section: Items and Billing Details */}
              <Grid item xs={5}>
                <Grid container spacing={1}>
                  <Grid item xs={5}>
                    <Typography variant="body1" sx={{ marginBottom: 0 }}>
                      Biller Name:
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body1" sx={{ marginBottom: 0 }}>
                      Uttam Chavan
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="body1">Billing Address:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body1" sx={{ marginBottom: 0 }}>
                      Dargah khaleej khan, Kismatpur, Hyderabad, Telangana
                      500028,9701610033
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Items Table */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Typography variant="body1" gutterBottom>
                Items: {items.length || 0}
              </Typography>
            </div>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell>S.No</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Rate</TableCell>
                    <TableCell>Total Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? "#ffffff" : "#f5f5f5",
                        borderRadius: "4px",
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>
                        {item.quantity} {item.unit}
                      </TableCell>
                      <TableCell>₹{item.price}</TableCell>
                      <TableCell>₹{item.subtotal}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* Summary */}
            <Grid
              container
              spacing={2}
              alignItems="flex-start"
              sx={{
                marginTop: 1,
              }}
              justifyContent="space-between"
            >
              <Grid item xs={8}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      Invoice Amount in Words:{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1" sx={{ marginBottom: 0 }}>
                      {orderData?.totalPrice
                        ? `${orderData.totalPrice} Rupees`
                        : "N/A"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              {/* Right Section: Items and Billing Details */}
              <Grid item xs={4}>
                <Grid container spacing={1}>
                  {/* Discount */}
                  <Grid item xs={8}>
                    <Typography variant="body1">Discount:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body1">
                      ₹{orderData?.totalSavings || "0.00"}
                    </Typography>
                  </Grid>

                  {/* Shipping Charge */}
                  <Grid item xs={8}>
                    <Typography variant="body1">Shipping Charge:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body1">
                      ₹{orderData?.deliveryCharges || "0.00"}
                    </Typography>
                  </Grid>

                  {/* Grand Total */}
                  <Grid item xs={8}>
                    <Typography variant="body1">Grand Total:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body1">
                      ₹{orderData?.totalPrice || "0.00"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <div
              style={{
                flex: 1,
                margin: "8px",
                borderBottom: "1.5px dashed black",
              }}
            ></div>

            {/* Received */}
            <Grid
              container
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Typography variant="body1">Received:</Typography>

              <Typography variant="body1">
                ₹{orderData?.totalPrice || "0.00"}
              </Typography>
            </Grid>

            {/* Balanced */}
            <Grid
              container
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Typography variant="body1">Balanced:</Typography>

              <Typography variant="body1">₹0.00</Typography>
            </Grid>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Left side */}
              <Typography variant="body1" sx={{ display: "inline-block" }}>
                &lt;
              </Typography>

              {/* Dashed Divider and Centered Text */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                {/* Dashed Line */}
                <div
                  style={{
                    flex: 1,
                    borderBottom: "1.5px dashed black",
                    marginRight: "8px", // Space between line and text
                  }}
                ></div>

                {/* Centered "Thank You" Text */}
                <Typography
                  variant="h6"
                  align="center"
                  style={{ margin: "0 8px" }}
                >
                  Thank You
                </Typography>

                {/* Dashed Line on the right side */}
                <div
                  style={{
                    flex: 1,
                    borderBottom: "1.5px dashed black",
                    marginLeft: "8px", // Space between line and text
                  }}
                ></div>
              </div>

              {/* Right side */}
              <Typography variant="body1" sx={{ display: "inline-block" }}>
                &gt;
              </Typography>
            </div>
            <Grid
              container
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Typography variant="body2" align="center">
                www.promodeagro.com
              </Typography>

              <Typography variant="body1">FSSAI NO : 13624010000109</Typography>
            </Grid>
            <Grid
              container
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Typography variant="body2" align="center">
                support@promodeagro.com{" "}
              </Typography>

              <Typography variant="body1">
                GSTIN NO : 36ABCFP1254A1ZS{" "}
              </Typography>
            </Grid>
          </Box>
        </Box>
      </Container>
      {/* Download Button */}
      <Box sx={{ marginTop: 3, textAlign: "center" }}>
        <Button variant="contained" color="primary" onClick={() => downloadPDF("invoice-content", "invoice.pdf")}>
          Download PDF
        </Button>
      </Box>
    </>
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
