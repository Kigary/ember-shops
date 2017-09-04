import Ember from 'ember';

export default Ember.Controller.extend({
  name: '',
  isShopSelected: false,
  isAddButtonDisabled: Ember.computed('name', function() {
    return Ember.isEmpty(this.get('name'));
  }),

  actions: {
    createShop: function() {
      let self = this;
      let shop = this.get('store').createRecord('shop', {
        name: this.get('name'),
        products: []
      });
      shop.save().then(function() {
        self.set('name', '');
      });
    },
    updateShop: function() {
      return this.get('model').save();
    },
    deleteShop: function(shopId) {
      return this.get('store').findRecord('shop', shopId).then(
        (shop) => {
          let productList = [];
          shop.get('products').then(
            (products) => {
              products.forEach((product) => productList.push(product.id));
              for(let i = 0; i < productList.length; i++) {
                this.store.findRecord('product', productList[i]).then(
                  (p) => p.destroyRecord()
                )
              }
            }
          );
          shop.destroyRecord();
        }
      );
    }
  }
});
