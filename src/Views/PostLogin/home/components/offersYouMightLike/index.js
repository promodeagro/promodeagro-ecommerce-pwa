import React, { Component } from "react";
import { Box, Container, Grid } from "@mui/material";
import offersBanner1 from "../../../../../assets/img/offers-banner1.png";
import offersBanner2 from "../../../../../assets/img/offers-banner2.png";
import offersBanner3 from "../../../../../assets/img/offers-banner3.png";
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

          {allOffersList?.length > 0 ? (
            allOffersList?.map((item) => {
              return (
                <div style={styles.card}>
                  <div style={styles.content}>
                    <h2 style={styles.title}>{item?.offerName}</h2>
                    <h1 style={styles.discount}>
                      {item?.offerPercentage}% OFF
                    </h1>
                    <button
                      style={styles.button}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          styles.buttonHover.backgroundColor)
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          styles.button.backgroundColor)
                      }
                      onClick={() => {
                        this.props.navigate(`/category`);
                      }}
                    >
                      Grab the Deal
                    </button>
                  </div>
                  <div style={styles.imageContainer}>
                    <img alt={"Healthy veges"} style={styles.image} />
                  </div>
                </div>
              );
            })
          ) : (
            <p>There no offers </p>
          )}
          {/* <Box className="banners">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <Box className="image">
                  <Link to="/category">
                    <img src={offersBanner1} alt="" />
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
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
              </Grid>
            </Grid>
          </Box> */}
        </Container>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { homeData } = state.home;
  return {
    homeData,
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(OffersYouMightLike));
