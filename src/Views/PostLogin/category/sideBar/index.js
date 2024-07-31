import React, { Component } from "react";
import {
  Box,
  Switch,
  TextField,
  Checkbox,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { fetchFilteredProducts } from "../../../../Redux/AllProducts/AllProductthunk";
import { connect } from "react-redux";
import _ from "lodash";
import { loginDetails } from "Views/Utills/helperFunctions";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 40,
  height: 20,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(18px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#D5D5D5" : "#1F9151",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 14,
    height: 14,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 20 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));
// import { fetchFilteredProducts } from "Redux/AllProducts/AllProductthunk";
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minPrice: "",
      maxPrice: "",
      selectedRatings: [],
      selectedDiscounts: [],
      selectedCountry: "",
      selectedProductTypes: [],
      selectedPackSizes: [],
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
        minPrice: "",
        maxPrice: "",
        selectedRatings: [],
        selectedDiscounts: [],
        selectedCountry: "",
        selectedProductTypes: [],
        selectedPackSizes: [],
        currentPathName: window.location.pathname,
      });
    }
  }

  handlePriceChange = (field, value) => {
    const { minPrice, maxPrice, matches } = this.state;
    this.setState({ [field]: value }, () => {
      this.applyFilters();
      if (minPrice > 0 && maxPrice > 0 && matches) {
        this.props.toggleFilter();
      }
    });
  };

  handleCheckboxChange = (field, value) => {
    const { matches } = this.state;
    this.setState((prevState) => {
      const selectedValues = prevState[field] || [];
      if (selectedValues.includes(value)) {
        return { [field]: selectedValues.filter((item) => item !== value) };
      } else {
        return { [field]: [...selectedValues, value] };
      }
    }, this.applyFilters);
    if (matches) {
      this.props.toggleFilter();
    }
  };

  handleRadioChange = (field, value) => {
    this.setState({ [field]: value }, this.applyFilters);
  };

  checkStatus = () => {
    const {
      minPrice,
      maxPrice,
      selectedRatings,
      selectedDiscounts,
      selectedCountry,
      selectedProductTypes,
      selectedPackSizes,
    } = this.state;

    // Check if all relevant fields are empty or have a length of 0
    const allFieldsEmpty =
      minPrice === "" &&
      maxPrice === "" &&
      selectedRatings.length === 0 &&
      selectedDiscounts.length === 0 &&
      selectedCountry === "" &&
      selectedProductTypes.length === 0 &&
      selectedPackSizes.length === 0;

    return !allFieldsEmpty;
    // Update status based on all fields being empty
  };

  applyFilters = () => {
    // let data = { ...this.state };
    const {
      minPrice,
      maxPrice,
      selectedRatings,
      selectedDiscounts,
      selectedCountry,
      selectedProductTypes,
      selectedPackSizes,
    } = this.state;
    // data.userId = loginDetails().userId;
    // if (this.props?.subcategory) {
    //   data.subcategory = this.props?.subcategory;
    // } else if (this.props.category) {
    //   data.category = this.props?.category;
    // }
    let rating = "";
    let discounts = "";
    if (selectedRatings.length > 0) {
      selectedRatings.forEach((item, index) => {
        const ratingValue = parseFloat(item); // Convert item to a floating point number

        if (ratingValue >= 2 && ratingValue < 5) {
          rating += ratingValue + ".0" + "to" + "up,";
        } else if (ratingValue == 5) {
          rating += ratingValue + ".0" + ",";
        }
      });
    }
    if (selectedDiscounts.length > 0) {
      selectedDiscounts.forEach((item) => {
        if (item.includes("more25")) {
          discounts += "morethan25" + ",";
        } else {
          discounts += item + ",";
        }
      });
    }
    let status = this.checkStatus();
    if (status) {
      this.debouncedFilter({
        category: this.props?.category,
        subcategory: this.props?.subcategory,
        minPrice: minPrice,
        maxPrice: maxPrice,
        discounts: discounts,
        ratingFilter: rating,
        userId: loginDetails()?.userId,
      });
    } else {
      this.props.allproducts();
    }

    this.props.onFilterChange(this.state);
  };

  render() {
    const {
      minPrice,
      maxPrice,
      selectedRatings,
      selectedDiscounts,
      selectedCountry,
      selectedProductTypes,
      selectedPackSizes,
    } = this.state;
    return (
      <Box className="sidebar">
        {/* <FilterAltIcon/> */}
        <Box className="hide-filter">
          <p>Hide Filter</p>{" "}
          <AntSwitch
            checked={this.props.hideFilter}
            onChange={() => this.props.toggleFilter()}
          />
        </Box>

        <Box
          className={
            !this.props.hideFilter ? "filters-boxs active" : "filters-boxs"
          }
        >
          <h2>
            Filters{" "}
            {!this.props.hideFilter && (
              <CloseOutlinedIcon onClick={() => this.props.toggleFilter()} />
            )}
          </h2>
          <Box className="filter">
            <h3>Price</h3>
            <Box className="min-max-price">
              <TextField
                value={minPrice}
                onChange={(e) =>
                  this.handlePriceChange("minPrice", e.target.value)
                }
                placeholder="Min"
              />
              <TextField
                value={maxPrice}
                onChange={(e) =>
                  this.handlePriceChange("maxPrice", e.target.value)
                }
                placeholder="Max"
              />
            </Box>
          </Box>
          <Box className="filter">
            <h3>Rating </h3>
            <ul className="checkbox">
              <li>
                <Checkbox
                  checked={selectedRatings.includes(5)}
                  onChange={() =>
                    this.handleCheckboxChange("selectedRatings", 5)
                  }
                />
                <Box className="star">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </Box>{" "}
                5.0
              </li>
              <li>
                <Checkbox
                  checked={selectedRatings.includes(4)}
                  onChange={() =>
                    this.handleCheckboxChange("selectedRatings", 4)
                  }
                />
                <Box className="star">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon className="gray" />
                </Box>{" "}
                4.0 & up
              </li>
              <li>
                <Checkbox
                  checked={selectedRatings.includes(3)}
                  onChange={() =>
                    this.handleCheckboxChange("selectedRatings", 3)
                  }
                />
                <Box className="star">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon className="gray" />
                  <StarIcon className="gray" />
                </Box>{" "}
                3.0 & up
              </li>
              <li>
                <Checkbox
                  checked={selectedRatings.includes(2)}
                  onChange={() =>
                    this.handleCheckboxChange("selectedRatings", 2)
                  }
                />
                <Box className="star">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon className="gray" />
                  <StarIcon className="gray" />
                  <StarIcon className="gray" />
                </Box>{" "}
                2.0 & up
              </li>
            </ul>
          </Box>
          <Box className="filter">
            <h3>Discount</h3>
            <ul className="checkbox">
              <li>
                <Checkbox
                  checked={selectedDiscounts.includes("upto5")}
                  onChange={() =>
                    this.handleCheckboxChange("selectedDiscounts", "upto5")
                  }
                />
                Upto 5%
              </li>
              <li>
                <Checkbox
                  checked={selectedDiscounts.includes("10to15")}
                  onChange={() =>
                    this.handleCheckboxChange("selectedDiscounts", "10to15")
                  }
                />
                10% - 15%
              </li>
              <li>
                <Checkbox
                  checked={selectedDiscounts.includes("15to25")}
                  onChange={() =>
                    this.handleCheckboxChange("selectedDiscounts", "15to25")
                  }
                />
                15% - 25%
              </li>
              <li>
                <Checkbox
                  checked={selectedDiscounts.includes("more25")}
                  onChange={() =>
                    this.handleCheckboxChange("selectedDiscounts", "more25")
                  }
                />
                More than 25%
              </li>
            </ul>
          </Box>
          {/* <Box className="filter">
            <h3>Country of Origin</h3>
            <RadioGroup
              aria-labelledby="country-origin-radio-group-label"
              name="country-origin-radio-group"
              value={selectedCountry}
              onChange={(e) =>
                this.handleRadioChange("selectedCountry", e.target.value)
              }
              className="radio-group"
            >
              <FormControlLabel
                value="india"
                control={<Radio />}
                label="India"
              />
              <FormControlLabel value="usa" control={<Radio />} label="USA" />
            </RadioGroup>
          </Box>
          <Box className="filter">
            <h3>Product Type</h3>
            <ul className="checkbox">
              <li>
                <Checkbox
                  checked={selectedProductTypes.includes("combo")}
                  onChange={() =>
                    this.handleCheckboxChange("selectedProductTypes", "combo")
                  }
                />
                Combo
              </li>
              <li>
                <Checkbox
                  checked={selectedProductTypes.includes("super-saver")}
                  onChange={() =>
                    this.handleCheckboxChange(
                      "selectedProductTypes",
                      "super-saver"
                    )
                  }
                />
                Super Saver
              </li>
            </ul>
          </Box>
          <Box className="filter">
            <h3>Pack Size</h3>
            <ul className="checkbox">
              <li>
                <Checkbox
                  checked={selectedPackSizes.includes("combo5")}
                  onChange={() =>
                    this.handleCheckboxChange("selectedPackSizes", "combo5")
                  }
                />
                Combo 5 Items
              </li>
              <li>
                <Checkbox
                  checked={selectedPackSizes.includes("combo4")}
                  onChange={() =>
                    this.handleCheckboxChange("selectedPackSizes", "combo4")
                  }
                />
                Combo 4 Items
              </li>
              <li>
                <Checkbox
                  checked={selectedPackSizes.includes("combo3")}
                  onChange={() =>
                    this.handleCheckboxChange("selectedPackSizes", "combo3")
                  }
                />
                Combo 3 Items
              </li>
              <li>
                <Checkbox
                  checked={selectedPackSizes.includes("combo2")}
                  onChange={() =>
                    this.handleCheckboxChange("selectedPackSizes", "combo2")
                  }
                />
                Combo 2 Items
              </li>
              <li>
                <Checkbox
                  checked={selectedPackSizes.includes("80to100")}
                  onChange={() =>
                    this.handleCheckboxChange("selectedPackSizes", "80to100")
                  }
                />
                80 - 100 gm.
              </li>
              <li>
                <Checkbox
                  checked={selectedPackSizes.includes("300to600")}
                  onChange={() =>
                    this.handleCheckboxChange("selectedPackSizes", "300to600")
                  }
                />
                300 - 600 gm.
              </li>
            </ul>
          </Box> */}
        </Box>
        <Box
          className={
            !this.props.hideFilter ? "filters-bg active" : "filters-bg"
          }
          onClick={() => this.props.toggleFilter()}
        ></Box>
      </Box>
    );
  }
}

// fetchFilteredProducts

function mapStateToProps(state) {
  const {
    allProductsData,
    shopCategoryData,
    filteredProductData,
    productByCategoryData,
    productBySubCategoryData,
  } = state.allproducts;
  const { cartItems } = state.cartitem;
  return {
    allProductsData,
    cartItems,
    shopCategoryData,
    filteredProductData,
    productByCategoryData,
    productBySubCategoryData,
  };
}

const mapDispatchToProps = {
  fetchFilteredProducts,
  // allProducts,
  // fetchCartItems,
  // setShopByCategory,
  // fetchProductBySubCategory,
  // fetchProductByCategory,
  // fetchFilteredProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
