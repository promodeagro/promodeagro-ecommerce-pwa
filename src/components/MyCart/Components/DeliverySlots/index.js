import React, { Component } from "react";
import {
  Box,
  FormControlLabel,
  Grid,
  Radio,
  Tab,
  Tabs,
  Typography,
  CircularProgress,
} from "@mui/material";
import closeModalIcon from "../../../../assets/img/closeModalIcon.svg";
import { connect } from "react-redux";
import { fetchDeliverySlots } from "../../../../Redux/Cart/CartThunk";
import { getAllAddress } from "../../../../Redux/Address/AddressThunk";
import { loginDetails } from "../../../../Views/Utills/helperFunctions";

class DeliverySlots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: "today",
      selectedTab: 0,
      selectedSlot: null,
      filteredAddress: null,
      deliveryType: "same day",
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDeliverySlots(this.state.selectedDay));
    const loginData = loginDetails();
    if (loginData && loginData.userId) {
      dispatch(getAllAddress({ userId: loginData.userId })); 
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { slots, allAddressData } = this.props;
    const deliveryType = slots?.[0]?.deliveryType || "same day";

    if (deliveryType !== prevState.deliveryType) {
      this.setState({ deliveryType }, () => {
        const selectedDay = deliveryType === "same day" ? "today" : "tomorrow";
        this.setState({ selectedDay });
      });
    }

    const addressDetail = loginDetails();
    let zipCode = null;

    if (allAddressData.length > 0) {
      if (addressDetail?.address) {
        const filtered = allAddressData.filter(
          (address) => address.addressId === addressDetail.address
        );

        if (filtered.length > 0) {
          zipCode = filtered[0].zipCode;
          if (
            filtered[0] !== prevState.filteredAddress ||
            zipCode !== prevState.zipCode
          ) {
            this.setState({ filteredAddress: filtered[0], zipCode }, () => {
              if (zipCode) {
                const { dispatch } = this.props;
                dispatch(fetchDeliverySlots({ zipCode })); // Call API with zipCode
              }
            });
          }
        }
      } else {
        const defaultAddress = localStorage.getItem("defaultAddress");
        if (defaultAddress) {
          zipCode = JSON.parse(defaultAddress)?.zipCode;

          if (zipCode && zipCode !== prevState.zipCode) {
            this.setState({ zipCode }, () => {
              const { dispatch } = this.props;
              dispatch(fetchDeliverySlots({ zipCode })); // Call API with default zipCode
            });
          }
        }
      }
    }
  }


  handleTabChange = (event, newValue) => {
    this.setState({ selectedTab: newValue });
  };

  handleSlotChange = (event) => {
    const selectedSlot = event.target.value;
      const selectedSlotData = this.getFilteredSlots().find(
      (slot) => `${slot.start} - ${slot.end}` === selectedSlot
    );
  
    if (selectedSlotData) {
      console.log("Selected Slot ID:", selectedSlotData.id);
    }
  
    this.setState({ selectedSlot });
  
    if (this.props.onSlotSelect) {
      this.props.onSlotSelect(selectedSlotData);
      // this.props.onSlotSelect(selectedSlot);
    }
  };
  //getfilterslots

  getFilteredSlots = () => {
    const { slots } = this.props;
    const { selectedTab } = this.state;
    let filteredSlots = [];

    slots.forEach((slotData) => {
      slotData.shifts.forEach((shift) => {
        if (selectedTab === 0) {
          filteredSlots = [...filteredSlots, ...shift.slots]; // All slots
        }
        if (selectedTab === 1 && shift.name === "morning") {
          filteredSlots = [...filteredSlots, ...shift.slots]; // Morning
        }
        if (selectedTab === 2 && shift.name === "afternoon") {
          filteredSlots = [...filteredSlots, ...shift.slots]; // Afternoon
        }
        if (selectedTab === 3 && shift.name === "evening") {
          filteredSlots = [...filteredSlots, ...shift.slots]; // Evening
        }
        if (selectedTab === 4 && shift.name === "night") {
          filteredSlots = [...filteredSlots, ...shift.slots]; // Night
        }
      });
    });

    return filteredSlots;
  };

  render() {
    const { handleClose, status, addressStatus, slots } = this.props;
    const { selectedDay, selectedTab, selectedSlot, filteredAddress } =
      this.state;
    const filteredSlots = this.getFilteredSlots();

    return (
      <Box>
        <Box className="common-modal delevery_slot_modal">
          <div className="delevery_slot_modal_top">
            <h2>Delivery Slot</h2>
            <img src={closeModalIcon} alt="Close Modal" onClick={handleClose} />
          </div>
          <Box className="delevery_slot_modal_days">
            {this.state.deliveryType === "same day" ? (
              <span
                className={selectedDay === "today" ? "active" : ""}
                onClick={() => this.setState({ selectedDay: "today" })}
              >
                Today
              </span>
            ) : (
              <span
                className={selectedDay === "tomorrow" ? "active" : ""}
                onClick={() => this.setState({ selectedDay: "tomorrow" })}
              >
                Tomorrow
              </span>
            )}
          </Box>
          <Box>
            <Tabs
              value={selectedTab}
              onChange={this.handleTabChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="delivery slot tabs"
              variant="fullWidth"
              sx={{ marginBottom: 2 , "& .MuiTabs-indicator": {
                backgroundColor: "#1F9151", // Custom color for the underline
              },}}
            >
              <Tab 
               sx={{
                textTransform: "none",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "21px",
                textAlign: "left",
                textUnderlinePosition: "from-font",
                textDecorationSkipInk: "none",
                color: "#A09797",
                "&.Mui-selected": {
                  color: "#1F9151", // Custom color for the selected state
                },
                "&.MuiTabs-indicator": {
                  backgroundColor: "#1F9151", // Your custom color
                },
              }} 
              label="All Slots" />
              <Tab
               sx={{
                textTransform: "none",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "21px",
                textAlign: "left",
                textUnderlinePosition: "from-font",
                textDecorationSkipInk: "none",
                color: "#A09797",
                "&.Mui-selected": {
                  color: "#1F9151", // Custom color for the selected state
                },
                "&.MuiTabs-indicator": {
                  backgroundColor: "#1F9151", // Your custom color
                },
              }} 
              label="Morning" />
              <Tab 
               sx={{
                textTransform: "none",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "21px",
                textAlign: "left",
                textUnderlinePosition: "from-font",
                textDecorationSkipInk: "none",
                color: "#A09797",
                "&.Mui-selected": {
                  color: "#1F9151", // Custom color for the selected state
                },
                "&.MuiTabs-indicator": {
                  backgroundColor: "#1F9151", // Your custom color
                },
              }} 
              label="Afternoon" />
              <Tab
               sx={{
                textTransform: "none",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "21px",
                textAlign: "left",
                textUnderlinePosition: "from-font",
                textDecorationSkipInk: "none",
                color: "#A09797",
                "&.Mui-selected": {
                  color: "#1F9151", // Custom color for the selected state
                },
                "&.MuiTabs-indicator": {
                  backgroundColor: "#1F9151", // Your custom color
                },
              }} 
              label="Evening" />
              <Tab 
               sx={{
                textTransform: "none",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "21px",
                textAlign: "left",
                textUnderlinePosition: "from-font",
                textDecorationSkipInk: "none",
                color: "#A09797",
                "&.Mui-selected": {
                  color: "#1F9151", // Custom color for the selected state
                },
                "&.MuiTabs-indicator": {
                  backgroundColor: "#1F9151", // Your custom color
                },
              }}  label="Night" />
            </Tabs>
            {status === "IN_PROGRESS" ? (
              <div className="box">
                <CircularProgress color="success" />
              </div>
            ) : filteredSlots.length > 0 ? (
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                }}
              >
                <Grid container spacing={0}>
                  {filteredSlots.map((slot, index) => (
                    <Grid item xs={6} key={index}>
                      <FormControlLabel
                        control={
                          <Radio
                            sx={{ ml: 1 }}
                            checked={
                              selectedSlot === `${slot.start} - ${slot.end}`
                            }
                            onChange={this.handleSlotChange}
                            value={`${slot.start} - ${slot.end}`}
                            color="success"
                          />
                        }
                        label={
                          <Typography variant="body2">{`${slot.start} ${slot.startAmPm} - ${slot.end} ${slot.endAmPm}`}</Typography>
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              <div className="noslot">No Slots Available</div>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  slots: state.cartitem?.deliverySlots?.data?.slots || [], // Access the slots array
  status: state.cartitem?.deliverySlots?.status || "IDLE",
  allAddressData: state.alladdress.allAddress?.data?.addresses || [], // Adjusted for allAddressData
  addressStatus: state.addresses?.status || "IDLE",
  deliveryType:
    state.cartitem?.deliverySlots?.data?.slots?.[0]?.deliveryType || "same day", // Extract deliveryType
  selectedSlot: state.cartitem?.selectedSlot || null, // Add selectedSlot in Redux
});

export default connect(mapStateToProps)(DeliverySlots);
