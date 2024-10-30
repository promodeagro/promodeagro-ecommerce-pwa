import React, { Component } from "react";
import { Box, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { navigateRouter } from "Views/Utills/Navigate/navigateRouter";

const styles = {
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    display: "flex",
    padding: "20px",
    maxWidth: "800px",
    width: "100%",
    margin: "20px 0",
  },
  content: {
    flex: 1,
  },
  title: {
    color: "#2c662d",
    fontSize: "24px",
    margin: "0",
  },
  discount: {
    color: "#2c662d",
    fontSize: "48px",
    margin: "10px 0",
  },
  button: {
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
    fontSize: "18px",
    padding: "10px 20px",
    textAlign: "center",
  },
  buttonHover: {
    backgroundColor: "#218838",
  },
  imageContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: "10px",
    maxWidth: "100%",
  },
};
class OffersYouMightLike extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { allOffersList } = this.props;

    return (
      <Box className="offers-banners-container">
        <Container>
          <Box className="heading">Offers You Might Like</Box>

          <Box className="banners">
            <Grid container spacing={2}>
              {allOffersList?.length > 0 ? (
                allOffersList?.map((item) => {
                  return (
                    <Grid item xs={12} sm={6} md={6}>
                      <Box
                        className="image"
                        onClick={() =>
                          this.props.navigate(`/category/offers/${item?.id}`)
                        }
                      >
                        <Link>
                          <img src={item.imageUrl} alt={item.offerName} />
                        </Link>
                      </Box>
                    </Grid>
                  );
                })
              ) : (
                <p>No Active Offers</p>
              )}

              {/* <Grid item xs={12} sm={6} md={6}>
                <Box className="image">
                  <Link to="/category">
                    <img src={offersBanner2} alt="" />
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Box className="d-flex w-100 justify-content-center">
                  <Box className="image">
                    <Link to="/category">
                      <img src={offersBanner3} alt="" />
                    </Link>
                  </Box>
                </Box>
              </Grid> */}
            </Grid>
          </Box>
        </Container>
      </Box>
    );
  }
}

function mapStateToProps(state) {

  return {
  
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(OffersYouMightLike));
