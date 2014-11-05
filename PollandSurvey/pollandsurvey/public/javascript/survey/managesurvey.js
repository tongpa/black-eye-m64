 


Ext.define('survey.view.list.Project.ManageProject',{
	extend: 'Ext.form.Panel', 
	frame: false,
	bodyPadding: 10,
	showClose : true,
    defaults: {
        anchor: '100%',
        labelWidth: 100
    },
    parentForm : null,
    url : '',
    loadData : function(record){
    	
    	form = this;
		this.record = record;
		
		form.getForm().reset();
		
		form.getForm().loadRecord(record);
		form.currentRecord = record;
    	
    },
	initComponent: function() {
		var main = this;
		
		main.panelProject = Ext.create('survey.view.list.Project.PProject' ,{
			url : main.url,
			showClose : false,
			isCreate : false, 
			listeners : {
				refreshOther : function(cmp) {
		            //this.parentForm.refreshOther();
		        }
		    }});
		this.items = main.panelProject ;
		
		this.callParent();
	}
});