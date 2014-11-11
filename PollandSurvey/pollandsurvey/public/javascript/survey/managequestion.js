
Ext.define('survey.view.list.Project.fieldQuestionId',{
	extend: 'Ext.form.field.Hidden',
	name : 'id_question_project'
});

Ext.define('survey.view.list.Project.fieldQuestion',{
	extend: 'Ext.form.field.TextArea',
	name : 'question_name',
	fieldLabel: 'Question', 
	allowBlank: false 
});

Ext.define('survey.view.list.Project.fieldHelp',{
	extend: 'Ext.form.field.TextArea',
	name : 'help',
	fieldLabel: 'help', 
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
	initComponent: function() {
		var main = this;
		
		var group1 = this.id + 'group1' ;
		main.viewConfig =  {
			    plugins: {
			        ptype: 'gridviewdragdrop',
			        containerScroll: true,
			        dragGroup: group1,
			        dropGroup: group1,
			        dragText: '<tpl for=".">' +
				                '<div class="patient-source"><table><tbody>' +
			                    '<tr><td class="patient-label">Question</td><td class="patient-name">{0}</td></tr>' +
			                    '<tr><td class="patient-label">Question Type</td><td class="patient-name">{1}</td></tr>' + 
			                 
				                '</tbody></table></div>' +
				             '</tpl>'
			        	//'Drag and drop to reorganize'
			    }};
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
						            itemclick: function(dv, record, item, index, e) {
					                       alert('working');
					                   }
				                	  
						        } 
					 	        
		    	            },
							{
					            xtype: 'actioncolumn'
					            	, width: '9%'
					            , items: [{ // Delete button
					                icon: 'http://whatisextjs.com/BAHO/icons/cancel.png'
					                , handler: function(grid, rowIndex, colindex) {
					                    // Working with grid row data
					                    var record = grid.getStore().getAt(rowIndex);
					                    
					                    Ext.Msg.alert('Delete', 'Delete user: ' + record.data.question);
					                } // eo handler
					            },{ // Save Button
					                icon: 'http://whatisextjs.com/BAHO/icons/disk.png'
					                , style: 'margin-left: 5px;'
					                , handler: function(grid, rowIndex, colindex) {
					                    // Working with grid row data
					                    var record = grid.getStore().getAt(rowIndex);
					                    Ext.Msg.alert('Save', 'Save user: ' + record.data.question);
					                } // eo handler
					            }]
					        }
	    	        ];
		
		
		this.callParent(arguments);  
	},
	clickOpenQuenstion : function(){
		console.log('click1'); 
	},
    listeners: {
    	render: function(c,m){
    		initializePatientDragZone(c);
        	console.log('render');
        } ,
        drop: function(node, data, dropRec, dropPosition) {
           // var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
           // Ext.example.msg('Drag from right to left', 'Dropped ' + data.records[0].get('name') + dropOn);
        	debugger;
        },
		beforerowselect: function(sm,i,ke,row){  
			console.log('test');
		}
    }
});




 

