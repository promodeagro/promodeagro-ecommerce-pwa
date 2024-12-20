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
import React, { useState, useEffect } from "react";
import closeModalIcon from "../../../../assets/img/closeModalIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliverySlots } from "../../../../Redux/Cart/CartThunk";

const DeliverySlots = ({ handleClose }) => {
  const dispatch = useDispatch();

  const { data: slots = [], status = "IDLE" } = useSelector(
    (state) => state.cartitems?.deliverySlots || {}
  );

  const [selectedDay, setSelectedDay] = useState("today"); // State to track selected day
  const [selectedTab, setSelectedTab] = useState(0); // State for the selected tab (All, Morning, Afternoon, Evening)
  const [selectedSlot, setSelectedSlot] = useState(null); // State for selected slot

  // Fetch the slots when the selected day changes
  useEffect(() => {
    dispatch(fetchDeliverySlots(selectedDay));
  }, [selectedDay, dispatch]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue); // Change the tab when clicked
  };

  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value); // Update selected slot
  };

  const getFilteredSlots = () => {
    // Filter the slots based on the selected tab (All, Morning, Afternoon, Evening)
    if (selectedTab === 0) return slots; // All slots
    if (selectedTab === 1) 
      return slots.filter((slot) => slot.start_time >= "06:00" && slot.end_time <= "12:00"); // Morning
    if (selectedTab === 2) 
      return slots.filter((slot) => slot.start_time >= "12:00" && slot.end_time <= "17:00"); // Afternoon
    if (selectedTab === 3) 
      return slots.filter((slot) => slot.start_time >= "17:00"); // Evening
    return [];
  };

  const filteredSlots = getFilteredSlots(); // Get filtered slots based on selected tab

  return (
    <Box className="common-modal delevery_slot_modal">
      <div className="delevery_slot_modal_top">
        <h2>Delivery Slot</h2>
        <img src={closeModalIcon} alt="Close Modal" onClick={handleClose} />
      </div>

      {/* Day Selector (Today / Tomorrow) */}
      <Box className="delevery_slot_modal_days">
        <span
          className={selectedDay === "today" ? "active" : ""}
          onClick={() => setSelectedDay("today")}
        >
          Today
        </span>
        <span
          className={selectedDay === "tomorrow" ? "active" : ""}
          onClick={() => setSelectedDay("tomorrow")}
        >
          Tomorrow
        </span>
      </Box>

      {/* Tabs for filtering slots */}
      <Box>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="delivery slot tabs"
          variant="fullWidth"
        >
          <Tab label="All Slots" />
          <Tab label="Morning" />
          <Tab label="Afternoon" />
          <Tab label="Evening" />
        </Tabs>

        {/* Display the filtered slots */}
        <Box p={2} sx={{ border: "1px solid #e0e0e0", borderRadius: 1, mt: 2 }}>
          {status === "IN_PROGRESS" ? (
            <CircularProgress />
          ) : filteredSlots.length > 0 ? (
            <Grid container spacing={2}>
              {filteredSlots.map((slot, index) => (
                <Grid item xs={6} key={index}>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={selectedSlot === `${slot.start_time} - ${slot.end_time}`}
                        onChange={handleSlotChange}
                        value={`${slot.start_time} - ${slot.end_time}`}
                        color="success"
                      />
                    }
                    label={<Typography variant="body2">{`${slot.start_time} - ${slot.end_time}`}</Typography>}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No slots available</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DeliverySlots;
