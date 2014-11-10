Ext.namespace("survey");

Ext.define('Survey.model.listProjectid', {
    extend: 'Ext.data.Model',
    idProperty: 'id_question_project',
    
    fields: ['id_question_project', 'name', 'description', 'user_id', 
             'id_question_project_type','question_project_type',
             'question_project_type.description',
             'header_message','footer_message',
             'welcome_text','end_text',
             'start_date','end_date','active'] 
    
});

Ext.define('Survey.model.listQuestionType', {
    extend: 'Ext.data.Model',
    idProperty: 'id_question_type',
    
    fields: ['id_question_type',   'description', 'active' ] 
    
});


Ext.define('Survey.model.listAnswerData', {
    extend: 'Ext.data.Model',
    idProperty: 'id_basic_data',    
    fields: ['id_basic_data',   'value','answer','row' ] 
    
});




survey.listQuestionType = new Ext.data.Store({
	model : 'Survey.model.listQuestionType',
	storeId : 'listQuestionTypeInStore',
	pagSize : 50,
	proxy : {
		type : 'ajax',
		url : '/model/getQuestionType',
		reader : {
			type : 'json',
			rootProperty : 'survey'
		}
	},
	autoLoad : false
});


survey.listProject1 = new Ext.data.Store({
	model : 'Survey.model.listProjectid',
	storeId:'listBookSendInStore',
	pageSize: 50,
	proxy : {
		//type: 'ajax',
		type: 'rest',
		//url : '/survey/getProjectByUser',
    	
    	api: {
            read: '/survey/getProjectByUser',
           // create: '/survey/getProjectByUser',
            update: '/survey/updateProject',
            destroy: '/survey/deleteProject'
        },
        reader:{
        	type: 'json',
    		rootProperty : 'survey',
    		totalProperty : 'total'
    	},
        writer: {
        	type: 'json',
        	//rootProperty : 'survey',
    		//totalProperty : 'total',
            writeAllFields: false ,
            allowSingle :false 
            //root: 'data'
        },
        listeners: {
            exception: function(proxy, response, operation){
               /* Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });*/
            }
        }
	},
	autoSync: true,
	autoLoad : false
});

survey.listProject = new Ext.data.Store({
	model : 'Survey.model.listProjectid',
	storeId:'listBookSendInStore',
	pageSize: 50,
	proxy : {
		 
		type: 'ajax',
		url : '/survey/getProjectByUser',    	
		api: {
            read: '/survey/getProjectByUser',
            create: '/survey/getProjectByUser',
            update: '/survey/updateProject',
            destroy: '/survey/deleteProject'
        }, 
        reader:{
        	type: 'json',
    		rootProperty : 'survey',
    		totalProperty : 'total'
    	},
        writer: {
        	type: 'json' 
        	 
           // writeAllFields: false ,
           // allowSingle :false 
             
        },
        listeners: {
            exception: function(proxy, response, operation){
               /* Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });*/
            } 
        }
	},
	autoSync: true,
	autoLoad : true
});


survey.listBasicData = new Ext.data.Store({
	model : 'Survey.model.listAnswerData',
	storeId:'listBasicDataInStore',
	pageSize: 100,
	proxy : {
		 
		type: 'ajax',
		url : '/model/getBasicData',    	
		api: {
            read: '/model/getBasicData',
            create: '/model/createBasicData',
            update: '/model/createBasicData',
            destroy: '/model/deleteBasicData'
        }, 
        reader:{
        	type: 'json',
    		rootProperty : 'survey',
    		totalProperty : 'total'
    	},
        writer: {
        	type: 'json' 
        	 
           // writeAllFields: false ,
           // allowSingle :false 
             
        },
        listeners: {
            exception: function(proxy, response, operation){
               /* Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });*/
            } 
        }
	},
	autoSync: true,
	autoLoad : false
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