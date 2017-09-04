import Ember from 'ember';

export function totalPrice(params) {
  return params[0] && params[0].reduce(
    (total, product) => {
      return total + product.get('price') * product.get('quantity');
    }, 0
  );
}

export default Ember.Helper.helper(totalPrice);
