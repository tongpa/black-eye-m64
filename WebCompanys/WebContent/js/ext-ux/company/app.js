Ext.namespace("company");
Ext.Loader.setConfig({enabled: true});


Ext.require([
	'Ext.*',
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.panel.*',
    'Ext.layout.container.Border',
    'Ext.layout.container.Column',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.view.View',
    'Ext.form.*',    
    'Ext.tip.QuickTipManager',           
    'Ext.window.MessageBox',
    'Ext.Msg.*'
]);

//Ext.Loader.setPath('company', '../../../company');


Ext.application({
    name: 'company',
     
    launch: function() {
    	Ext.tip.QuickTipManager.init();
    	
    	console.log('app company');
     
    	var listCompany = Ext.create('company.listCompany',{url : '../company/create'});
    	
    	
    	Ext.create('Ext.container.Viewport', {
            layout: {
            	type : 'border'
            }, 
            renderTo: Ext.getBody(),
            defaults: {
                collapsible: false,
                split: true 
            },
            
            items: [{
    	        region: 'north',
    	        html: '<h1 class="x-panel-header">Company</h1>',
    	        autoHeight: true,
    	        border: false,
    	        margins: '0 0 5 0'
    	    }, {
    	        region: 'west',
    	         
    	        title: 'Navigation',
    	        width: 150
    	        // could use a TreePanel or AccordionLayout for navigational items
    	    },  {
    	        region: 'center',
    	        xtype: 'panel', // TabPanel itself has no title
    	        activeTab: 0,      // First tab active by default
    	        layout: 'fit',
    	         
    	        items: [listCompany]
    	    }]
        });
    	 
    	
    	 
    	
    }
});