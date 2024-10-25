import React, { Component } from "react";
import { Box, Container, Grid } from "@mui/material";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { Link } from "react-router-dom";
import noImage from "../../../../../assets/img/no-image.png";

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
                return (
                  <Box
                    className={
                      item?.CategoryName === "Bengali Special"
                        ? "special-category-box"
                        : "category-box"
                    }
                  >
                    <Box className="image">
                      <Link to={`category/${item?.CategoryName}`}>
                        <img
                          src={item?.image_url ? item?.image_url : noImage}
                          alt=""
                        />
                      </Link>
                    </Box>
                    <Box className="name">
                      <Link to={`category/${item?.CategoryName}`}>
                        {item?.CategoryName}
                      </Link>
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
