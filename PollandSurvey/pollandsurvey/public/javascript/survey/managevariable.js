 

Ext.define('survey.view.list.Project.PCreateVariable',{
	//extend : 'Ext.panel.Panel', 	 
	extend : 'Ext.form.Panel',
 
	defaults: {
        anchor: '100%',
        labelWidth: 120
    },
	frame: false,
	
	height : 200,
	bodyPadding: 10,
	showClose : true,
    
    isCreate : true,
    parentForm : null,
    initComponent: function() {
		
		var main = this;
		//main.add111 = Ext.create('survey.view.list.Project.AddQuestion',{msgTarget: 'side'});
		
		main.tbar =  [{
            xtype:'splitbutton',
            text: survey.label.create_variable,
            iconCls: 'add16',
            menu: [{text: 'Menu Button 1'}]
        }];
		
		
		
		//main.items = main.add111;
		
		this.callParent();
    }
    
});    