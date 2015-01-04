# -*- coding: utf-8 -*-
 


from tg import expose, flash, require, url, lurl, request, redirect, tmpl_context
from tg.i18n import ugettext as _, lazy_ugettext as l_
from tg.exceptions import HTTPFound
from tg import predicates
from exportemaildata import model 
from exportemaildata.model import DBSession, metadata  

from exportemaildata.lib.base import BaseController
from exportemaildata.controllers.error import ErrorController 
__all__ = ['ImportEmailController']


class ImportEmailController(BaseController):
    #Uncomment this line if your controller requires an authenticated user
    #allow_only = predicates.not_anonymous()
    
    @expose('exportemaildata.templates.index')
    def index(self):
        
        return dict(page='importEmail');
    
    
    @expose('json')
    def getHistoryEmail(self, **kw):
        id = kw.get('id');
        historys = [];
        if id :
            self.history = model.ExportEmail.getId(id);
            if (self.history):
                historys.append(self.history.to_json());
        else:
            self.history = model.ExportEmail.getAll();
            for his in self.history:
                historys.append(his.to_json());
        
        
        
        
        return dict(historys = historys);
        
    