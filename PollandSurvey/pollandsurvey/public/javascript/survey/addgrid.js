Ext.namespace("survey");
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('survey', '/javascript/survey');

//Ext.Loader.setPath('Ext.ux', '/ux');

Ext.require([
             'Ext.*',
             'Ext.form.*',
             'Ext.layout.container.Column',
             'Ext.tip.QuickTipManager',           
             'Ext.window.MessageBox',
             
             'Ext.grid.*',
             'Ext.data.*',
             'Ext.util.*',
             'Ext.state.*', 
             'Ext.Msg.*'
         ]);
 
 
 
Ext.define('Survey.model.listAnswerData', {
    extend: 'Ext.data.Model',
    idProperty: 'id_basic_data',    
    fields: ['id_basic_data',   'value','answer','seq','id_question' ,'answer_image'] 
    
});

survey.listBasicData =   new Ext.data.Store({
	model : 'Survey.model.listAnswerData',
	pageSize: 100,
	autoDestroy: true,
	proxy: {
        type: 'ajax',
        url : '/model/getBasicData',
        reader: {
        	type: 'json',
    		rootProperty : 'survey',
    		totalProperty : 'total'
        }
    },
    autoLoad: false
});



Ext.define('survey.view.gui.questiontype.GridAnswer', {	
	extend: 'Ext.grid.Panel',
	width : '100%',
	height :  '100%',
	store : survey.listBasicData,
	//bufferedRenderer: false,
	
	 
	frame: true,
	 
	viewConfig: {
        emptyText: 'No images to display'
    },
    requires: [
               'Ext.grid.plugin.CellEditing',
               'Ext.form.field.Text',
               'Ext.toolbar.TextItem'
           ],
    collapsible:false ,
    initComponent: function() {
    	
    	var main = this;
    	
    	main.columns = [
   	                 
        	            {header: 'id', width : '9%', sortable: false, dataIndex: 'id_question' ,hidden : true,menuDisabled: true},
        	    	   
        	         	{header: 'Choose', dataIndex: 'value',  width : '70%',   sortable: false,menuDisabled: true}   
        	          
        	    	        
        	            
        	        ];
    	
    	main.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                iconCls: 'icon-add',
                text: survey.label.add,
                scope: this,
                parent : main,
                handler: this.onAddClick
            }, {
            	itemId: 'removeAnswer',
                iconCls: 'icon-delete',
                text: survey.label.delete,
                //disabled: true,
                parent : main,
                scope: this,
                handler: this.onDeleteClick
            }, {
            	itemId: 'refresh',
               // iconCls: 'icon-delete',
                text: survey.label.refresh,
                //disabled: true,
                parent : main,
                scope: this,
                handler: this.onRefreshClick
            }, {
            	itemId: 'SaveData',
                // iconCls: 'icon-delete',
                 text: survey.label.save,
                 //disabled: true,
                 parent : main,
                 scope: this,
                 handler: this.onSaveClick
             }]
        }]  
    	
    	this.callParent(arguments);    	
    },
    onSaveClick : function(bt,ev){
    	
    },
    onRefreshClick : function(bt,ev){
    	
    	var len = this.store.data.length; 
    	console.log('survey.listBasicData.data.length : ' + len);
    	
    	var recs = this.store.getRange();
    	this.store.remove(recs);
    	
    	
    	len = this.store.data.length; 
    	console.log('survey.listBasicData.data.length : ' + len);
    	
    	this.store.load({
    		params : {
    			questionid : 1
    		},
    		scope : this
    	});
    },
    onAddClick : function(bt,ev){
    	
    	bt.parent.id_question = 0;
    	if(bt.parent.record != null){
    		bt.parent.id_question = bt.parent.record;
    	}
    	console.log(this.store.data.length);
    	 
    	var r = new Survey.model.listAnswerData({
    		id: Ext.id(), 
    		id_basic_data : '',
    		value: 'answer',
    		answer: 0,
    		seq:   (this.store.data.length +1),
    		id_question : bt.parent.id_question ,
    		answer_image: ''
    	});
    	
    	 
    	this.store.insert(0, new Survey.model.listAnswerData({
    		value : 'answer ' + this.store.data.length  ,
    		seq:   this.store.data.length +1
    	}));
    	this.store.commitChanges();
    	
    	 
    	console.log(r);
    	 
    	 
        
    },
    onDeleteClick : function(bt,ev){
    	
    	console.log('delete from cell');
    	 
    	Ext.Msg.show({
		    title:'Confirm Delete?',
		    message: survey.message.confirm_delete  ,
		    buttons: Ext.Msg.YESNO,
		    icon: Ext.Msg.QUESTION,
		    fn: function(btn) {
		        if (btn === 'yes') {
		        	
		        	var recordSelected = bt.parent.getView().getSelectionModel().getSelection()[0];
		        	if (recordSelected){
			        	console.log(recordSelected.get('id_basic_data'));
			        	Ext.Ajax.request({
		              		url		: '/survey/deleteQuestionData',
		              		method: 'POST',
		                    headers: { 'Content-Type': 'application/json' },
		                    params : Ext.JSON.encode( {'id' : recordSelected.get('id_basic_data') } ),
		                	success: function(response, opts){
		                		var resp = Ext.decode(response.responseText); 	
		                		console.log(resp);
		                		if(resp.success){
		                			bt.parent.store.remove(recordSelected);
		                		}
		                		else{
		                			Ext.Msg.alert(  survey.message.failed  , resp.message);
		                		}
		                		resp = null;	
		                			 
		                		},
		                	failure: function(response, opts) {
		                		console.log('server-side failure with status code ' );
		                	}
		                	
			        	});
		        	}
		        	 
		        	 
		        }  
		    }
		});
    	 
        
    }
    
});


