 


Ext.define('survey.view.list.OptionProject', {	
	extend: 'Ext.grid.Panel',
	width : '100%',
	height :  '100%',
	bufferedRenderer: false,
	disableSelection : true,
	forceFit: true,
	frame: true,
	
	title : 'Project poll and survey',
	viewConfig: {
        emptyText: 'No images to display'
    },
    collapsible:false ,
    initComponent: function() {
    	
    	var main = this;
    	//main.store = survey.listProject; 
    	main.columns = [
    	       	       
    	    	    {header: 'name', dataIndex: 'name',width : '30%' , sortable: false }  ,
					{header: 'start', dataIndex: 'name',width : '30%' , sortable: false }  ,
					{header: 'stop', dataIndex: 'name',width : '30%' , sortable: false }  ,
					{header: 'public', dataIndex: 'name',width : '30%' , sortable: false }  ,
					{header: 'view', dataIndex: 'name',width : '30%' , sortable: false }  ,
					{header: 'name', dataIndex: 'name',width : '30%' , sortable: false }  	
    	        ]
      
    	 
    	this.callParent(arguments);
    	
     
    } ,
    listeners: {
        'selectionchange': function(view, records) {
            grid.down('#removeEmployee').setDisabled(!records.length);
        }
    }  
});
 
 
 
Ext.define('survey.view.list.Project.PManagePublication',{
	//extend : 'Ext.panel.Panel', 	 
	extend : 'Ext.form.Panel',
 
	defaults: {
        anchor: '100%',
        labelWidth: 120
    },
	frame: false,
	
	height : 200,
	bodyPadding: 10,
	showClose : true,
    
    isCreate : true,
    parentForm : null,
    initComponent: function() {
		
		var main = this;
		//main.add111 = Ext.create('survey.view.list.Project.AddQuestion',{msgTarget: 'side'});
		
		main.tbar =  [{
            xtype:'splitbutton',
            text: 'Create Questions',
            iconCls: 'add16',
            menu: [{text: 'Menu Button 1'}]
        }];
		
		main.showListOption = Ext.create('survey.view.list.OptionProject');
		
		main.items = [main.showListOption];
		
		//main.items = main.add111;
		
		this.callParent();
    }
    
});    