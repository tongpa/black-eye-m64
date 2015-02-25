

Ext.define('survey.view.list.Project.btAddProject',{
	extend: 'Ext.Button',
	text : survey.label.add_project,
	iconCls : 'project-add'
});




 


Ext.define('survey.view.list.Project', {	
	extend: 'Ext.grid.Panel',
	//autoHeight: true, 
	height:'100%' ,
	bufferedRenderer: false,
	disableSelection : true,
	forceFit: true,
	frame: true,
	
	//title : 'Project poll and survey',
	viewConfig: {
        emptyText: 'No images to display',
        forceFit: true 
    },
    collapsible:false ,
    initComponent: function() {
    	
    	var main = this;
    	main.store = survey.listProject; 
    	main.columns = [
    	       	       
    	    	    {header: survey.label.name, dataIndex: 'name',width : '30%' , sortable: false }  ,
    	    	    {header: survey.label.project_type, dataIndex: 'question_project_type',width : '15%', renderer :main.showprojecttype , sortable: false }  ,
    	    	    {header: survey.label.start_date , dataIndex: 'start_date',width : '15%' , sortable: false }   ,
    	    	    {header: survey.label.delete,  width : '10%', renderer :main.deleteButton, sortable: false  } ,
    	    	    {header: survey.label.edit,  width : '10%',  renderer :main.showbuttonManage,  sortable: false  }       	    	     
    	            
    	        ]   	
    
		 
    	
    	main.showWin =  Ext.create('survey.view.list.Project.winAddProject',{
    		url : '/survey/saveProject',
    		//height : 500,
			listeners : {
				refreshOther : function(cmp) {
					survey.listProject.reload();
		        }
			}
    	} ) ;
    	 
    	main.addProject = Ext.create('survey.view.list.Project.btAddProject',{
    		parent : main,
    		handler: function () { 
    			 
    			 
    			this.parent.showWin.show(this);
    			this.parent.showWin.resetData();
    		}
    	} );
    	
    	//main.showWin.targetFrom = main.addProject;
    	main.tbar = [main.addProject ] ;
    	 
    	this.callParent(arguments);
    	
     
    },
    showprojecttype : function (value, m, r){
    	 
    	return value.description;
    },
    showbuttonManage : function (value,m,r){
    	var main = this;
    	var id = Ext.id();
        Ext.defer(function () {
            Ext.widget('button', {
                renderTo: id,
                text: survey.label.edit,// + r.get('name'),
                width: 75,
                handler: function () {
                	//Ext.Msg.alert('Info', r.get('name'));  
                	main.showManage(r);
                }
            });
        }, 50);
        return Ext.String.format('<div id="{0}"></div>', id);
   
    } ,
    deleteButton : function(value,m,r){
    	var main = this;
    	var id = Ext.id();
    	 
    	 
        Ext.defer(function () {
            Ext.widget('button', {
                renderTo: id,
                iconCls : 'project-remove',
                text: survey.label.delete,// + r.get('name'),
                width: 75,
                record : r,
                
                handler: function (bt,ev) { 
                	//debugger;
                	 
                	main.removeProject(r);
                	 
                	
                }
            });
        }, 50);
        return Ext.String.format('<div id="{0}"></div>', id);
    },
    listeners: {
        'selectionchange': function(view, records) {
            grid.down('#removeEmployee').setDisabled(!records.length);
        }
    },
    showManage : function( record ) {
        //do some stuff here

        this.fireEvent('showManage', this,record);
    },
    removeProject : function(record){
    	 
    	
    	var main= this;
    	//survey.listProject.remove(r);
    	var datajson =  Ext.encode(record.data);
    	
    	console.log(datajson);
    	
    	Ext.Msg.show({
		    title: survey.message.confirm_delete,
		    message: survey.message.confirm_delete + record.data.name,
		    buttons: Ext.Msg.YESNO,
		    icon: Ext.Msg.QUESTION,
		    fn: function(btn) {
		        if (btn === 'yes') {
		        	 
		        	Ext.Ajax.request({
	              		url		: '/survey/deleteProject',
	                	method  : 'POST',
	                	jsonData: datajson,	
	                	success: function(response){
	                	    	
	                		main.getStore().remove(record);
	                		 
	                			
	                			 
	                		}
	                	});
		        	 
		        	 
		        }  
		    }
		});
    	
    	
    }
    /*,
    onSelectionChange: function(selmodel, selection) {
        var selected = selection[0],
            button = this.down('button[action=remove]');
        if (selected) {
            button.enable();
        }
        else {
            button.disable();
        }
    }*/
});
