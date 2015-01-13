//console.log('model.js');

Ext.define('company.model.listHistory',{
	extend : 'Ext.data.Model',
	idProperty: 'date_string',
	fields : ['date_string'
	          ,'num']
});

Ext.define('company.model.position', {
    extend: 'Ext.data.Model',
    idProperty: 'id_position',    
    fields: ['id_position',   'position', 'basic_qualification', 'personal_characters' 
             , 'job_popose' 
             , 'job_description' 
             , 'experience' 
             , {name: 'post_date', dateFormat:'d/m/Y', type: 'date'} 
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
		url : '/WebCompanys/jobs/search',
		reader : {
			type : 'json',
			rootProperty : 'company'
		},
		api: {
            read: '/WebCompanys/jobs/search',
            create: '/WebCompanys/jobs/addJobs',
            update: '/WebCompanys/jobs/addJobs',
            destroy: '/WebCompanys/jobs/delJobs'
        }, 
		actionMethods:{
			create : 'POST',
			read   : 'POST',
			update : 'POST',
			destroy : 'POST'
		}
	},
	autoSync: false,
	autoLoad : false
});

company.searchCompany = new Ext.data.Store({
	model : 'company.model.company',
	storeId : 'listCompanyInStore',
	pageSize: 50,
	proxy : {
		type : 'ajax',
		url : '/WebCompanys/company/search',
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

company.totalCompanys = new Ext.data.Store({
	model : 'company.model.listHistory',
	storeId : 'totalCompanysInStore',
	pageSize: 50,
	proxy : {
		type : 'ajax',
		url : '/WebCompanys/company/totalCompany',
		reader : {
			type : 'json',
			rootProperty : 'totalCompany'
		},
		actionMethods: {
			create : 'POST',
			read   : 'GET',
			update : 'POST',
			destroy : 'POST'
		}
	},
 
	autoLoad : false
});


company.listHistorys = new Ext.data.Store({
	model : 'company.model.listHistory',
	storeId : 'listHistoryInStore',
	pageSize : 50,
	proxy : {
		type : 'ajax',
		url : '/WebCompanys/company/history',
		reader : {
			type : 'json',
			rootProperty : 'history'
		},
		 
		actionMethods:{
			create : 'POST',
			read   : 'GET',
			update : 'POST',
			destroy : 'POST'
		}
	},
	autoSync: false,
	autoLoad : false
});


