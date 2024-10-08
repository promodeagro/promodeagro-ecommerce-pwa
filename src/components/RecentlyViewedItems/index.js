import React, { Component } from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import priceIcon from "../../assets/img/price-icon.png";
import StarIcon from "@mui/icons-material/Star";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import noImage from "../../assets/img/no-image.png";
class RecentlyViewedItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentList: [],
      showAllItems: false,
    };
  }

  componentDidMount() {
    let data = localStorage.getItem("recentviewitems");
    if (data) {
      this.setState({
        recentList: JSON.parse(data),
      });
    }
  }

  handleShowAll = () => {
    this.setState({
      showAllItems: true,
    });
  };

  scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  render() {
    const { recentList, showAllItems } = this.state;
    return (
      <>
        {recentList.length > 0 ? (
          <Box className="recently-container">
            <Container>
              <Box className="heading">
                <h2>Recently Viewed Items</h2>
                {/* <Button onClick={this.handleShowAll}>Show All</Button> */}
              </Box>
              <Box className="recently-products">
                {recentList && recentList.length > 0 ? (
                  recentList.slice(0, 3).map((item) => (
                    <Box key={item.id} className="product-box">
                      <Grid container spacing={2} alignItems={"center"}>
                        <Grid item xs={6} sm={6} md={4}>
                          <Box className="image">
                            <Link
                              to={`/product-details/${item.category}/${item.name}/${item.id}`}
                              onClick={this.scrollToTop}
                            >
                              <img
                                src={item?.image ? item?.image : noImage}
                                alt={item?.name}
                              />
                            </Link>
                          </Box>
                        </Grid>
                        <Grid item xs={6} sm={6} md={8}>
                          <Box className="contents">
                            <Box className="name">
                              <Link
                                to={`/product-details/${item.category}/${item.name}/${item.id}`}
                                onClick={this.scrollToTop}
                              >
                                {item?.name}
                              </Link>
                            </Box>
                            <Box className="price">
                              <img src={priceIcon} alt="" /> {item?.price}
                              <span>{item?.mrp}</span>
                            </Box>
                            <Box
                              display={"flex"}
                              width={"100%"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                            >
                              <Box className="ratting">
                                <StarIcon /> {item?.ratings}
                              </Box>
                              <Box className="buttons">
                                {/* <Button>
                                  <TurnedInNotOutlinedIcon />
                                </Button> */}
                                <Button>
                                  <Link
                                    style={{
                                      display: "inline-flex",
                                      width: "100%",
                                      height: "100%",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                    to={`/product-details/${item.category}/${item.name}/${item.id}`}
                                  >
                                    <ShoppingCartOutlinedIcon />
                                  </Link>
                                </Button>
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  ))
                ) : (
                  <Box>No recently viewed items.</Box>
                )}
              </Box>
            </Container>
          </Box>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default RecentlyViewedItems;
