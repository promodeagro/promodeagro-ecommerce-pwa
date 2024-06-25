import React, { Component } from "react";
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import Logo from "../../assets/img/logo.png";
import supportIcon from "../../assets/img/support-icon.png";
import deliverIcon from "../../assets/img/deliver-icon.png";
import notificationIcon from "../../assets/img/notification-icon.png";
import cardIcon from "../../assets/img/card-icon.png";
import searchIcon from "../../assets/img/search-icon.png";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CategoriesToggle: false
    };
  }
  handleClickCategoriesToggle = () => {
    this.setState({
      CategoriesToggle: !this.state.CategoriesToggle,
    });
  };


  render() {
    const { CategoriesToggle } = this.state;
    return (
      <div className="header">
        <Box className="header-top-container">
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={4}>
                <Box className="logo"><img src={Logo} alt="" /></Box>
              </Grid>
              <Grid item xs={6} sm={6} md={8}>
                <Box className="header-top-right">
                  <Box className="support-box"><img src={supportIcon} alt="" /> Customer Support 24/7</Box>
                  <Box className="deliver-box">Deliver to <img src={deliverIcon} alt="" /> <span>500005,Himayat Sagar Road </span></Box>
                  <Box className="language-list-box">
                    <FormControl fullWidth>
                      <NativeSelect
                        defaultValue={10}
                        inputProps={{
                          name: 'age',
                          id: 'uncontrolled-native',
                        }}
                      >
                        <option value={10}>English</option>
                        <option value={20}>Armenian</option>
                        <option value={30}>German</option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box className="header-bottom-container">
          <Container>
            <Grid container spacing={2} alignItems={'center'}>
              <Grid item xs={6} sm={6} md={3}>
                <Box className="categories-container">

                  <Box className="categories-toggle" onClick={this.handleClickCategoriesToggle}>
                    Shop by Categories <span>{CategoriesToggle ? (<KeyboardArrowUpIcon />) : (
                      <KeyboardArrowDownIcon />
                    )}</span>
                  </Box>
                  {CategoriesToggle ? (
                    <Box className="categories-box">
                      <Box className="categories">
                        <h2>Vegetables</h2>
                        <ul>
                          <li><a href="#">Cut & peeled Veggies </a>
                            <Box className="sub-categories">
                              <h3>Fruits </h3>
                              <ul>
                                <li><a href="#">Exotic Fruits</a></li>
                                <li><a href="#">Seasonal Fruits</a></li>
                                <li><a href="#">Juices & Mixes</a></li>
                              </ul>
                            </Box>
                          </li>
                          <li><a href="#">Leafy Vegetables </a>
                            <Box className="sub-categories">
                              <h3>Fruits </h3>
                              <ul>
                                <li><a href="#">Exotic Fruits</a></li>
                                <li><a href="#">Seasonal Fruits</a></li>
                                <li><a href="#">Juices & Mixes</a></li>
                              </ul>
                            </Box>
                          </li>
                          <li><a href="#">Fresh Vegetables </a>
                            <Box className="sub-categories">
                              <h3>Fruits </h3>
                              <ul>
                                <li><a href="#">Exotic Fruits</a></li>
                                <li><a href="#">Seasonal Fruits</a></li>
                                <li><a href="#">Juices & Mixes</a></li>
                              </ul>
                            </Box>
                          </li>
                          <li><a href="#">Herbs and Seasoning </a>
                            <Box className="sub-categories">
                              <h3>Fruits </h3>
                              <ul>
                                <li><a href="#">Exotic Fruits</a></li>
                                <li><a href="#">Seasonal Fruits</a></li>
                                <li><a href="#">Juices & Mixes</a></li>
                              </ul>
                            </Box>
                          </li>
                        </ul>
                      </Box>
                    </Box>
                  ) : (
                    ""
                  )}
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Box className="search-box">
                  <TextField id="outlined-search" className="search" variant="outlined" InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={searchIcon} alt="" />
                      </InputAdornment>
                    ),
                  }} defaultValue="Search Your favorite veggies..." />
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} md={3}>
                <Box display={'inline-flex'} justifyContent={'flex-end'} width={'100%'}>
                  <Button variant="outlined" className="notification" startIcon={<img src={notificationIcon} alt="" />}>
                    <p></p>
                  </Button>
                  <Button variant="outlined" className="card" startIcon={<img src={cardIcon} alt="" />}>
                    <p>2</p>
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </div>
    );
  }
}


export default Header;
