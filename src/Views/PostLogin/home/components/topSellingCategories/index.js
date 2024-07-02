import React, { Component } from "react";
import {
  Box,
  Container,
  FormControl,
  NativeSelect,
  Button,
  Tab,
} from "@mui/material";
import Carousel from "react-multi-carousel";
import StarIcon from "@mui/icons-material/Star";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import productImg from "../../../../../assets/img/product-img.png";
import priceIcon from "../../../../../assets/img/price-icon.png";
import "react-multi-carousel/lib/styles.css";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import All from "./Components/All";
import LeafyVejetable from "./Components/LeafyVejetable";
import ExoticFruits from "./Components/ExoticFruits";
import SeasonalFruits from "./Components/SeasonalFruits";

class TopSellingCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "1",
    };
  }

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue,
    });
  };

  render() {
    return (
      <Box className="top-selling-categories-container">
        <Container>
          <Box className="heading">Top Selling Categories</Box>
          <TabContext value={this.state.value}>
            <TabList
              onChange={this.handleChange}
              aria-label="lab API tabs example"
            >
              <Tab label="All" value="1" />
              <Tab label="Leafy Vegetables" value="2" />
              <Tab label="Exotic Fruit" value="3" />
              <Tab label="Seasonal Fruits" value="4" />
            </TabList>
            <TabPanel value="1">
              <All productImg={productImg} priceIcon={priceIcon} />
            </TabPanel>
            <TabPanel value="2">
              <LeafyVejetable productImg={productImg} priceIcon={priceIcon} />
            </TabPanel>
            <TabPanel value="3">
              <ExoticFruits productImg={productImg} priceIcon={priceIcon} />
            </TabPanel>
            <TabPanel value="4">
              <SeasonalFruits productImg={productImg} priceIcon={priceIcon} />
            </TabPanel>
          </TabContext>
        </Container>
      </Box>
    );
  }
}

export default TopSellingCategories;
