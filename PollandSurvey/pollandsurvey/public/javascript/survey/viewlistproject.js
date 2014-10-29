


Ext.define('survey.view.list.Project', {
	
	width : '100%',
	height :  '100%',
	extend: 'Ext.grid.Panel',
	viewConfig: {
        emptyText: 'No images to display'
    },
    collapsible:true ,
    initComponent: function() {
    	
    	main = this;
    	main.store = survey.listProject;
    	main.columns = [
    	       	       
    	    	    {header: 'name', dataIndex: 'name',width : '30%'  }  ,
    	    	    {header: 'type', dataIndex: 'question_project_type',width : '20%', renderer :main.showprojecttype  }  ,
    	    	    {header: 'create', dataIndex: 'start_date',width : '30%'  }   ,
    	    	    {header: 'Manage',  width : '20%', renderer :main.showbuttonManage  }   
    	         
    	            
    	        ]
    	 
    	
    	 
    	
    	this.callParent(arguments);
     
    },
    showprojecttype : function (value, m, r){
    	 
    	return value.description;
    },
    showbuttonManage : function (value,m,r){
    	var id = Ext.id();
        Ext.defer(function () {
            Ext.widget('button', {
                renderTo: id,
                text: 'Manage',// + r.get('name'),
                width: 75,
                handler: function () { Ext.Msg.alert('Info', r.get('name'));  }
            });
        }, 50);
        return Ext.String.format('<div id="{0}"></div>', id);
   
    } /*,
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
