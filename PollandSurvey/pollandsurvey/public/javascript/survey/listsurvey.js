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
   	 
    	var project_view = Ext.create('survey.view.list.Project',{   		 
    		width: '100%',
    	    hidden : false,
    	    title : 'Poll and Survey',
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
				    		title : 'Create Questions'
				    	});
				    	
				    	var manage_variable = Ext.create('survey.view.list.Project.PCreateVariable',{
				    		width: '100%',   		
				    		title : 'Create variable'
				    	});
				    	
				    	
				    	var tab_manage = Ext.create('Ext.tab.Panel', {
				    	    width: '100%',   	
				    	    items: [manage_question,manage_variable ]
				    	});
				    	
				    	var panel_manage = Ext.create('Ext.panel.Panel',{
				    		closable: true,
				    		frame : true,
				    		bodyPadding: 10,
				    		id : tabId,
				    		title : title,
				    		items : [manage_project,tab_manage]
				    	});
						
						tab_project.add(panel_manage).show();
					
					}

					//tab_project.setActiveTab(tab);
					
					
					
					 
					
					
		        }
			}
    	} );
    	
    	
    	var tab_project = Ext.create('Ext.tab.Panel', {
    	    width: '100%',   	
    	     
    	    items: [project_view ]
    	});
    	
    	
    	 
    	 
    	
    	
    	 Ext.create('Ext.panel.Panel', {
    	// Ext.create('Ext.container.Container', {
    		 renderTo : 'maintenance-app' ,
    		 width : '100%',
    		 height : 600,
             layout: {
                 type: 'border'
             },
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
                 collapsible:false ,
                 items: [tab_project ]
                 // items: [panel]
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
 
