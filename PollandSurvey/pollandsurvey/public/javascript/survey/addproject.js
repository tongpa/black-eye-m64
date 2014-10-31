
Ext.define('survey.view.list.Project.fieldProjectId',{
	extend: 'Ext.form.field.Hidden',
	name : 'id_question_project'
});

Ext.define('survey.view.list.Project.fieldNameProject',{
	extend: 'Ext.form.field.Text',
	name : 'name',
	fieldLabel: 'Project Name',
	allowBlank: false 
});

Ext.define('survey.view.list.Project.fieldDescriptProject',{
	extend: 'Ext.form.field.Text',
	name : 'description',
	fieldLabel: 'Description', 
	allowBlank: true 
});
 

 


Ext.define('survey.view.list.Project.PProject',{
	extend: 'Ext.form.Panel',
	//title : 'Add Project',
	//layout : 'auto',
	//url: 'save-form.php',
	frame: true,
	bodyPadding: 10,
	showClose : true,
    defaults: {
        anchor: '100%',
        labelWidth: 100
    },
    parentForm : null,
	initComponent: function() {
		
		var main = this;
		
		main.projectid = Ext.create('survey.view.list.Project.fieldProjectId' );
		main.name = Ext.create('survey.view.list.Project.fieldNameProject',{
			msgTarget: 'side'
		} );
		main.description = Ext.create('survey.view.list.Project.fieldDescriptProject' ,{msgTarget: 'side'});
		
		main.items = [main.projectid,main.name,main.description];
		
		main.btsave = Ext.create('Ext.Button',{		 
			text : 'Save',
			iconCls : 'project-add',
			formBind: true,  
	        disabled: true,
			handler : function(bt,ev){
				var form = this.up('form').getForm();
	            if (form.isValid()) {
	                form.submit({
	                    success: function(form, action) {
	                    	
	                    	main.closeWindow(main,bt);
	                    	//form.reset();
	                    	Ext.Msg.alert('Success', action.result.message);
	                    },
	                    failure: function(form, action) {
	                    	 
	                    	if (action.response.status = '404'){
	                    		
	                    		Ext.Msg.alert('Failed', action.response.statusText);
	                    		 
	                    	}
	                    	else{
	                    		Ext.Msg.alert('Success', action.result.message);
	                    	}
	                        
	                    }
	                });
	            }
			}
		});
		main.btclose = Ext.create('Ext.Button',{		 
			text : 'Close',
			
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
	closeWindow : function (main,bt){
		 
		main.form.reset();
		main.parentForm.hide(bt);
	}
});


Ext.define('survey.view.list.Project.winAddProject',{
	extend: 'Ext.window.Window',
	text : 'Add Project',
	layout: 'fit',
	id : 'test-1',
	modal : true,
	width : 300,
	height : 400,
	closable: true,
    closeAction: 'hide',
    showClose : true,
    maximizable: true,
    constrain: true,
    url : '',
    //animateTarget: button,
	header: {
        titlePosition: 2,
        titleAlign: 'center' 
    },
     
	initComponent: function() {
		 
		var main = this;
		main.panelProject = Ext.create('survey.view.list.Project.PProject' ,{
			url : main.url,
			showClose : main.showClose,
			parentForm : main});
	 	 
		 
		main.items = main.panelProject; 
		 
		this.callParent();
		
		 
		 
	}
});


	

