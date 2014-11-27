Ext.define('company.form.fieldIdCompany',{
	extend: 'Ext.form.field.Hidden',
	name : 'id_company'
});


Ext.define('company.form.fieldCompanyName',{
	extend: 'Ext.form.field.Text',
	name : 'company_name',
	fieldLabel: 'Company Name',
	allowBlank: false 
});


Ext.define('company.form.fieldBusinessType',{
	extend: 'Ext.form.field.Text',
	name : 'business_type',
	fieldLabel: 'Business Type' 
	
});

Ext.define('company.form.fieldTelephone',{
	extend: 'Ext.form.field.Text',
	name : 'telephone',
	fieldLabel: 'Telephone' 
});

Ext.define('company.form.fieldMobile',{
	extend: 'Ext.form.field.Text',
	name : 'mobile',
	fieldLabel: 'Mobile' 
});

Ext.define('company.form.fieldFax',{
	extend: 'Ext.form.field.Text',
	name : 'fax',
	fieldLabel: 'Fax' 
});

Ext.define('company.form.fieldEmail',{
	extend: 'Ext.form.field.Text',
	name : 'email',
	fieldLabel: 'Email' 
});

Ext.define('company.form.fieldWebSite',{
	extend: 'Ext.form.field.Text',
	name : 'website',
	fieldLabel: 'Website' 
});


Ext.define('company.form.fieldPersonalContact',{
	extend: 'Ext.form.field.TextArea',
	name : 'personal_contact',
	fieldLabel: 'Personal Contact',
	grow      : true 
	
}); 

Ext.define('company.form.fieldPhoneContact',{
	extend: 'Ext.form.field.Text',
	name : 'phone_contact',
	fieldLabel: 'Phone Contact' 
});

Ext.define('company.form.fieldHouseNoAddress',{
	extend: 'Ext.form.field.Text',
	name : 'house_no',
	fieldLabel: 'House No.' 
});

Ext.define('company.form.fieldBuildingAddress',{
	extend: 'Ext.form.field.Text',
	name : 'building',
	fieldLabel: 'Building' 
});

Ext.define('company.form.fieldMooAddress',{
	extend: 'Ext.form.field.Text',
	name : 'moo',
	fieldLabel: 'Moo' 
});

Ext.define('company.form.fieldSoiAddress',{
	extend: 'Ext.form.field.Text',
	name : 'soi',
	fieldLabel: 'Soi' 
});

Ext.define('company.form.fieldRoadAddress',{
	extend: 'Ext.form.field.Text',
	name : 'road',
	fieldLabel: 'Road' 
});

Ext.define('company.form.fieldCountryAddress',{
	extend: 'Ext.form.field.Text',
	name : 'country',
	fieldLabel: 'Country' ,
	value : 'ไทย'
});

Ext.define('company.form.fieldProvinceAddress',{
	extend: 'Ext.form.field.Text',
	name : 'province',
	fieldLabel: 'Province' 
});

Ext.define('company.form.fieldCityAddress',{
	extend: 'Ext.form.field.Text',
	name : 'city',
	fieldLabel: 'City' 
});

Ext.define('company.form.fieldCountyAddress',{
	extend: 'Ext.form.field.Text',
	name : 'county',
	fieldLabel: 'County' 
});

Ext.define('company.form.fieldZipCodeAddress',{
	extend: 'Ext.form.field.Text',
	name : 'zip_code',
	fieldLabel: 'Zip Code' 
});


Ext.define('company.form.btAddCompany',{
	extend: 'Ext.Button',
	text : 'Add Company',
	iconCls : 'img-btadd' 
});


