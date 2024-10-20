import { all, call } from 'redux-saga/effects';
import { shopSagas } from './shop/shop.sagas';  
import { userSagas } from './user/user.sagas';  
import { cartSagas } from './cart/cart.sagas';

// Root saga combines all the sagas in your app
export default function* rootSaga() {
  yield all([
    call(shopSagas),  
    call(userSagas), call(cartSagas)
  ]);
}
