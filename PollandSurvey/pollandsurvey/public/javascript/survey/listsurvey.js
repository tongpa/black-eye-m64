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
    	    width: '60%' ,
			listeners : {
				showManage : function(current,record) {
					
					project_view.setHidden(true);
				//	manage_project.setHidden(false);
					manage_question.setHidden(false);
					tab_manage.setHidden(false);
					manage_project.loadData(record); 
					
		        }
			}
    	} );
    	
    	var manage_project = Ext.create('survey.view.list.Project.ManageProject',{   		 
    	    width: '60%' ,
    	    hidden : true ,
    	    url : '/survey/updateProject'
    	});
    	
    	var manage_question = Ext.create('survey.view.list.Project.PCreateQuestion',{   		 
    	    width: '60%' ,
    	    hidden : true ,
    	    title : 'add Question',
    	    url : '/survey/updateProject'
    	});
    	 
    	
    	var tab_manage = Ext.create('Ext.tab.Panel',{
    		hidden : true ,
    		width: '60%' ,
    		height : 200,
    		items : [manage_question]
    		
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
                 items: [project_view,manage_project,tab_manage]
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
 
