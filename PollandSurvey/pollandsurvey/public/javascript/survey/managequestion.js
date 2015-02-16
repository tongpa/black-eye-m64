
Ext.define('survey.view.list.Project.fieldQuestionId',{
	extend: 'Ext.form.field.Hidden',
	name : 'id_question'
});

Ext.define('survey.view.list.Project.fieldProjectId',{
	extend: 'Ext.form.field.Hidden',
	name : 'id_question_project'
});

Ext.define('survey.view.list.Project.fieldQuestionTypeId',{
	extend: 'Ext.form.field.Hidden',
	name : 'id_question_type'
});

Ext.define('survey.view.list.Project.fieldQuestion',{
	extend: 'Ext.form.field.TextArea',
	name : 'question',
	fieldLabel: 'Question', 
	allowBlank: false 
});

Ext.define('survey.view.list.Project.fieldHelp',{
	extend: 'Ext.form.field.TextArea',
	name : 'help_message',
	fieldLabel: 'help', 
	allowBlank: true 
});

Ext.define('survey.view.list.Project.fieldShowLabel',{
	extend: 'Ext.form.Label',
	text : 'Image :',
	margin: '5 0 0 5' ,
	style : 'color: #666666; font-weight: normal; font-size: 13px'
});

Ext.define('survey.view.list.Project.RemoveImageBt',{
	extend: 'Ext.Button',
	name : 'delete_image',
	text : 'Delete',
	iconCls: 'icon-delete'
});

Ext.define('survey.view.list.Project.fieldUpload',{
	extend: 'Ext.form.field.File',
	name : 'image_upload',
	fieldLabel: 'Image', 
	buttonOnly: true,
	hideLabel: true,
	margin: '5 0 0 5' 
});

