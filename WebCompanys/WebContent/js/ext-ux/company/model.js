console.log('model.js');


Ext.define('company.model.position', {
    extend: 'Ext.data.Model',
    idProperty: 'id_position',    
    fields: ['id_position',   'position', 'basic_qualification', 'personal_characters' 
             , 'job_popose' 
             , 'job_description' 
             , 'experience' 
             , 'post_date' 
             , 'id_company_data' ] 
    
});

company.listPosition = new Ext.data.Store({
	model : 'company.model.position',
	storeId : 'listPositionInStore',
	pageSize: 50,
	proxy : {
		type : 'ajax',
		url : '/WebCompanys/jobs/search',
		reader : {
			type : 'json',
			rootProperty : 'company'
		}
	},
	autoLoad : true
});