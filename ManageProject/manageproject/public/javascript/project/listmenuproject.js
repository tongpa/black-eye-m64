Ext.Loader.setConfig({enabled: true});





Ext.define('LinkMenu', {
    extend: 'Ext.data.Model',
    fields: [
        { name:'src', type:'string' },
        { name:'caption', type:'string' }
    ]
});

Ext.create('Ext.data.Store', {
    id:'imagesStore',
    model: 'LinkMenu',
    data: [
        { src:'http://www.sencha.com/img/20110215-feat-drawing.png', caption:'Drawing & Charts' },
        { src:'http://www.sencha.com/img/20110215-feat-data.png', caption:'Advanced Data' },
        { src:'http://www.sencha.com/img/20110215-feat-html5.png', caption:'Overhauled Theme' },
        { src:'http://www.sencha.com/img/20110215-feat-perf.png', caption:'Performance Tuned' }
    ]
});

var imageTpl = new Ext.XTemplate(
    '<tpl for=".">',
        '<div style="margin-bottom: 10px;" class="thumb-wrap">',
          '<img src="{src}" />',
          '<br/><span>{caption}</span>',
        '</div>',
    '</tpl>'
);

var view_data_list = Ext.create('Ext.view.View', {
    store: Ext.data.StoreManager.lookup('imagesStore'),
    tpl: imageTpl,
    itemSelector: 'div.thumb-wrap',
    emptyText: 'No images available' 
    //renderTo: Ext.getBody()
});
//




Ext.define('My.view.Project.MenuPanel', {
	//tpl: imageTpl,
	extend: 'Ext.panel.Panel',

    initComponent: function() {
    	
    	main = this;
    	main.view = Ext.create('Ext.view.View',{
    		
    		trackOver: true,
            store: Ext.data.StoreManager.lookup('imagesStore'),
            cls: 'feed-list',
            itemSelector: '.feed-list-item',
            overItemCls: 'feed-list-item-hover',
            tpl: '<tpl for="."><div class="feed-list-item  ">{caption}</div></tpl>',
            listeners: {
                selectionchange: this.onSelectionChange,
                scope: this
            }
    	
    		
    	});
    	
    	this.items = [main.view];
    	
    	this.callParent(arguments);
     
    },

    onSelectionChange: function(selmodel, selection) {
        var selected = selection[0],
            button = this.down('button[action=remove]');
        if (selected) {
            button.enable();
        }
        else {
            button.disable();
        }
    }
});