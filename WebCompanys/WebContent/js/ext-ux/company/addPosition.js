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