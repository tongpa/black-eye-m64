Ext.define('company.form.fieldIdPosition',{
	extend: 'Ext.form.field.Hidden',
	name : 'id_position'
});

Ext.define('company.form.fieldIdCompany',{
	extend: 'Ext.form.field.Hidden',
	name : 'id_company'
});


Ext.define('company.form.fieldPositionName',{
	extend: 'Ext.form.field.Text',
	name : 'position',
	fieldLabel: 'Position Name',
	allowBlank: false 
});

Ext.define('company.form.fieldBasicQualification',{
	extend: 'Ext.form.field.TextArea',
	name : 'basic_qualification',
	fieldLabel: 'Basic Qualification',
	grow      : true 
	
}); 


Ext.define('company.form.fieldPersonalCharacters',{
	extend: 'Ext.form.field.TextArea',
	name : 'personal_characters',
	fieldLabel: 'Personal Characters',
	grow      : true 
	
}); 

  


Ext.define('company.form.fieldJobPopose',{
	extend: 'Ext.form.field.TextArea',
	name : 'job_popose',
	fieldLabel: 'Job Popose',
	grow      : true 
	
}); 



Ext.define('company.form.fieldJobDescription',{
	extend: 'Ext.form.field.TextArea',
	name : 'job_description',
	fieldLabel: 'JobDescription',
	grow      : true 
	
}); 

Ext.define('company.form.fieldExperience',{
	extend: 'Ext.form.field.TextArea',
	name : 'experience',
	fieldLabel: 'Experience',
	grow      : true 
	
}); 

Ext.define('company.form.fieldPostDate',{
	extend: 'Ext.form.field.Date',
	name : 'post_date',
	fieldLabel: 'Post Date' ,
	format: 'd/m/Y',
    submitFormat: 'Y-m-d',
    value: new Date()
	
}); 



Ext.define('company.addPosition',{
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
    autoScroll : true,
    isCreate : true,
    parentForm : null,
    closeWindow : function(main,bt){
    	main.parentForm.hide(bt);
    },
    loadDataRecord : function(position){
    	//console.log(position);
    	this.getForm().loadRecord(position);
    	this.position.focus();
    }, 
    initValue : function(company){
    	this.storeCompany = company;
    	this.getForm().reset();
    	this.idcompany.setValue(company.id);
    	this.position.focus();
    },
    initComponent: function() {
		
		var main = this;
		 
		//console.log('list Position');
		
		this.idposition  = Ext.create('company.form.fieldIdPosition' );		
		this.idcompany  = Ext.create('company.form.fieldIdCompany' );		
		this.position  = Ext.create('company.form.fieldPositionName' );
		this.postdate  = Ext.create('company.form.fieldPostDate' ); 
		this.qualification  = Ext.create('company.form.fieldBasicQualification' );		
		this.characters  = Ext.create('company.form.fieldPersonalCharacters' );
		this.posose  = Ext.create('company.form.fieldJobPopose' );		
		this.description  = Ext.create('company.form.fieldJobDescription' );		
		this.experience =  Ext.create('company.form.fieldExperience' );		
		
		
		
		
		this.items = [this.idposition,this.idcompany,this.position,this.postdate,
		              this.qualification,this.characters,this.posose,this.description,this.experience
		              ];
		
		this.btsave = Ext.create('Ext.Button',{		 
			text : 'Save',
			 
			iconCls : 'img-save',
			formBind: true,  
	        disabled: true,
			handler : function(bt,ev){
				var form = this.up('form').getForm();
	            if (form.isValid()) {
	             
	            	var values = form.getValues();
	            	Ext.Ajax.request({
	              		url		: '/WebCompanys/jobs/addJobs',
	                	method  : 'POST',
	                	jsonData: values,	
	                	success: function(response){
	                	    	//store.load();
	                			//company.listPosition();
	                		 main.fireEvent('refreshOther', this);
	                		 
	                		 main.closeWindow(main,bt);
	                		}
	                	});
	             
	          
	            }
	            
			}
		});
		
		this.btclose = Ext.create('Ext.Button',{		 
			text : 'Close',
			
			hidden : !main.showClose,
			handler: function (bt,ev){
				main.closeWindow(main,bt);
				 
			}
		});
		main.buttons = [ main.btsave,main.btclose];
		
		this.callParent();
    }
    
});   




Ext.define('company.winAddPosition',{
	extend: 'Ext.window.Window',
	text : 'Add Position',
	layout: 'fit',
	id : 'test-1',
	modal : true,
	width : 400,
	height : 490,
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
    loadDataRecord : function(position){
    	this.panelPosition.loadDataRecord(position);
    }, 
    initValue : function(company){
    	this.panelPosition.initValue(company);
    },
	initComponent: function() {
		 
		var main = this;
		main.panelPosition = Ext.create('company.addPosition' ,{
			url : main.url,
			showClose : main.showClose,
			parentForm : main,
			listeners : {
				refreshOther : function(cmp) {
		            this.parentForm.refreshOther();
		        }
		    }});
	 	 
		 
		main.items = main.panelPosition; 
		 
		this.callParent();
		
		 
		 
	},
	refreshOther : function( ) {
        //do some stuff here

        this.fireEvent('refreshOther', this);
    } 
});
