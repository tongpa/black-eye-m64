Ext.namespace("survey");

Ext.define('Survey.model.listOptionTheme',{
	extend: 'Ext.data.Model',
    idProperty: 'id_question_theme',    
    fields: ['id_question_theme',   'description', 'template', 'active' ] 
});

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
    fields: ['id_basic_data',   'value','answer','seq','id_question' ,'answer_image'] 
    
});

Ext.define('Survey.model.listQuestions',{
	extend: 'Ext.data.Model',
    idProperty: 'id_question',    
    fields: ['id_question',   'question','id_qustion_type','help_message','text_label','id_question_project','order','question_type_name' ] 
});

Ext.define('Survey.model.listOptions',{
	extend: 'Ext.data.Model',
    idProperty: 'id_question_option',    
    fields: ['id_question_option','id_question_project','name_publication',   'header_message','footer_message','welcome_message','end_message','activate_date', 'expire_date',	'create_date','redirect_url','id_question_theme','theme','template' ] 
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
	autoSync: false,
	autoLoad : true
});

 
survey.listBasicData = new Ext.data.Store({
	model : 'Survey.model.listAnswerData',
	storeId:'listBasicDataInStore',
	pageSize: 100,
	proxy : {
		 
		type: 'ajax',
		url : '/model/getBasicData',    	
	/*	api: {
            read: '/model/getBasicData',
            //create: '/survey/createBasicData',
            //update: '/model/createBasicData',
            //destroy: '/model/deleteBasicData'
        }, */
        reader:{
        	type: 'json',
    		rootProperty : 'survey',
    		totalProperty : 'total'
    	},
        writer: {
        	type: 'json' ,
        	writeAllFields: true
        	 
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
	autoSync: false,
	autoLoad : false
});

survey.listQuestionsData = new Ext.data.Store({
	model : 'Survey.model.listQuestions',
	storeId : 'listQuestionsDataInStore',
	pageSize: 100,
	proxy : {
		 
		type: 'ajax',
		url : '/model/getQuestionsData',    	
		api: {
            read: '/model/getQuestionsData',
            create: '/survey/createQuestionData',
            update: '/survey/updateQuestionData',
            destroy: '/survey/deleteQuestionData'
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
	autoSync: false,
	autoLoad : true
});



survey.listQuestionType = new Ext.data.Store({
	model : 'Survey.model.listQuestionType',
	storeId : 'listQuestionTypeInStore',
	pageSize : 50,
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


survey.listOptionTheme = new Ext.data.Store({
	model : 'Survey.model.listOptionTheme',
	storeId : 'listOptionThemeInStore',
	pageSize : 50,
	proxy : {
		type : 'ajax',
		url : '/model/getOptionTheme',
		reader : {
			type : 'json',
			rootProperty : 'survey'
		}
	},
	autoLoad : false
});


survey.listOptions = new Ext.data.Store({
	model : 'Survey.model.listOptions',
	storeId:'listOptionsInStore',
	pageSize: 100,
	proxy : {
		 
		type: 'ajax',
		url : 'model/getOptionsProject',    	
		api: {
            read: 'model/getOptionsProject'
            //,create: '/survey/createBasicData'
            //,update: '/model/createBasicData'
            //,destroy: '/model/deleteBasicData'
        }, 
        reader:{
        	type: 'json',
    		rootProperty : 'survey',
    		totalProperty : 'total'
    	},
        writer: {
        	type: 'json' ,
        	writeAllFields: true
        	 
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
	autoSync: false,
	autoLoad : false
});


survey.listBasicMediaData = new Ext.data.Store({
	model : 'Survey.model.listAnswerData',
	storeId:'listBasicMediaDataInStore',
	pageSize: 100,
	proxy : {
		 
		type: 'ajax',
		url : '/model/getBasicMediaData',    	
		api: {
            read: '/model/getBasicMediaData',
            create: '/survey/createBasicMediaData',
            update: '/model/createBasicMediaData',
            destroy: '/model/deleteBasicMediaData'
        }, 
        reader:{
        	type: 'json',
    		rootProperty : 'survey',
    		totalProperty : 'total'
    	},
        writer: {
        	type: 'json' ,
        	writeAllFields: true
        	 
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
	autoSync: false,
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