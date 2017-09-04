import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('shop');
  },
  actions: {
    didTransition: function() {
      document.title = 'Shops';
    }
  }
});
