Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('risks', '/javascript/project');

Ext.require([
             'Ext.*',
             'Ext.form.*',
             'Ext.layout.container.Column',
             //'Ext.ux.form.MultiSelect',
             //'Ext.ux.form.ItemSelector',
             'Ext.tip.QuickTipManager',
             //'Ext.ux.ajax.JsonSimlet',
             //'Ext.ux.ajax.SimManager',             
             'Ext.window.MessageBox'
             
         ]);

Ext.application({
    name: 'My',
    launch: function() {
    	Ext.tip.QuickTipManager.init();
    	
    	var project_test = Ext.create('Ext.Panel', {
    	    width: 500,
    	    
    	    title: "AnchorLayout Panel",
    	    layout: 'anchor',
    	    items: [
    	        {
    	            xtype: 'panel',
    	            title: '75% Width and 20% Height',
    	            anchor: '75%'
    	        },
    	        {
    	            xtype: 'panel',
    	            title: 'Offset -300 Width & -200 Height',
    	            anchor: '75%'
    	        },
    	        {
    	            xtype: 'panel',
    	            title: 'Mixed Offset and Percent',
    	            anchor: '75%'
    	        }
    	    ]
    	});
    	 
    	var project_view = Ext.create('My.view.Project.Panel',{
    		 
    	    width: 400 
    	} );
    	
    	var project_grid = Ext.create('Ext.grid.Panel', {
    	    title: 'Project',
    	    store: myStore,//Ext.data.StoreManager.lookup('simpsonsStore'),
    	    columns: [
    	        { text: 'description',  dataIndex: 'description' },
    	        { text: 'create_date', dataIndex: 'create_date', flex: 1 },
    	        { text: 'active', dataIndex: 'active' }
    	    ],
    	    height: 200,
    	    width: 400 
    	});


    	//aaron.eat("Salad"); // alert("Aaron is eating: Salad");
    	 
    	Ext.create('Ext.container.Viewport', {
    		renderTo : 'test-app',
            layout: {
                type: 'border'
            },
            defaults: {
                collapsible: true,
                split: true,
                bodyStyle: 'padding:15px'
            },
             
            items: [{
            	 region: 'north',
                 collapsible: true,
                 title: 'North',
                 split: true,
                 height: 50,
                 minHeight: 50,
                 html: 'north'
                
            } ,{
                title: 'Menu',
                region:'west',
                margins: '5 0 0 0',
                cmargins: '5 5 0 0',
                width: 175,
                minSize: 100,
                maxSize: 250
            } , {
                title: 'Center Region',
                region: 'center',
                split: false,
                xtype: 'panel',
                layout: 'auto',
                margins: '5 5 0 0',
                items: [project_view,project_grid]
            }
            ]
    	});
    }
	
	
});
    	
Ext.define('My.view.Project.ProjectNameField',{
	extend : 'Ext.form.field.Text',
	alias : 'my.projectname',
	fieldLabel : 'Project Name',
	name: 'project_name'	,
	id : 'project_name',
	allowBlank: false
});

Ext.define('My.view.Project.SaveProject',{
	extend : 'Ext.button.Button',
	alias : 'my.saveProject',
	text: 'Save',
	action: 'save',
    formBind: true
});


Ext.create('Ext.data.Store', {
    storeId:'simpsonsStore',
    fields:['name', 'email', 'phone'],
    data:{'items':[
        { 'name': 'Lisa',  "email":"lisa@simpsons.com",  "phone":"555-111-1224"  },
        { 'name': 'Bart',  "email":"bart@simpsons.com",  "phone":"555-222-1234" },
        { 'name': 'Homer', "email":"homer@simpsons.com",  "phone":"555-222-1244"  },
        { 'name': 'Marge', "email":"marge@simpsons.com", "phone":"555-222-1254"  }
    ]},
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});




Ext.define('My.view.Project.Panel', {
    name: 'Unknown',
    extend : 'Ext.panel.Panel',
     
    layout: 'anchor',
    constructor: function(config ) {
    	
    	main = this;
    	main.project_name  = Ext.create('My.view.Project.ProjectNameField');
    	main.saveProject =  Ext.create('My.view.Project.SaveProject');
    	this.items = [main.project_name];
    	//this.buttons = [main.saveProject];
    	
    	this.dockedItems = [{
			xtype :'toolbar',
			dock : 'bottom',
			ui : 'footer',
			layout : {
				pack : 'center'
			},
			items : [main.saveProject			]
		}]  
    	
    	this.callSuper(arguments);
    },

    eat: function(foodType) {
        alert(this.name + " is eating: " + foodType);
    }
});