Ext.define('survey.view.list.GridAnswer', {	
	extend: 'Ext.grid.Panel',
	width : '100%',
	height :  '100%',
	store : survey.listBasicData,
	bufferedRenderer: false,
	disableSelection : true,
	forceFit: true,
	frame: true,
	viewConfig: {
        emptyText: 'No images to display'
    },
    requires: [
               'Ext.grid.plugin.CellEditing',
               'Ext.form.field.Text',
               'Ext.toolbar.TextItem'
           ],
    collapsible:false ,
    setLoad : function(idquestion) {
    	
    	survey.listBasicData.load({
    		params : {
    			questionid : '1'
    		},
    		scope : this
    	});
    },
    selType: 'cellmodel',
   
    initComponent: function() {
    	
    	var main = this;
    	main.editing = Ext.create('Ext.grid.plugin.CellEditing',{clicksToMoveEditor: 1});    	
    	main.plugins =  [main.editing];
    	var row = 1;
    	main.columns = [
    	                
    	    	   	//{xtype: 'rownumberer', header: 'No.', width : '10%', sortable: false },//,width : '10%'},
    	    	   	{header: 'No.', width : '9%', sortable: false, dataIndex: 'row'},
    	         	{header: 'Choose', dataIndex: 'value', editor: 'textfield',  width : '70%',   sortable: false}  , 
    	    	 
    	    	    {
        	            xtype: 'checkcolumn',
        	            header: 'Answer?',
        	            dataIndex: 'answer',
        	            width: '20%',
        	           // width: 30,
        	             sortable: false,
        	            editor: {
        	                xtype: 'checkbox',
        	                cls: 'x-grid-checkheader-editor'
        	            }, sortable: false 
    	    	    }
    	            
    	        ];
    	
    	main.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                iconCls: 'icon-add',
                text: 'Add',
                scope: this,
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
     
    } ,
    listeners: {
    	'click' : function(){
    		alert('test');
    	},
        'selectionchange': function(view, records) {
        	alert('test');
        	//this.down('#removeAnswer').setDisabled(!records.length);
        }
    },
    onAddClick : function(bt,ev){
    	var r = Ext.create('Survey.model.listAnswerData', {
    		id_basic_data: '',
    		value: 'answer',
    		answer: true,
    		row:   ''
        });

       // 
    	survey.listBasicData.insert(0, r);
        //rowEditing.startEdit(0, 0);
    },
    onDeleteClick : function(bt,ev){
    	//debugger;
    	var sm = bt.parent.getSelectionModel();
       // rowEditing.cancelEdit();
        bt.parent.store.remove(sm.getSelection());
        
        //survey.listBasicData.remove(sm.getSelection());
        if ( bt.parent.store.getCount() > 0) {
        	sm.select(0);
        }
        debugger;
        /*
        if (survey.listBasicData.getCount() > 0) {
            sm.select(0);
        }*/
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
	initComponent: function() {
		
		var main = this;
		main.questionid = Ext.create('survey.view.list.Project.fieldQuestionId',{msgTarget: 'side'});
		main.question = Ext.create('survey.view.list.Project.fieldQuestion',{msgTarget: 'side'});
		main.help = Ext.create('survey.view.list.Project.fieldHelp',{msgTarget: 'side'});
		
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
		
		main.choose = Ext.create('survey.view.list.GridAnswer');
		
//		
		main.choose.setLoad();
		main.items = [main.questionid, main.question, main.fieldSetsHelp,main.choose   ];  
		
		
		
		
		
		main.btsave = Ext.create('Ext.Button',{		 
			text : 'Save',
			//iconCls : 'project-add',
			formBind: true,  
	        disabled: true,
			handler : function(bt,ev){
				var form = this.up('form').getForm();
	            if (form.isValid()) {
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
	id : 'test-1',
	modal : true,
	width : 400,
	height : 400,
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
    	if (projectRecord != null && projectRecord.id != null) {
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
		
		main.winAddQuestion = Ext.create('survey.view.list.Project.winAddQuestion',{
			url : '/survey/saveProject',
			title : 'Add Question',
			titleAlign : 'left',
			listeners : {
				refreshOther : function(cmp) {
					//survey.listProject.reload();
		        }
			}
			
		});
		
		main.SplitBt = Ext.create('Ext.button.Split',{
			text : 'Create Questions',
			iconCls: 'add16',
			floating: false
		});
		
		
		
		main.tbar = [main.SplitBt];
		
		
		 
	    /****************************/
		var patientView = Ext.create('Ext.view.View', {
	        cls: 'patient-view',
	        tpl: '<tpl for=".">' +
	                '<div class="patient-source"><table><tbody>' +
	                    '<tr><td class="patient-label">Question</td><td class="patient-name">{question}</td></tr>' +
	                    '<tr><td class="patient-label">Question Type</td><td class="patient-name">{question_type_name}</td></tr>' + 
	                '</tbody></table></div>' +
	             '</tpl>',
	        itemSelector: 'div.patient-source',
	        overItemCls: 'patient-over',
	        selectedItemClass: 'patient-selected',
	        singleSelect: true,
	        store:  survey.listQuestionsData, 
	        listeners:initializePatientDragZone
	        
	    });
		/***********************************/
		
		
		main.gridQuestion = Ext.create('survey.view.list.GridQuestions'); 
	 
		/*
		 var group1 = this.id + 'group1';
		 
		 gridG = Ext.create('Ext.grid.Panel',{
			 	itemId: 'grid1',
	            flex: 1,
	             
	            multiSelect: true,
	                viewConfig: {
	                plugins: {
	                    ptype: 'gridviewdragdrop',
	                    containerScroll: true,
	                    dragGroup: group1,
	                    dropGroup: group1
	                },
	                listeners: {
	                    drop: function(node, data, dropRec, dropPosition) {
	                        //var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
	                       // Ext.example.msg('Drag from right to left', 'Dropped ' + data.records[0].get('name') + dropOn);
	                    }
	                }
	            },
	            store: survey.listQuestionsData, 
	            columns:  [
							{header: "Question", dataIndex: 'question'  , sortable: true},
							{header: "Question Type", dataIndex: 'question_type_name' } 
		    	            
		    	        ],
	            title: 'First Grid' 
			 
		 });
		*/
		
		
		
		main.items = [ main.gridQuestion];
		
		
		
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
    	//debugger;
    	bt.parentForm.winAddQuestion.setTitle( 'Add Question' + '-' + bt.record.data.description);
    	 
    	bt.parentForm.winAddQuestion.show();
    }
    
    
});  



/*****************************************/

function initializePatientDragZone(v) {
	console.log('initializePatientDragZone');
	
    v.dragZone = Ext.create('Ext.dd.DragZone', v.getEl(), {

//      On receipt of a mousedown event, see if it is within a draggable element.
//      Return a drag data object if so. The data object can contain arbitrary application
//      data, but it should also contain a DOM element in the ddel property to provide
//      a proxy to drag.
        getDragData: function(e) {
            var sourceEl = e.getTarget(v.itemSelector, 10), d;
          //  debugger;
            if (sourceEl) {
                d = sourceEl.cloneNode(true);
                d.id = Ext.id();
                return (v.dragData = {
                    sourceEl: sourceEl,
                    repairXY: Ext.fly(sourceEl).getXY(),
                    ddel: d,
                    patientData: v.getRecord(sourceEl).data
                });
            }
        },

//      Provide coordinates for the proxy to slide back to on failed drag.
//      This is the original XY coordinates of the draggable element.
        getRepairXY: function() {
            return this.dragData.repairXY;
        }
    });
}


function initializeHospitalDropZone(v) {
	debugger;
    var gridView = v,
        grid = gridView.up('gridpanel');

    grid.dropZone = Ext.create('Ext.dd.DropZone', v.el, {

//      If the mouse is over a target node, return that node. This is
//      provided as the "target" parameter in all "onNodeXXXX" node event handling functions
        getTargetFromEvent: function(e) {
            return e.getTarget('.hospital-target');
        },

//      On entry into a target node, highlight that node.
        onNodeEnter : function(target, dd, e, data){
            Ext.fly(target).addCls('hospital-target-hover');
        },

//      On exit from a target node, unhighlight that node.
        onNodeOut : function(target, dd, e, data){
            Ext.fly(target).removeCls('hospital-target-hover');
        },

//      While over a target node, return the default drop allowed class which
//      places a "tick" icon into the drag proxy.
        onNodeOver : function(target, dd, e, data){
            return Ext.dd.DropZone.prototype.dropAllowed;
        },

//      On node drop, we can interrogate the target node to find the underlying
//      application object that is the real target of the dragged data.
//      In this case, it is a Record in the GridPanel's Store.
//      We can use the data set up by the DragZone's getDragData method to read
//      any data we decided to attach.
        onNodeDrop : function(target, dd, e, data){
            var rowBody = Ext.fly(target).findParent('.x-grid-rowbody-tr', null, false),
                mainRow = rowBody.previousSibling,
                hospital = gridView.getRecord(mainRow),
                targetEl = Ext.get(target),
                html = targetEl.dom.innerHTML,
                patients = hospital.get('patients');
                
            if (!patients) {
                patients = [];
                hospital.set('patients', patients);
            }
            patients.push(data.patientData.name);
            html = patients.join(', ');
            targetEl.update(html);
            Ext.Msg.alert('Drop gesture', 'Dropped patient ' + data.patientData.name +
                ' on hospital ' + hospital.get('name'));
                
            return true;
        }
    });
}
/*****************************************/