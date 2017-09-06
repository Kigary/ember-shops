import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['shop'],

  item: null,
  initialName: '',
  actionName: 'deleteShop',
  editMode: false,

  actions: {
    editShop: function() {
      this.set('initialName', this.get('item.name'));
      this.set('editMode', true);
    },
    cancelEdit: function() {
      this.get('item').set('name', this.get('initialName'));
      this.set('editMode', false);
      this.set('initialName', '');
    },
    updateShop: function() {
      this.set('editMode', false);
      this.get('item').save();
    },
    deleteShop: function(shopId) {
      this.sendAction('actionName', shopId);
    }
  }
});
