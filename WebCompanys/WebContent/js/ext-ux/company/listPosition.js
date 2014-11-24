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
	title: 'Job Position', 
	bodyPadding: 10,
	showClose : true,
	viewConfig: {
        emptyText: 'No images to display'
    },
    isCreate : true,
    parentForm : null,
    collapsible:false ,
    initComponent: function() {
		
    	var main = this;
    	main.store = company.listPosition; 
    	main.columns = [
    	       	       
    	    	    {header: 'position', dataIndex: 'position',width : '80%' , sortable: false }  ,
    	    	    {header: 'post date', dataIndex: 'post_date',width : '10%',   sortable: false }  
    	            
    	        ];
    	main.addPosition = Ext.create('company.form.btAddPosition',{
    		parent : main,
    		handler: function () { 
    			 
    			 
    			 
    			
    		}
    	} );
    	main.tbar = [main.addPosition ] ;
		this.callParent();
    }
    
});   