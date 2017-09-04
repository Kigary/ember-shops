
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('shops/shop/total-price', 'helper:shops/shop/total-price', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{shops/shop/total-price inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

