Ext.define('survey.view.gui.questiontype.ImagePanel.AnswerImage',{
	extend: 'Ext.form.field.File',
	name : 'answer_image',
	fieldLabel: 'Image', 
	allowBlank: true 
});
Ext.define('survey.view.gui.questiontype.ImagePanel.RemoveImageBt',{
	extend: 'Ext.Button',
	name : 'delete_image',
	text : 'Delete',
	iconCls: 'icon-delete'
});

Ext.define('survey.view.gui.questiontype.ImagePanel.UploadImagePanel', {
	extend : 'Ext.panel.Panel',
	parentMain : null,
	 layout: {
	        type: 'hbox',
	        pack: 'start',
	        align: 'stretch'
	    },
	initComponent: function() {
		
		var main = this;
		main.fileUpload = Ext.create('survey.view.gui.questiontype.ImagePanel.AnswerImage',{flex:1});
		main.deletebt = Ext.create('survey.view.gui.questiontype.ImagePanel.RemoveImageBt',{
			parent : main,
            scope: this,
            handler: this.onDeleteClick});
		
		main.items = [main.fileUpload,main.deletebt];
		this.callParent();
	},
	onDeleteClick : function(bt,ev){
		bt.parent.parentMain.remove(bt.parent);
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
    	console.log('survey.view.gui.questiontype.ImagePanel.ShowImagePanel'); 
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
		bt.parent.parentMain.remove(bt.parent);
	}
});




Ext.define('survey.view.gui.questiontype.ImagePanel', {	
	extend : 'Ext.panel.Panel',	 
	
	width : 100,
	height : 150,
	defaults: {
        anchor: '100%'
        //,labelWidth: 120
    },
	frame: false,
	setLoadData : function(questionrecord) {
    	console.log('survey.view.gui.questiontype.ImagePanel'); 
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
	  
	initComponent: function() {
    	
    	var main = this;
    	main.fileUpload = Ext.create('survey.view.gui.questiontype.ImagePanel.UploadImagePanel',{parentMain : main});
    	
    	
    	
    	
    	main.items = [main.fileUpload];
    	
    	main.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                iconCls: 'icon-add',
                text: 'Add',
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
    		bt.parent.id_question = bt.parent.record;
    	}
    	 
    	
    	var fileUpload = Ext.create('survey.view.gui.questiontype.ImagePanel.UploadImagePanel',{parentMain : bt.parent}); 
    	bt.parent.add(fileUpload);
    	
        
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
               'Ext.grid.column.UploadFile'
           ],
    selType: 'cellmodel',
    
    setLoadData : function(questionrecord) {
    	console.log('survey.view.gui.questiontype.ImagePanel'); 
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
    	                    text: 'Photo'
    	                },
    	                {
    	                	xtype: 'uploadfile',
    	                	text : 'upload',
    	                	dataIndex: 'answer_image',
    	                	width: '40%' 
    	                },
    	                {
            	            xtype: 'checkcolumn',
            	            header: 'Answer?',
            	            dataIndex: 'answer',
            	            width: '20%',            	           
	        	             sortable: false ,
	        	             handler : function(){
	        	            	 console.log("click");
	        	             },
	        	             listeners : {
	        	            	 checkChange :  
	        	            		 function ( ch, rowIndex, checked, eOpts) {
	        	            		  	 
	        	            		  	main.store.each(function(record){ 	        	            		 		 
	        	            		 		record.beginEdit();
	        	            		 		record.set('answer', false);
	        	            		 	    record.modified = false;
	        	            		 	    record.endEdit();
	        	            		 	});
	        	            		  	main.store.getAt(rowIndex).set('answer', true);
	        	            		 }
	        	             }
        	    	    },
        	    	    
        	    	    {	 header: 'Delete?',      
        	    	    	width: '20%',     
        	    	          renderer: function(val,meta,rec) {
        	    	             // generate unique id for an element
        	    	        	 var parent = main;
        	    	             var id = Ext.id();
        	    	             Ext.defer(function() {
        	    	                Ext.widget('button', {
        	    	                   renderTo: id,
        	    	                   text: 'DELETE',
        	    	                   scale: 'small',
        	    	                   record : rec,
        	    	                   iconCls : 'project-remove',
        	    	                   handler: function(bt,ev) {
        	    	                      Ext.Msg.alert("Hello World");
        	    	                      
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
                text: 'Add',
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
    	
    	bt.parent.id_question = 0;
    	if(bt.parent.record != null){
    		bt.parent.id_question = bt.parent.record;
    	}
    	console.log(this.store.data.length);
    	 
    	var r = new Survey.model.listAnswerData({
    		 
    		value: 'answer',
    		answer: false,
    		seq:   this.store.data.length +1
    		,id_question : bt.parent.id_question 
    	});
    	 
    	 
    	rows = this.store.insert(this.store.data.length, r);
    	console.log(rows);
    	 
        
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
    	console.log('survey.view.list.GridAnswer'); 
    	survey.listBasicData.removeAll();
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
        	            header: 'Answer?',
        	            dataIndex: 'answer',
        	            width: '20%',
        	           
        	            sortable: false,
        	           
        	             sortable: false ,
        	             handler : function(){
        	            	 console.log("click");
        	             },
        	             listeners : {
        	            	 checkChange :  
        	            		 function ( ch, rowIndex, checked, eOpts) {
        	            		 	 
        	            		 	
        	            		 	survey.listBasicData.each(function(record){ 
        	            		 		 
        	            		 		record.beginEdit();
        	            		 		record.set('answer', false);
        	            		 	    record.modified = false;
        	            		 	    record.endEdit();
        	            		 	});
        	            		 	
        	            		 	survey.listBasicData.getAt(rowIndex).set('answer', true);
  
        	            		 }
        	            	  
        	            	 
        	             }
    	    	    }   
    	            
    	        ];
    	
    	main.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                iconCls: 'icon-add',
                text: 'Add',
                scope: this,
                parent : main,
                handler: this.onAddClick
            }, {
            	itemId: 'removeAnswer',
                iconCls: 'icon-delete',
                text: 'Delete',
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
    	console.log(this.store.data.length);
    	 
    	var r = new Survey.model.listAnswerData({
    		 
    		value: 'answer',
    		answer: false,
    		seq:   this.store.data.length +1
    		,id_question : bt.parent.id_question 
    	});
    	 
    	
    	this.editing.cancelEdit();
    	rows = this.store.insert(this.store.data.length, r);
    	console.log(rows);
    	 
    	this.editing.startEditByPosition({
            row: this.store.data.length -1 ,
            column: 1
        });
        
    },
    onDeleteClick : function(bt,ev){
    	
    	var recordSelected = this.getView().getSelectionModel().getSelection()[0];
        if (recordSelected) {
            this.store.remove(recordSelected);
            
            
            
        }
        
        
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
    setLoadData : function(questionrecord){
    	
    	
    	if( questionrecord.data.question_type_name.search("Image") >=0 ){
    		this.layoutpanel.getLayout().setActiveItem(0);
    	} 
    	else
    	{
    		this.layoutpanel.getLayout().setActiveItem(1);
    	}
    	 
    	this.choose.setLoadData(questionrecord);
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
