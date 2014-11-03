

Ext.define('survey.view.list.Project.btAddProject',{
	extend: 'Ext.Button',
	text : 'Add Project',
	iconCls : 'project-add'
});




 


Ext.define('survey.view.list.Project', {	
	extend: 'Ext.grid.Panel',
	width : '100%',
	height :  '100%',
	bufferedRenderer: false,
	disableSelection : true,
	forceFit: true,
	frame: true,
	
	title : 'Project poll and survey',
	viewConfig: {
        emptyText: 'No images to display'
    },
    collapsible:false ,
    initComponent: function() {
    	
    	var main = this;
    	main.store = survey.listProject; 
    	main.columns = [
    	       	       
    	    	    {header: 'name', dataIndex: 'name',width : '30%' , sortable: false }  ,
    	    	    {header: 'type', dataIndex: 'question_project_type',width : '20%', renderer :main.showprojecttype , sortable: false }  ,
    	    	    {header: 'create', dataIndex: 'start_date',width : '30%' , sortable: false }   ,
    	    	    {header: 'Manage',  width : '10%', renderer :main.showbuttonManage,  sortable: false  }    ,
    	    	    {header: 'Delete',  width : '10%', renderer :main.deleteButton, sortable: false  }  
    	            
    	        ]
    	
    
		 
    	
    	main.showWin =  Ext.create('survey.view.list.Project.winAddProject',{
    		url : '/survey/saveProject',
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
                text: 'Manage',// + r.get('name'),
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
    	var id = Ext.id();
    	//console.log(m);
    	console.log(r);
        Ext.defer(function () {
            Ext.widget('button', {
                renderTo: id,
                iconCls : 'project-remove',
                text: 'Delete',// + r.get('name'),
                width: 75,
                record : r,
                
                handler: function (bt,ev) { 
                	//debugger;
                	 
                	survey.listProject.remove(bt.record);
                	Ext.Msg.alert('Info', r.get('name'));  
                	
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
    },/*,
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
