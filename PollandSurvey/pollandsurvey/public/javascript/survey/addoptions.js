Ext.define('survey.view.list.Project.Option.IDQuestion',{
	extend: 'Ext.form.field.Hidden',
	name : 'id_question_project'
});

Ext.define('survey.view.list.Project.Option.IDOption',{
	extend: 'Ext.form.field.Hidden',
	name : 'id_question_option'
});


Ext.define('survey.view.list.Project.Option.optionName',{
	extend: 'Ext.form.field.Text',
	name : 'name_publication',
	fieldLabel: survey.label.name,
	allowBlank: false 
});

Ext.define('survey.view.list.Project.Option.startDate',{
	extend : 'Ext.form.field.Date',
	name: 'activate_date',
	fieldLabel: survey.label.start_date ,
	format: 'd/m/Y',
	allowBlank: false ,
	editable : false
});

Ext.define('survey.view.list.Project.Option.finishDate',{
	extend : 'Ext.form.field.Date',
	name: 'expire_date',
	fieldLabel: survey.label.expire_date ,
	allowBlank: false ,
	format: 'd/m/Y',
	editable : false
});

Ext.define('survey.view.list.Project.Option.redirectURL',{
	extend: 'Ext.form.field.Text',
	name : 'redirect_url',
	fieldLabel: survey.label.redirect_url ,
	allowBlank: true 
});

Ext.define('survey.view.list.Project.Option.HtmlEditor',{
	extend : 'Ext.form.field.HtmlEditor' ,
	enableColors: false,
    enableAlignments: false
});

Ext.define('survey.view.list.Project.Option.listTheme',{
	extend : 'Ext.form.ComboBox',
	name : 'id_question_theme',
	fieldLabel: survey.label.theme,
    store: survey.listOptionTheme,
    queryMode: 'local',
    displayField: 'description',
    valueField: 'id_question_theme',
    editable : false,
    value : 1
});

Ext.tip.QuickTipManager.init();
Ext.define('survey.view.list.Project.Option',{
	extend : 'Ext.form.Panel',
	 
	fieldLabel :'', 
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
		main.idoptions = Ext.create('survey.view.list.Project.Option.IDOption');
		main.idquestion = Ext.create('survey.view.list.Project.Option.IDQuestion');
		main.optionName = Ext.create('survey.view.list.Project.Option.optionName');
		main.showTheme = Ext.create('survey.view.list.Project.Option.listTheme');
		
		main.startDate = Ext.create('survey.view.list.Project.Option.startDate');
		main.finishDate = Ext.create('survey.view.list.Project.Option.finishDate');
		main.redirectURL = Ext.create('survey.view.list.Project.Option.redirectURL');
		
		
		
		main.welcome_msg = Ext.create('survey.view.list.Project.Option.HtmlEditor',{name:'welcome_message'});
		main.goodbye_msg = Ext.create('survey.view.list.Project.Option.HtmlEditor',{name:'end_message'});
		main.header_msg = Ext.create('survey.view.list.Project.Option.HtmlEditor',{name:'header_message'});
		main.footer_msg = Ext.create('survey.view.list.Project.Option.HtmlEditor',{name:'footer_message'});
		
		main.tabMessage = Ext.create('Ext.tab.Panel', {
			items: [
			        {
			        	title : survey.label.welcome_message ,
			        	layout: 'fit',
			        	items : [main.welcome_msg]
			        } ,
			        {
			        	title : survey.label.goodbye_message ,
			        	layout: 'fit',
			        	items : [main.goodbye_msg]
			        },
			        {
			        	title : survey.label.header_message ,
			        	layout: 'fit',
			        	items : [main.header_msg]
			        },
			        {
			        	title : survey.label.footer_message ,
			        	layout: 'fit',
			        	items : [main.footer_msg]
			        } 
			        
			]
		});
		
		
		main.items = [main.idoptions,main.idquestion,main.optionName,main.showTheme,main.startDate,main.finishDate,main.redirectURL,main.tabMessage]
		
		
		
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


Ext.define('survey.view.list.Project.Option.winAddOption',{
	extend: 'Ext.window.Window',
	text : survey.label.create_publication ,
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
		main.panelOption = Ext.create('survey.view.list.Project.Option' ,{
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

