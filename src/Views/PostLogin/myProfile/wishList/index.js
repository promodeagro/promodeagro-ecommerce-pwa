import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  NativeSelect,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import priceIcon from "../../../../assets/img/price-icon.png";
import noImage from "../../../../assets/img/no-image.png";
import ProfileSideBar from "../profileSideBar";
import {
  fetchProductWishList,
  deleteProductWishList,
  setProductWishList,
} from "../../../../Redux/AllProducts/AllProductthunk";
import { connect } from "react-redux";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";
import status from "../../../../Redux/Constants";
import { Loader, loginDetails } from "Views/Utills/helperFunctions";
class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wistListData: [],
      deleteItemId: "",
      apiLoader: false,
    };
  }

  componentDidMount() {
    this.setState({
      apiLoader: true,
    });
    this.props.fetchProductWishList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.bookMarksData.status !== this.props.bookMarksData.status &&
      this.props.bookMarksData.status === status.SUCCESS &&
      this.props.bookMarksData?.data?.wishlist
    ) {
      this.setState({
        wistListData: this.props.bookMarksData?.data?.wishlist,
        apiLoader: false,
        deleteItemId: "",
      });
    }
    if (
      prevProps.deleteBookMarkData.status !==
        this.props.deleteBookMarkData.status &&
      this.props.deleteBookMarkData.status === status.SUCCESS
    ) {
      this.props.fetchProductWishList();
    }
  }
  handleDeleteWishList(ProductId) {
    this.setState({
      deleteItemId: ProductId,
    });
    this.props.deleteProductWishList(ProductId);
  }

  render() {
    const {} = this.state;
    return (
      <Box className="main-container">
        <Container>
          <Box className="profile-container">
            <Box className="profile-left">
              <ProfileSideBar />
            </Box>
            <Box className="profile-right">
              <Box className="heading">
                <h2>Wish List</h2>
              </Box>
              <Box className="products">
                {this.props.bookMarksData.status === status.IN_PROGRESS &&
                this.state.apiLoader ? (
                  Loader.commonLoader()
                ) : this.state.wistListData.length > 0 ? (
                  this.state.wistListData?.map((item) => {
                    return (
                      <Box className="product-box">
                        <Box className="sale">Sale 50%</Box>
                        {(this.props.deleteBookMarkData.status ===
                          status.IN_PROGRESS &&
                          item?.ProductId == this.state.deleteItemId) ||
                        (this.props.bookMarksData.status ===
                          status.IN_PROGRESS &&
                          this.state.deleteItemId==item?.ProductId) ? (
                          <Box className="icon">{Loader.commonLoader()}</Box>
                        ) : (
                          <Box
                            className="icon"
                            onClick={(event) => {
                              event.preventDefault();

                              this.handleDeleteWishList(item.ProductId);
                            }}
                          >
                            <DeleteOutlineOutlinedIcon />
                          </Box>
                        )}

                        <Box className="image">
                          <img
                            src={
                              item?.productImage ? item?.productImage : noImage
                            }
                            alt=""
                          />
                        </Box>
                        <Box className="name">{item?.productName} </Box>
                        <Box className="price-ratting">
                          <Box className="price">
                            <img src={priceIcon} alt="" /> {item?.price}
                            <span>{item?.mrp}</span>
                          </Box>
                          <Box className="ratting">
                            <StarIcon /> 4.5
                          </Box>
                        </Box>
                        <Box className="select">
                          <FormControl fullWidth>
                            <NativeSelect>
                              <option value={"1"}>250</option>
                              <option value={"2"}>500</option>
                              <option value={"1"}>1kg</option>
                            </NativeSelect>
                          </FormControl>
                        </Box>
                        <Box className="add-cart">
                          <Button variant="outlined">Add to cart</Button>
                        </Box>
                      </Box>
                    );
                  })
                ) : (
                  <p>No Data In Wishlist</p>
                )}

                {/* <Box className="product-box">
                  <Box className="sale">Sale 50%</Box>
                  <Box className="icon">
                    <DeleteOutlineOutlinedIcon />
                  </Box>
                  <Box className="image">
                    <img src={noImage} alt="" />
                  </Box>
                  <Box className="name">Green Apple</Box>
                  <Box className="price-ratting">
                    <Box className="price">
                      <img src={priceIcon} alt="" /> 14.99
                      <span>20.99</span>
                    </Box>
                    <Box className="ratting">
                      <StarIcon /> 4.5
                    </Box>
                  </Box>
                  <Box className="select">
                    <FormControl fullWidth>
                      <NativeSelect>
                        <option value={"1"}>250</option>
                        <option value={"2"}>500</option>
                        <option value={"1"}>1kg</option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
                  <Box className="add-cart">
                    <Button variant="outlined">Add to cart</Button>
                  </Box>
                </Box>
                <Box className="product-box">
                  <Box className="sale">Sale 50%</Box>
                  <Box className="icon">
                    <DeleteOutlineOutlinedIcon />
                  </Box>
                  <Box className="image">
                    <img src={noImage} alt="" />
                  </Box>
                  <Box className="name">Green Apple</Box>
                  <Box className="price-ratting">
                    <Box className="price">
                      <img src={priceIcon} alt="" /> 14.99
                      <span>20.99</span>
                    </Box>
                    <Box className="ratting">
                      <StarIcon /> 4.5
                    </Box>
                  </Box>
                  <Box className="select">
                    <FormControl fullWidth>
                      <NativeSelect>
                        <option value={"1"}>250</option>
                        <option value={"2"}>500</option>
                        <option value={"1"}>1kg</option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
                  <Box className="add-cart">
                    <Button variant="outlined">Add to cart</Button>
                  </Box>
                </Box>
                <Box className="product-box">
                  <Box className="sale">Sale 50%</Box>
                  <Box className="icon">
                    <DeleteOutlineOutlinedIcon />
                  </Box>
                  <Box className="image">
                    <img src={noImage} alt="" />
                  </Box>
                  <Box className="name">Green Apple</Box>
                  <Box className="price-ratting">
                    <Box className="price">
                      <img src={priceIcon} alt="" /> 14.99
                      <span>20.99</span>
                    </Box>
                    <Box className="ratting">
                      <StarIcon /> 4.5
                    </Box>
                  </Box>
                  <Box className="select">
                    <FormControl fullWidth>
                      <NativeSelect>
                        <option value={"1"}>250</option>
                        <option value={"2"}>500</option>
                        <option value={"1"}>1kg</option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
                  <Box className="add-cart">
                    <Button variant="outlined">Add to cart</Button>
                  </Box>
                </Box>
                <Box className="product-box">
                  <Box className="sale">Sale 50%</Box>
                  <Box className="icon">
                    <DeleteOutlineOutlinedIcon />
                  </Box>
                  <Box className="image">
                    <img src={noImage} alt="" />
                  </Box>
                  <Box className="name">Green Apple</Box>
                  <Box className="price-ratting">
                    <Box className="price">
                      <img src={priceIcon} alt="" /> 14.99
                      <span>20.99</span>
                    </Box>
                    <Box className="ratting">
                      <StarIcon /> 4.5
                    </Box>
                  </Box>
                  <Box className="select">
                    <FormControl fullWidth>
                      <NativeSelect>
                        <option value={"1"}>250</option>
                        <option value={"2"}>500</option>
                        <option value={"1"}>1kg</option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
                  <Box className="add-cart">
                    <Button variant="outlined">Add to cart</Button>
                  </Box>
                </Box>
                <Box className="product-box">
                  <Box className="sale">Sale 50%</Box>
                  <Box className="icon">
                    <DeleteOutlineOutlinedIcon />
                  </Box>
                  <Box className="image">
                    <img src={noImage} alt="" />
                  </Box>
                  <Box className="name">Green Apple</Box>
                  <Box className="price-ratting">
                    <Box className="price">
                      <img src={priceIcon} alt="" /> 14.99
                      <span>20.99</span>
                    </Box>
                    <Box className="ratting">
                      <StarIcon /> 4.5
                    </Box>
                  </Box>
                  <Box className="select">
                    <FormControl fullWidth>
                      <NativeSelect>
                        <option value={"1"}>250</option>
                        <option value={"2"}>500</option>
                        <option value={"1"}>1kg</option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
                  <Box className="add-cart">
                    <Button variant="outlined">Add to cart</Button>
                  </Box>
                </Box> */}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { setBookmarksData, deleteBookMarkData, bookMarksData } =
    state.allproducts;
  return { setBookmarksData, deleteBookMarkData, bookMarksData };
}

const mapDispatchToProps = {
  fetchProductWishList,
  deleteProductWishList,
  setProductWishList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(WishList));
