import Cell from 'ember-light-table/components/cells/base';

export default Cell.extend({
    classNameBindings: ['editMode:edit-cell'],
    editMode: false,
    actions: {
        onCellClick() {
            // if(!editMode) {
            //     this.toggleProperty('editMode');
            // } else {
            //     this.
            // }
            this.toggleProperty('editMode');
        }
    }
});
