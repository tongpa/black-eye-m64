Ext.define('survey.view.list.Project.AddQuestion',{
	extend: 'Ext.form.field.Text',
	name : 'description',
	fieldLabel: 'Description', 
	allowBlank: true 
});







Ext.define('survey.view.list.Project.PCreateQuestion',{
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
		main.add111 = Ext.create('survey.view.list.Project.AddQuestion',{msgTarget: 'side'});
		
		main.SplitBt = Ext.create('Ext.button.Split',{
			text : 'Create Questions',
			iconCls: 'add16',
			floating: false
		});
		
		
		
		main.tbar = [main.SplitBt];
		
		
		
		main.items = main.add111;
		
		
		
		survey.listQuestionType.load({
			callback :  function(records, operation, success) {
		    	
		    	  
		    	 menus = Ext.create('Ext.menu.Menu');
		    	  
		         if(success){
		        	 for (var i =0;i< records.length ; i++){
		        		 
		        		 menus.add({text: records[i].data.description,id: records[i].id });
		        	 }
		         }
		         
		         main.SplitBt.menu = menus;
		         debugger;
		    },
			parent : main,
			scope:this
		});
		
		
		this.callParent();
    } 
    
    
});    