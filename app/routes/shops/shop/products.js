import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('shops.shop');
  },

  actions: {
    backToShops() {
      this.controllerFor('shops').set('isShopSelected', false);
      this.transitionTo('shops');
    },
    didTransition() {
      this.controllerFor('shops').set('isShopSelected', true);
      document.title = this.model().get('name').concat(' products');
    }
  }
});
