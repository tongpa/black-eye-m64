
from manageproject.model import Projects;
class ProjectData(object):

    def __init__(self):
        pass;
    
    def fieldJson(self):
        
    
"""
        Ext.define('User', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id_projects', type: 'int'},
        {name: 'description',  type: 'string'},
        {name: 'active',       type: 'int'},
        {name: 'create_date',  type: 'date'},
        {name: 'update_date',  type: 'date'}
    ]
});


var myStore = new Ext.data.Store({
    model: 'User',
    proxy: {
        type: 'ajax',
        url : '/project/getListProject',
        reader: {
            type: 'json',
            root: 'project'
        }
    },
    autoLoad: true
});

myStore.load(); """