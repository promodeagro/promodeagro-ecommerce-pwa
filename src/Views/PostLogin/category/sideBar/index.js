import React, { Component } from "react";
import { Box, Switch, TextField, Checkbox, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 40,
  height: 20,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(18px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#D5D5D5' : '#1F9151',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 14,
    height: 14,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 20 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Box className="sidebar">
        <Box className="hide-filter"><p>Hide Filter</p> <AntSwitch /></Box>
        <Box className="filters-boxs">
          <h2>Filters</h2>
          <Box className="filter">
            <h3>Price</h3>
            <Box className="min-max-price">
              <TextField defaultValue="Min" />
              <TextField defaultValue="Max" />
            </Box>
          </Box>
          <Box className="filter">
            <h3>Rating</h3>
            <ul className="checkbox">
              <li><Checkbox /> <Box className="star"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></Box> 5.0</li>
              <li><Checkbox checked /> <Box className="star"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon className="gray" /></Box> 4.0 & up</li>
              <li><Checkbox /> <Box className="star"><StarIcon /><StarIcon /><StarIcon /><StarIcon className="gray" /><StarIcon className="gray" /></Box> 3.0 & up</li>
              <li><Checkbox /> <Box className="star"><StarIcon /><StarIcon /><StarIcon className="gray" /><StarIcon className="gray" /><StarIcon className="gray" /></Box> 2.0 & up</li>
            </ul>
          </Box>
          <Box className="filter">
            <h3>Discount</h3>
            <ul className="checkbox">
              <li><Checkbox /> Upto 5%</li>
              <li><Checkbox /> 10% - 15%</li>
              <li><Checkbox /> 15% - 25%</li>
              <li><Checkbox /> More than 25%</li>
            </ul>
          </Box>
          <Box className="filter">
            <h3>Country of Origin</h3>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="india"
              name="radio-buttons-group"
              className="radio-group"
            >
              <FormControlLabel value="india" control={<Radio />} label="India" />
              <FormControlLabel value="usa" control={<Radio />} label="USA" />
            </RadioGroup>
          </Box>
          <Box className="filter">
            <h3>Product Type</h3>
            <ul className="checkbox">
              <li><Checkbox /> Combo</li>
              <li><Checkbox /> Super Saver</li>
            </ul>
          </Box>
          <Box className="filter">
            <h3>Pack Size</h3>
            <ul className="checkbox">
              <li><Checkbox /> Combo 5 Items</li>
              <li><Checkbox /> Combo 4 Items</li>
              <li><Checkbox /> Combo 3 Items</li>
              <li><Checkbox /> Combo 2 Items</li>
              <li><Checkbox /> 80 - 100  gm.</li>
              <li><Checkbox /> 300 - 600 gm.</li>
            </ul>
          </Box>
        </Box>
      </Box>
    );
  }
}


export default Category;

