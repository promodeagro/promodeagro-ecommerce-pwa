import { Box, FormControlLabel, Grid, Radio, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import closeModalIcon from "../../../../assets/img/closeModalIcon.svg"

const DeliverySlots = ({ handleClose }) => {
  const [selectedTab, setSelectedTab] = useState(0);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const timeSlots = [
        "6:00 AM - 7:00 AM",
      ];

      const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
      };
    
      const handleSlotChange = (event) => {
        setSelectedSlot(event.target.value);
      };
    
  return (
    <Box className="common-modal delevery_slot_modal">
    <div className='delevery_slot_modal_top'>
      <h2>Delivery Slot</h2>
      <img src={closeModalIcon} alt="Close Modal" onClick={handleClose} />
      </div>
  
    <Box className="delevery_slot_modal_days">
      <span>Today</span>
      <span>Tomorrow</span>
      <span>Calendar</span>
    </Box>
  
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
  
        <Box p={2} sx={{ border: '1px solid #e0e0e0', borderRadius: 1, mt: 2 }}>
          <Grid container spacing={2}>
            {timeSlots.map((slot, index) => (
              <Grid item xs={6} key={index}>
                <FormControlLabel
                  control={
                    <Radio
                      checked={selectedSlot === slot}
                      onChange={handleSlotChange}
                      value={slot}
                      color="success"
                    />
                  }
                  label={<Typography variant="body2">{slot}</Typography>}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
  </Box>
  )
}

export default DeliverySlots