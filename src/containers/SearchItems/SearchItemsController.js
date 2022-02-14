import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import SearchItemsView from './SearchItemsView';
import {connect} from 'react-redux';
import {searchStoreProductsRequest} from '../../actions/ProductsActions';
import util from '../../util';
import {filterCartProducts} from '../../services/ProductsHelper';
import {Keyboard} from 'react-native';
import {alertMessage} from '../../actions/GeneralActions';

class SearchItemsController extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      loading: false,
      searchedProducts: [],
      searchedCategories: [],
    };
  }
  static propTypes = {
    storeId: PropTypes.number.isRequired,
    categoryId: PropTypes.number.isRequired,
    rfpVendors: PropTypes.number.isRequired,
    cartItems: PropTypes.array,
    placeholder: PropTypes.string,
    searchStoreProductsRequest: PropTypes.func,
  };
  static defaultProps = {
    placeholder: '',
    cartItems: [],
    searchStoreProductsRequest: () => {},
  };

  setValue = key => {
    this.setState(key, this.searchForItems);
  };

  searchValueFocus = () => {
    this.searchValueRef.focus();
  };

  searchForItems = () => {
    const {
      storeId,
      searchStoreProductsRequest,
      appLanguage,
      alertMessage,
    } = this.props;

    if (_.isEmpty(this.state.searchValue)) {
      this.setState({searchedProducts: [], searchedCategories: []});
      return true;
    }

    const payload = {
      store_id: storeId,
      search_text: this.state.searchValue,
      language: appLanguage,
    };
    // this.setState({loading: true});
    searchStoreProductsRequest(payload, (response, data) => {
      // this.searchValueFocus();
      if (response) {
        this.filterSearchedItems(data);
        this.setState({loading: false});
      } else {
        this.setState({searchedProducts: [], loading: false});
      }
    });
  };

  filterSearchedItems = data => {
    const {cartItems} = this.props;
    let searchedProducts = filterCartProducts(cartItems, data.products);
    this.setState({searchedProducts, searchedCategories: data.categories});
  };

  render() {
    const {
      searchValue,
      searchedProducts,
      loading,
      searchedCategories,
    } = this.state;
    return (
      <SearchItemsView
        searchValue={searchValue}
        searchedProducts={searchedProducts}
        searchedCategories={searchedCategories}
        loading={loading}
        searchForItems={this.searchForItems}
        setValue={this.setValue}
        searchValueRef={ref => {
          this.searchValueRef = ref;
        }}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({cart, general}) => ({
  cartItems: cart.cart,
  appLanguage: general.appLanguage,
});

const actions = {searchStoreProductsRequest, alertMessage};

export default connect(
  mapStateToProps,
  actions,
)(SearchItemsController);
