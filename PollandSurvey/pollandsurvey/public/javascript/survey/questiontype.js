Ext.define('survey.view.gui.questiontype.ImagePanel.AnswerImage',{
	extend: 'Ext.form.field.File',
	name : 'answer_image',
	fieldLabel: survey.label.image, 
	allowBlank: true 
});

Ext.define('survey.view.gui.questiontype.ImagePanel.ImageLabel',{
	extend: 'Ext.form.Label',
	text : survey.label.none_image
});

 

Ext.define('survey.view.gui.questiontype.ImagePanel.CheckboxAnswer',{
	extend: 'Ext.form.field.Checkbox',
	name: 'answer'
});


Ext.define('survey.view.gui.questiontype.ImagePanel.RemoveImageBt',{
	extend: 'Ext.Button',
	name : 'delete_image',
	text : survey.label.delete,
	iconCls: 'icon-delete'
});

Ext.define('survey.view.gui.questiontype.ImagePanel.UploadImagePanel', {
	extend : 'Ext.panel.Panel',
	parentMain : null,
	store :survey.listBasicMediaData,
	accept: ['jpg', 'png', 'gif',  'bmp', 'tif'],  
	fileslist: [],   
	imageUrl : '',
	record :   new Survey.model.listAnswerData({      		 
				value: 'answer',
				answer: 0,
				seq:  0  
				,id_question : Ext.id(),
	    		answer_image: ''
	}),
	hiddenImage : true,
	isReset: false,
	/* layout: {
	        type: 'hbox',
	        pack: 'start',
	        align: 'stretch'
	    },*/
	setLoadData : function(questionrecord) {
    	//console.log('survey.view.gui.questiontype.ImagePanel.UploadImagePanel'); 
    	 
    	
    	//entMain.remove(bt.parent);
    	
    },
	initComponent: function() {
		
		var main = this; 
		 
		//main.addEvents('onChangeCheckAnswer' );
		
		main.labelupload = Ext.create('survey.view.gui.questiontype.ImagePanel.ImageLabel',{margin: '5 0 0 5',hidden : !main.hiddenImage});
		main.imageFileUpload = main.wrappedImage = Ext.create('Ext.Img', {
	  		   //anchor: '15%' ,
			width : '15%',
			height: '15%',
	  		   src : main.imageUrl, 
	  		   //'/images/user_1/project_1/question_3/answer_1.png',
	  		//   flex:1,
	  		   hidden  : main.hiddenImage,
	  		  margin: '5 0 0 5' 
	  		}); 
		
		
		main.fileUpload = Ext.create('survey.view.gui.questiontype.ImagePanel.AnswerImage',{
			flex:1,hideLabel :true,
			//width : 50,
			buttonOnly: true,
			
			parent : main,
			 margin: '5 0 0 5' ,
			listeners: {
				scope: this,
	            'change': function(button, value){
	            	//debugger;
	            	//var parent = this.up('form');  
	            	//console.log(value);
	            	if (!button.parent.isReset) {
	            		var IsValid = button.parent.fileValidiation(button,value);
	            		 
		            	if (!IsValid) { 
		            		button.parent.isReset = true;
		            		button.parent.imageFileUpload.setSrc('');
		            		button.reset( );
		            		return; } 
		            	
		            	button.parent.isReset = false;
		            	
		            	//button.parent.imageFileUpload.setSrc('/images/user_1/project_1/question_3/answer_1.png');
		            	
		            	//button.parent.imageFileUpload.setSrc(value);
		            	button.parent.labelupload.setText(value);
		            	main.record.set('answer_image',value);
		            	 
		            	
	            	}else{
	            		button.parent.isReset = false;
	            	}
	                 
	            } 
	        }
			});
	 
		main.checkbox = Ext.create('survey.view.gui.questiontype.ImagePanel.CheckboxAnswer',{
			//flex:2
			 margin: '5 0 0 5' ,
			 value : main.record.get('answer'),
             listeners : {
            	 'change' :   
            		 function ( ch, newValue, oldValue, eOpts) {
            		 //console.log("set other answer is false");
            		  
            		 
            		 	if (oldValue == false)
            		 	{	
            		 		var len = main.store.data.length;
            		 		//console.log(len);
            		 		var len = main.store.data.length;
            		 		
            		 		
            		 		main.store.each(function(record){ 	   
            		 			if(main.record == record){
            		 				record.beginEdit();
                    		 		record.set('answer', 1);
                    		 	    record.modified = false;
                    		 	    record.endEdit();
                    		 	    //console.log("set other answer is true");
            		 			}
            		 			else{
            		 				record.beginEdit();
                    		 		record.set('answer', 0);
                    		 	    record.modified = false;
                    		 	    record.endEdit();
                    		 	    //console.log("set other answer is false");
            		 			}
                		 		
                		 	});
            		 		
            		 		
            		 		main.fireEvent('onChangeCheckAnswer',ch, newValue, oldValue, eOpts);  
            		 	}
            		 
            		  	/*main.store.each(function(record){ 	        	            		 		 
            		 		record.beginEdit();
            		 		record.set('answer', false);
            		 	    record.modified = false;
            		 	    record.endEdit();
            		 	    console.log("set other answer is false");
            		 	});*/
            			//debugger; 
            		  //	main.store.getAt(rowIndex).set('answer', true);
            		  
            		 }
             }
		});
		
		main.deletebt = Ext.create('survey.view.gui.questiontype.ImagePanel.RemoveImageBt',{
			parent : main,
            scope: this,
            margin: '5 0 0 5',
          //  flex:1,
            handler: this.onDeleteClick});
		
		/*main.headImage 
		main.headUpload  
		main.headAnswer  
		main.headDelete */
		
		main.panelColumn = Ext.create('Ext.panel.Panel',{
			layout : 'column',
			
			items : [
			   {
				   columnWidth: 0.4,
				   items : [main.labelupload,main.imageFileUpload ]
			   } ,
			   {
				   columnWidth: 0.2,
				   items : [main.fileUpload]
			   } ,
			   {
				   columnWidth: 0.2,
				   items : [main.checkbox]
			   } ,
			   {
				   columnWidth: 0.2,frame : true,
				   items : [main.deletebt]
			   } 
			]
		});
		
		
		
		main.items = [main.panelColumn];
		
		//main.items = [main.labelupload,main.imageFileUpload,main.fileUpload,main.checkbox,main.deletebt];
		this.callParent();
	},
	onDeleteClick : function(bt,ev){
		//console.log('onDeleteClick');
		main = this;
		Ext.Msg.show({
		    title:survey.message.confirm_delete,
		    message: survey.message.confirm_delete  ,
		    buttons: Ext.Msg.YESNO,
		    icon: Ext.Msg.QUESTION,
		    fn: function(btn) {
		        if (btn === 'yes') {
		        	
		        	//console.log(bt.parent.record.get('id_basic_data'));
		        	
		        	
		        	 
		        	Ext.Ajax.request({
	              		url		: '/survey/deleteQuestionData',
	              		method: 'POST',
	                    headers: { 'Content-Type': 'application/json' },
	                    params : Ext.JSON.encode( {'id' : bt.parent.record.get('id_basic_data') } ),
	                	success: function(response, opts){
	                		var resp = Ext.decode(response.responseText); 	
	                		//console.log(resp);
	                		if(resp.success){
	                			bt.parent.fireEvent('removePanelAnswer',bt.parent);
	                			bt.parent.parentMain.remove(bt.parent);
	                		}
	                		else{
	                			Ext.Msg.alert( survey.message.failed , resp.message);
	                		}
	                		resp = null;	
	                			 
	                		},
	                	failure: function(response, opts) {
	                		console.log('server-side failure with status code ' );
	                	}
	                	
		        	});
		        	 
		        	 
		        }  
		    }
		});
		 
		
	},
	fileValidiation: function(view, filename){
		 
		var isValid = true;  
	     var indexofPeriod = view.getValue().lastIndexOf("."),  
	            uploadedExtension = view.getValue().substr(indexofPeriod + 1, view.getValue().length - indexofPeriod); 
	     
	 
	     
	     if (!Ext.Array.contains(this.accept, uploadedExtension.toLowerCase())) {  
	         isValid = false;  
	         // Add the tooltip below to   
	         // the red exclamation point on the form field  
	         var erroMsg = Ext.String.format(survey.message.error_upload_without_extention, this.accept.join());  
	         //me.setActiveError(erroMsg);
	         //console.log(erroMsg);
	         // Let the user know why the field is red and blank!  
	         var messageBox = Ext.MessageBox.show({  
	           title: survey.message.upload,  
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
	           var erMsg = Ext.String.format(survey.message.upload_success, filename);  
	           //console.log(erroMsg);
	           var messageBox = Ext.MessageBox.show({  
	             title: survey.message.upload,  
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

Ext.define('survey.view.gui.questiontype.ImagePanel.ShowImagePanel', {
	extend : 'Ext.panel.Panel',
	parentMain : null,
	layout: {
	        type: 'hbox',
	        pack: 'start',
	        align: 'stretch'
	    },
    setLoadData : function(questionrecord) {
    	//console.log('survey.view.gui.questiontype.ImagePanel.ShowImagePanel'); 
    	//survey.listBasicData.removeAll();
    	this.record = questionrecord;
    	//debugger;
    	if(questionrecord != null){
	    
    		survey.listBasicData.load({
	    		params : {
	    			questionid : questionrecord.id
	    		},
	    		scope : this
	    	});
	    	
    	}
    	
    },
	    setLoadData : function(){
	    	var form = this;
	    	form.wrappedImage.setSrc('http://localhost:8081/images/getImage?id=30');
	    },
	initComponent: function() {
		
		var main = this;
		main.fileUpload = main.wrappedImage = Ext.create('Ext.Img', {
  		   anchor: '30%' ,
  		   flex:1
  		}); 
			
			 
		main.deletebt = Ext.create('survey.view.gui.questiontype.ImagePanel.RemoveImageBt',{
			parent : main,
            scope: this,
            handler: this.onDeleteClick});
		
		main.items = [main.fileUpload,main.deletebt];
		this.callParent();
	},
	onDeleteClick : function(bt,ev){
		//console.log('onDeleteClick');
		bt.parent.parentMain.remove(bt.parent);
		//bt.parent.fireEvent('removePanelAnswer',bt.parent);
	}
});




Ext.define('survey.view.gui.questiontype.ImagePanel', {	
	extend : 'Ext.panel.Panel',	 
	store :survey.listBasicMediaData,
	width : '100%',
	height : '100%',
	defaults: {
        anchor: '100%'
        //,labelWidth: 120
    },
    idFileUploads : [],
    rowAt : 0,
	frame: false,
	setLoadData : function(questionrecord) {
    	//console.log('survey.view.gui.questiontype.ImagePanel'); 
    	//survey.listBasicData.removeAll();
    	this.record = questionrecord;
    	//debugger;
    	this.haveData = false;
    	
    	for(var i = (this.items.length-1 ) ; i >=0; i--){
    		this.remove(this.items.getAt(i));
    	}
    	
    	this.addHeader(this);
    	this.rowAt =0;
    	//console.log('start rowAt : ' + this.rowAt); 
    	if(questionrecord != null){
    		
    		//console.log('lenght : ' + survey.listBasicMediaData.data.length);
    		
    		survey.listBasicMediaData.load({
	    		params : {
	    			questionid : questionrecord.id
	    		},
	    		scope : this,
	    		callback: function(records, operation, success){
	    			 
	    			if(success){
	    				 
	    				this.haveData = records.length > 0;
	    				//console.log(' records.length '  +  records.length); 
	    				//console.log('have Data '  + (this.haveData)); 
	    				for(var i = 0; i < records.length; i++){

	    					var imageUrl = '/images/getSubImage?id=' + records[i].data.id_basic_data;
	    					
	    					this.addFileUpload(this,imageUrl,records[i]);
	    				}
	    				//console.log('lenght : ' + survey.listBasicMediaData.data.length);
	    			}
	    			
	    			//console.log('Add File Upload '  + (!this.haveData)); 
	    	    	
	    	    	if (!this.haveData){
	    	    		 //console.log('Add field upload');
	    	    		//this.addFileUpload(this);
	    	    	}
	    			
	    			
	    		}
	    	});
    		
    		
    	} 
    	 
    	//this.fileUpload.setLoadData(questionrecord);
    },
	addHeader : function(parent){
		
		parent.headImage = Ext.create('Ext.form.Label',{text: survey.label.image ,margin: '5 0 0 5' });
		parent.headUpload = Ext.create('Ext.form.Label',{text: survey.label.upload  ,margin: '5 0 0 5' });
		parent.headAnswer = Ext.create('Ext.form.Label',{text: survey.label.answer  ,margin: '5 0 0 5' });
		parent.headDelete = Ext.create('Ext.form.Label',{text: survey.label.delete  ,margin: '5 0 0 5' });
		var panelColumn = Ext.create('Ext.panel.Panel',{
			layout : 'column',
			
			items : [
			   {
				   columnWidth: 0.4,frame : true,
				   items : [parent.headImage ]
			   } ,
			   {
				   columnWidth: 0.2,frame : true,
				   items : [parent.headUpload]
			   } ,
			   {
				   columnWidth: 0.2,frame : true,
				   items : [parent.headAnswer]
			   } ,
			   {
				   columnWidth: 0.2,frame : true,
				   items : [parent.headDelete]
			   } 
			]
		});
		parent.add(panelColumn);
	}  ,
	initComponent: function() {
    	
    	var main = this;
    	//main.fileUpload = Ext.create('survey.view.gui.questiontype.ImagePanel.UploadImagePanel',{parentMain : main,store:main.store});
    	
    	
		
    	 
    	
    	//main.items = [ main.fileUpload ]; 
    	
    	main.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                iconCls: 'icon-add',
                text:survey.label.add,
                scope: this,
                parent : main,
                handler: this.onAddClick
            } ]
        }]  
    	
    	this.callParent();
    	
	},
    onAddClick : function(bt,ev){
    	
    	bt.parent.id_question = 0;
    	if(bt.parent.record != null){
    		bt.parent.id_question = bt.parent.record.get('id_question');
    		 
    	}
    	
    	
    	
    	 
    	bt.parent.addFileUpload(bt.parent,null,null);
    	
        
    },
    addFileUpload : function(parent,urlImage,listAnswerData){
    	//console.log('add data to listAnswerData') ;
    	Survey.model.listAnswerData
    	parent.rowAt = parent.rowAt +1;
    	var r = new Survey.model.listAnswerData({      		 
    		value: 'answer',
    		answer: 0,
    		seq:   parent.rowAt  
    		,id_question : parent.id_question ,
    		answer_image: ''
    	});    	 
    	
    	//rows = survey.listBasicMediaData.insert(survey.listBasicMediaData.data.length, r);
    	//console.log('rowAt : ' + parent.rowAt);
    	//console.log(r) ;
    	var id_FileUpload = Ext.id();
    	var urlImage = '';
    	if (listAnswerData != null) {
    		urlImage =  '/images/getSubImage?id=' + listAnswerData.get('id_basic_data');
    		r = listAnswerData;
    		
    		//rows = this.store.insert(this.store.data.length, r);
    		
    		/*r.set('answer',listAnswerData.answer == 1);
    		r.set('seq',listAnswerData.seq)
    		r.set('id_basic_data',)
    		*/
    	}else
    	{
    		rows = this.store.insert(this.store.data.length, r);
    	}
    	
    	var fileUpload = Ext.create('survey.view.gui.questiontype.ImagePanel.UploadImagePanel',{
    		id : id_FileUpload,
    		parentMain : parent,
    		store:parent.store,
    		record: r,
    		imageUrl : urlImage,
    		hiddenImage : listAnswerData == null ,
    		listeners : {
           	 	'onChangeCheckAnswer' : parent.checkAnswerOnlyOne  ,
           	 	'removePanelAnswer' : parent.removePanelAnswer
    		}
    	}); 
    	
    	this.idFileUploads.push(id_FileUpload);
    	parent.add(fileUpload);
    	 
    },
    checkAnswerOnlyOne : function(ch, newValue, oldValue, eOpts){
    	 
    	
    	for(var i=0; i < this.parentMain.idFileUploads.length ;i++){
    		var fileUploadPanel  = Ext.getCmp(this.parentMain.idFileUploads[i]);
    		 
    		if ( fileUploadPanel != null && fileUploadPanel.getId() != this.getId()){
    			 
    			fileUploadPanel.checkbox.setValue(false);
    		} 
    		fileUploadPanel = null;
    		 
    	}
    	//debugger;
    },
    removePanelAnswer: function(fileUpload){
    	//console.log('removePanelAnswer');
    
    	for(var i=0; i < this.parentMain.idFileUploads.length ;i++){
    		var fileUploadPanel  = Ext.getCmp(this.parentMain.idFileUploads[i]);
    	 	if ( fileUploadPanel != null && fileUploadPanel.getId() == fileUpload.getId()){
    			 this.parentMain.idFileUploads.splice(i, 1);
    			 fileUploadPanel = null;
    			 break;
    		} 
    		fileUploadPanel = null;
    	}
    	 
    }
});




///////////////////////////////////////////////////////////////
 
Ext.define('survey.view.gui.questiontype.GridImage', {	
	extend: 'Ext.grid.Panel',
	width : '100%',
	height :  '100%',
	store : survey.listBasicMediaData,
	//bufferedRenderer: false,
	
	forceFit: true,
	frame: true,
	record: null,
	viewConfig: {
        emptyText: 'No images to display'
    },
    requires: [
				'Ext.grid.column.Template',
				'Ext.XTemplate',
               'Ext.grid.plugin.CellEditing',
               'Ext.form.field.Text',
               'Ext.toolbar.TextItem',
               'Ext.grid.column.UploadFile',
               'Ext.form.field.File'
           ],
    selType: 'cellmodel',
    
    setLoadData : function(questionrecord) {
    	//console.log('survey.view.gui.questiontype.GridImage'); 
    	//survey.listBasicData.removeAll();
    	this.record = questionrecord;
    	//debugger;
    	if(questionrecord != null){
	    
    		survey.listBasicMediaData.load({
	    		params : {
	    			questionid : questionrecord.id
	    		},
	    		scope : this
	    	});
	    	
    	}
    	
    },
    initComponent: function() {
    	var main = this;
    	
    	main.columns = [
    	                {
    	                	xtype: 'templatecolumn',
    	                	styleHtmlContent: true,
    	                	width: '20%',     
    	                    tpl: [
    	                        ' <div class="photo-answer">',
    	                        '            <img class="photo-answer" src="http://localhost:8081/images/getSubImage?id={id_basic_data}" width= "30%" height= "30%"/>',
    	                        ' </div>'
    	                    ],
    	                    dataIndex: 'id_basic_data',
    	                    text:  survey.label.image
    	                },
    	               /* {
    	                	xtype: 'uploadfile',
    	                	text : 'upload',
    	                	dataIndex: 'answer_image',
    	                	width: '40%' 
    	                },*/
    	                {
    	                	xtype: 'widgetcolumn',
    	                	dataIndex: 'answer_image',
    	                	width: '40%' ,
    	                    // This is the widget definition for each cell.
    	                    // Its "value" setting is taken from the column's dataIndex
    	                    widget: {
    	                    	xtype: 'fileuploadfield',
    	                    	text : 'upload',
    	                    	name : 'answer_image',
    	                    	inputType: 'file'
    	                    }
    	                },
    	                {
            	            xtype: 'checkcolumn',
            	            header: survey.label.answer,
            	            dataIndex: 'answer',
            	            width: '20%',            	           
	        	             sortable: false ,
	        	             handler : function(){
	        	            	 //console.log("click");
	        	             },
	        	             listeners : {
	        	            	 checkChange :  
	        	            		 function ( ch, rowIndex, checked, eOpts) {
	        	            		  	 
	        	            		  	main.store.each(function(record){ 	        	            		 		 
	        	            		 		record.beginEdit();
	        	            		 		record.set('answer', 0);
	        	            		 	    record.modified = false;
	        	            		 	    record.endEdit();
	        	            		 	});
	        	            		  	main.store.getAt(rowIndex).set('answer', 1);
	        	            		 }
	        	             }
        	    	    },
        	    	    
        	    	    {	 header: survey.label.delete,      
        	    	    	width: '20%',     
        	    	          renderer: function(val,meta,rec) {
        	    	             // generate unique id for an element
        	    	        	 var parent = main;
        	    	             var id = Ext.id();
        	    	             Ext.defer(function() {
        	    	                Ext.widget('button', {
        	    	                   renderTo: id,
        	    	                   text: survey.label.delete,
        	    	                   scale: 'small',
        	    	                   record : rec,
        	    	                   iconCls : 'project-remove',
        	    	                   handler: function(bt,ev) {
        	    	                     // Ext.Msg.alert("Hello World");
        	    	                      
        	    	                      parent.store.remove(rec);
        	    	                      
        	    	                   }
        	    	                });
        	    	             }, 50);
        	    	             return Ext.String.format('<div id="{0}"></div>', id);
        	    	          }
        	    	    }
    	             ];
    	
    	main.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                iconCls: 'icon-add',
                text: survey.label.add,
                scope: this,
                parent : main,
                handler: this.onAddClick
            }
            /*, {
            	itemId: 'removeAnswer',
                iconCls: 'icon-delete',
                text: 'Delete',
                //disabled: true,
                parent : main,
                scope: this,
                handler: this.onDeleteClick
            }*/
            ]
        }]  
    	
    	this.callParent(arguments); 
    },
    onAddClick : function(bt,ev){
    	
    	//console.log('add list answer data');
    	bt.parent.id_question = 0;
    	if(bt.parent.record != null){
    		bt.parent.id_question = bt.parent.record;
    	}
    	//console.log(this.store.data.length);
    	 
    	var r = new Survey.model.listAnswerData({
    		 
    		value: 'answer',
    		answer: 0,
    		seq:   this.store.data.length +1
    		,id_question : bt.parent.id_question ,
    		answer_image: ''
    	});
    	 
    	 
    	rows = this.store.insert(this.store.data.length, r);
    	//console.log(rows);
    	 
        
    },
    onDeleteClick : function(bt,ev){
    	
    	var recordSelected = this.getView().getSelectionModel().getSelection()[0];
        if (recordSelected) {
            this.store.remove(recordSelected);
            
            
            
        }
        
        
    }
});

