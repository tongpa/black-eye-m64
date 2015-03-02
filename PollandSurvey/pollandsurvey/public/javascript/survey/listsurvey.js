Ext.namespace("survey");
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('survey', '/javascript/survey');

//Ext.Loader.setPath('Ext.ux', '/ux');

Ext.require([
             'Ext.*',
             'Ext.form.*',
             'Ext.layout.container.Column',
             'Ext.tip.QuickTipManager',           
             'Ext.window.MessageBox',
             'Ext.util.Observable',
             'Ext.grid.*',
             'Ext.data.*',
             'Ext.util.*',
             'Ext.state.*', 
             'Ext.Msg.*'
         ]);
 
 
 




Ext.application({
    name: 'survey',
    launch: function() {
    	Ext.tip.QuickTipManager.init();
    	
    	
    	survey.listOptionTheme.load();
   	 	
    	var contact_view = Ext.create('Ext.form.Panel',{
    		title : survey.label.contact,//'Contacts',
    		width: '100%',
    		html : 'Hello !'
    	});
    	
    	
    	var project_view = Ext.create('survey.view.list.Project',{   		 
    		flex: 1,
    	    hidden : false,
    	    
    	   // width  : '50%',
    	    height : 800,
			listeners : {
				showManage : function(current,record) {
					
					var tabId =   'tab-' + record.id;
					var title = record.data.name  + " (" + record.data.question_project_type.description + ")";
					var count = tab_project.items.length;
					 
					var addAlready = false;
					
					for (var i = 0 ;i < count ;i++){
						if( tab_project.items.items[i].id == tabId){
							 
							tab_project.setActiveTab(tab_project.items.items[i]);
							addAlready = true;
							break;
						}
					}
					
					if (!addAlready){
					 
						
						//manage project 
				    	var manage_project = Ext.create('survey.view.list.Project.ManageProject',{   		 
				    		width: '100%',				    	     
				    	    url : '/survey/updateProject'
				    	});
				    	
				    	manage_project.loadData(record); 
				    	
				    	var manage_question = Ext.create('survey.view.list.Project.PCreateQuestion',{
				    		width: '100%',   		
				    		title : survey.label.create_question,
				    		iconMask: true,
			        		iconCls: "icon-question"
				    	});
				    	
				    	var manage_variable = Ext.create('survey.view.list.Project.PCreateVariable',{
				    		width: '100%',   		
				    		title : survey.label.create_variable,
				    		iconMask: true,
			        		iconCls: "icon-demographic"
				    	});
				    	
				    	var manage_option = Ext.create('survey.view.list.Project.PManagePublication',{
				    		width: '100%',   		
				    		title : survey.label.create_publication,
				    		iconMask: true,
				    		iconCls: "icon-publication"
				    	});
				    	
				    	var manage_invitation = Ext.create('survey.view.list.Project.PManageInvitations',{
				    		width: '100%',   		
				    		title : survey.label.create_invitation,
				    		iconMask: true,
			        		iconCls: "icon-invitation"
				    	});
				    	
				    	
				    	var tab_manage = Ext.create('Ext.tab.Panel', {
				    	    width: '100%',   
				    	    
				    	    defaults: {
					        	 
					            labelWidth: 120,
					            anchor: '100%',
					            layout: {   type: 'fix' }
					        },
				    	    items: [manage_question,manage_variable,manage_option,manage_invitation ]
				    	});
				    	
				    	var panel_manage = Ext.create('Ext.panel.Panel',{
				    		closable: true,
				    		frame : true,
				    		bodyPadding: 10,
				    		id : tabId,
				    		title : title,
				    		
				    		items : [manage_project,tab_manage]
				    	});
						
				    	manage_question.setLoad(record);
				    	manage_option.setLoad(record);
				    	
						tab_project.add(panel_manage).show();
					
					}

				//	tab_project.setActiveTab(tab);
					
					
					
					 
					
					
		        }
			}
    	} );
    	
    	var mainPanelTab = Ext.create('Ext.form.Panel',{
     
    	    iconMask: true,
    		iconCls: "icon-survey",
    		title : survey.label.poll_survey,
    		width: '100%',
    		height : 800,
    		bodyPadding: 10,
    		//frame : true,
    		 
    	    items :  [project_view ]
    	});
    	
    	var tab_project = Ext.create('Ext.tab.Panel', {
    	    width: '100%',  
    	    height : 800,
    	    title : survey.label.project,
    	    
    	    
    	    layout: {
                type: 'fix'
            }, 
    	    items: [mainPanelTab ]
    	});
    	
    	var tab_main_project = Ext.create('Ext.tab.Panel', {
    	    width: '100%',  
    	    height : 800,
    	   
    	    layout: {                 type: 'fix'             }, 
    	    items: [tab_project,contact_view ]
    	});
    	 
 
    	
    	
    	 Ext.create('Ext.panel.Panel', {
    	// Ext.create('Ext.container.Container', {
    		 renderTo : 'maintenance-app' ,
    		 width : '100%',
    		 height : 1000,
    		 layout:'fit',
             defaults: {
                 collapsible: true,
                 split: true,
                 bodyStyle: 'padding:15px'
             },
              
             items: [ 
               /*       
                      {
                // title: 'Menu',
                 region:'west',
                 margins: '5 0 0 0',
                 cmargins: '5 5 0 0',
                 width: 175,
                 minSize: 100,
                 maxSize: 250  ,
                 xtype:'panel'
             //    items : [viewmenu]
             } ,*/ 
             {
                // title: 'Center Region',
                 region: 'center',
                // split: false,
                 xtype: 'panel',
                 layout: 'fit',
                 margins: '5 5 0 0' ,
                 collapsible:false  
                ,items: [tab_main_project ]
                  
             }
             ]
     	});
      
    	 
    	 /*
    	 =  Ext.create('Ext.grid.Panel', {
    			store: survey.listProject,
    			columns: [
    			    {header: 'risk id', dataIndex: 'id_question_project',width : 200  },      
    			    {header: 'name', dataIndex: 'name',width : 100  }  
    		     
    		        
    		    ] ,
    		    viewConfig: {
                    emptyText: 'No images to display'
                },
                collapsible:true,
    	 		renderTo : 'maintenance-app' 
    		});
    	*/
    	 
	  
    }

	
});
 