Ext.define('company.form.GeographyAddress',{
	extend : 'Ext.form.Panel',
	defaults: {
        anchor: '100%',
        labelWidth: 110,
        layout: {   type: 'fix' }
    },
	initComponent: function() {
		
		this.country = Ext.create('company.form.fieldCountryAddress' ,{columnWidth: 0.50,margin: '0 5 5 0'} );
		this.province = Ext.create('company.form.fieldProvinceAddress',{columnWidth: 0.50,margin: '0 0 0 0'} );
		this.city = Ext.create('company.form.fieldCityAddress' ,{columnWidth: 0.50,margin: '0 5 5 0'} );
		this.county = Ext.create('company.form.fieldCountyAddress' ,{columnWidth: 0.50,margin: '0 0 0 0'} );
		
		 
		 
		this.row1 = Ext.create('Ext.form.Panel',{
			defaults: {  anchor: '100%', labelWidth: 110 },
			 layout:'column', items :[ this.country,this.province ]
		});
		this.row2 = Ext.create('Ext.form.Panel',{
			defaults: {  anchor: '100%', labelWidth: 110 },
			 layout:'column', items :[ this.city,this.county ]
		}); 
		
		//this.items = [this.country,this.province,this.city ,this.county];
		this.items = [this.row1,this.row2 ];
		
		
		this.callParent();
	}
});

Ext.define('company.form.fieldAddress',{
	extend : 'Ext.form.FieldSet',
	title: 'Address',
    collapsible: false,
    //collapsed: true,
	defaults: {
        anchor: '100%',
        labelWidth: 110,
        layout: {   type: 'fix' }
    },
	initComponent: function() {
		
		this.houseno = Ext.create('company.form.fieldHouseNoAddress',{columnWidth: 0.50,margin: '0 5 5 0' });
		
			
		this.building = Ext.create('company.form.fieldBuildingAddress',{columnWidth: 0.50}  );
		this.moo = Ext.create('company.form.fieldMooAddress',{columnWidth: 0.50,margin: '0 5 5 0'} );
		this.soi = Ext.create('company.form.fieldSoiAddress' ,{columnWidth: 0.50});
		this.road = Ext.create('company.form.fieldRoadAddress' ,{columnWidth: 0.50,margin: '0 5 5 0'});  
		
		
		this.geographic =  Ext.create('company.form.GeographyAddress'  );
		
		this.zipcode = Ext.create('company.form.fieldZipCodeAddress'  ,{columnWidth: 0.50,margin: '0 5 5 0'} );
		
		 
		 
		this.row1 = Ext.create('Ext.form.Panel',{
			defaults: {  anchor: '100%', labelWidth: 110 },
			 layout:'column', items :[ this.houseno,this.building ]
		});
		
		this.row2 = Ext.create('Ext.form.Panel',{
			defaults: {  anchor: '100%', labelWidth: 110 },
			 layout:'column', items :[ this.moo,this.soi ]
		});
		
		this.row3 = Ext.create('Ext.form.Panel',{
			defaults: {  anchor: '100%', labelWidth: 110 },
			 layout:'column', items :[ this.road  ]
		});
		
		this.row4 = Ext.create('Ext.form.Panel',{
			defaults: {  anchor: '100%', labelWidth: 110 },
			 layout:'column', items :[ this.zipcode  ]
		});
		 
		//Ext.form.Panel
		//Ext.panel.Panel
		 
		
		
		
		this.items = [ this.row1 ,
		               this.row2	  
		               ,this.row3  ,
		               this.geographic,
		               this.row4
		              ];
	 
		
		 
		this.callParent();
	}
});




Ext.define('company.listSearchCompany',{
	//extend : 'Ext.panel.Panel', 	 
	
	extend: 'Ext.grid.Panel',
	width : '100%',
	height :  '100%',	 
	frame: false,	
	//title: 'Find Company', 
	bodyPadding: 10,
	showClose : true,
	viewConfig: {
        emptyText: 'No images to display'
    },
    isCreate : true,
    parentForm : null,
    collapsible:false ,
    initComponent: function() {
		
    	var main = this;
    	main.store = company.searchCompany; 
    	main.columns = [
    	       	       
    	    	    {header: 'company', dataIndex: 'company_name',width : '65%' , sortable: false }  ,
    	    	    {header: 'business type', dataIndex: 'business_type',width : '25%',   sortable: false }  
    	            
    	        ];
    	 
     
		this.callParent();
		 
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    },
    onSelectChange: function(selModel, selections){
        
        this.fireEvent('showCompany', selections[0]);
		 
    }
    
}); 



