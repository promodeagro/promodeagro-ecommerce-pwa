import React, { Component } from "react";
import { Box, Container, Grid } from "@mui/material";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { Link } from "react-router-dom";
import bengaliSpecialImg from "../../../../../assets/img/bengali-special-img.png";
import categoryImg1 from "../../../../../assets/img/category-img1.png";
import categoryImg2 from "../../../../../assets/img/category-img2.png";
import categoryImg3 from "../../../../../assets/img/category-img3.png";
import categoryImg4 from "../../../../../assets/img/category-img4.png";
import categoryImg5 from "../../../../../assets/img/category-img5.png";

class ShopByCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Box className="shop-categories-container">
        <Container>
          <Box className="heading">
            <h2>Shop by Categories</h2>
            <Link to={"/category"}>
              View All <EastOutlinedIcon />
            </Link>
          </Box>
          <Box className="categories">
            <Box className="special-category-box">
              <Box className="image">
                <Box className="special-heading">
                  <span>Bengali</span>
                  Special
                </Box>
                <Link to={"#"}>
                  <img src={bengaliSpecialImg} alt="" />
                </Link>
              </Box>
              <Box className="name">
                <Link to={"#"}>Bengali Special</Link>
              </Box>
            </Box>
            <Box className="category-box">
              <Box className="image">
                <Link to={"#"}>
                  <img src={categoryImg1} alt="" />
                </Link>
              </Box>
              <Box className="name">
                <Link to={"#"}>Fresh Vegetables</Link>
              </Box>
            </Box>
            <Box className="category-box">
              <Box className="image">
                <Link to={"#"}>
                  <img src={categoryImg2} alt="" />
                </Link>
              </Box>
              <Box className="name">
                <Link to={"#"}>Fresh Fruits</Link>
              </Box>
            </Box>
            <Box className="category-box">
              <Box className="image">
                <Link to={"#"}>
                  <img src={categoryImg3} alt="" />
                </Link>
              </Box>
              <Box className="name">
                <Link to={"#"}>Groceries</Link>
              </Box>
            </Box>
            <Box className="category-box">
              <Box className="image">
                <Link to={"#"}>
                  <img src={categoryImg4} alt="" />
                </Link>
              </Box>
              <Box className="name">
                <Link to={"#"}>Dairy</Link>
              </Box>
            </Box>
            <Box className="category-box">
              <Box className="image">
                <Link to={"#"}>
                  <img src={categoryImg5} alt="" />
                </Link>
              </Box>
              <Box className="name">
                <Link to={"#"}>Egg Meat & Fish</Link>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default ShopByCategories;
