import {StatusBar, Platform} from 'react-native';
import _ from 'lodash';

export const filterTrendingProduct = data => {
  let filterData = [];

  filterData = data.filter(item => {
    return item.is_trending === true;
  });

  return filterData;
};

export const filterProductCategory = (products, categoryId) => {
  let filterProduct = [];

  filterProduct = products.filter(item => {
    return item.category_id === categoryId;
  });

  return filterProduct;
};

export const filterChildCategory = (categories, categoryId) => {
  let filterCategories = [];

  filterCategories = categories.filter(item => {
    return item.parent_id === categoryId;
  });

  return filterCategories;
};

export const filterStoreParentCategories = categories => {
  let filterCategories = [];

  filterCategories = categories.filter(item => {
    return item.parent_id === null;
  });

  return filterCategories;
};

export const filterUncategorizedProducts = products => {
  let filteredProducts = [];

  filteredProducts = products.filter(item => {
    return item.category_id === null;
  });

  return filteredProducts;
};

export const filterCartProducts = (cartItems, productsList) => {
  productsList.map((product, index) => {
    let cat = _.find(cartItems, {id: product.id});

    if (!_.isNil(cat)) {
      productsList[index]['quantity'] = cat.quantity;
    }
  });

  return productsList;
};
