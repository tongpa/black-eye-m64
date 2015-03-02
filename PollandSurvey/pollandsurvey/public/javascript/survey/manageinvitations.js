 


Ext.define('survey.view.list.InvitaionsProject', {	
	extend: 'Ext.grid.Panel',
	width : '100%',
	height :  '100%',
	//height :  '400',
	bufferedRenderer: false,
	disableSelection : true,
	forceFit: true,
	//frame: true,
	viewConfig: {
        emptyText: 'No images to display'
    },
    collapsible:false ,
    
    initComponent: function() {
    	
    	var main = this;
    	main.store = survey.listOptions; 
    	main.columns = [
					{header: survey.label.email_title  , dataIndex: 'subject',width : '20%' , sortable: false }  ,
					{header: survey.label.start_date , dataIndex: 'create_date',width : '20%' , sortable: false }  ,
					{header: survey.label.update_date , dataIndex: 'update_date',width : '30%' , sortable: false }  ,
					 
					{header: survey.label.delete  ,  width : '10%',  renderer :main.deletebuttonManage,  sortable: false  } ,
					{header: survey.label.edit ,  width : '10%',  renderer :main.showbuttonManage,  sortable: false  }   
    	        ]
      
    	 
    	this.callParent(arguments);
    	
     
    } ,
    listeners: {
        'selectionchange': function(view, records) {
        	console.log('selectionchange');
          //  grid.down('#removeEmployee').setDisabled(!records.length);
        }
    } ,
    deletebuttonManage : function(value,m,r){
    	var main = this;
    	var id = Ext.id();
    	Ext.defer(function () {
            Ext.widget('button', {
                renderTo: id,
                text: survey.label.delete    ,// + r.get('name'),
                width: 75,
                handler: function () {
                	    
                	  
                		var datajson = Ext.encode(r.data);
	                    //console.log(record);
	                    Ext.Msg.show({
	    				    title: survey.message.confirm_delete ,
	    				    message: survey.message.confirm_delete  + r.data.name_publication,
	    				    buttons: Ext.Msg.YESNO,
	    				    icon: Ext.Msg.QUESTION,
	    				    fn: function(btn) {
	    				        if (btn === 'yes') {
	    				         
	    				        	 
	    				        	Ext.Ajax.request({
	    			              		url		: '/survey/deleteInvitation',
	    			                	method  : 'POST',
	    			                	jsonData: datajson,	
	    			                	success: function(response, opts){
	    			                		var resp = Ext.decode(response.responseText); 	
	    			                		//console.log(resp);
	    			                		if(resp.success){
	    			                			
	    			                			main.getStore().remove(r);
	    			                			//main.resetData();
	    			                		}
	    			                		else{
	    			                			Ext.Msg.alert(survey.message.failed, resp.message);
	    			                		}
	    			                			
	    			                			 
	    			                		},
	    			                	failure: function(response, opts) {
	    			                		console.log('server-side failure with status code ' );
	    			                	}
	    			                	
	    				        	});
	    				        	 
	    				        	 
	    				        }  
	    				    }
	    				});
                }
            });
        }, 50);
        return Ext.String.format('<div id="{0}"></div>', id);
    },
    showbuttonManage : function (value,m,r){
    	var main = this;
    	var id = Ext.id();
        Ext.defer(function () {
            Ext.widget('button', {
                renderTo: id,
                text: survey.label.edit ,// + r.get('name'),
                width: 75,
                handler: function () {
                	//Ext.Msg.alert('Info', r.get('name'));  
                	//main.showManage(r);
                	console.log('showManageOption');
                	main.fireEvent('showManageOption', this, r);
                }
            });
        }, 50);
        return Ext.String.format('<div id="{0}"></div>', id);
   
    },
    showbuttonView : function(value,m,r){
    	
    	var main = this;
    	var id = Ext.id();
        Ext.defer(function () {
            Ext.widget('button', {
                renderTo: id,
                text: survey.label.view ,// + r.get('name'),
                width: 75,
                handler: function () {
                //	debugger;
                	main.openUrl =  window.location.origin +"/";// window.location.protocol + window.location.host + "/"; 
                	console.log(main.openUrl);	
                	 
                	window.open(  "/preview?id=" + r.data.id_question_option,"_blank");
                	 
                }
            });
        }, 50);
        return Ext.String.format('<div id="{0}"></div>', id);
    }
});
 
 
 
Ext.define('survey.view.list.Project.PManageInvitations',{
	//extend : 'Ext.panel.Panel', 	 
	extend : 'Ext.form.Panel',
	layout: 'fit',
	defaults: {
        anchor: '100%',
        labelWidth: 120 
       // layout: {   type: 'fix' }
    },
	frame: true,
	 
	height : 600,
	bodyPadding: 10,
	showClose : true,
    
    isCreate : true,
    parentForm : null,
    setLoad : function (projectRecord){
    	
    	this.projectid = '';
    	this.record = projectRecord;
    	if (projectRecord != null && projectRecord.id != null) {
    		
    		this.projectid = projectRecord.id;
	    	survey.listOptions.load({
				params : {
	    			projectid : projectRecord.id
	    		},
	    		scope : this
			});
    	}
    	
    },
    initComponent: function() {
		
		var main = this;
		//main.add111 = Ext.create('survey.view.list.Project.AddQuestion',{msgTarget: 'side'});
		main.showWindowsOption = Ext.create('survey.view.list.Project.Invitation.winAddInvitation',{
			url : '/survey/addInvitation',
			title : survey.label.create_invitation ,
			titleAlign : 'left',
			listeners : {
				refreshOther : function(cmp) {
					//survey.listProject.reload();
					
					main.setLoad(main.record);
		        }
			}
			
		});
		main.tbar =  [{
            xtype:'button',
            text: survey.label.create_invitation ,
            iconCls: 'project-add',
            handler: function(bt,ev){
            	main.showWindowsOption.show();
				//console.log(record);
			 	main.showWindowsOption.setLoadData(main.record );
            }
            //,            menu: [{text: 'Menu Button 1'}]
        }];
		
		main.showListOption = Ext.create('survey.view.list.InvitaionsProject',{
			listeners : {
				showManageOption : function(grid,optionsrecord) {
					main.showWindowsOption.show();
				 	main.showWindowsOption.setLoadData(main.record,optionsrecord );
					 
		        }
			}
		});
		
		main.items = [main.showListOption];
		
		//main.items = main.add111;
		
		this.callParent();
    }
    
});    