//////////////////////////////////////////////////////////////
  
Ext.define('survey.view.gui.questiontype.GridAnswer', {	
	extend: 'Ext.grid.Panel',
	width : '100%',
	height :  '100%',
	store : survey.listBasicData,
	//bufferedRenderer: false,
	
	forceFit: true,
	frame: true,
	record: null,
	viewConfig: {
        emptyText: 'No images to display'
    },
    requires: [
               'Ext.grid.plugin.CellEditing',
               'Ext.form.field.Text',
               'Ext.toolbar.TextItem'
           ],
    collapsible:false ,
    setLoadData : function(questionrecord) {
    	//console.log('survey.view.list.GridAnswer'); 
    	survey.listBasicData.removeAll();
    	this.getStore().removeAll();
    	 
    	//console.log('survey.listBasicData.data.length : ' + survey.listBasicData.data.length );
    	this.record = questionrecord;
    	
    	//this.getStore().data = Ext.create("Ext.util.Collection");
    	 
    	 
    	if(questionrecord != null){
	    
    		survey.listBasicData.load({
	    		params : {
	    			questionid : questionrecord.id
	    		},
	    		scope : this
	    	});
	    	
    	}
    	//debugger;
    },
    selType: 'cellmodel',
   
    initComponent: function() {
    	
    	
    	 
    	
    	
    	var main = this;
    	main.editing = Ext.create('Ext.grid.plugin.CellEditing',{clicksToMoveEditor: 1});    	
    	main.plugins =  [main.editing];
    	var row = 1;
    	main.columns = [
    	                	{xtype: 'rownumberer'},
    	                	{header: 'id', width : '9%', sortable: false, dataIndex: 'id_question' ,hidden : true,menuDisabled: true},
    	    	   //	{header: 'No.', width : '9%', sortable: false, dataIndex: 'seq',menuDisabled: true},
    	                	{header: 'Choose', dataIndex: 'value', 
		    	    	   		field : {
		    	    	   			type : 'textfield'
		    	    	   		},
		    	    	   		//editor: 'textfield',  
		    	    	   		width : '70%',   sortable: false,menuDisabled: true}  , 
    	          
		    	    	   	{
		        	            xtype: 'checkcolumn',
		        	            header: survey.label.answer,
		        	            dataIndex: 'answer',
		        	            width: '20%',
		        	           
		        	            sortable: false,
		        	           
		        	             sortable: false ,
		        	             handler : function(){
		        	            	 //console.log("click");
		        	             },
		        	             listeners : {
		        	            	 checkChange :  
		        	            		 function ( ch, rowIndex, checked, eOpts) {
		        	            		 	 
		        	            		 	
		        	            		 	survey.listBasicData.each(function(record){ 
		        	            		 		 
		        	            		 		record.beginEdit();
		        	            		 		record.set('answer', 0);
		        	            		 	    //record.modified = false;
		        	            		 	    record.endEdit();
		        	            		 	});
		        	            		 	
		        	            		 	survey.listBasicData.getAt(rowIndex).set('answer', 1);
		  
		        	            		 }
		        	            	  
		        	            	 
		        	             }
		    	    	   }   
    	            
    	        ];
    	
    	main.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                iconCls: 'icon-add',
                text: survey.label.add,
                scope: this,
                parent : main,
                handler: this.onAddClick
            }, {
            	itemId: 'removeAnswer',
                iconCls: 'icon-delete',
                text: survey.label.delete,
                //disabled: true,
                parent : main,
                scope: this,
                handler: this.onDeleteClick
            }]
        }]  	
  
    	 
    	this.callParent(arguments);    	
    	//this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    } ,
    
    listeners: {
    	'click' : function(){
    		//alert('test');
    	},
        'selectionchange': function(view, records) {
        	//alert('test');
        	//this.down('#removeAnswer').setDisabled(!records.length);
        }
    },
    onAddClick : function(bt,ev){
    	
    	bt.parent.id_question = 0;
    	if(bt.parent.record != null){
    		bt.parent.id_question = bt.parent.record;
    	}
    	 
    	this.store.add(new Survey.model.listAnswerData( {
    		value: '',
    		answer : 0,
    		seq: (this.store.data.length +1),
    		id_question : bt.parent.id_question,
    		answer_image: ''
    	} ));
    	
    	this.editing.cancelEdit(); 
    	 
    	this.editing.startEditByPosition({
            row: this.store.data.length -1 ,
            column: 1
        });
        
    },
    onDeleteClick : function(bt,ev){
    	
    	//console.log('delete from cell');
    	 
    	Ext.Msg.show({
		    title: survey.message.confirm_delete,
		    message: survey.message.confirm_delete  ,
		    buttons: Ext.Msg.YESNO,
		    icon: Ext.Msg.QUESTION,
		    fn: function(btn) {
		        if (btn === 'yes') {
		        	
		        	var recordSelected = bt.parent.getView().getSelectionModel().getSelection()[0];
		        	if (recordSelected){
			        	//console.log(recordSelected.get('id_basic_data'));
			        	Ext.Ajax.request({
		              		url		: '/survey/deleteQuestionData',
		              		method: 'POST',
		                    headers: { 'Content-Type': 'application/json' },
		                    params : Ext.JSON.encode( {'id' : recordSelected.get('id_basic_data') } ),
		                	success: function(response, opts){
		                		var resp = Ext.decode(response.responseText); 	
		                		//console.log(resp);
		                		if(resp.success){
		                			bt.parent.store.remove(recordSelected);
		                		}
		                		else{
		                			Ext.Msg.alert(survey.message.failed, resp.message);
		                		}
		                		resp = null;	
		                			 
		                		},
		                	failure: function(response, opts) {
		                		//console.log('server-side failure with status code ' );
		                	}
		                	
			        	});
		        	}
		        	 
		        	 
		        }  
		    }
		});
    	 
        
    }
    
});


