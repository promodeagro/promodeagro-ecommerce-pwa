import React, { Component } from "react";
import { Box, Container, Grid } from "@mui/material";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { Link } from "react-router-dom";
import noImage from "../../../../assets/img/no-image.png";

class TrendingCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: window.matchMedia("(max-width: 600px)").matches,
    };
  }
  componentDidMount() {
    window
      .matchMedia("(max-width: 600px)")
      .addEventListener("change", (e) => this.setState({ matches: e.matches }));
  }
  scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  render() {
    const { matches } = this.state;
    const { categories } = this.props;
    
    return (
      <Box>
       
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
                      <Link
                        to={`category/${item?.CategoryName}/${item?.Subcategories[0]?.name}`}
                        onClick={this.scrollToTop}
                      >
                        <img
                          src={item?.image_url ? item?.image_url : noImage}
                          alt=""
                        />
                      </Link>
                    </Box>
                    <Box className="name">
                      <Link
                        to={`category/${item?.CategoryName}/${item?.Subcategories[0]?.name}`}
                        onClick={this.scrollToTop}
                      >
                        {item?.CategoryName}
                      </Link>
                    </Box>
                  </Box>
                );
              })
            ) : (
              <></>
            )}
            {matches && (
              <Box className="view-all-link">
                {/* <Link to={""}>View All</Link> */}
              </Box>
            )}
          </Box>
        
      </Box>
    );
  }
}

export default TrendingCategories;
