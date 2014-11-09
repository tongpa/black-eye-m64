
Ext.define('survey.view.list.Project.fieldQuestionId',{
	extend: 'Ext.form.field.Hidden',
	name : 'id_question_project'
});

Ext.define('survey.view.list.Project.fieldQuestion',{
	extend: 'Ext.form.field.TextArea',
	name : 'question_name',
	fieldLabel: 'Question', 
	allowBlank: false 
});

Ext.define('survey.view.list.Project.fieldHelp',{
	extend: 'Ext.form.field.TextArea',
	name : 'help',
	fieldLabel: 'help', 
	allowBlank: true 
});



Ext.define('survey.view.list.GridAnswer', {	
	extend: 'Ext.grid.Panel',
	width : '100%',
	height :  '100%',
	bufferedRenderer: false,
	disableSelection : true,
	forceFit: true,
	frame: true,
	viewConfig: {
        emptyText: 'No images to display'
    },
    requires: [
               'Ext.grid.plugin.CellEditing',
               'Ext.form.field.Text',
               'Ext.toolbar.TextItem'
           ],
    collapsible:false ,
    initComponent: function() {
    	
    	var main = this;
    	main.editing = Ext.create('Ext.grid.plugin.CellEditing');
    	
    	main.plugins =  [main.editing];
    //	main.store = survey.listProject; 
    	main.columns = [
    	       	       
    	    	    {header: 'No.',  width : '30%' , sortable: false }  ,
    	    	    {header: 'Choose',  width : '20%',   sortable: false}  ,
    	    	    {header: 'Answer',  width : '30%' , sortable: false }  
    	            
    	        ]
    	
    	main.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                iconCls: 'icon-add',
                text: 'Add',
                scope: this,
                handler: this.onAddClick
            }, {
                iconCls: 'icon-delete',
                text: 'Delete',
                disabled: true,
                itemId: 'delete',
                scope: this,
                handler: this.onDeleteClick
            }]
        }]
    	
  
    	 
    	this.callParent(arguments);
    	
     
    } 
});



Ext.define('survey.view.list.Project.PAddQuestion',{
	//extend : 'Ext.panel.Panel', 	 
	extend : 'Ext.form.Panel',
	bodyPadding: 10,
	showClose : true,
	parentForm : null,
	url:'',
    defaults: {
        anchor: '100%',
        labelWidth: 100
    },
	initComponent: function() {
		
		var main = this;
		main.questionid = Ext.create('survey.view.list.Project.fieldQuestionId',{msgTarget: 'side'});
		main.question = Ext.create('survey.view.list.Project.fieldQuestion',{msgTarget: 'side'});
		main.help = Ext.create('survey.view.list.Project.fieldHelp',{msgTarget: 'side'});
		
		main.fieldSetsHelp = Ext.create('Ext.form.FieldSet',{
			title: 'help',
	        collapsible: true,
	        collapsed: true,
	         
	        defaults: {
	        	hideLabel : true,
	            labelWidth: 120,
	            anchor: '100%',
	            layout: {   type: 'fix' }
	        },
	        items : main.help
		});
		
		main.choose = Ext.create('survey.view.list.GridAnswer');
		
		
		main.items = [main.questionid, main.question, main.fieldSetsHelp,main.choose   ];  
		
		
		
		
		
		main.btsave = Ext.create('Ext.Button',{		 
			text : 'Save',
			//iconCls : 'project-add',
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
	                    	main.refreshOther();
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



Ext.define('survey.view.list.Project.winAddQuestion',{
	extend: 'Ext.window.Window',
	text : 'Add Question',
	layout: 'fit',
	id : 'test-1',
	modal : true,
	width : 400,
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
		main.panelQuestion = Ext.create('survey.view.list.Project.PAddQuestion' ,{
			url : main.url,
			showClose : main.showClose,
			parentForm : main,
			listeners : {
				refreshOther : function(cmp) {
		            this.parentForm.refreshOther();
		        }
		    }});
	 	 
		 
		main.items = main.panelQuestion; 
		 
		this.callParent();
		
		 
		 
	},
	refreshOther : function( ) {
        //do some stuff here

        this.fireEvent('refreshOther', this);
    } 
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
		//main.add111 = Ext.create('survey.view.list.Project.AddQuestion',{msgTarget: 'side'});
		
		main.winAddQuestion = Ext.create('survey.view.list.Project.winAddQuestion',{
			url : '/survey/saveProject',
			title : 'Add Question',
			titleAlign : 'left',
			listeners : {
				refreshOther : function(cmp) {
					//survey.listProject.reload();
		        }
			}
			
		});
		
		main.SplitBt = Ext.create('Ext.button.Split',{
			text : 'Create Questions',
			iconCls: 'add16',
			floating: false
		});
		
		
		
		main.tbar = [main.SplitBt];
		
		
		
		//main.items = main.add111;
		
		
		
		survey.listQuestionType.load({
			callback :  function(records, operation, success) {
		    	
		    	  
		    	 menus = Ext.create('Ext.menu.Menu');
		    	  
		         if(success){
		        	 for (var i =0;i< records.length ; i++){
		        		 
		        		 menus.add({
		        			 text: records[i].data.description 
		        			 ,record : records[i]
		        			 ,idx: records[i].id 
		        			 ,parentForm : main
		        			 ,handler: main.createQuestion 
		        			 });
		        	 }
		         }
		         
		         main.SplitBt.menu = menus;
		         
		    },
			parent : main,
			scope:this
		});
		
		
		this.callParent();
    } ,
    createQuestion : function(bt,ev){
    	//debugger;
    	bt.parentForm.winAddQuestion.setTitle( 'Add Question' + '-' + bt.record.data.description);
    	alert(bt.record.data.description);
    	bt.parentForm.winAddQuestion.show();
    }
    
    
});    