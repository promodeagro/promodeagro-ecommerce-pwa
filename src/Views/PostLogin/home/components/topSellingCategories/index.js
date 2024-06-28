import React, { Component } from "react";
import { Box, Container, FormControl, NativeSelect, Button, Tab } from "@mui/material";
import Carousel from "react-multi-carousel";
import StarIcon from '@mui/icons-material/Star';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import productImg from "../../../../../assets/img/product-img.png";
import priceIcon from "../../../../../assets/img/price-icon.png"



import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import All from "./Components/All";
import LeafyVejetable from "./Components/LeafyVejetable";
import ExoticFruits from "./Components/ExoticFruits";
import SeasonalFruits from "./Components/SeasonalFruits";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

class TopSellingCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "1"
    };
  }


  handleChange = (event, newValue) => {
    debugger
    this.setState({
      value: newValue
    })

  };

  render() {
    return (
      <Box className="top-selling-categories-container">
        <Container>
          <Box className="heading">Top Selling Categories</Box>

          <TabContext value={this.state.value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={this.handleChange} aria-label="lab API tabs example">
                <Tab label="All" value="1" />
                <Tab label="Leafy Vegetables" value="2" />
                <Tab label="Exotic Fruit" value="3" />
                <Tab label="Seasonal Fruits" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <All responsive={responsive} productImg={productImg} priceIcon={priceIcon} />
            </TabPanel>
            <TabPanel value="2">
              <LeafyVejetable responsive={responsive} productImg={productImg} priceIcon={priceIcon} />
            </TabPanel>
            <TabPanel value="3">
              <ExoticFruits responsive={responsive} productImg={productImg} priceIcon={priceIcon} />
            </TabPanel>
            <TabPanel value="4">
              <SeasonalFruits responsive={responsive} productImg={productImg} priceIcon={priceIcon} />
            </TabPanel>
          </TabContext>






        </Container>
      </Box>
    );
  }
}

export default TopSellingCategories;
