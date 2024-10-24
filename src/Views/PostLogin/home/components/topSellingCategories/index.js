import React, { Component } from "react";
import { Box, Container } from "@mui/material";
import productImg from "../../../../../assets/img/product-img.png";
import priceIcon from "../../../../../assets/img/price-icon.png";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { Link } from "react-router-dom";
import All from "./Components/All";

class TopSellingCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  apiCalls = () => {
    this.props.apiCalls();
  };

  render() {
    const {
      topSellingProductsList,
      topSellingApiLoader,
      topSellCategoriesList,
    } = this.props;
    // console.log(topSellingProductsList);
    const filteredBengaliVegetablesProducts = topSellingProductsList?.filter(
      (product) => product.category === "Bengali Special"
    );

    const filteredFreshFruitsProducts = topSellingProductsList?.filter(
      (product) => product.category === "Fresh Fruits"
    );

    const filteredNewArrivalProducts = topSellingProductsList?.filter(
      (product) => product.category === "Eggs Meat & Fish"
    );

    return (
      <Box className="top-selling-categories-container">
        <Container>
          <Box className="selling-categories">
            <Box className="heading">
              <h2>{"Bengali Vegetables"}</h2>
              <Link to={"/category"}>
                View All <EastOutlinedIcon />
              </Link>
            </Box>
            <All
              productImg={productImg}
              priceIcon={priceIcon}
              topSellingProductsList={filteredBengaliVegetablesProducts}
              topSellingApiLoader={topSellingApiLoader}
              apiCalls={this.apiCalls}
            />
          </Box>
          <Box className="selling-categories">
            <Box className="heading">
              <h2>{"Fresh Fruits"}</h2>
              <Link to={"/category"}>
                View All <EastOutlinedIcon />
              </Link>
            </Box>
            <All
              productImg={productImg}
              priceIcon={priceIcon}
              topSellingProductsList={filteredFreshFruitsProducts}
              topSellingApiLoader={topSellingApiLoader}
              apiCalls={this.apiCalls}
            />
          </Box>
          <Box className="selling-categories">
            <Box className="heading">
              <h2>{"New Arrival"}</h2>
              <Link to={"/category"}>
                View All <EastOutlinedIcon />
              </Link>
            </Box>
            <All
              productImg={productImg}
              priceIcon={priceIcon}
              topSellingProductsList={filteredNewArrivalProducts}
              topSellingApiLoader={topSellingApiLoader}
              apiCalls={this.apiCalls}
            />
          </Box>
        </Container>
      </Box>
    );
  }
}

export default React.memo(TopSellingCategories);