Ext.define('company.listCompany',{
	//extend : 'Ext.panel.Panel', 	 
	extend : 'Ext.form.Panel',
 	autoScroll : true,
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
    
    loadDataRecord : function(company){
    	this.getForm().loadRecord(company);
    	this.listPosition.loadPosition(company);
		this.fireEvent('showCompanyName', this,company);
		if (!this.groupSetField.collapsed)// opened already
		{
		 	 this.groupSetField.toggle();
		}
    },
    resetData : function(){
    	this.getForm().reset();
		this.listPosition.resetData();
		this.fireEvent('resetDataAll', this); 
		if (!this.groupSetField.collapsed)// opened already
		{
		 	 this.groupSetField.toggle();
		}
		
		this.companyname.focus();
    },
    searchCompanyByName : function(companyName){
    	
    	var main = this;
    	company.searchCompany.load({
			params: {
        		'keysearch' : companyName//Ext.urlEncode(t.getValue())
        	},
        	scope:this,
        	callback : function(records, operation, success){
        		if(success){ 
        			//console.log('success');
        			//debugger;
        			if( records.length > 0){
        				if (records.length == 1){
        					
        					main.loadDataRecord(records[0]);
        					 
        				}
        				else{	
        					main.showSearchCompany.show();
        				}
        			}
        			else{
        				main.resetData();
        				 
        				main.companyname.setValue(search);
        				
        				if (main.groupSetField.collapsed)// opened already
						{
						 	 main.groupSetField.toggle();
						}
        				 
        			}
        		}
        	}
		});
    },
    searchCompany : function(t,e){
    	search = t.getValue();
					
		var main = this;	 
		//console.log('key up : ' + search);
		//console.log('ctrl key : ' + e.ctrlKey);
		//console.log('key code : ' + e.keyCode);
		//console.log('char code : ' + e.charCode);
		
		//if(search.length < 3 || e.keyCode <47 || e.keyCode> 105 ){ return; }
		
		
		main.searchCompanyByName(search);
		 
		 
    },
    initComponent: function() {
		
		var main = this;
		 
		//console.log('list Company');
		
		this.resultSearchConpany = Ext.create('company.listSearchCompany' ,{
			listeners : {
				showCompany : function(company){
					//console.log(company);
					main.loadDataRecord(company);
					
				}
			}
		});
		this.showSearchCompany = Ext.create('Ext.window.Window',{
			title : 'Result Search',
			height : 300,
			width : 500,
			layout : 'fit',
			plain : true,
			closeAction : 'hide'
			,items : [
			          {
			        	  xtype : 'panel',
			        	  items : [this.resultSearchConpany]
			          }
			]
			,buttons : [
				{
					xtype : 'button',
					text : 'Close',
					handler : function (bt,ev){
						main.showSearchCompany.hide(bt);
					}
				}
			]
		});
		
		 
		main.buttons = [ main.btsave,main.btclose];
		
		
		this.idcompany  = Ext.create('company.form.fieldIdCompany' );
		this.companyname  = Ext.create('company.form.fieldCompanyName' ,{
			enableKeyEvents : true ,
			listeners : {
				'blur' : {
					fn : function(t,e){
						//key lost focus 
						//main.searchCompany(t,e);
					}
				},
				'keyup' : {
					fn : function(t,e){
						
						if(e.keyCode == 13) {
							main.searchCompany(t,e);
						}
						 
					/* 
						Ext.Ajax.request({
		              		url		: '/WebCompanys/company/search', 
		                	//method  : 'POST',
		                	 
		                	waitTitle: 'Connection',
		                	params: {
		                		'keysearch' : t.getValue()
		                	},
		                	
		                	scope:this,	
		                	success: function(response){
		                	    	//store.load();
		                		console.log("sucess");
		                		}
		                	});
		                	*/
					}
				}
			}
		});
		
		
		/*
		this.houseno.on('keyup',function(t,e){
			console.log('keyup ' + t);
		});
			*/
			
			
		this.bussinesstype  = Ext.create('company.form.fieldBusinessType' );
		
		this.telephone  = Ext.create('company.form.fieldTelephone' );
		this.mobile  = Ext.create('company.form.fieldMobile' );
		this.fax  = Ext.create('company.form.fieldFax' );
		
		this.address =  Ext.create('company.form.fieldAddress' );
		
		
		
		this.email  = Ext.create('company.form.fieldEmail' );
		this.website  = Ext.create('company.form.fieldWebSite' );
		
		this.personalcontact  = Ext.create('company.form.fieldPersonalContact' );
		this.phonecontact  = Ext.create('company.form.fieldPhoneContact' );
		
		
		this.groupSetField = Ext.create('Ext.form.FieldSet',{
			
			title : 'detail',
			defaults: {
		        anchor: '100%',
		        labelWidth: 110,
		        layout: {   type: 'fix' }
		    }, 
		    collapsible: true,
		    collapsed: true,
		    items : [this.bussinesstype,
		              this.address,
		              this.telephone,
		              this.telephone,this.fax,this.mobile,this.email,this.website,
		              this.personalcontact,this.phonecontact]
		});
		
		this.listPosition = Ext.create('company.listPosition' );
		
		
		
		this.items = [this.idcompany,this.companyname,this.groupSetField,this.listPosition
		              ];
		
		this.btsave = Ext.create('Ext.Button',{		 
			text : 'Save',
			iconCls : 'img-save',
			formBind: true,  
	        disabled: true,
			handler : function(bt,ev){
				var form = this.up('form').getForm();
	            if (form.isValid()) {
	             
	            	var values = form.getValues();
	            	Ext.Ajax.request({
	              		url		: '/WebCompanys/company/addCompany',
	                	method  : 'POST',
	                	jsonData: values,	
	                	success: function(response){
	                	    	//store.load();
	                		
	                		//main.getForm().reset();
	                		//main.groupSetField.toggle();
	                			
	                			main.valueSearch = main.companyname.getValue();
	                			main.resetData();
	                			
	                			main.searchCompanyByName(main.valueSearch);
	                		}
	                	});
	             
	            
	            }
	            
			}
		});
		
		this.btclose = Ext.create('Ext.Button',{		 
			text : 'Clear',
			
			hidden : !main.showClose,
			handler: function (bt,ev){
				 
				main.resetData();
				
			}
		});
		
		this.btdelete = Ext.create('Ext.Button',{		 
			text : 'Delete',
			iconCls : 'img-delete',
			disabled: true,
			formBind: true,
			hidden : !main.showClose,
			handler: function (bt,ev){
				 
				var form = this.up('form').getForm(); 
				var values = form.getValues();
				
				Ext.Msg.show({
				    title:'Confirm Delete?',
				    message: 'Do you delete : ' + main.companyname.getValue(),
				    buttons: Ext.Msg.YESNO,
				    icon: Ext.Msg.QUESTION,
				    fn: function(btn) {
				        if (btn === 'yes') {
				        	Ext.Ajax.request({
			              		url		: '/WebCompanys/company/delCompany',
			                	method  : 'POST',
			                	jsonData: values,	
			                	success: function(response){
			                	    	 
			                			main.resetData();
			                			
			                			 
			                		}
			                	});
				        	
				        	form = null;
			            	values = null;
				        }  
				    }
				});
				
				
            	
            	
            	
				
			}
		});
	 
		main.buttons = [main.btdelete, {
	        xtype: 'tbspacer',
	        border: 0,
	        flex: 1
	    }, main.btsave,main.btclose];
		
		
		main.AddCompany = Ext.create('company.form.btAddCompany',{
    		parent : main,
    		handler: main.onAddClick,
    		itemId: 'AddCompany',
            scope: this
    	});
    	main.tbar = [main.AddCompany ] ;
		
		
		this.callParent();
		
		this.companyname.focus();
    },
    onAddClick: function(){
    	this.resetData();
    	this.groupSetField.toggle();
    	
    }
    
});    