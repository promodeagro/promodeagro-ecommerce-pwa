import { Box } from '@mui/material';
import React, { Component } from 'react';
import "../../assets/sass/components/GlobalCartIndicator.scss";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { connect } from 'react-redux';
import { navigateRouter } from 'Views/Utills/Navigate/navigateRouter';
import status from '../../Redux/Constants';
import MyCart from 'components/MyCart';
import { loginDetails } from "Views/Utills/helperFunctions";

class GlobalCartIndicator extends Component {
    constructor(props) {
        super(props);
        this.state = {
          matches: window.matchMedia("(max-width: 600px)").matches,
          myCartOpen: false,
          totalPrice: "",
          showGlobalInicator: true
        };
    }

    componentDidMount() {
        window.matchMedia("(max-width: 600px)")
        .addEventListener("change", (e) => this.setState({ matches: e.matches }));
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.cartItems.status !== this.props.cartItems.status &&
            this.props.cartItems.status === status.SUCCESS &&
            this.props.cartItems.data
        ) {
            this.setState({
                totalPrice: this.props.cartItems.data.subTotal,
            });
        }
    }

    render() {
        const { noOfcartItemsInLS } = this.props;
        const currentPath = window.location.pathname;
        const userId = loginDetails()?.userId;
    
        if (currentPath === "/cart" || noOfcartItemsInLS <= 0) {
            return null;
        }
    
        return (
            <>
                {this.state.matches && (
                    <div>
                        {this.state.showGlobalInicator ? (
                            <Box sx={{ display: "flex", alignItems: "center", height: "50px", justifyContent: "space-between" }} className="global_cart">
                                <Box sx={{ display: "flex", gap: "4px", alignItems: "center" }}>
                                    <ShoppingCartIcon />
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                        <span style={{ display: "flex", gap: "2px" }} className='item_count'>
                                            {noOfcartItemsInLS ? <p>{noOfcartItemsInLS}</p> : <></>} Item
                                        </span>
                                    </Box>
                                </Box>
    
                                <Box
                                    onClick={() => this.props.navigate(userId ? "/cart" : "/")}
                                    sx={{ display: 'flex', cursor: "pointer", alignItems: 'center', gap: "4px" }}
                                >
                                    View Cart
                                    <ArrowForwardIosIcon />
                                </Box>
                            </Box>
                        ) : null}
                    </div>
                )}
    
                <MyCart
                    open={this.state.myCartOpen}
                    handleClose={() => this.setState({ myCartOpen: false })}
                />
            </>
        );
    }
}

function mapStateToProps(state) {
    const { cartData } = state.home;
    const { cartItems, noOfcartItemsInLS } = state.cartitem;
    return {
        cartData,
        noOfcartItemsInLS,
        cartItems,
    };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(navigateRouter(GlobalCartIndicator));