Ext.define ('survey.view.list.GridQuestions',{
	extend: 'Ext.grid.Panel',
	width : '100%',
	height :  '100%',
	store : survey.listQuestionsData,
	bufferedRenderer: false,
	loadMask: true,
	invalidateScrollerOnRefresh: false,
	forceFit: true,
	frame: true,
	hideHeaders : true,
	multiSelect: true,
	itemSelector: 'div.patient-source',
     overItemCls: 'patient-over',
     selectedItemClass: 'patient-selected',
     enableDragDrop: true,
     selType: 'rowmodel',
    reloadGrid : function(){
    	var main = this;
    	
    },
	initComponent: function() {
		var main = this;
		
		var group1 = this.id + 'group1' ;
		main.viewConfig =  {
			    plugins: {
			        ptype: 'gridviewdragdrop',
			        containerScroll: true,
			        enableDrop: true,
			          enableDrag: true,
			        dragGroup: 'groupQuestion1',
			        dropGroup: 'groupQuestion1' 
			       /*, dragText: '<tpl for=".">' +
				                '<div class="patient-source"><table><tbody>' +
			                    '<tr><td class="patient-label">Question</td><td class="patient-name">test</td></tr>' +
			                    '<tr><td class="patient-label">Question Type</td><td class="patient-name">Single Choice</td></tr>' + 
			                 
				                '</tbody></table></div>' +
				             '</tpl>'*/
			        	//'Drag and drop to reorganize'
			    },
		           
	             listeners: {
	                 drop: function(node, data, overModel, dropPosition, eOpts) {
	                	 //console.log('drop');
	                	
	                	
	                	if(dropPosition == 'before'){
	                		//console.log('before');
	                	}
	                	else {
	                		if (dropPosition == 'after'){
	                			//console.log('after');
	                		}
	                	}
	                	count_order =1;
	                	this.store.each(function(record){ 
	           			 
	            			 
	            			record.set('order', count_order);
	            			count_order =count_order+1;
	            			
	            		});
	            		
	                	
	                	
	                	 
	                	 
	                	 //if(data.records[0].isLeaf()){ 	                		 if(data.records[0].parentNode.data.id!=overModel.parentNode.data.id) 	                		              return false;}
	                	 
	                     //var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('question') : ' on empty view';
	                     //Ext.example.msg("Drag from left to right", 'Dropped ' + data.records[0].get('question') + dropOn);
	                 } 
	             }
		
		};
		main.columns = [
							 
		    	            {
		    	            	xtype: 'templatecolumn',
		    	            	width: '90%',
		    	                tpl: '<tpl for=".">' +
				    	                '<div class="patient-source"><table><tbody>' +
					                    '<tr><td class="patient-label">Question</td><td class="patient-name">{question}</td></tr>' +
					                    '<tr><td class="patient-label">Question Type</td><td class="patient-name">{question_type_name}</td></tr>' + 
					                 
						                '</tbody></table></div>' +
						             '</tpl>',
					             
					 	       // singleSelect: true, 
						        listeners: {
						             
						            click: function (g, td) {
						            	//debugger;
						            	var record = main.getSelectionModel().getSelection()[0];
						            	//debugger;
						     		   //Ext.Msg.alert('Notes','Notes for: ' + record.data.question);
						            	 main.clickOpenQuenstion();
						            },
						            afterrender : function( g, eOpts ){
						            	 
						            	//console.log('afterrender');
						            },
						            move: function( g, component, prevIndex, newIndex, eOpts ){
						            	//console.log('move template column');
						            	//debugger;
						            	
						            	//main.viewConfig.plugins.dragText = g.tpl;
						            }
				                	  
						        } 
					 	        
		    	            },
							{
					            xtype: 'actioncolumn'
					            	, width: '9%'
					            ,  layout: {
					            	 type: 'hbox',
					                 align: 'stretch'
					            }
					            , items: [{ // Delete button
					                iconCls : 'icon-delete'
					                ,tooltip: 'Delete' 
					                ,text : 'Delete'
					                , flex: 1
					                , handler: function(grid, rowIndex, colindex) {
					                    
					                    var record = grid.getStore().getAt(rowIndex);
					                    
					                    
					                    var datajson = Ext.encode(record.data);
					                    
					                    //console.log(record);
					                    Ext.Msg.show({
					    				    title:'Confirm Delete?',
					    				    message: 'Do you delete : ' + record.data.question,
					    				    buttons: Ext.Msg.YESNO,
					    				    icon: Ext.Msg.QUESTION,
					    				    fn: function(btn) {
					    				        if (btn === 'yes') {
					    				        	 
					    				        	Ext.Ajax.request({
					    			              		url		: '/survey/deleteQuestion',
					    			                	method  : 'POST',
					    			                	jsonData: datajson,	
					    			                	success: function(response, opts){
					    			                		var resp = Ext.decode(response.responseText); 	
					    			                		//console.log(resp);
					    			                		if(resp.success){
					    			                			grid.getStore().remove(record);
					    			                			//main.resetData();
					    			                		}
					    			                		else{
					    			                			Ext.Msg.alert('Failed', resp.message);
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
					            },
					            '->',
					            { // Save Button
					            	iconCls : 'icon-edit'					                
					                , style: 'margin-left: 5px;'
					                ,text : 'Edit'
					                ,tooltip: 'Edit' 
					                , flex: 1
					                , handler: function(grid, rowIndex, colindex) {
					                     
					                    var record = grid.getStore().getAt(rowIndex);
					                    main.fireEvent('showEditQuestion', this,record);
					                    
					                    //Ext.Msg.alert('Save', 'Save user: ' + record.data.question);
					                }  
					            }]
					        }
	    	        ];
		
		
		this.callParent(arguments);  
	},
	clickOpenQuenstion : function(){
		//console.log('click1'); 
		
		survey.listQuestionsData.each(function(record){ 
			 
			//console.log(record) ; 
		});
		
		survey.listQuestionsData.sync();
		//debugger;
	},
    listeners: {
    	render: function(c,m){
    	//	initializePatientDragZone(c);
        	//console.log('render');
        },
        beforeselect : function(c,record,index,eOpts){
        	//console.log('beforeselect');
        	//debugger;
        	
        	
        }
         
    }
});


Ext.define('survey.view.list.Project.ImageView',{
	extend : 'Ext.form.Panel',
	record : null,
	accept: ['jpg', 'png', 'gif',  'bmp', 'tif'],  
	fileslist: [],  
	defaults: {
        anchor: '100%',
        labelWidth: 100
    }, 
    setLoadData : function( questionrecord, questiontyperecord ){
    	var form = this;
    	form.record = questionrecord;
    	form.wrappedImage.setHidden(true);
		form.labelShowFileUpload.setHidden(false); 
		form.labelShowFileUpload.setText('No Image.');
 
    	form.fileUpload.reset();
		form.wrappedImage.setSrc('');
		//console.log('load image');
		
		  
    	if(questionrecord != null  ){
    		//&& (questionrecord.data.question_type_name.toLowerCase().search("image") >=0 )
    		//console.log("setShow");
    		form.wrappedImage.setHidden(false);
    		form.wrappedImage.setSrc('/images/getImage?id=' + questionrecord.data.id_question);
    		
    		form.labelShowFileUpload.setHidden(true);
    	}
    	form = null;
    	 
    },
    initComponent: function() {
    	
    	var main = this;
    	main.labelFileUpload = Ext.create('survey.view.list.Project.fieldShowLabel',{ flex: 1 });
    	main.wrappedImage = Ext.create('Ext.Img', { anchor: '15%',margin: '5 0 0 5', title : '' , flex: 1});    	
    	main.labelShowFileUpload = Ext.create('survey.view.list.Project.fieldShowLabel',{text : 'No Image.' , flex: 1 });    	
    	main.fileUpload = Ext.create('survey.view.list.Project.fieldUpload',{msgTarget: 'side', flex: 2,
    		parent : main,
    		margins:'0',
    		listeners: {
				scope: this,
	            'change': function(button, value){
	            	//debugger;
	            	//console.log(value);
	            	if (!button.parent.isReset) {
	            		var IsValid = button.parent.fileValidiation(button,value);
	            		 
		            	if (!IsValid) { 
		            		button.parent.isReset = true;
		            		button.parent.wrappedImage.setSrc('');
		            		button.reset( );
		            		return; } 
		            	
		            	button.parent.isReset = false;
		            	button.parent.labelShowFileUpload.setHidden(false);
		            	button.parent.labelShowFileUpload.setText(value);
		            	
	            	}else{
	            		button.parent.isReset = false;
	            	}
	                 
	            } 
	        }
		});
    	
    	main.deleteFileUpload = Ext.create('survey.view.list.Project.RemoveImageBt',{
			parent : main,
            scope: this,
            margin: '5 0 0 5',
            flex:1,
            margins:'0',
            handler: this.onDeleteClick
           });
    	 
    	
    	//main.wrappedImage.setHidden(true);
    	//main.fileUpload.setHidden(true);
    	
    	
    	main.items = [
    	              {	
    	            	  layout: {
    	            	        type: 'hbox' 
    	            	        ,align:'middle'	
    	            	        ,pack:'start'
    	            	        //,align: 'stretch'
    	            	    },
    	            	    
    	            	    //defaults:{margins:'0 5 0 0'},
    	            	    items : [main.labelFileUpload ,main.wrappedImage,main.labelShowFileUpload,main.fileUpload,main.deleteFileUpload ]
    	              }
    	              
    	              ];
    	this.callParent();
    },
	onDeleteClick : function(bt,ev){
		//console.log('onDeleteClick');
		var form = this;
		
		//debugger;
		

		Ext.Ajax.request({
		   url: '/survey/deleteMediaQuestion',
		   method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           params : Ext.JSON.encode( {'id' : this.record.get('id_question')} ),
		   success: function(response, opts) {
		      var obj = Ext.decode(response.responseText);
		      //console.log(obj);
		   },
		   failure: function(response, opts) {
		      console.log('server-side failure with status code ' + response.status);
		   }
		});
		
		form.wrappedImage.setHidden(true);
		form.wrappedImage.setSrc('');
		
		form.labelShowFileUpload.setHidden(false); 
		form.labelShowFileUpload.setText('No Image.');
		
		form.fileUpload.reset();
		
		
		
	},
	fileValidiation: function(view, filename){
		 
		var isValid = true;  
	     var indexofPeriod = view.getValue().lastIndexOf("."),  
	            uploadedExtension = view.getValue().substr(indexofPeriod + 1, view.getValue().length - indexofPeriod); 
	     
	 
	     
	     if (!Ext.Array.contains(this.accept, uploadedExtension.toLowerCase())) {  
	         isValid = false;  
	         // Add the tooltip below to   
	         // the red exclamation point on the form field  
	         var erroMsg = Ext.String.format('Translate(Please upload files with an extension of {0} only!)', this.accept.join());  
	         //me.setActiveError(erroMsg);
	         //console.log(erroMsg);
	         // Let the user know why the field is red and blank!  
	         var messageBox = Ext.MessageBox.show({  
	           title: 'Translate(Add Attachment)',  
	           msg: erroMsg,  
	           buttons: Ext.Msg.OK,  
	           icon: Ext.Msg.WARNING  
	         });       
	         //view.setRawValue(null);  
	         //view.reset();  
	       }  
	       for (var i = 0; i < this.fileslist.length; i++) {  
	         if (this.fileslist[i].indexOf(filename) !== -1) {  
	           isValid = false;  
	           var erMsg = Ext.String.format('Translate(The file {0} already added)!', filename);  
	           //console.log(erroMsg);
	           var messageBox = Ext.MessageBox.show({  
	             title: 'Translate(Add Attachment)',  
	             msg: erMsg,  
	             buttons: Ext.Msg.OK,  
	             icon: Ext.Msg.INFO  
	           });  
	           view.setRawValue(null);  
	           view.reset();  
	           break;  
	         }  
	       }    
	       return isValid;  
	}
});






Ext.define('survey.view.list.Project.PAddQuestion',{
	//extend : 'Ext.panel.Panel', 	 
	extend : 'Ext.form.Panel',
	bodyPadding: 10,
	showClose : true,
	parentForm : null,
	url:'',
    defaults: {
        anchor: '100%',
        labelWidth: 100
    },
    setLoadData : function (projectrecord,questionrecord, questiontyperecord){
    	
    	//console.log('survey.view.list.Project.PAddQuestion');
    	var form = this;
    	form.projectrecord = projectrecord;
		form.record = questionrecord;
		form.getForm().reset();
		
		if(questionrecord != null){
			form.getForm().loadRecord(questionrecord);
			
		}
		
		if(projectrecord != null){			 	
			form.projectid.setValue(projectrecord.id);
		}
		
		//type of question
		if(questiontyperecord != null){		 	
			form.questiontypeid.setValue(questiontyperecord.id);
		}
		form.fileUpload.setLoadData(questionrecord, questiontyperecord);
		 
		
		
 
		//console.log("set data add question");
		//console.log(questionrecord);
		
		//load grid question
		form.answerCardPanel.setLoadData(questionrecord,questiontyperecord);
		//form.answerCardPanel.choose.setLoadData(questionrecord);
    },
	initComponent: function() {
		
		var main = this;
		main.questionid = Ext.create('survey.view.list.Project.fieldQuestionId',{msgTarget: 'side'});
		main.question = Ext.create('survey.view.list.Project.fieldQuestion',{msgTarget: 'side'});
		main.help = Ext.create('survey.view.list.Project.fieldHelp',{msgTarget: 'side'});
		
		main.projectid = Ext.create('survey.view.list.Project.fieldProjectId',{msgTarget: 'side'});
		
		main.fileUpload = Ext.create('survey.view.list.Project.ImageView',{msgTarget: 'side'});
		
		main.questiontypeid  = Ext.create('survey.view.list.Project.fieldQuestionTypeId');
		
		main.answerCardPanel = Ext.create('survey.view.gui.questiontype.CardPanel');
		
		main.dataGrid = Ext.create('Ext.form.field.Hidden',{name : 'datagrid'});
		
		 
		
		main.fieldSetsHelp = Ext.create('Ext.form.FieldSet',{
			title: 'help',
	        collapsible: true,
	        collapsed: true,
	         
	        defaults: {
	        	hideLabel : true,
	            labelWidth: 120,
	            anchor: '100%',
	            layout: {   type: 'fix' }
	        },
	        items : main.help
		});
		
		//main.choose = Ext.create('survey.view.list.GridAnswer');
		
//		
		 
		main.items = [main.questionid,main.projectid,main.questiontypeid ,main.dataGrid, main.question ,main.fileUpload, main.fieldSetsHelp,main.answerCardPanel   ];  
		
		
		
		
		
		
		main.btsave = Ext.create('Ext.Button',{		 
			text : 'Save',
			//iconCls : 'project-add',
			formBind: true,  
	        disabled: true,
			handler : function(bt,ev){
				var form = this.up('form').getForm();
				
				console.log('Check Save');
				
	            if (form.isValid()) {
	            	
	            	//var data =survey.listBasicData.getData();
	            	var data = [];
	            	
	            	var items = survey.listBasicData.data.items;
	            	var len = items.length;
	            	
	            	console.log('Get Data From Store');
	            	survey.listBasicData.each(function(record){ 	        	            		 		 
        		 	   data.push(record.data);
        		 	});
	            	
	            	survey.listBasicData.removeAll();
	            	
	            	for(var i = 0; i < len ; i++){
	            		  if (!main.checkInteger(data[i].id_basic_data)){
	            			  data[i].id_question = '';
	            			  data[i].id_basic_data = '';
	            		  }
	            	}
	            	  
	            	
	        		len = survey.listBasicMediaData.data.length;
	        		
	        		//console.log('survey.listBasicMediaData.data.length : ' + survey.listBasicMediaData.data.length);
        		 	
	        		
	        		
	        		for(var i = 0; i < len ; i++){
        		 		var record = survey.listBasicMediaData.data[i];
        		 		if(record == null ){
        		 			record = survey.listBasicMediaData.data.items[i];
        		 		}
        		 		 
        		 		var d = record.data;
        		 		var idQuestion = record.data.id_question;
	        			d.id_question='';
	        			
	        			if (main.checkInteger(record.id)){
	        				d.id_question =  idQuestion;
	        			}
	        			 
	        			
	        			
	        			//console.log(d);
	        			data.push(d);
	        			d = null; 
        		 	}
	        		
	        		
	        		
	        		main.dataGrid.setValue( Ext.encode(data));
	        	 
	        		
	        		 
	                form.submit({
	                	scope: this,
	                	method: 'POST',
	                	headers: {
	                        'Content-Type': 'application/json;charset=utf-8'
	                    },
	                	waitMsg: 'Save your Data...',
	                    success: function(form, action) {
	                    	  
	                    	debugger;
	                    	/*
	                    	main.closeWindow(main,bt);
	                    	
	                    	//form.reset();
	                    	Ext.Msg.alert('Success', action.result.message);
	                    	main.refreshOther();
	                    	*/
	                    },
	                    failure: function(form, action) {
	                    	 
	                    	if (action.response.status = '404'){
	                    		
	                    		Ext.Msg.alert('Failed', action.response.statusText);
	                    		main.closeWindow(main,bt);
	                    		 
	                    	}
	                    	else{
	                    		Ext.Msg.alert('Success', action.result.message);
	                    	}
	                        
	                    }
	                });  
	            }
			}
		});
		main.btclose = Ext.create('Ext.Button',{		 
			text : 'Close',
			
			hidden : !main.showClose,
			handler: function (bt,ev){
				main.closeWindow(main,bt);
				 
				//main.up('form').getForm().reset();
				//main.parentForm.hide(bt);
			}
		});
		main.buttons = [ main.btsave,main.btclose];
		
		
		
		this.callParent();
	},
	checkInteger : function (value) {
		  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
	},
	refreshOther : function( ) {
        //do some stuff here

        this.fireEvent('refreshOther', this);
    },
	closeWindow : function (main,bt){
		if(main.parentForm != null){
			main.form.reset();
			main.parentForm.hide(bt);
			 
		}
	}
});


Ext.define('survey.view.list.Project.winAddQuestion',{
	extend: 'Ext.window.Window',
	text : 'Add Question',
	layout: 'fit',
	 
	modal : true,
	width : 500,
	height : 500,
	closable: true,
	 
    closeAction: 'hide',
    showClose : true,
    maximizable: true,
    constrain: true,
    url : '',
    //animateTarget: button,
	header: {
        titlePosition: 2,
        titleAlign: 'center' 
    },
    
    setLoadData : function(projectrecord,questionrecord, questiontyperecord){
    	//console.log('survey.view.list.Project.winAddQuestion');
    	this.panelQuestion.setLoadData(projectrecord,questionrecord, questiontyperecord);
    },
    
	initComponent: function() {
		 
		var main = this;
		main.panelQuestion = Ext.create('survey.view.list.Project.PAddQuestion' ,{
			url : main.url,
			showClose : main.showClose,
			parentForm : main,
			listeners : {
				refreshOther : function(cmp) {
		            this.parentForm.refreshOther();
		        }
		    }});
	 	 
		 
		main.items = main.panelQuestion; 
		 
		this.callParent();
		
		 
		 
	},
	refreshOther : function( ) {
        //do some stuff here

        this.fireEvent('refreshOther', this);
    } 
});




Ext.define('survey.view.list.Project.PCreateQuestion',{
	//extend : 'Ext.panel.Panel', 	 
	extend : 'Ext.form.Panel',
 
	defaults: {
        anchor: '100%',
        labelWidth: 120
    },
	frame: false,
	 
	//height : 200,
	bodyPadding: 10,
	showClose : true,
    
    isCreate : true,
    parentForm : null,
    setLoad : function (projectRecord){
    	
    	this.projectid = '';
    	this.record = projectRecord;
    	if (projectRecord != null && projectRecord.id != null) {
    		
    		this.projectid = projectRecord.id;
	    	survey.listQuestionsData.load({
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
		
		main.projectid = Ext.create('survey.view.list.Project.fieldProjectId');
		
		
		main.winAddQuestion = Ext.create('survey.view.list.Project.winAddQuestion',{
			url : '/survey/addQuestion',
			title : 'Add Question',
			titleAlign : 'left',
			listeners : {
				refreshOther : function(cmp) {
					//survey.listProject.reload();
					main.setLoad(main.record);
		        }
			}
			
		});
		
		main.SplitBt = Ext.create('Ext.button.Split',{
			text : 'Create Questions',
			iconCls: 'add16',
			floating: false
		});
		
		
		
		main.tbar = [main.SplitBt];
		
		
 
		
		main.gridQuestion = Ext.create('survey.view.list.GridQuestions',{
			listeners : {
				showEditQuestion : function(cmp,record) {
					
					main.winAddQuestion.show();
					//console.log(record);
					main.winAddQuestion.setLoadData(main.record,  record, null);
					//survey.listProject.reload();
		        }
			}
		}); 
	 
		
		
		
		main.items = [main.projectid,  main.gridQuestion];
		
		
		//refresh menu
		survey.listQuestionType.load({
			callback :  function(records, operation, success) {
		    	
		    	  
		    	 menus = Ext.create('Ext.menu.Menu');
		    	  
		         if(success){
		        	 for (var i =0;i< records.length ; i++){
		        		 
		        		 menus.add({
		        			 text: records[i].data.description 
		        			 ,record : records[i]
		        			 ,idx: records[i].id 
		        			 ,parentForm : main
		        			 ,handler: main.createQuestion 
		        			 });
		        	 }
		         }
		         
		         main.SplitBt.menu = menus;
		         
		    },
			parent : main,
			scope:this
		});
		
		
		
		this.callParent();
    } ,
    createQuestion : function(bt,ev){
    	 
    	bt.parentForm.winAddQuestion.setTitle( 'Add Question' + '-' + bt.record.data.description);
    	 
    	bt.parentForm.winAddQuestion.show();
    	
    	//console.log('Add Question');
    	 
    	 
    	bt.parentForm.winAddQuestion.setLoadData(bt.parentForm.record, null, bt.record);
    }
    
    
});  


 