import React, { Component } from "react";
import { Box, Switch, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { fetchFilteredProducts } from "../../../../Redux/AllProducts/AllProductthunk";
import { connect } from "react-redux";
import _ from "lodash";
import { loginDetails } from "Views/Utills/helperFunctions";
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
    const { categories, category } = this.props;

    const selectedCategory = categories?.data?.find(
      (item) => item?.CategoryName.toUpperCase() === category
    );
    const currentPath = window.location.pathname;

    return (
      <ul>
        {selectedCategory?.Subcategories?.length ? (
          selectedCategory.Subcategories.map((subcat, index) => {
            const subcatPath = `/category/${selectedCategory.CategoryName.toUpperCase().replaceAll(
              " ",
              "%20"
            )}/${subcat.name.replaceAll(" ", "%20")}`;
            const isActive = currentPath === subcatPath;
            return (
              <li key={index}>
                <Link to={subcatPath} className={isActive ? "active" : ""}>
                  <span>
                    <img
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
        <Box className="sub-categories">
          <Container>{this.renderCategories()}</Container>
        </Box>
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
