import {fork} from 'redux-saga/effects';
import user from './user';
import init from './init';
import delivery from './delivery';
import categories from './categories';
import shops from './shops';
import savelocations from './savelocations';
import rfp from './rfp';
import products from './products';
import general from './general';
import orders from './orders';
import proposals from './proposals';
import payment from './payment';
import rating from './rating';
import promoCodes from './promoCodes';
import chat from './chat';

export default function* root() {
  yield fork(user);
  yield fork(init);
  yield fork(delivery);
  yield fork(categories);
  yield fork(shops);
  yield fork(savelocations);
  yield fork(rfp);
  yield fork(products);
  yield fork(general);
  yield fork(orders);
  yield fork(proposals);
  yield fork(payment);
  yield fork(rating);
  yield fork(promoCodes);
  yield fork(chat);
}
