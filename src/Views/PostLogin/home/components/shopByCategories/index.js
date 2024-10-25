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
    const { categories } = this.props;
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
            {categories?.length > 0 ? (
              categories?.map((item) => {
                debugger;
                return (
                  <Box className="special-category-box">
                    <Box className="image">
                      <Link to={"#"}>
                        <img src={item?.image_url} alt="" />
                      </Link>
                    </Box>
                    <Box className="name">
                      <Link to={"#"}>{item?.CategoryName}</Link>
                    </Box>
                  </Box>
                );
              })
            ) : (
              <></>
            )}
          </Box>
        </Container>
      </Box>
    );
  }
}

export default ShopByCategories;
