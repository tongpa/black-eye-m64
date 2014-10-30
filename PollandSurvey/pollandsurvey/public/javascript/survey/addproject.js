
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


 


Ext.define('survey.view.list.Project.PanelAddProject',{
	extend: 'Ext.form.Panel',
	text : 'Add Project',
	//layout : 'auto',
	frame: true,
	bodyPadding: 10,
	showClose : true,
    defaults: {
        anchor: '100%',
        labelWidth: 100
    },
	initComponent: function() {
		
		main = this;
		
		main.projectid = Ext.create('survey.view.list.Project.fieldProjectId' );
		main.name = Ext.create('survey.view.list.Project.fieldNameProject',{
			msgTarget: 'side'
		} );
		main.description = Ext.create('survey.view.list.Project.fieldDescriptProject' );
		
		main.items = [main.projectid,main.name,main.description];
		
		main.btsave = Ext.create('Ext.Button',{		 
			text : 'Save',
			iconCls : 'project-add'
		});
		main.btclose = Ext.create('Ext.Button',{		 
			text : 'Close',
			hidden : !main.showClose
		});
		main.buttons = [ main.btsave,main.btclose];
		
		this.callParent(arguments);
	}
});


Ext.define('survey.view.list.Project.winAddProject',{
	extend: 'Ext.window.Window',
	text : 'Add Project',
	layout: 'fit',
	modal : true,
	width : 300,
	height : 400,
	closable: true,
    closeAction: 'hide',
    showClose : true,
    maximizable: true,
    
    //animateTarget: button,
	header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
     
	initComponent: function() {
		
		var panelProject = Ext.create('survey.view.list.Project.PanelAddProject',{
			showClose : this.showClose
		});
		
		this.items = panelProject; 
		 debugger;
		this.callParent(arguments);
	}
});
	

