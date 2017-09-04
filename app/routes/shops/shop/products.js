import Ember from 'ember';

export default Ember.Route.extend({
  actionName: 'addProduct',

  model: function() {
    return this.modelFor('shops.shop');
  },

  actions: {
    backToShops: function() {
      let route = this,
          shopController = this.get('controller').get('shopController');
      shopController.set('isShopSelected', false);
      route.transitionTo('shops');
    },
    didTransition: function() {
      this.get('controller').get('shopController').set('isShopSelected', true);
      document.title = this.model().get('name') + ' products';
    }
  }
});
