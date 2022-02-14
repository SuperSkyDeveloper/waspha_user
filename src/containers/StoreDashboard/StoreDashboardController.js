import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import StoreDashboardView from './StoreDashboardView';
import {connect} from 'react-redux';
import {
  filterTrendingProduct,
  filterStoreParentCategories,
  filterUncategorizedProducts,
  filterCartProducts,
} from '../../services/ProductsHelper';
import {
  clearStoreCategories,
  getStoreCategoriesRequest,
} from '../../actions/CategoriesActions';
import {
  clearStoreProducts,
  getStoreProductsRequest,
} from '../../actions/ProductsActions';
import { addCartProduct, clearCart } from '../../actions/CartActions';
import { storeSelectedShopId,clearSelectedShopId } from '../../actions/ShopsActions';


class StoreDashboardController extends React.Component {
  constructor() {
    super();
    this.state = {
      trendingProductList: [],
      unCategorizedProducts: [],
      loading: true,
    };
  }
  static propTypes = {
    clearStoreCategories: PropTypes.func,
    clearStoreProducts: PropTypes.func,
    getStoreProductsRequest: PropTypes.func,
    getStoreCategoriesRequest: PropTypes.func,
    storeId: PropTypes.number.isRequired,
    products: PropTypes.array,
    categories: PropTypes.array,
    cartItems: PropTypes.array,
    categoryId: PropTypes.number,
    storeName: PropTypes.string.isRequired,
    rfpVendors: PropTypes.array.isRequired,
  };
  static defaultProps = {
    clearStoreCategories: () => {},
    clearStoreProducts: () => {},
    getStoreProductsRequest: () => {},
    getStoreCategoriesRequest: () => {},
    products: [],
    categories: [],
    cartItems: [],
  };

  componentDidMount() {
    console.log({cartItems:this.props.cartItems})
    this.filterTrendingProducts();
  }

  componentDidUpdate(prevProps, prevState) {
    
    const{clearCart,storeSelectedShopId}=this.props


    if (prevProps.cartItems !== this.props.cartItems) {

      this.upDateUnCategorizedProducts();
      this.upDateTrendingProducts();
      if(this.props.selectedShopId!==this.props.storeId){
  storeSelectedShopId(this.props.storeId)


      }
  
    }
  }

  // filter  all trending products , parent categories and uncategorized products and set into state
  filterTrendingProducts = () => {
    const {
      clearStoreCategories,
      clearStoreProducts,
      getStoreProductsRequest,
      getStoreCategoriesRequest,
      storeId,
      appLanguage,
    } = this.props;

    clearStoreCategories();
    clearStoreProducts();

    const payload = {
      store_id: storeId,
      type: 'trending',
      language: appLanguage,
    };
    getStoreProductsRequest(payload, response => {
      if (response.status) {
      }

      const payload = {
        store_id: storeId,
        category_id: 0,
        language: appLanguage,
      };

      getStoreProductsRequest(payload, response => {
        if (response.status) {
        }

        const payload = {
          store_id: storeId,
          parent_id: 0,
          language: appLanguage,
        };

        getStoreCategoriesRequest(payload, response => {
          if (response.status) {
          }
          this.upDateUnCategorizedProducts();

          this.upDateTrendingProducts();
          this.setState({
            storeParentCategories: filterStoreParentCategories(
              this.props.categories,
            ),

            loading: false,
          });
        });
      });
    });
  };

  upDateTrendingProducts = () => {
    const {cartItems} = this.props;
    const trendingProducts = _.cloneDeep(
      filterTrendingProduct(this.props.products),
    );
    this.setState({
      trendingProductList: filterCartProducts(cartItems, trendingProducts),
    });
  };

  upDateUnCategorizedProducts = () => {
    const {cartItems} = this.props;
    let tempUnCategorizedProducts = _.cloneDeep(
      filterUncategorizedProducts(this.props.products),
    );

    this.setState({
      unCategorizedProducts: filterCartProducts(
        cartItems,
        tempUnCategorizedProducts,
      ),
    });
  };

  render() {
    const {
      trendingProductList,
      unCategorizedProducts,
      storeParentCategories,
      loading,
    } = this.state;
    return (
      <StoreDashboardView
        {...this.props}
        loading={loading}
        trendingProductList={trendingProductList}
        unCategorizedProducts={unCategorizedProducts}
        storeParentCategories={storeParentCategories}
      />
    );
  }
}

const mapStateToProps = ({products, categories, cart, general,shops}) => ({
  products: products.products,
  categories: categories.storeCategories,
  cartItems: cart.cart,
  appLanguage: general.appLanguage,
  selectedShopId:shops.selectedShopId
});

const actions = {
  clearStoreCategories,
  clearStoreProducts,
  getStoreProductsRequest,
  getStoreCategoriesRequest,
  clearCart,
  storeSelectedShopId,
  clearSelectedShopId,
  addCartProduct
};

export default connect(
  mapStateToProps,
  actions,
)(StoreDashboardController);
