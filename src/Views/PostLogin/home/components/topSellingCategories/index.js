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
      value: "",
    };
  }

  handleChange = (event, newValue) => {
    console.log(newValue);
    this.setState({
      value: newValue,
    });
    this.props.fetchTopSellings(newValue);
  };

  apiCalls = () => {
    this.props.apiCalls(this.state.value);
  };

  render() {
    const {
      topSellingProductsList,
      topSellingApiLoader,
      value,
      topSellCategoriesList,
    } = this.props;

    return (
      <Box className="top-selling-categories-container">
        <Container>
          <Box className="heading">Top Selling Categories</Box>
          <TabContext
            value={
              this.state.value ? this.state.value : topSellCategoriesList?.[0]
            }
          >
            <TabList
              onChange={this.handleChange}
              aria-label="lab API tabs example"
            >
              {topSellCategoriesList.length > 0 ? (
                topSellCategoriesList?.map((item) => {
                  return <Tab label={item} value={item} />;
                })
              ) : (
                <></>
              )}
              {/* <Tab label="All" value="All" />
              <Tab label="Leafy Vegetables" value="Leafy Vegetables" />
              <Tab label="Exotic Fruit" value="Exotic Fruit" />
              <Tab label="Seasonal Fruits" value="Seasonal Fruits" /> */}
            </TabList>
            {topSellCategoriesList.length > 0 ? (
              <TabPanel
                value={
                  this.state.value
                    ? this.state.value
                    : topSellCategoriesList?.[0]
                }
                className=""
              >
                <All
                  productImg={productImg}
                  priceIcon={priceIcon}
                  topSellingProductsList={topSellingProductsList}
                  topSellingApiLoader={topSellingApiLoader}
                  apiCalls={this.apiCalls}
                />
              </TabPanel>
            ) : (
              <></>
            )}

            {/* <TabPanel value="Leafy Vegetables">
              <LeafyVejetable productImg={productImg} priceIcon={priceIcon} 
               topSellingProductsList={topSellingProductsList}
               topSellingApiLoader={topSellingApiLoader}
              />
            </TabPanel>
            <TabPanel value="Exotic Fruit">
              <ExoticFruits productImg={productImg} priceIcon={priceIcon} 
               topSellingProductsList={topSellingProductsList}
               topSellingApiLoader={topSellingApiLoader}
              />
            </TabPanel>
            <TabPanel value="Exotic Fruit">
              <SeasonalFruits productImg={productImg} priceIcon={priceIcon} 
               topSellingProductsList={topSellingProductsList}
               topSellingApiLoader={topSellingApiLoader}
              />
            </TabPanel> */}
          </TabContext>
        </Container>
      </Box>
    );
  }
}

export default React.memo(TopSellingCategories);
