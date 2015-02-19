Ext.require([
    'Ext.window.Window',
    'Ext.tab.*',
    'Ext.toolbar.Spacer',
    'Ext.layout.container.Card',
    'Ext.layout.container.Border'
]);

Ext.onReady(function(){
    var constrainedWin, constrainedWin2;
    
     

  /*

    Ext.create('Ext.Window', {
        title: 'Right Header, plain: true',
        width: 400,
        height: 200,
        x: 450,
        y: 200,
       // headerPosition: 'right',
        layout: 'fit',
        items: [
                {
                	xtype : 'form',
                	items : [
                	  {
                		  xtype: 'filefield',
                	        name: 'photo',
                	        fieldLabel: 'Photo',
                	        labelWidth: 50,
                	        msgTarget: 'side',
                	        allowBlank: false,
                	        anchor: '100%',
                	        buttonText: 'Select Photo...'
                		  
                	  }         
                	],

                    buttons: [{
                        text: 'Upload',
                        handler: function() {
                            var form = this.up('form').getForm();
                            if(form.isValid()){
                                form.submit({
                                    url: '/survey/addQuestion',
                                    method :'POST',
                                    waitMsg: 'Uploading your photo...',
                                    success: function(fp, o) {
                                        Ext.Msg.alert('Success', 'Your photo "' + o.result.file + '" has been uploaded.');
                                    }
                                });
                            }
                        }
                    }]
                		
                }
                ]
    
    }).show();
*/
    Ext.create('Ext.form.Panel', {
        title: 'Upload a Photo',
        width: 400,
        bodyPadding: 10,
        frame: true,
        renderTo: Ext.getBody(),    
        items: [{
            xtype: 'filefield',
            name: 'photo',
            fieldLabel: 'Photo',
            labelWidth: 50,
            msgTarget: 'side',
            allowBlank: false,
            anchor: '100%',
            buttonText: 'Select Photo...'
        }],

        buttons: [{
            text: 'Upload',
            handler: function() {
                var form = this.up('form').getForm();
                if(form.isValid()){
                    form.submit({
                    	url: '/addQuestion',
                        method :'GET',
                        waitMsg: 'Uploading your photo...',
                        success: function(fp, o) {
                            Ext.Msg.alert('Success', 'Your photo "' + o.result.file + '" has been uploaded.');
                        }
                    });
                }
            }
        }]
    });

    
});