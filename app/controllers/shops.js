import Ember from 'ember';

export default Ember.Controller.extend({
  name: '',
  isShopSelected: false,

  isAddButtonDisabled: Ember.computed('name', function() {
    return Ember.isEmpty(this.get('name'));
  }),

  actions: {
    createShop() {
      let shop = this.get('store').createRecord('shop');
      shop.set('name', this.get('name'));
      shop.save().then( _ => this.set('name', ''));
    },
    deleteShop(shopId) {
      return this.get('store').findRecord('shop', shopId)
        .then(shop => shop.get('products')
          .then(products => products
            .forEach(product => this.store.findRecord('product', product.id)
                  .then(p => p.destroyRecord())
            )
          )
          .then( _ => shop.destroyRecord())
      );
    }
  }
});
