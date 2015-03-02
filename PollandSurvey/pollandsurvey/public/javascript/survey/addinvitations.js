
Ext.tip.QuickTipManager.init();

Ext.define('survey.view.list.Project.Invitation.IDQuestion',{
	extend: 'Ext.form.field.Hidden',
	name : 'id_question_project'
});

Ext.define('survey.view.list.Project.Invitation.IDInvitation',{
	extend: 'Ext.form.field.Hidden',
	name : 'id_invitation'
});


Ext.define('survey.view.list.Project.Invitation.invitationTitle',{
	extend: 'Ext.form.field.Text',
	name : 'title',
	fieldLabel: survey.label.email_title,
	allowBlank: false 
});

 

Ext.define('survey.view.list.Project.Invitation.fromName',{
	extend: 'Ext.form.field.Text',
	name : 'from_name',
	fieldLabel: survey.label.from_name ,
	allowBlank: true 
});

Ext.define('survey.view.list.Project.Invitation.HtmlEditor',{
	extend : 'Ext.form.field.HtmlEditor' ,
	enableColors: false,
    enableAlignments: false
});
 

Ext.define('survey.view.list.Project.Invitation',{
	extend : 'Ext.form.Panel',
	 
	
	frame: false,
	bodyPadding: 10,
	showClose : true,
    defaults: {
        anchor: '100%',
        labelWidth: 120
    },
    isCreate : true,
    parentForm : null,
    setLoadData : function(projectRecord,optionsrecord ){
    	this.record =  projectRecord; 
    	this.idquestion.setValue('');
    	this.record = optionsrecord;
		this.getForm().reset();
		 
    	if(optionsrecord != null && optionsrecord.id != null){
    		 
    		this.idquestion.setValue(optionsrecord.id);
    		this.getForm().loadRecord(optionsrecord);
    	}
    	else{
    	
			if (projectRecord != null && projectRecord.id != null) {
			    		this.projectid = projectRecord.id;
			    		this.idquestion.setValue(this.projectid);
		   }
    	}
    },
	initComponent: function() {
		
		var main = this;
	 
		main.idquestion = Ext.create('survey.view.list.Project.Invitation.IDQuestion');
		main.idinvitation = Ext.create('survey.view.list.Project.Invitation.IDInvitation');
		
		main.subjectinvitation = Ext.create('survey.view.list.Project.Invitation.invitationTitle');
		main.fromName = Ext.create('survey.view.list.Project.Invitation.fromName');
		
		main.content = Ext.create('survey.view.list.Project.Invitation.HtmlEditor',{name:'content'});
		 
		
		 
		
		
		main.items = [main.idquestion,main.idinvitation,main.subjectinvitation,main.fromName,main.content];
		
		
		
		main.btsave = Ext.create('Ext.Button',{		 
			text : survey.label.save ,
			//iconCls : 'project-add',
			formBind: true,  
	        disabled: true,
			handler : function(bt,ev){
				var form = this.up('form').getForm();
				
				console.log('Check Save');
				
	            if (form.isValid()) {
	            	
	            	 
	        		
	        		 
	                form.submit({
	                	scope: this,
	                	method: 'POST',
	                	/*headers: {
	                        'Content-Type': 'application/json;charset=utf-8'
	                    },*/
	                	waitMsg: survey.message.waiting_save ,
	                    success: function(form, action) {
	                    	  
	                    	//debugger;
	                    	 
	                    	main.closeWindow(main,bt);
	                    	
	                    	//form.reset();
	                    	Ext.Msg.alert( survey.message.success , action.result.message);
	                    	main.refreshOther();
	                     
	                    },
	                    failure: function(form, action) {
	                    	 
	                    	if (action.response.status = '404'){
	                    		
	                    		Ext.Msg.alert( survey.message.failed  , action.response.statusText);
	                    		main.closeWindow(main,bt);
	                    		 
	                    	}
	                    	else{
	                    		Ext.Msg.alert(survey.message.success , action.result.message);
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


Ext.define('survey.view.list.Project.Invitation.winAddInvitation',{
	extend: 'Ext.window.Window',
//	text : survey.label.create_invitation ,
	layout: 'fit',
	
	modal : true,
	width : 600,
	height : 500,
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
    
    setLoadData : function(projectrecord,optionsrecord ){
    	//console.log('survey.view.list.Project.winAddQuestion');
     	this.panelOption.setLoadData(projectrecord,optionsrecord );
    },
    
	initComponent: function() {
		 
		var main = this;
		main.panelOption = Ext.create('survey.view.list.Project.Invitation' ,{
			url : main.url,
			showClose : main.showClose,
			parentForm : main,
			listeners : {
				refreshOther : function(cmp) {
		            this.parentForm.refreshOther();
		        }
		    }});
	 	 
		 
		main.items = [main.panelOption]; 
		 
		this.callParent();
		
		 
		 
	},
	refreshOther : function( ) {
        //do some stuff here

        this.fireEvent('refreshOther', this);
    } 
});

