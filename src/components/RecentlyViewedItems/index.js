import React, { Component } from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import priceIcon from "../../assets/img/price-icon.png";
import StarIcon from "@mui/icons-material/Star";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";

class RecentlyViewedItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentList: [],
      showAllItems: false, // State to track if all items should be shown
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

  // Function to toggle showing all items
  handleShowAll = () => {
    this.setState({
      showAllItems: true,
    });
  };

  render() {
    const { recentList, showAllItems } = this.state;
    console.log(recentList);
    return (
      <>
        {recentList.length > 0 ?
          <Box className="recently-container">
            <Container>
              <Box className="heading">
                <h2>Recently Viewed Items</h2>
                {/* <Button onClick={this.handleShowAll}>Show All</Button> */}
              </Box>
              <Box className="recently-products">
                {recentList && recentList.length > 0 ? (
                  // Render either all items or first 4 items based on showAllItems state
                  recentList.slice(0, 3).map((item) => (
                    <Box key={item.id} className="product-box">
                      <Grid container spacing={2} alignItems={"center"}>
                        <Grid item xs={6} sm={6} md={4}>
                          <Box className="image">
                            <img src={item?.image} alt="" />
                          </Box>
                        </Grid>
                        <Grid item xs={6} sm={6} md={8}>
                          <Box className="contents">
                            <Box className="name">
                              <Link to={`/product-details/${item.id}`}>{item?.name}</Link>
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
                                <Button>
                                  <TurnedInNotOutlinedIcon />
                                </Button>
                                <Button>
                                  <ShoppingCartOutlinedIcon />
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

          : <></>}
      </>

    );
  }
}

export default RecentlyViewedItems;
