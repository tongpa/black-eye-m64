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

Ext.define('company.model.company', {
    extend: 'Ext.data.Model',
    idProperty: 'id_company',    
    fields: ['id_company',   'company_name', 'business_type', 'house_no' 
             , 'moo' 
             , 'road' 
             , 'county' 
             , 'city' 
             , 'province' 
             , 'country'
             , 'telephone'
             , 'fax'
             , 'mobile'
             , 'email'
             , 'website'
             , 'personal_contact'
             , 'phone_contact'
             , 'zip_code'
             , 'building'
             , 'soi'] 
    
});

company.listPosition = new Ext.data.Store({
	model : 'company.model.position',
	storeId : 'listPositionInStore',
	pageSize: 50,
	proxy : {
		type : 'ajax',
		url : './jobs/search',
		reader : {
			type : 'json',
			rootProperty : 'company'
		},
		actionMethods:{
			create : 'POST',
			read   : 'POST',
			update : 'PUT',
			destroy : 'DELETE'
		}
	},
	autoLoad : false
});

company.searchCompany = new Ext.data.Store({
	model : 'company.model.company',
	storeId : 'listCompanyInStore',
	pageSize: 50,
	proxy : {
		type : 'ajax',
		url : './company/search',
		reader : {
			type : 'json',
			rootProperty : 'company'
		},
		actionMethods: {
			create : 'POST',
			read   : 'POST',
			update : 'PUT',
			destroy : 'DELETE'
		}
	},
	autoLoad : false
});
