Ext.define('company.form.btAddPosition',{
	extend: 'Ext.Button',
	text : 'Add Position',
	iconCls : 'img-add',
	disabled : true
});

Ext.define('company.form.btDeletePosition',{
	extend: 'Ext.Button',
	text : 'Delete Position',
	iconCls : 'img-delete',
	disabled : true
});


Ext.define('company.listPosition',{
	//extend : 'Ext.panel.Panel', 	 
	
	extend: 'Ext.grid.Panel',
	width : '95%',
	height :  '100%',	 
	frame: false,	
	title: 'Position', 
	bodyPadding: 10,
	showClose : true,
	viewConfig: {
        emptyText: 'No images to display'
    },
    isCreate : true,
    parentForm : null,
    collapsible:false ,
    resetData : function(){
    	this.addPosition.setDisabled(true);
    	this.store.removeAll();
    },
    
    loadPosition : function(company){
    	
    	this.storeCompany = company;
    	this.store.load({
    		params : {
    			'keysearch' : company.id
    		},
    		scope:this,
    		callback : function(records,operation,success){
	    		if(success){
	    			//console.log('success');
	    		}
    		}
    	});
    	
    	if (company.id >0){
    		this.addPosition.setDisabled(false);
    	}
    },
    initComponent: function() {
		
    	var main = this;
    	main.store = company.listPosition; 
    	main.columns = [
    	       	       
    	    	    {header: 'position', dataIndex: 'position',width : '70%' , sortable: false }  ,
    	    	    {header: 'post date', dataIndex: 'post_date',width : '10%',   sortable: false,renderer:Ext.util.Format.dateRenderer('d-m-Y') }  ,
    	    	    {
    	                xtype:'actioncolumn',
    	                
    	                width:'10%',
    	                items: [{
    	                   
    	                	iconCls :'img-edit',
    	                	tooltip: 'Edit',
    	                    handler: function(grid, rowIndex, colIndex) {
    	                        var rec = grid.getStore().getAt(rowIndex);
    	                         
    	                         
    	                        main.winAddPosition.show();
    	           			 	main.winAddPosition.loadDataRecord(rec);
    	                    }
    	                } ]
    	            }
    	            
    	        ];
    	        
    	main.winAddPosition = Ext.create('company.winAddPosition',{
    		
			listeners : {
				refreshOther : function(cmp) {
		             main.loadPosition(main.storeCompany);
		        }
		    }
    		
    	});
    	
    	main.addPosition = Ext.create('company.form.btAddPosition',{
    		parent : main,
    		handler: function () { 
    			 main.winAddPosition.show();
    			 main.winAddPosition.initValue(main.storeCompany);
    			 
    			
    		}
    	} );
    	
    	main.deletePosition = Ext.create('company.form.btDeletePosition',{
    		parent : main,
    		handler: main.onDeleteClick,
    		itemId: 'delete',
            scope: this
    	});
    	main.tbar = [main.addPosition,main.deletePosition ] ;
    	this.callParent();
    	
    	this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    	
    },
    onSelectChange: function(selModel, selections){
        
       // this.fireEvent('showCompany', selections[0]);
    	//console.log(selections);
    	this.deletePosition.setDisabled(selections.length === 0);
		 
    },
    onDeleteClick: function(){
    	var selection = this.getView().getSelectionModel().getSelection()[0];
    	main = this;
        if (selection) {
        	Ext.Msg.show({
    		    title:'Confirm Delete?',
    		    message: 'Do you delete : ' + selection.get('position'),
    		    buttons: Ext.Msg.YESNO,
    		    icon: Ext.Msg.QUESTION,
    		    fn: function(btn) {
    		        if (btn === 'yes') {
    		        	
    		        	 
    		        	main.store.remove(selection);
    		        	main.store.sync();
    		          
    		            selection = null;
    		        }  
    		    }
    		});
        }
    	
    	
    	
    	
        
    }
    
});   