import React, { Component } from "react";
import { addItemToCart } from "../../../../Redux/Cart/CartThunk";
import { connect } from "react-redux";
import { Box, FormControl, NativeSelect, Button, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import productImg from "../../../../assets/img/product-img.png";
import priceIcon from "../../../../assets/img/price-icon.png";
import status from "../../../../Redux/Constants";
import { ErrorMessages } from "Views/Utills/helperFunctions";
import _ from "lodash"
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedProducts: [], // Track added products
      quantities: {}, // Track quantities for each product
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // Handle success message after adding item to cart if needed
    if (
      prevProps.additems.status !== this.props.additems.status &&
      this.props.additems.status === status.SUCCESS &&
      this.props.additems.data
    ) {
      // ErrorMessages.success(this.props.additems.data.message);
    }
  }

  handleAddToCart(id) {

    const items = JSON.parse(localStorage.getItem("login"));
    // if (!items) {
    //   alert("Please login");
    //   return;
    // }

    // Add item to cart (assuming this.props.addItemToCart is correctly wired up)
    this.props.addItemToCart({
      userId: items.userId,
      productId: id,
      quantity: "1",
    });

    // Update local state to reflect added product and initial quantity
    this.setState((prevState) => ({
      addedProducts: [...prevState.addedProducts, id],
      quantities: {
        ...prevState.quantities,
        [id]: prevState.quantities[id] ? prevState.quantities[id] + 1 : 1,
      },
    }));
  }

  handleQuantityChange(id, increment) {
    const items = JSON.parse(localStorage.getItem("login"));
    let cloneQuantities = _.cloneDeep(this.state.quantities);
    cloneQuantities[id] = cloneQuantities[id] + increment


    console.log(`Updating quantity for product ID ${id} by ${increment}`);

    this.setState({
      quantities: cloneQuantities
    })

    this.props.addItemToCart({
      userId: items.userId,
      productId: id,
      quantity: cloneQuantities[id],
    });




    // // Simulated API call delay
    // setTimeout(() => {
    //   // Update local state to reflect quantity change
    //   this.setState((prevState) => ({
    //     quantities: {
    //       ...prevState.quantities,
    //       [id]: prevState.quantities[id] + increment,
    //     },
    //   }));

    // }, 500);


  }

  render() {
    const { data } = this.props;
    const { addedProducts, quantities } = this.state;

    return (
      <Box className="listing-container">
        <Box className="heading">
          <Grid container spacing={2} alignItems={'center'}>
            <Grid item xs={6} sm={6} md={6}>
              <h2>Leafy Vegetable</h2>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <Box className="d-flex w-100 justify-content-end">
                <Box className="sort-by">
                  <FormControl fullWidth>
                    <NativeSelect
                      defaultValue={10}
                      inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                      }}
                    >
                      <option value={10}>Sort by  Price - Low to High</option>
                      <option value={20}>Sort by  Price - High to Low</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
                <Box className="results-text"><strong>52</strong> Results Found</Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="products">
          {data?.length &&
            data.map((item) => (
              <Box className="product-box" key={item.id}>
                <Box className="sale">Sale 50%</Box>
                <Box className="icon">
                  <TurnedInNotOutlinedIcon />
                </Box>
                <Box className="image">
                  <img src={item.image} alt="" />
                </Box>
                <Box className="name">
                  <a href="#">{item.name}</a>
                </Box>
                <Box className="price-ratting">
                  <Box className="price">
                    <img src={priceIcon} alt="" /> {item.price}
                  </Box>
                  <Box className="ratting">
                    <StarIcon /> 4.5
                  </Box>
                </Box>
                <Box className="select">
                  <Box className="ratting"> {item.unit}</Box>
                </Box>
                <Box className="add-cart">
                  {
                    !addedProducts.includes(item.id) ? <Button
                      variant="outlined"
                      onClick={() => {
                        this.handleAddToCart(item.id);
                      }}
                    >
                      Add to cart
                    </Button> : <></>
                  }

                </Box>
                {addedProducts.includes(item.id) && ( // Conditionally render number-input-container
                  <Box className="number-input-container">
                    <Box
                      className="symbol"
                      onClick={() => {
                        this.handleQuantityChange(item.id, -1);
                      }}
                    >
                      -
                    </Box>
                    <Box className="Number">{quantities[item.id] || 0}</Box>
                    <Box
                      className="symbol"
                      onClick={() => {
                        this.handleQuantityChange(item.id, 1);
                      }}
                    >
                      +
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
        </Box>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { additems } = state.cartitem;
  return { additems };
}

const mapDispatchToProps = { addItemToCart };

export default connect(mapStateToProps, mapDispatchToProps)(List);
