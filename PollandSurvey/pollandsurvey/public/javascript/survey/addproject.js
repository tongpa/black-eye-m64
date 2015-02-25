
Ext.define('survey.view.list.Project.fieldProjectId',{
	extend: 'Ext.form.field.Hidden',
	name : 'id_question_project'
});

Ext.define('survey.view.list.Project.fieldNameProject',{
	extend: 'Ext.form.field.Text',
	name : 'name',
	fieldLabel: survey.label.project_name ,
	allowBlank: false 
});

Ext.define('survey.view.list.Project.fieldDescriptProject',{
	extend: 'Ext.form.field.Text',
	name : 'description',
	fieldLabel: survey.label.description  , 
	allowBlank: true 
});

Ext.define('survey.view.list.Project.fieldHeaderMessage',{
	extend: 'Ext.form.field.Text',
	name : 'header_message',
	fieldLabel: survey.label.header_message  , 
	allowBlank: true 
});
 
Ext.define('survey.view.list.Project.fieldFooterMessage',{
	extend: 'Ext.form.field.Text',
	name : 'footer_message',
	fieldLabel: survey.label.footer_message , 
	allowBlank: true 
}); 

Ext.define('survey.view.list.Project.fieldWelcomeText',{
	extend: 'Ext.form.field.TextArea',
	name : 'welcome_text',
	fieldLabel: survey.label.welcome_message ,
	grow      : true,
	allowBlank: true 
}); 

Ext.define('survey.view.list.Project.fieldEndText',{
	extend: 'Ext.form.field.TextArea',
	name : 'end_text',
	fieldLabel: survey.label.goodbye_message   , 
	grow      : true,
	allowBlank: true 
}); 


Ext.define('survey.view.list.Project.fieldProjectType',{
	extend: 'Ext.form.ComboBox',
	name : 'id_question_project_type',
	fieldLabel: survey.label.project_type   ,  
	allowBlank: false ,
	store: survey.listProjectType,
    queryMode: 'local',
    displayField: 'description',
    valueField: 'id_question_project_type',
    blankText : survey.label.please_select  ,
    emptyText : survey.label.please_select  
});


 


Ext.define('survey.view.list.Project.PProject',{
	extend: 'Ext.form.Panel',	 
	frame: false,
	bodyPadding: 10,
	showClose : true,
    defaults: {
        anchor: '100%',
        labelWidth: 120
    },
    isCreate : true,
    parentForm : null,
    setDefaultField : function(){
    	var main = this;
    	 
    	console.log('setDefaultField');
    	 
    	 main.fieldSets.setHidden(true);
    	 main.btsave.setDisabled(false);
    	 /*
         main.fieldHeaderMessage.setHidden(true);
         main.fieldFooterMessage.setHidden(true);
         main.fieldWelcomeText.setHidden(true);
         main.fieldEndText.setHidden(true);*/
    },
    setEditField : function(){
    	var main = this;
    	
    	 main.fieldSets.setVisible(true);
    	 
    	 /*
        main.fieldHeaderMessage.setVisible(true);
        main.fieldFooterMessage.setVisible(true);
        main.fieldWelcomeText.setVisible(true);
        main.fieldEndText.setVisible(true);*/
    },
    resetData :function(){
    	this.getForm().reset();
    },
	initComponent: function() {
		
		var main = this;
		
		main.projectid = Ext.create('survey.view.list.Project.fieldProjectId' );
		main.name = Ext.create('survey.view.list.Project.fieldNameProject',{
			msgTarget: 'side'
		} );
		main.description = Ext.create('survey.view.list.Project.fieldDescriptProject' ,{msgTarget: 'side'});
		
		main.projectType = Ext.create('survey.view.list.Project.fieldProjectType',{msgTarget: 'side'});
		
		 
		main.fieldHeaderMessage = Ext.create('survey.view.list.Project.fieldHeaderMessage',{msgTarget: 'side'});//,hidden : main.isCreate});
		main.fieldFooterMessage = Ext.create('survey.view.list.Project.fieldFooterMessage',{msgTarget: 'side'});//,hidden : main.isCreate});
		main.fieldWelcomeText = Ext.create('survey.view.list.Project.fieldWelcomeText',{msgTarget: 'side'});//,hidden : main.isCreate});
		main.fieldEndText = Ext.create('survey.view.list.Project.fieldEndText',{msgTarget: 'side'});//,hidden : main.isCreate});
		
		 
		main.fieldSets = Ext.create('Ext.form.FieldSet',{
			title: survey.label.detail  ,
	        collapsible: true,
	        collapsed: true,
	        hidden : main.isCreate,
	        defaults: {
	            labelWidth: 120,
	            anchor: '100%',
	            layout: {   type: 'fix' }
	        },
	        items : [main.fieldHeaderMessage,
		              main.fieldFooterMessage,
		              main.fieldWelcomeText,
		              main.fieldEndText]
		});
		 
		
		main.items = [main.projectid, main.name, main.description, main.projectType , main.fieldSets ];  
		
		main.btsave = Ext.create('Ext.Button',{		 
			text : survey.label.save,
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
	                    	Ext.Msg.alert(survey.message.success, action.result.message);
	                    	main.refreshOther();
	                    },
	                    failure: function(form, action) {
	                    	 
	                    	if (action.response.status = '404'){
	                    		
	                    		Ext.Msg.alert(survey.message.failed, action.response.statusText);
	                    		 
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
	refreshOther : function( ) {
        //do some stuff here

        this.fireEvent('refreshOther', this);
    },
	closeWindow : function (main,bt){
		if(main.parentForm != null){
			main.form.reset();
			main.parentForm.hide(bt);
			 
		}
	}
});
 


Ext.define('survey.view.list.Project.winAddProject',{
	extend: 'Ext.window.Window',
	title : survey.label.add_project  ,
	layout: {
        type: 'fit',
        padding: 5
    },
	
	modal : true,
	width: 600,
    minWidth: 350,
    height: 350,
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
    resetData : function(){
    	this.panelProject.resetData();
    	this.panelProject.setDefaultField();
    }, 
	initComponent: function() {
		 
		var main = this;
	
		main.panelProject = Ext.create('survey.view.list.Project.PProject' ,{
			url : main.url,
			showClose : main.showClose,
			parentForm : main,
			listeners : {
				refreshOther : function(cmp) {
		            this.parentForm.refreshOther();
		        }
		    }});
	 	 
		 
		main.items = main.panelProject; 
		main.panelProject.setDefaultField();
		
	
		this.callParent();
		
		 
		 
	},
	refreshOther : function( ) {
        //do some stuff here

        this.fireEvent('refreshOther', this);
    } 
});


	

