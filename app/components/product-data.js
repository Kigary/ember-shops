import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['product-data'],
  item: null,
  iName: '',
  iQuantity: null,
  iPrice: null,
  itemId: '',
  actionName: '',
  editMode: false,

  actions: {
    editProduct: function() {
      this.set('iName', this.get('item').get('name'));
      this.set('iQuantity', this.get('item').get('quantity'));
      this.set('iPrice', this.get('item').get('price'));
      this.set('editMode', true);
    },
    cancelEdit: function() {
      this.get('item').set('name', this.get('iName'));
      this.get('item').set('quantity', this.get('iQuantity'));
      this.get('item').set('price', this.get('iPrice'));
      this.set('editMode', false);
      this.set('iName', '');
      this.set('iQuantity', '');
      this.set('iPrice', '');
    },
    updateProduct: function() {
      this.set('editMode', false);
      this.get('item').save();
    },
    deleteProduct: function() {
      this.set('actionName', 'deleteProduct');
      this.sendAction('actionName', this.itemId);
    }
  }
});
