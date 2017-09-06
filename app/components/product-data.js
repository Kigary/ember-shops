import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['product'],

  item: null,
  name: '',
  quantity: null,
  price: null,
  actionName: 'deleteProduct',
  editMode: false,

  actions: {
    editProduct: function() {
      this.set('quantity', this.get('item.quantity'));
      this.set('price', this.get('item.price'));
      this.set('name', this.get('item.name'));
      this.set('editMode', true);
    },
    cancelEdit: function() {
      this.get('item').set('quantity', this.get('quantity'));
      this.get('item').set('price', this.get('price'));
      this.get('item').set('name', this.get('name'));
      this.set('editMode', false);
      this.set('quantity', '');
      this.set('price', '');
      this.set('name', '');
    },
    updateProduct: function() {
      this.get('item').save().then( _ => this.set('editMode', false));
    },
    deleteProduct: function() {
      this.sendAction('actionName', this.get('item.id'));
    }
  }
});
