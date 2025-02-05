import { Box, CircularProgress, Container } from '@mui/material'
import React, { Component } from 'react'
import { setSearchTerm } from '../../../Redux/ProductFilters/ProductFiltersSlice';
import { connect } from 'react-redux';
import ProductItemView from "../../../components/AddRemoveProductComponents/allItemProducts";
import status from "../../../Redux/Constants";
import { fetchGlobalSearchItems } from '../../../Redux/ProductFilters/ProductFiltersThunk';
import TrendingCategories from './Components/TrendingCategories';

  class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
          matches: window.matchMedia("(max-width: 600px)").matches,
          searchLoader: false,
          productsFiltersData: [],
          showResult:false
        }; 
      }

      
      componentDidUpdate(prevProps) {

        if (this.props.searchTerm !== prevProps.searchTerm) {
            if (this.props.searchTerm.trim() !== "") {
              this.setState({ searchLoader: true });
            
            }}

        if (
            prevProps.globalSearchRes.status !== this.props.globalSearchRes.status &&
            this.props.globalSearchRes.status === status.SUCCESS
          ) {
            if (this.props.globalSearchRes.data) {
              this.setState({
                showResult:true,
                searchLoader: false,
                productsFiltersData: this.props.globalSearchRes.data,
              });
            }
          }
 
         
      }

    handleSearchUpdate = (newValue) => {
        this.props.setSearchTerm(newValue); // Update search term
        this.props.fetchGlobalSearchItems( { query: newValue})
      };

      
  render() {
const {searchTerm} = this.props
const {searchLoader , showResult , productsFiltersData} = this.state
    const suggestionItems = [
        { text: 'Leavy Vegetables', imgSrc: 'https://promodeagro-media-bucket.s3.ap-south-1.amazonaws.com/productsImages/6e764e1881667becssaglag.jpg' },
        { text: 'Curry Leave', imgSrc: 'https://promodeagro-media-bucket.s3.ap-south-1.amazonaws.com/productsImages/6e764e1881667becssaglag.jpg' },
        { text: 'Raw Banana', imgSrc: 'https://prod-promodeargo-admin-api-mediabucket46c59097-tynsj9joexji.s3.us-east-1.amazonaws.com/%EF%BF%BD1f%EF%BF%BD%EF%BF%BD%EF%BF%BD%1C%0E%EF%BF%BD%5Eo%5E%EF%BF%BD%EF%BF%BD%12Raw%20Banana.jpg' },
        { text: 'Coriander Leave', imgSrc: 'https://prod-promodeargo-admin-api-mediabucket46c59097-tynsj9joexji.s3.us-east-1.amazonaws.com/%EF%BF%BD%EF%BF%BD%EF%BF%BD%EF%BF%BD2%EF%BF%BD%EF%BF%BD%1A%EF%BF%BD%EF%BF%BD5%12%7B%EF%BF%BD%EF%BF%BD5corriandar.webp' },
        // Add more suggestion items as necessary
      ];

      const highlightText = (text, searchTerm) => {
        if (!searchTerm) return text; // If no search term, return the original text
    
        // Split the text by the search term, and wrap the matching part in a <span> to highlight it
        const parts = text.split(new RegExp(`(${searchTerm})`, 'gi')); // Using 'gi' for case-insensitive matching
    
        return parts.map((part, index) => 
          part.toLowerCase() === searchTerm.toLowerCase() 
            ? <span key={index} style={{ color: 'black' }}>{part}</span> 
            : part
        );
      };

      const Trendingcategories = [
        {
          imageUrl: 'https://promodeagro-images-prod-ui-root.s3.us-east-1.amazonaws.com/categories/fresh_vegetables.png',
          name: 'Bengali Special',
        },
        {
          imageUrl: 'https://promodeagro-images-prod-ui-root.s3.us-east-1.amazonaws.com/categories/fresh_vegetables.png',
          name: 'Fresh Vegetables',
        },
        {
          imageUrl: 'https://promodeagro-images-prod-ui-root.s3.us-east-1.amazonaws.com/categories/fresh_fruits.png',
          name: 'Groceries',
        },
        {
          imageUrl: 'https://promodeagro-images-prod-ui-root.s3.us-east-1.amazonaws.com/categories/eggs_meat_%26_fish.png',
          name: 'Eggs, Meat & Fish',
        },
      ];
  
    return (

      <Container className="main-container">
 
 {
  this.props.searchTerm ? (
<>
<Box className="search_suggestions_container">
{suggestionItems.map((item, index) => {
        return (
          <Box onClick={()=> this.handleSearchUpdate(item.text)}  className="search_suggestions_names" key={index}>
            <Box>
              <img src={item.imgSrc} alt={item.text} />
            </Box>
            <span>{highlightText(item.text, searchTerm)}</span>
          </Box>
        );
      })}
</Box>

<Box className="result_products_container">
 {showResult ? (
              searchLoader ? (
                <Box sx={{justifyContent:'center' , padding:'20px',height:"maxContent", alignItems:'center', display:'flex'}} className="search-loader">
                  <CircularProgress className="common-loader" />
                </Box>
              ) : searchTerm && productsFiltersData.length === 0 ? (
                <p className="no-data">There is no data</p>
              ) : (
                <>
                <h2>Showing results for “{this.props.searchTerm}”</h2>
              
                <Box className="products_container">
                <ProductItemView   productList={productsFiltersData}  />
                </Box>
                </>
              )
            ) : null}
</Box>
</>
 ) : (
<>
<Box className="try_something_new">
<h4>Try something new</h4>

<Box className="suggested_categories">
<Box className="suggested_categories">
<span onClick={() => this.handleSearchUpdate("bengali bazaar")}>bengali bazaar</span>
<span onClick={() => this.handleSearchUpdate("Fresh Fruits")}>Fresh Fruits</span>
<span onClick={() => this.handleSearchUpdate("Fresh Vegetables")}>Fresh Vegetables</span>
<span onClick={() => this.handleSearchUpdate("Desi Eggs")}>Desi Eggs</span> 
<span onClick={() => this.handleSearchUpdate("Bengali Ghee")}>Bengali Ghee</span>
<span onClick={() => this.handleSearchUpdate("Snacks")}>Snacks</span>
</Box>
</Box>

</Box>

<Box className="trending_category">
<h4>Most Trending Category</h4>

<Box className="trending_category_box_con">
{Trendingcategories.map((category, index) => (
        <Box key={index} className="trending_category_box">
          <Box
            sx={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              overflow: 'hidden',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <img src={category.imageUrl} alt={category.name} />
          </Box>
          <span>{category.name}</span>
        </Box>
      ))}
</Box>
<TrendingCategories/>
</Box>
</>

 )
} 
      </Container>


    )
  }
}



function mapStateToProps(state) {
    const { additems, cartItems, updateItems, deleteItems } = state.cartitem;
    const { shopCategoryData } = state.allproducts;
    const { globalSearchRes , searchTerm} = state.allproductsfilters;
    return {
      additems,
      cartItems,
      updateItems,
      deleteItems,
      shopCategoryData,
      globalSearchRes,searchTerm
    };
  }
  
  const mapDispatchToProps = {
    setSearchTerm, // Add setSearchTerm to mapDispatchToProps
    fetchGlobalSearchItems,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(index);





//   <div>
//   Current search term: {this.props.searchTerm}
//   <button onClick={() => this.handleSearchUpdate("new query")}>
//     Set Search Term
//   </button>
// </div>