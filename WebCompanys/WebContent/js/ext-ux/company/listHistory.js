
Ext.define('company.form.totalCompany',{
	extend: 'Ext.form.Label',
	name : 'id_company',
	text: "Last Login: Today, 1:25pm",
	labelStyle: 'font-weight:bold;',
    anchor:'93%'
});

 
Ext.define('company.form.listhistory',{
	//extend : 'Ext.panel.Panel', 	 
	
	extend: 'Ext.grid.Panel',
	width : '95%',
	 
	frame: false,	
	hideHeaders: true, 
	//bodyPadding: 10,
	showClose : true,
	viewConfig: {
        emptyText: 'No images to display'
    },
    isCreate : true,
    parentForm : null,
    collapsible:false ,
    
 
    initComponent: function() {
		
    	var main = this;
    	main.store = company.listHistorys; 
    	main.columns = [
    	       	       
    	    	    {header: 'Post date', dataIndex: 'date_string',width : '95%' , sortable: false ,renderer: main.showRender}   
    	            
    	        ];
    	        
    	 
    	this.callParent();
    	
    	
    	
    },
    showRender : function(value, record){
    	return record.record.data.date_string + ' (' + record.record.data.num + ')';
    }
     
    
}); 


Ext.define('company.ListHistory',{
	//height :  '100%', 
	extend : 'Ext.form.Panel',
	title : 'Show History', 
	defaults: {
        anchor: '100%',
        labelWidth: 120
    },
	frame: false,
	autoScroll : true,
	resetData : function(){
    	
    	main = this;
    	 
    	 
    	company.totalCompanys.load({
    		scope:this,
    		callback : function(records,operation,success){
	    		if(success){
	    			if(records.length > 0){
	    				 
	    				main.showTotalCompany.setHtml("&nbsp;total : " + records[0].data.num + " company");
	    				 
	    			}
	    			
	    		}
    		}
    		
    	});
    	
    	company.listHistorys.load({
    		scope:this,
    		callback : function(records,operation,success){
	    		 
    		}
    		
    	});
    	 
    			
    },
	initComponent: function() {
		var main = this;
		main.listHistory =  Ext.create('company.form.listhistory' );
		main.showTotalCompany = Ext.create('company.form.totalCompany');
		this.items = [main.showTotalCompany,main.listHistory  ];
		
		this.callParent();
	}
    
});
	