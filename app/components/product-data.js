import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['product-data'],
  item: null,
  itemId: '',
  actionName: '',
  editMode: false,

  actions: {
    editProduct: function() {
      this.set('editMode', true);
    },
    cancelEdit: function() {
      this.set('editMode', false);
    },
    updateProduct: function() {
      this.get('item').save();
      this.set('editMode', false);
    },
    deleteProduct: function() {
      this.set('actionName', 'deleteProduct');
      this.sendAction('actionName', this.itemId);
    }
  }
});
