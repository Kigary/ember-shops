import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('shop');
  },

  actions: {
    didTransition() {
      document.title = 'Shops';
    }
  }
});
