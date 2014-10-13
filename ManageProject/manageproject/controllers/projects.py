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
import sys
#import json
from json import dumps

__all__ = ['ProjectsController']


class ProjectsController(BaseController):
    @expose('manageproject.templates.project.index')
    def index(self):
        """Handle the front-page."""
        reload(sys);
        sys.setdefaultencoding("utf-8");
        return dict(page='project')
    
    @expose('json')
    def getListProject(self, *args, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        projects = model.Projects.selectAll();
        
        print projects;
        list=[];
        for p in projects:
            list.append(p._asdict())
        
        
        return dict(project =list,leng = str(2));
    
    @expose(content_type='text/js')
    def getJavascript(self,*args,**kw):
        return """
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

""";
        
        