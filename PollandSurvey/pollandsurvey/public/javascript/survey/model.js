Ext.namespace("survey");

Ext.define('Survey.model.listProjectid', {
    extend: 'Ext.data.Model',
    idProperty: 'listProjectid',
    fields: ['id_question_project', 'name', 'description', 'user_id', 
             'id_question_project_type','question_project_type',
             'question_project_type.description',
             'header_message','footer_message',
             'welcome_text','end_text',
             'start_date','end_date','active'] 
    
});

survey.listProject = new Ext.data.Store({
	model : 'Survey.model.listProjectid',
	storeId:'listBookSendInStore',
	pageSize: 50,
	proxy : {
		type: 'ajax',
		url : '/survey/getProjectByUser',
    	reader:{
    		rootProperty : 'survey',
    		totalProperty : 'total'
    	}
	},
	autoLoad : true
});

/*
Ext.define('Survey.store.listProjectid', {
    extend: 'Ext.data.Store',
    requires: 'Survey.model.listProjectid',
    model: 'Survey.model.listProjectid',
    id : 'storelistProjectid',
    leadingBufferZone : 300,
    pageSize : 50,
    proxy :{
    	type : 'jsonp',
    	url : '/survey/getProjectByUser',
    	reader:{
    		rootProperty : 'survey',
    		totalProperty : 'total'
    	}
    	//simpleSortModel true,
    	//simpleGroupMode: true,
    },
    autoLoad : true
});*/