//////////////////////////////////////////////////////////////
Ext.define('survey.view.gui.questiontype.CardPanel', {	
	extend : 'Ext.panel.Panel',	 
	//layout : 'card',
	//layout: {
   //     type: 'fix'
   // }, 
	requires: [
        'Ext.layout.container.Card'
    ],
    setLoadData : function(questionrecord,questiontyperecord){
    	
    	if(( questiontyperecord != null &&  questiontyperecord.data.type.toLowerCase().search("image") >=0) || 
    		(questionrecord!=null && questionrecord.data.question_type_name.toLowerCase().search("image") >=0)  ){
    		this.layoutpanel.getLayout().setActiveItem(0);
    	}    
    	else
    	{
    		this.layoutpanel.getLayout().setActiveItem(1);
    	}
    	
    	
    	this.choose.setLoadData(questionrecord);
    	//console.log('call from survey.view.gui.questiontype.CardPanel');
    	this.images.setLoadData(questionrecord);
    },
	width : '100%',
	height : '100%',
	frame: false,
	initComponent: function() {
    	
    	var main = this;
    	
    	main.images = Ext.create('survey.view.gui.questiontype.ImagePanel');
    	//main.images = Ext.create('survey.view.gui.questiontype.GridImage');
    	
    	main.choose = Ext.create('survey.view.gui.questiontype.GridAnswer');
    	
    	main.layoutpanel = Ext.create('Ext.panel.Panel',{
    		layout : 'card',
    		items : [main.images,main.choose]
    	});
    	
    	main.items = [main.layoutpanel];
    	
    		
    	
    	//main.layoutpanel.getLayout().setActiveItem(1);
    	this.callParent();
    	
	}
});
