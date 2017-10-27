import Ember from 'ember';
import Table from 'ember-light-table';

export default Ember.Component.extend({
    tableService: Ember.inject.service(),
    classNames: ['uc-table'],
    jsonData: [
        {
            "firstName": "David",
            "lastName": "Mirumyan"
        },
        {
            "firstName": "Ashot",
            "lastName": "Vardanyan"
        },
        {
            "firstName": "Vahan",
            "lastName": "Arakelyan"
        },
        {
            "firstName": "+"
        }
    ],
    model: [],
    columns: Ember.computed(function() {
        let self = this;
        return [{
            label: 'First Name',
            valuePath: 'firstName',
            resizable: true,
            draggable: true,
            width: '150px',
            cellComponent: 'custom-cell',
            classNames: ['yoohoo'],
        }, {
            label: 'Last Name',
            valuePath: 'lastName',
            resizable: true,
            draggable: true,
            width: '150px'
        }]
    }).readOnly(),

    enableSync: true,
    table: null,

    sort: 'firstName',
    dir: 'asc',

    sortedModel: Ember.computed.sort('model', 'sortDef'),
    sortDef: Ember.computed('sort', 'dir', function() {
        return [this.get('sort') + ':' + this.get('dir')];
    }),

    init() {
        this._super(...arguments);
        this.fetchRecords();
        let table = new Table(this.get('columns'), this.get('sortedModel'), { enableSync: this.get('enableSync') });
        let sortColumn = table.get('allColumns').findBy('valuePath', this.get('sort'));
        if (sortColumn) {
            sortColumn.set('sorted', true);
        }
        this.set('table', table);
    },

    _setup: Ember.on('didInsertElement', function(){
        this.get('tableService').on('changeData', this, 'onChangeData');
    }),

    onChangeData() {
        console.log('request sent');
    },

    fetchRecords() {
        let records = this.get('jsonData');
        this.get('model').pushObjects(records);
    },

    actions: {
        addColumn() {
            let column = {
                label: 'Default',
                valuePath: 'default',
                resizable: true,
                width: '100px'
            };
            let rows = this.get('sortedModel').forEach(row => row.default = 'Fill Me!');
            this.get('table').addColumn(column);
        },
        addRow() {
            let valuePaths = [];
            this.get('table.allColumns').forEach(col => valuePaths.push(col.valuePath));
            let row = {};
            valuePaths.forEach(vp => Object.defineProperty(row, vp, {value: 'default'}));
            this.get('jsonData').pushObject(row);
            this.get('table').addRow(row);
        },
        onColumnClick(column) {
            console.log(column);
            this.setProperties({
                dir: column.ascending ? 'asc' : 'desc',
                sort: column.get('valuePath'),
            });
            this.get('model').clear();
            this.fetchRecords();
            this.get('table').setRows(this.get('sortedModel'));
        }
    }
});
