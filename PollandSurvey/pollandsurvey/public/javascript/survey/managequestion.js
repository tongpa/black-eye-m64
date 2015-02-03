
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

Ext.define('survey.view.list.Project.fieldUpload',{
	extend: 'Ext.form.field.File',
	name : 'image_upload',
	fieldLabel: 'Image', 
	allowBlank: true 
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
	                	 console.log('drop');
	                	
	                	
	                	if(dropPosition == 'before'){
	                		console.log('before');
	                	}
	                	else {
	                		if (dropPosition == 'after'){
	                			console.log('after');
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
						            	 
						            	console.log('afterrender');
						            },
						            move: function( g, component, prevIndex, newIndex, eOpts ){
						            	console.log('move template column');
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
					                    
					                    console.log(record);
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
					    			                	success: function(response){
					    			                	    	
					    			                		grid.getStore().remove(record);
					    			                			//main.resetData();
					    			                			
					    			                			 
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
		console.log('click1'); 
		
		survey.listQuestionsData.each(function(record){ 
			 
			console.log(record) ; 
		});
		
		survey.listQuestionsData.sync();
		//debugger;
	},
    listeners: {
    	render: function(c,m){
    	//	initializePatientDragZone(c);
        	console.log('render');
        },
        beforeselect : function(c,record,index,eOpts){
        	console.log('beforeselect');
        	//debugger;
        	
        	
        }
         
    }
});


Ext.define('survey.view.list.Project.ImageView',{
	extend : 'Ext.form.Panel',
	record : null,
	defaults: {
        anchor: '100%',
        labelWidth: 100
    }, 
    setLoadData : function( questionrecord ){
    	var form = this;
    	form.record = questionrecord;
    	form.wrappedImage.setHidden(true);
    	form.fileUpload.setHidden(true);
		form.wrappedImage.setSrc('');
		console.log('load image');
    	if(questionrecord != null && (questionrecord.data.question_type_name.search("Image") >=0 ) ){
    		form.wrappedImage.setHidden(false);
    		form.wrappedImage.setSrc('/images/getImage?id=' + questionrecord.data.id_question);
    		
    		form.fileUpload.setHidden(false);
    	}
    	 
    },
    initComponent: function() {
    	
    	var main = this;
    	main.fileUpload = Ext.create('survey.view.list.Project.fieldUpload',{msgTarget: 'side', flex: 3});
    	main.wrappedImage = Ext.create('Ext.Img', { anchor: '25%',hideLabel: true,title : '' , flex: 1});
    	main.wrappedImage.setHidden(true);
    	main.fileUpload.setHidden(true);
    	
    	
    	main.items = [
    	              {
    	            	  layout: {
    	            	        type: 'hbox',
    	            	        align: 'stretch'
    	            	    },
    	            	    items : [main.wrappedImage,main.fileUpload]
    	              }
    	              
    	              ];
    	this.callParent();
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
    	
    	console.log('survey.view.list.Project.PAddQuestion');
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
		form.fileUpload.setLoadData(questionrecord);
		 
		
		
//		debugger;
		console.log("set data add question");
		console.log(questionrecord);
		//load grid question
		form.answerCardPanel.setLoadData(questionrecord);
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
	            if (form.isValid()) {
	            	
	            	//var data =survey.listBasicData.getData();
	            	var data = [];
	        		survey.listBasicData.each(function(record){ 
	        	 		var d = record.data;
	        			idQuestion = record.data.id_question.data;
	        			d.id_question = idQuestion;
	        			data.push(d);
	        			d = null; 
	        	 	});
	        		console.log(data);
	            	//for image
	        		debugger;
	        		
	        		var answer_image = document.getElementsByName('answer_image');
	        		
	        		main.dataGrid.setValue( Ext.encode(data));
	        	 
	        	 
	             
	                form.submit({
	                    success: function(form, action) {
	                    	//save all question
	                    	/*
	                    	survey.listBasicData.each(function(record){ 
	                    	  if(record.id != 0){
	                    	    record.dirty = false;
	                    	  }
	                    	});*/
	                    	//it is ok.
	                    	//survey.listBasicData.sync();
	                    	
	                    	main.closeWindow(main,bt);
	                    	
	                    	//form.reset();
	                    	Ext.Msg.alert('Success', action.result.message);
	                    	main.refreshOther();
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
    	console.log('survey.view.list.Project.winAddQuestion');
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
					console.log(record);
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
    	
    	console.log('Add Question');
    	 
    	 
    	bt.parentForm.winAddQuestion.setLoadData(bt.parentForm.record, null, bt.record);
    }
    
    
});  


 