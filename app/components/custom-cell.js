import Ember from 'ember';
import ClickOutside from '../mixins/click-outside';

export default Ember.Component.extend(ClickOutside, {
    classNames: ['uc-cell'],
    classNameBindings: ['editMode:edit-cell'],
    editMode: false,
    initialValue: '',
    tableService: Ember.inject.service(),
    valueChanged: Ember.computed('value','initialValue', function () {
        return this.get('value') !== this.get('initialValue');
    }),
    init() {
        this._super(...arguments);
        this.set('initialValue', this.get('value'));
        this.get('valueChanged');
    },
    clickOutside() {
        if(this.get('editMode')) {
            this.toggleProperty('editMode');
            console.log(this.get('valueChanged'));
            console.log(this.get('initialValue'), ' --> ', this.get('value'));
            if(this.get('valueChanged')) {
                this.get('tableService').trigger('changeData');
                this.set('initialValue', this.get('value'));
            }
            // this.sendAction('someAction');
        }
    },
    _attachClickOutsideHandler: Ember.on('didInsertElement', function() {
        Ember.run.next(this, this.addClickOutsideListener);
    }),

    _removeClickOutsideHandler: Ember.on('willDestroyElement', function() {
        this.removeClickOutsideListener();
    }),
    actions: {
        cellClicked() {
            this.toggleProperty('editMode');
            this.get('tableService').trigger('cellClick');
        }
    }
});
