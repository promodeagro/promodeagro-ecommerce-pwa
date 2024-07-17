import React, { Component } from "react";
import { Box, Button, Container, Grid } from "@mui/material";

class ReturnRefund extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.state;
    return (
      <Box className="main-container">
        <Container>
          <Box className="condition-contents-container">
            <h1>Return & Refund</h1>
            <strong>1. Return</strong>
            <p>
              Product must be returned to us within <b>7 days</b> from the date
              it has been delivered to the customer. Product must be returned
              with all tags attached in its original condition along with all
              packing material, courier receipt, invoice & other papers.
            </p>
            <strong>2. Refund</strong>
            <p>
              Once the Product is received to the company successfully,{" "}
              <a href="#">Promode Agro Farm</a> will instantly initiate the
              refund to your source account or chosen method of refund. 
            </p>
            <strong>
              3. Refund and Cancellation for Service Provider Company
            </strong>
            <p>
              Due to service providers in nature “<a href="#">NO REFUND</a>”,“
              <a href="#">NO CANCELLATION</a>”  will be entertained once the
              Payment has been made.
            </p>
            <strong>4. Cancellation Policy</strong>
            <p>
              Please note an order can only be canceled within 24 hours of
              placing the order. Once the order is processed after 24 hours, no
              cancellation request will be entertained.However return is
              possible for all orders/products. OR Customers can <b>CANCEL</b>{" "}
              order only before the Order has been shipped/Dispatched. After the
              Product/s have been shipped, The Customer <b>CANNOT</b> Cancel the
              Orders. However return  is possible for all orders/products.
            </p>
            <strong>5. Shipping & Delivery Policies </strong>
            <p>
              <a href="#">Promode Agro Farms</a> ships its products to almost
              all parts of India. Orders placed will be shipped within 24* hrs.
              We ship on all days except Sunday and National Holidays.
            </p>
            <p>
              or all areas serviced by reputed couriers, the delivery time would
              be within 3 to 4 business days of shipping (business days exclude
              Sundays and other holidays). For other areas the products will be
              shipped through --------------- and may take 1-2 weeks depending
              on location. At times there might be unexpected delays in the
              delivery of your order due to unavoidable and undetermined
              logistics challenges beyond our control for which{" "}
              <a href="#">Promode Agro Farms</a> is not liable and would request
              its users to cooperate as <a href="#">Promode Agro Farms</a> continuously tries to
              nought such instances. Also, <a href="#">Promode Agro Farms</a>{" "}
              reserves the right to cancel your order at its sole discretion in
              cases where it takes longer than usual delivery time or the
              shipment is physically untraceable and refund the amount paid for
              cancelled product(s) to your source account
            </p>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default ReturnRefund;
