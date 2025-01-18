import React, { Component } from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { fetchFilteredProducts } from "../../../../Redux/AllProducts/AllProductthunk";
import { connect } from "react-redux";
import _ from "lodash";
import noImage from "../../../../assets/img/no-image.png";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPathName: "",
      matches: window.matchMedia("(max-width: 900px)").matches,
    };
    this.debouncedFilter = _.debounce((params) => {
      this.props.handleFilterApiLoader(true);
      this.props.fetchFilteredProducts(params);
    }, 1000);
  }

  componentDidMount() {
    window
      .matchMedia("(max-width: 900px)")
      .addEventListener("change", (e) => this.setState({ matches: e.matches }));
  }

  componentDidUpdate() {
    if (this.state.currentPathName != window.location.pathname) {
      this.setState({
        currentPathName: window.location.pathname,
      });
    }
  }

  renderCategories = () => {
    const { categories, category, subcategory } = this.props;

    const selectedCategory = categories?.data?.find(
      (item) => item?.CategoryName === category
    );

    return (
      <ul>
        {selectedCategory?.Subcategories?.length ? (
          selectedCategory.Subcategories.map((subcat, index) => {
            const subcatPath = `/category/${selectedCategory.CategoryName.replaceAll(
              " ",
              "%20"
            )}/${subcat.name.replaceAll(" ", "%20")}`;
            const isActive = subcategory === subcat?.name;

            return (
              <li key={index}>
                <Link to={subcatPath} className={isActive ? "active" : ""}>
                  <span
                    style={{
                      height: "50px",
                      width: "50px",
                      textAlign: "center",
                    }}
                  >
                    <img
                      style={{ height: "45px", width: "45px" }}
                      src={subcat.image_url ? subcat.image_url : noImage}
                      alt={subcat.name}
                    />
                  </span>
                
                    <strong>{subcat.name}</strong>
                
                </Link>
              </li>
            );
          })
        ) : (
          <li>No subcategories available</li>
        )}
      </ul>
    );
  };

  render() {
    return (
      <Box className="sidebar">
        <Box className="sub-categories">{this.renderCategories()}</Box>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { shopCategoryData, filteredProductData } = state.allproducts;
  const { cartItems } = state.cartitem;
  return {
    cartItems,
    shopCategoryData,
    filteredProductData,
  };
}

const mapDispatchToProps = {
  fetchFilteredProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

