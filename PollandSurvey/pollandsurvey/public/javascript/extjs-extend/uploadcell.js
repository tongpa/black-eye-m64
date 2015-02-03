Ext.define('Ext.grid.column.UploadFile', {
    extend: 'Ext.grid.column.Column',
    alias: ['widget.uploadfile'],
     
    afterTpl: [
               '<input id="{id}-fileInputEl" data-ref="fileInputEl" class="{childElCls} {inputCls}" ',
                   'type="file" size="1" name="{inputName}" role="{role}" ',
                   'data-savedtabindex-ext-element-1="none" ',
                   'data-tabindexsaved="true" ',
                   
                   '<tpl if="tabIndex != null">tabindex="{tabIndex}"</tpl>',
               '>'
           ], 
    alternateClassName: 'Ext.grid.UploadFileColumn',
    constructor: function() {
    	console.log('constructor')
    	this.scope = this;
        this.callParent(arguments);
        
    },
    getTemplateArgs: function(){
        var args = this.callParent();
        args.inputCls = this.inputCls;
        args.inputName = this.inputName;
        args.tabIndex = this.ownerCt.tabIndex;
        return args;
    },
    defaultRenderer : function(value, cellValues) {
    	console.log('defaultRenderer');
    	//return '<input type="file"> ';
    	var args = {id : Ext.id(),inputName: 'answer_image',childElCls :'',inputCls:'',role:'button',tabIndex:''}; //x-form-file-input
    	 
    	return this.getTpl('afterTpl').apply(args);
    },
    // @private
    applyTriggers: function(triggers) {
        var me = this,
            triggerCfg = (triggers || {}).filebutton;

        console.log('applyTriggers');
    }
    
});