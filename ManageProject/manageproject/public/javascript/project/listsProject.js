Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('My', '/javascript/project');

Ext.require([
             'Ext.*',
             'Ext.form.*',
             'Ext.layout.container.Column',
             //'Ext.ux.form.MultiSelect',
             //'Ext.ux.form.ItemSelector',
             'Ext.tip.QuickTipManager',
             //'Ext.ux.ajax.JsonSimlet',
             //'Ext.ux.ajax.SimManager',             
             'Ext.window.MessageBox',
             
             'Ext.grid.*',
             'Ext.data.*',
             'Ext.util.*',
             'Ext.state.*' 
             
         ]);


 







Ext.application({
    name: 'My',
    launch: function() {
    	Ext.tip.QuickTipManager.init();
    	
    	 
    	 
    	var project_view = Ext.create('My.view.Project.Panel',{
    		 
    	    width: '60%' 
    	} );
    	
    	var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
    	
    	
    	var viewmenu = Ext.create('My.view.Project.MenuPanel');
    	
    	viewmenu.setVisible(false);
    	
    	var project_grid = Ext.create('Ext.grid.Panel', {
    	   
    	    store: myStore,//Ext.data.StoreManager.lookup('simpsonsStore'),
    	   // selType: 'rowmodel',
    	    plugins: [rowEditing],
    	    
    	    columns: [
    	        { text: 'description',  dataIndex: 'description' ,width: '45%', flex: 1,
    	            editor: {
    	                // defaults to textfield if no xtype is supplied
    	                allowBlank: false
    	            }},
    	     //   { text: 'create_date', dataIndex: 'create_date',  renderer:  function(val){   return val.substring(0,val.indexOf(' '));}  ,width: '10%'  }, 
    	        {
    	            xtype: 'checkcolumn',
    	            header: 'Active?',
    	            dataIndex: 'active',
    	            width: '10%',
    	            editor: {
    	                xtype: 'checkbox',
    	                cls: 'x-grid-checkheader-editor'
    	            } 
    	        },
    	        {
                    header: 'Manage',
                    renderer: function (v, m, r) {
                        var id = Ext.id();
                        Ext.defer(function () {
                            Ext.widget('button', {
                                renderTo: id,
                                text: 'Manage',// + r.get('name'),
                                width: 75,
                                handler: function () { Ext.Msg.alert('Info', r.get('name'));  viewmenu.setVisible(true); main.center_panel.setVisible(false); }
                            });
                        }, 50);
                        return Ext.String.format('<div id="{0}"></div>', id);
                    } ,width: '12%'
    	        } 
    	       /*, {
        	        
                    header: 'Delete',
                    renderer: function (v, m, r) {
                        var id = Ext.id();
                        Ext.defer(function () {
                            Ext.widget('button', {
                                renderTo: id,
                                text: 'Delete',// + r.get('name'),
                                width: 75,
                                handler: function () { 
                                	Ext.Msg.show(
                                			{
                                				title:'Info',
                                				message :"Do you want to delete : " +r.get('description'),
                                				buttons: Ext.Msg.YESNO ,
                                				icon: Ext.Msg.QUESTION,
                                				fn: function(btn) {
				                                    if (btn === 'yes') {
				                                        console.log('Yes pressed');
				                                    } else if (btn === 'no') {
				                                        console.log('No pressed');
				                                    } else {
				                                        console.log('Cancel pressed');
				                                    } 
                                				}  
                                			}
                                			)  
                                }
                            });
                        }, 50);
                        return Ext.String.format('<div id="{0}"></div>', id);
                    } ,width: '12%'
        	        
                },
    	        {
        	        
                    header: 'Edit',
                    renderer: function (v, m, r) {
                        var id = Ext.id();
                        Ext.defer(function () {
                            Ext.widget('button', {
                                renderTo: id,
                                text: 'Edit',// + r.get('name'),
                                width: 75,
                                handler: function () { Ext.Msg.alert('Info', r.get('name')) }
                            });
                        }, 50);
                        return Ext.String.format('<div id="{0}"></div>', id);
                    } ,width: '12%'
        	        
                }*/
    	   
    	 
    	        
    	        ],
    	    height: '100%',
    	    tbar: [{
                text: 'Add Employee',
                 
                handler : function() {
                    rowEditing.cancelEdit();
 
                    // Create a model instance
                    var r = Ext.create('ProjectData', {
                    	id_projects: '',
                    	description: '',
                    	active: true,
                    	create_date: Ext.Date.clearTime(new Date()),
                    	update_date: Ext.Date.clearTime(new Date())
                    });
 
                   // 
                    myStore.insert(0, r);
                    rowEditing.startEdit(0, 0);
                }
            }, {
                itemId: 'removeProject',
                text: 'Remove Employee',
                
                handler: function() {
                    var sm = project_grid.getSelectionModel();
                    rowEditing.cancelEdit();
                    myStore.remove(sm.getSelection());
                    if (myStore.getCount() > 0) {
                        sm.select(0);
                    }
                },
                disabled: true
            }],
            
    	    width: '60%'  ,
            listeners: {
                'selectionchange': function(view, records) {
                	project_grid.down('#removeProject').setDisabled(!records.length);
                }
            }
    	    	
    	   /*, listeners: {
                selectionchange: function(model, records) {
                    var json, name, i, l, items, series, fields;
                    if (records[0]) {
                    	
                    	
                        rec = records[0];
                        if (!form) {
                            form = this.up('form').getForm();
                            fields = form.getFields();
                            fields.each(function(field){
                                if (field.name != 'company') {
                                    field.setDisabled(false);
                                }
                            });
                        } else {
                            fields = form.getFields();
                        }
                        
                        // prevent change events from firing
                        fields.each(function(field){
                            field.suspendEvents();
                        });
                        form.loadRecord(rec);
                        updateRecord(rec);
                        fields.each(function(field){
                            field.resumeEvents();
                        });
                       
                    }
                }
    	    }*/
    	});

    	
    	main.center_panel = Ext.create('Ext.panel.Panel',{
    			 layout: 'auto',
                 margins: '5 5 0 0',
                 items: [project_view,project_grid]
    	});
    	
    	 
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
                 //title: 'North',
                 split: true,
                 height: 50,
                 minHeight: 50
                //, html: 'north'
                
            } ,{
                title: 'Menu',
                region:'west',
                margins: '5 0 0 0',
                cmargins: '5 5 0 0',
                width: 175,
                minSize: 100,
                maxSize: 250 ,
                items : [viewmenu]
            } , {
                title: 'Center Region',
                region: 'center',
                split: false,
                xtype: 'panel',
                layout: 'auto',
                margins: '5 5 0 0',
                items: [main.center_panel]
            }
            ]
    	});
    }
	
	
});

Ext.define('My.view.Project.ProjectId',{
	extend : 'Ext.form.field.Hidden',
	alias : 'my.projectid',
	fieldLabel : 'Project Name',
	name: 'id_projects'	,
	id : 'id_projects',
	allowBlank: false
});    	
Ext.define('My.view.Project.ProjectNameField',{
	extend : 'Ext.form.field.Text',
	alias : 'my.projectname',
	fieldLabel : 'Project Name',
	name: 'description'	,
	id : 'description',
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
    extend : 'Ext.form.Panel',
    url: '/project/save', 
    layout: 'anchor',
    
    
    constructor: function(config ) {
    	
    	main = this;
    	main.project_id = Ext.create('My.view.Project.ProjectId');
    	main.project_name  = Ext.create('My.view.Project.ProjectNameField');
    	
    	main.saveProject =  Ext.create('My.view.Project.SaveProject',{
    		handler: function() {
    			
    			var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {
                           Ext.Msg.alert('Success', "save comprese");
                           //this.up('form').getForm().reset();
                           myStore.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result.msg);
                        }
                    });
                }
		        
    	    }
    		
    	});
    	this.items = [main.project_id,main.project_name];
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