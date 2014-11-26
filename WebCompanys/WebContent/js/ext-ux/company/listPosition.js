Ext.define('company.form.btAddPosition',{
	extend: 'Ext.Button',
	text : 'Add Position',
	iconCls : 'img-add',
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
    	this.store.load({
    		params : {
    			'keysearch' : company.id
    		},
    		scope:this,
    		callback : function(records,operation,success){
	    		if(success){
	    			console.log('success');
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
    	       	       
    	    	    {header: 'position', dataIndex: 'position',width : '80%' , sortable: false }  ,
    	    	    {header: 'post date', dataIndex: 'post_date',width : '10%',   sortable: false }  
    	            
    	        ];
    	        
    	main.winAddPosition = Ext.create('company.winAddPosition');
    	
    	main.addPosition = Ext.create('company.form.btAddPosition',{
    		parent : main,
    		handler: function () { 
    			 main.winAddPosition.show();
    			 
    			 
    			
    		}
    	} );
    	main.tbar = [main.addPosition ] ;
    	this.callParent();
    }
    
});   