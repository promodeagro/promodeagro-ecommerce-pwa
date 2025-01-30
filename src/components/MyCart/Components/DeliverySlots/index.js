import React, { Component } from "react";
import {
  Box,
  FormControlLabel,
  Grid,
  Radio,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import closeModalIcon from "../../../../assets/img/closeModalIcon.svg";
import { connect } from "react-redux";
import { fetchDeliverySlots } from "../../../../Redux/Cart/CartThunk";
import { getAllAddress } from "../../../../Redux/Address/AddressThunk";
import { loginDetails, Loader } from "../../../../Views/Utills/helperFunctions";

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
              dispatch(fetchDeliverySlots({ zipCode }));
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
    }

    setTimeout(() => {
      this.props.handleClose();
    }, 100);
  };

  getFilteredSlots = () => {
    const { slots } = this.props;
    const { selectedDay, selectedTab } = this.state;

    let filteredSlots = [];
    const slotData = slots?.[0] || {};

    const daySlots =
      selectedDay === "today" ? slotData.sameDaySlots : slotData.nextDaySlots;

    if (!Array.isArray(daySlots)) return filteredSlots;

    daySlots.forEach((shift) => {
      if (selectedTab === 0) {
        filteredSlots = [...filteredSlots, ...shift.slots];
      } else if (
        (selectedTab === 1 && shift.name === "morning") ||
        (selectedTab === 2 && shift.name === "afternoon") ||
        (selectedTab === 3 && shift.name === "evening") ||
        (selectedTab === 4 && shift.name === "night")
      ) {
        filteredSlots = [...filteredSlots, ...shift.slots];
      }
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
            <span
              className={selectedDay === "today" ? "active" : ""}
              onClick={() => this.setState({ selectedDay: "today" })}
            >
              Today
            </span>
            {slots?.[0]?.nextDaySlots?.length > 0 && (
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
              sx={{
                marginBottom: 2,
                "& .MuiTabs-indicator": {
                  backgroundColor: "#1F9151", // Custom color for the underline
                },
                "& .css-heg063-MuiTabs-flexContainer": {
                  overflowY: "scroll !important",
                },
              }}
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
                label="All Slots"
              />
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
                label="Morning"
              />
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
                label="Afternoon"
              />
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
                label="Evening"
              />
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
                label="Night"
              />
            </Tabs>
            {status === "IN_PROGRESS" ? (
              Loader.commonLoader()
            ) : filteredSlots.length > 0 ? (
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  minHeight: "240px",
                }}
              >
                <Grid
                  container
                  sx={{
                    flexDirection: { xs: "column", sm: "row" }, // Stack items on small screens
                    gap: 0, // Ensure no additional space between grid items
                  }}
                >
                  {filteredSlots.map((slot, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      key={index}
                      sx={{
                        padding: 0, // Remove extra padding for the grid items
                        margin: 0, // Ensure no extra margins
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Radio
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
                        sx={{
                          width: "100%", // Ensure full width for each slot
                          margin: 0, // Remove any margin between labels
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              <div className="box">No Slots Available</div>
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
