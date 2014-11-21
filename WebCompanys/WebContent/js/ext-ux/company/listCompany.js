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
	fieldLabel: 'Country' 
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
		
		this.houseno = Ext.create('company.form.fieldHouseNoAddress',{columnWidth: 0.50,margin: '0 5 5 0'}  );
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


Ext.define('company.listCompany',{
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
		 
		console.log('list Company');
		
		this.idcompany  = Ext.create('company.form.fieldIdCompany' );
		this.companyname  = Ext.create('company.form.fieldCompanyName' );
		this.bussinesstype  = Ext.create('company.form.fieldBusinessType' );
		
		this.telephone  = Ext.create('company.form.fieldTelephone' );
		this.mobile  = Ext.create('company.form.fieldMobile' );
		this.fax  = Ext.create('company.form.fieldFax' );
		
		this.address =  Ext.create('company.form.fieldAddress' );
		
		
		
		this.email  = Ext.create('company.form.fieldEmail' );
		this.website  = Ext.create('company.form.fieldWebSite' );
		
		this.personalcontact  = Ext.create('company.form.fieldPersonalContact' );
		this.phonecontact  = Ext.create('company.form.fieldPhoneContact' );
		
		this.items = [this.idcompany,this.companyname,this.bussinesstype,
		              this.address,
		              this.telephone,
		              this.telephone,this.mobile,this.fax,this.email,this.website,
		              this.personalcontact,this.phonecontact
		              ];
		
		this.btsave = Ext.create('Ext.Button',{		 
			text : 'Save',
			iconCls : 'project-add',
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
	                		}
	                	});
	             
	           /*
	                form.submit({
	                    success: function(form, action) {
	                    	
	                    	main.closeWindow(main,bt);
	                    	//form.reset();
	                    	Ext.Msg.alert('Success', action.result.message);
	                    	main.refreshOther();
	                    },
	                    failure: function(form, action) {
	                    	 
	                    	if (action.response.status = '404'){
	                    		
	                    		Ext.Msg.alert('Failed', action.response.statusText);
	                    		 
	                    	}
	                    	else{
	                    		Ext.Msg.alert('Success', action.result.message);
	                    	}
	                        
	                    }
	                });
	                */
	            }
	            
			}
		});
		
		this.btclose = Ext.create('Ext.Button',{		 
			text : 'Close',
			
			hidden : !main.showClose,
			handler: function (bt,ev){
				main.closeWindow(main,bt);
				 
			}
		});
		main.buttons = [ main.btsave,main.btclose];
		
		this.callParent();
    }
    
});    