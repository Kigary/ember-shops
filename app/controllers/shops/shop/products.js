import Ember from 'ember';

export default Ember.Controller.extend({
  name: '',
  quantity: null,
  price: null,
  shopController: Ember.inject.controller('shops'),
  totalPrice: Ember.computed('model.products.@each.price', 'model.products.@each.quantity', function() {
    return this.get('model.products').reduce(
            (acc, product) => {
              return acc + product.get('price') * product.get('quantity');
            }, 0
          );
  }),
  isAddButtonDisabled: Ember.computed('name', 'quantity', 'price', function() {
    return Ember.isEmpty(this.get('name'))
        || Ember.isEmpty(this.get('quantity'))
        || Ember.isEmpty(this.get('price'));
  }),

  actions: {
    addProduct: function() {
      let store = this.get('store'),
          shop = this.get('model'),
          product = store.createRecord('product', {
            name: this.get('name'),
            quantity: this.get('quantity'),
            price: this.get('price')
          });
      shop.get('products').pushObject(product);
      product.save().then(() => {
        shop.save();
        this.set('name', '');
        this.set('quantity', null);
        this.set('price', null);
      })
    },
    deleteProduct: function(itemId) {
      let store = this.get('store');
      store.findRecord('product', itemId).then(
        function(p) {
          p.destroyRecord();
        }
      );
    }
  }
});
