from tg import expose, flash, require, url, lurl, request, redirect, tmpl_context
from tg.i18n import ugettext as _, lazy_ugettext as l_
from tg.exceptions import HTTPFound
from tg import predicates
from trackproblems import model
from trackproblems.controllers.secure import SecureController
from trackproblems.model import DBSession, metadata
from tgext.admin.tgadminconfig import BootstrapTGAdminConfig as TGAdminConfig
from tgext.admin.controller import AdminController

from trackproblems.lib.base import BaseController
from trackproblems.controllers.error import ErrorController
 
__all__ = ['ValueOptionController']


class ValueOptionController(BaseController):
    
    @expose('trackproblems.templates.track.index')
    def index(self):
        """Handle the front-page."""
        return dict(page='index')
    
    
    @expose('json')
    def getProjects(self,**kw):
        projectid = kw.get('id');
        self.listProject = [];
        self.projects = model.TrackModule.getAll();
        for project in self.projects:
            self.listProject.append(project.to_json());
            
        return dict(fields=self.listProject, total = len(self.listProject));
     
     
    @expose('json')
    def getProblemType(self,**kw):
        projectid = kw.get('id');
        print "-------------";
        print projectid;
        self.listProject = [];
        self.projects = model.ProblemType.getProblemByProject(projectid);
        for project in self.projects:
            self.listProject.append(project.to_json());
            
        return dict(fields=self.listProject, total = len(self.listProject));
           