Ext.define('survey.view.list.Project.PAddQuestion',{
	//extend : 'Ext.panel.Panel', 	 
	extend : 'Ext.form.Panel',
	bodyPadding: 10,
	showClose : true,
	parentForm : null,
	url:'/survey/saveitems',
    defaults: {
        anchor: '100%',
        labelWidth: 100
    },
    initComponent: function() {
    	
    	var main = this;
    	
    	main.tab_project = Ext.create('survey.view.gui.questiontype.GridAnswer', {
    	    width: '100%',  
    	    
    	    height : 500
    	});
    	
    	main.dataGrid = Ext.create('Ext.form.field.Hidden',{name : 'datagrid'});
    	
    	
    	main.items = [main.dataGrid,main.tab_project   ];  
		
		
    	main.btsave = Ext.create('Ext.Button',{		 
			text : survey.label.save,
			//iconCls : 'project-add',
			formBind: true,  
	        disabled: true,
			handler : function(bt,ev){
				var form = this.up('form').getForm();
	            if (form.isValid()) {
	            	
	            	//var data =survey.listBasicData.getData();
	            	var data = [];
	            	//debugger;
	            	
	            	var len = survey.listBasicData.data.length;
	            	
	            	 
	            	
	            	console.log('survey.listBasicData.data.length : ' + len);
	            	var item = survey.listBasicData.data.items;
	            	survey.listBasicData.removeAll();
	            	
	            	len = item.length;
	            	for(var i = 0; i < len ; i++){
	            		var record = item[i];
        		 		 
        		 		
	            		if (!main.checkInteger(record.id)){
	            			 record.set('id_question','');
	            			 record.set('id_basic_data','');
	            		}
	            		var d = record.data;
	            		data.push(d);
	        			console.log(d);
	        			
	        			record = null;  
	        			d = null; 
	            	}
	            	//survey.listBasicData.removeAll();
	            	//survey.listBasicData.commitChanges();
	            	survey.listBasicData.save();
	        		
	        		 
	        		
	        		
	        		console.log('setValue');
	        		main.dataGrid.setValue( Ext.encode(data));
	        	 
	        		console.log('setValue');
	             
	                form.submit({
	                	scope: this,
	                	waitMsg: survey.message.waiting_save  ,
	                    success: function(form, action) {
	                    	 
	                    	
	                     
	                    	
	                    	//form.reset();
	                    	Ext.Msg.alert(survey.message.success, action.result.message);
	                    	 
	                    },
	                    failure: function(form, action) {
	                    	 
	                    	if (action.response.status = '404'){
	                    		
	                    		Ext.Msg.alert(survey.message.failed, action.response.statusText);
	                    		main.closeWindow(main,bt);
	                    		 
	                    	}
	                    	else{
	                    		Ext.Msg.alert(survey.message.success, action.result.message);
	                    	}
	                        
	                    }
	                });  
	            }
			}
		});
		main.btclose = Ext.create('Ext.Button',{		 
			text : survey.label.close,
			
			hidden : !main.showClose,
			handler: function (bt,ev){
				main.closeWindow(main,bt);
				 
				//main.up('form').getForm().reset();
				//main.parentForm.hide(bt);
			}
		});
		main.buttons = [ main.btsave,main.btclose];
    	
    	this.callParent();
    },
    checkInteger : function (value) {
		  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
	}
    
});



Ext.application({
    name: 'survey',
    launch: function() {
    	Ext.tip.QuickTipManager.init();
   	 
    	 
    	survey.listBasicData.load(); 
    	
    	
    	
    	
    	 
    	
    	
    	var from = Ext.create('survey.view.list.Project.PAddQuestion',{
    		width: '100%', 
    		height : 500 
    	});
    	 
    	 
   
    	
    	 Ext.create('Ext.panel.Panel', {
    	 
    		 renderTo : 'maintenance-app' ,
    		 width : '100%',
    		 height : 500,
             layout: {
                 type: 'border'
             },
             defaults: {
                 collapsible: true,
                 split: true,
                 bodyStyle: 'padding:15px'
             },
              
             items: [ 
              
             {
                 
                 region: 'center',
               
                 xtype: 'panel',
                 layout: 'fit',
                 margins: '5 5 0 0' ,
                 collapsible:false ,
                 items: [ 
                         	from
                  ]
                 
             }
             ]
     	});
     
	  
    }

	
});
 
