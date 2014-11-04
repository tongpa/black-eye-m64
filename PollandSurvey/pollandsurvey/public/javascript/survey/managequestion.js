Ext.define('survey.view.list.Project.AddQuestion',{
	extend: 'Ext.form.field.Text',
	name : 'description',
	fieldLabel: 'Description', 
	allowBlank: true 
});

Ext.define('survey.view.list.Project.PCreateQuestion',{
	extend: 'Ext.form.Panel',	 
	frame: true,
	height : 200,
	bodyPadding: 10,
	showClose : true,
    defaults: {
        anchor: '100%',
        labelWidth: 120
    },
    isCreate : true,
    parentForm : null,
    initComponent: function() {
		
		var main = this;
		main.add = Ext.create('survey.view.list.Project.AddQuestion');
		main.items = main.add;
		
		this.callParent();
    }
    
});    