import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ProductListingView from './ProductListingView';
import {connect} from 'react-redux';
import {
  filterProductCategory,
  filterChildCategory,
} from '../../services/ProductsHelper';
import {getStoreProductsRequest} from '../../actions/ProductsActions';
import {getStoreCategoriesRequest} from '../../actions/CategoriesActions';
import {CategoryItem} from '../../components';

class ProductListingController extends React.Component {
  constructor() {
    super();
    this.state = {
      productsList: [],
      categoriesList: [],
      loading: true,
    };
  }
  static propTypes = {
    categoryId: PropTypes.number.isRequired,
    storeId: PropTypes.number.isRequired,
    category: PropTypes.object,
    getStoreProductsRequest: PropTypes.func,
    getStoreCategoriesRequest: PropTypes.func,
    categories: PropTypes.array,
    products: PropTypes.array,
    cartItems: PropTypes.array,
    rfpVendors: PropTypes.array.isRequired,
  };
  static defaultProps = {
    getStoreProductsRequest: () => {},
    getStoreCategoriesRequest: () => {},
    categories: [],
    products: [],
    cartItems: [],
  };

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cartItems !== this.props.cartItems) {
      this.upDateProductsListing();
    }
  }

  init = () => {
    const {
      getStoreProductsRequest,
      getStoreCategoriesRequest,
      category,
      storeId,
      cartItems,
      appLanguage,
    } = this.props;

    const payload = {
      store_id: storeId,
      category_id: category.id,
      language: appLanguage,
    };

    getStoreProductsRequest(payload, response => {
      getStoreCategoriesRequest(payload, response => {
        this.upDateProductsListing();
        this.setState({
          categoriesList: filterChildCategory(
            this.props.categories,
            category.id,
          ),
          loading: false,
        });
      });
    });
  };

  upDateProductsListing = () => {
    const {category, cartItems} = this.props;

    let productsList = _.cloneDeep(
      filterProductCategory(this.props.products, category.id),
    );

    if (!_.isEmpty(cartItems)) {
      productsList.map((product, index) => {
        let cat = _.find(cartItems, {id: product.id});

        if (!_.isNil(cat)) {
          productsList[index]['quantity'] = cat.quantity;
        }
      });
    }

    this.setState({productsList});
  };

  render() {
    const {productsList, categoriesList, loading} = this.state;
    return (
      <ProductListingView
        {...this.props}
        productsList={productsList}
        categoriesList={categoriesList}
        loading={loading}
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

const actions = {getStoreProductsRequest, getStoreCategoriesRequest};

export default connect(
  mapStateToProps,
  actions,
)(ProductListingController);
