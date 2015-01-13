Ext.namespace("company");
Ext.Loader.setConfig({enabled: true});


Ext.require([
	'Ext.*',
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.panel.*',
    'Ext.layout.container.Border',
    'Ext.layout.container.Column',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.view.View',
    'Ext.form.*',    
    'Ext.tip.QuickTipManager',           
    'Ext.window.MessageBox',
    'Ext.Msg.*'
]);

//Ext.Loader.setPath('company', '../../../company');


Ext.application({
    name: 'company',
     
    launch: function() {
    	Ext.tip.QuickTipManager.init();
    	
    	//console.log('app company');
     
    	var listCompany = Ext.create('company.listCompany',{url : '/WebCompanys/company/addCompany', 
    		listeners : {
    			showCompanyName : function(cmp,company){
    				labelCompany.setText(company.get('company_name') );
    				
    			},
    			resetDataAll : function(cmp){
    				labelCompany.setText('');
    			}
    		}
    	});
    	
    	var listHistory = Ext.create('company.ListHistory',{
    		region: 'west',
    		//layout: 'fit',
 	        height : '100%',
 	        width: 170
    	});
    	
    	listHistory.resetData();
    	
    	
    	var addPosition = Ext.create('company.addPosition',{url : '/WebCompanys/job/addPosition'});
    	
    	//var tabMain = Ext.create('Ext.tab.Panel',{
    	var tabMain = Ext.create('Ext.panel.Panel',{
    		width: '100%',   	
    		layout: 'fit',
    	    items: [listCompany ]
    	});
    	
    	var north_label =  Ext.create('Ext.form.Label',{
           	
           	 height : 100,
           	 labelStyle : 'font-weight:bold;',
           	 margins: '30 0 0 5',
           	 style: { 'font-size':'20px' },
           	 text : 'Company : '
             
    	});
    	
    	var labelCompany =  Ext.create('Ext.form.Label',{
          	 height : 100,
          	 labelStyle : 'font-weight:bold;',
          	 margins: '30 0 0 5',
          	 style: { 'font-size':'20px' },
          	 
          	 text : ' '
            
   	});
    	
    	var north = Ext.create('Ext.panel.Panel',{
    		region: 'north',
	        height : 25,
	        margins: '5 0 0 5',
	        items : [  north_label,labelCompany
	                 ]
    	});
    	
    	Ext.create('Ext.container.Viewport', {
            layout: {
            	type : 'border'
            }, 
            renderTo: Ext.getBody(),
            defaults: {
                collapsible: false,
                split: true 
            },
            
            items: [north, listHistory,  {
    	        region: 'center',
    	        xtype: 'panel', // TabPanel itself has no title
    	        activeTab: 0,      // First tab active by default
    	        layout: 'fit',
    	         
    	        items: [tabMain]
    	    }]
        });
    	 
    	listCompany.resetData();
    	
    	
    	 
    	
    }
});