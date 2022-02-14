import {combineReducers} from 'redux';

import navigator from './navigator';
import user from './user';
import delivery from './delivery';
import products from './products';
import cart from './cart';
import orders from './orders';
import categories from './categories';
import shops from './shops';
import savelocations from './savelocations';
import general from './general';
import proposals from './proposals';
import rfp from './rfp';
import ratings from './ratings';
import promoCodes from './promoCodes';
import chat from './chat';

export default combineReducers({
  route: navigator,
  user,
  delivery,
  products,
  cart,
  orders,
  categories,
  shops,
  savelocations,
  general,
  proposals,
  rfp,
  ratings,
  promoCodes,
  chat,
});
