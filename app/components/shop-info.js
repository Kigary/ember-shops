import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['shop'],
  item: null,
  initialName: '',
  editMode: false,
  actionName: '',

  actions: {
    editShop: function() {
      this.set('initialName', this.get('item').get('name'));
      this.set('editMode', true);
    },
    cancelEdit: function() {
      this.get('item').set('name', this.get('initialName'));
      this.set('editMode', false);
      this.set('initialName', '');
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
