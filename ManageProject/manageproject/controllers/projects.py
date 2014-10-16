# -*- coding: utf-8 -*-
"""Main Controller"""

from tg import expose, flash, require, url, lurl, request, redirect, tmpl_context
from tg.i18n import ugettext as _, lazy_ugettext as l_
from tg.exceptions import HTTPFound
from tg import predicates
from manageproject import model
from manageproject.controllers.secure import SecureController
from manageproject.model import DBSession, metadata
from tgext.admin.tgadminconfig import BootstrapTGAdminConfig as TGAdminConfig
from tgext.admin.controller import AdminController

from manageproject.lib.base import BaseController
from manageproject.controllers.error import ErrorController
from manageproject.util.utility import Utility
import sys
from json import loads;
#import json
from json import dumps
from tw2.core.validation import catch

__all__ = ['ProjectsController']


class ProjectsController(BaseController):
    @expose('manageproject.templates.project.index')
    def index(self):
        """Handle the front-page."""
        reload(sys);
        sys.setdefaultencoding("utf-8");
        return dict(page='project')
    
    @expose('manageproject.templates.grid')
    def griddata(self):
        return dict(page='project')
    @expose('json')
    def getListProject(self, *args, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        projects = model.Projects.selectAll();
        
        #print projects;
        list=[];
        for p in projects:
            list.append(p._asdict())
        
        
        return dict(project =list,leng = str(2));
    
    
    @expose('json')
    def save(self,*args,**kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        print kw;
        id_project =  Utility.isEmpty( kw['id_projects'] );
        description = Utility.isEmpty( kw['description'] );
        msg=''; 
        if id_project is None :
            project = model.Projects();
            project.description = description;
            project.active = 1;
            msg = project.save();
        if msg :
            print msg; 
        print id_project;
        print description;
        
    @expose('json')
    def add(self,*args,**kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        df = loads(request.body, encoding=request.charset);
        print df;
        status = True;
        msg = 'update success';
        if(len(df) ==1 ):
            d = df[0];
            id_projects = d['id_projects'];
            description = d['description'];
            active = Utility.convertBoolean(d['active']);
            print description
            if str(id_projects) == '0' and description != '' :
                project = model.Projects();
                project.description = description;
                project.active = 1;
                msg = project.save();
            else :
                msg = "error";
            
            if msg :
               print msg; 
               status = False;
        
        return dict(success= status,message=msg);
        
    @expose('json')
    def update(self,*args,**kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        df = loads(request.body, encoding=request.charset);
        print df;
        status = True;
        msg = 'update success';
        if(len(df) ==1 ):
            d = df[0];
            id_projects = d['id_projects'];
            description = d['description'];
            active = Utility.convertBoolean(d['active']);
            print description
            if str(id_projects) == '0' and description != '' :
                project = model.Projects();
                project.description = description;
                project.active =active;
                msg = project.save();
            else:
                project = model.Projects.getById(id_projects);
                project.description = description;
                project.active = active;
            
            if msg :
               print msg; 
               status = False;
        
        return dict(success= status,message=msg);
        
    @expose('json')
    def delete(self,*args,**kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        df = loads(request.body, encoding=request.charset);
        print df;
        status = True;
        msg = 'success';
        if(len(df) ==1 ):
            d = df[0];
            id_projects = d['id_projects'];
            model.Projects.deleteById(id_projects);
            #description = d['description'];
            #active = Utility.isBoolean(d['active']);
        
        return dict(success= status,message=msg);    
         
        
    
    @expose(content_type='text/js')
    def getJavascript(self,*args,**kw):
        return """
        Ext.define('ProjectData', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id_projects', type: 'int'},
        {name: 'description',  type: 'string'},
        {name: 'active',       type: 'bool'},
        {name: 'create_date' , type: 'date',  dateFormat: 'Y-m-d H:M:S' },
        {name: 'update_date', type: 'date' }
    ]
});


var myStore = new Ext.data.Store({
    model: 'ProjectData',
    proxy: {
        type: 'ajax',
        api: {
            read: '/project/getListProject',
            create: '/project/add',
            update: '/project/update',
            destroy: '/project/delete'
        },
        reader: {
            type: 'json',
            successProperty: 'success',
            root: 'project',
            messageProperty: 'message'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            allowSingle :false,
            root: 'project'
        } ,
         
        listeners: {
            exception: function(proxy, response, operation){
                
                Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
                
            }
        }
         
    }, 
    listeners: {
        write: function(proxy, operation){
            if (operation.action == 'destroy') {
                main.child('#form').setActiveRecord(null);
            }
            
            this.reload();
        
        }
    },
    autoSync: true,
    autoLoad: true
});

""";
        
        