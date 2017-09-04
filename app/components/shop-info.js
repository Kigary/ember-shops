import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['shop'],
  item: null,
  editMode: false,
  actionName: '',

  actions: {
    editShop: function() {
      this.set('editMode', true);
    },
    cancelEdit: function() {
      this.set('editMode', false);
    },
    updateShop: function() {
      this.set('editMode', false);
      this.set('actionName', 'updateShop');
      this.sendAction('actionName');
    },
    deleteShop: function(shopId) {
      this.set('actionName', 'deleteShop');
      this.sendAction('actionName', shopId);
    }
  }
});
