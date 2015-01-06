# -*- coding: utf-8 -*-
"""Main Controller"""

from tg import expose, flash, require, url, lurl, request, redirect, tmpl_context,response
from tg.i18n import ugettext as _, lazy_ugettext as l_
from tg.exceptions import HTTPFound

from tg.configuration import AppConfig, config
from tg import predicates
from trackproblems import model
from trackproblems.controllers.secure import SecureController
from trackproblems.model import DBSession, metadata
from tgext.admin.tgadminconfig import BootstrapTGAdminConfig as TGAdminConfig
from tgext.admin.controller import AdminController

from trackproblems.lib.base import BaseController
from trackproblems.controllers.error import ErrorController
from trackproblems.controllers.trackproblemcontroller import TrackProblemController;

import os
import sys
import json 
import base64 
 
__all__ = ['RootController']


class RootController(BaseController):
    """
    The root controller for the TrackProblems application.

    All the other controllers and WSGI applications should be mounted on this
    controller. For example::

        panel = ControlPanelController()
        another_app = AnotherWSGIApplication()

    Keep in mind that WSGI applications shouldn't be mounted directly: They
    must be wrapped around with :class:`tg.controllers.WSGIAppController`.

    """
    secc = SecureController()
    admin = AdminController(model, DBSession, config_type=TGAdminConfig)

    track = TrackProblemController();
    
    error = ErrorController()

    def _before(self, *args, **kw):
        tmpl_context.project_name = "trackproblems"

    @expose('trackproblems.templates.index')
    def index(self):
        """Handle the front-page."""
        return dict(page='index')
    
    @expose('json')
    def getproblemtype(self, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        response.content_type = 'application/json';
        response.headers["Access-Control-Allow-Origin"] = '*';
        response.headers["Access-Control-Allow-Headers"] = '*';
        
        project_id = 0;
        security_key = 0;
        domain_name = '';
        for data in kw:
            df = json.loads(data );
            domain_name = df.get('domain');
            project_id = df.get('project_id');
            security_key = df.get('security_key');
            print domain_name;
         
        
        self.trackModule = model.TrackModule.getByIdAndSecureKey(project_id,security_key);
        datas = [];
        if self.trackModule and self.trackModule.active == 1 :
            
            if( self.trackModule.domain_name in domain_name or self.trackModule.bypass == 1):
                self.problemType = self.trackModule.problemType;
                if(self.problemType):
                    for type in self.problemType:
                        datas.append(type.to_json());
            else:
                return dict(status=False,data=datas,message='access denied this domain');
        else:
            return dict(status=False,data=datas,message='access denied this security key or client id');
        
         
        
        
        
        return dict(status=True,data=datas,message='');
    @expose('json')
    def feedback(self, data, **kw):
        
        reload(sys);
        sys.setdefaultencoding("utf-8");
        
        df = json.loads(data, encoding=request.charset);
        
        print len(df);
        if(len(df) >0):
            """for d in df:
                print d;
            """
            print '-----------'    
            print df[0];
            self.issue = df[0].get('issue');
            self.type_problem =  df[0].get('type_problem');
            self.security_key =  df[0].get('security_key');
            self.feedback_url =  df[0].get('feedback_url');
            self.from_page =  df[0].get('from_page');
            self.project_id =  df[0].get('project_id');
            self.domain_name =  df[0].get('domain');
            
            self.module = model.TrackModule.checkSecureKey(self.project_id,self.security_key);
            
            if(self.module):
                if( self.module.domain_name in self.domain_name or self.module.bypass == 1):
                    self.problem = model.TrackProblem();
                    self.problem.id_track_module =  self.project_id;
                    self.problem.id_problem_page =  self.project_id;
                    self.problem.id_problem_type = self.type_problem;
                    self.problem.feedback_url = self.feedback_url;
                    self.problem.description = self.issue;
                    self.problem.save();
                    
                    data = df[1]
                     
                    
                    UPLOAD_DIR = config['path_upload_file'] ;
                    
                    print UPLOAD_DIR;
                    
                    
                     
                    type,b64data = data.split(',');
                    imgData = base64.b64decode(b64data) 
                    f = open('c:/temp/issue1234.png', 'wb')
                    f.write(imgData)
                    f.close() 
                else:
                    #domain is not same 
                    pass;
            else:
                #project is not exits;
                pass;
            
        
        
        print 'feed back'
        
        response.content_type = 'application/json';
        response.headers["Access-Control-Allow-Origin"] = '*';
        response.headers["Access-Control-Allow-Headers"] = '*';
        
        return dict(success=True); 

    @expose('trackproblems.templates.login')
    def login(self, came_from=lurl('/')):
        """Start the user login."""
        login_counter = request.environ.get('repoze.who.logins', 0)
        if login_counter > 0:
            flash(_('Wrong credentials'), 'warning')
        return dict(page='login', login_counter=str(login_counter),
                    came_from=came_from)

    @expose()
    def post_login(self, came_from=lurl('/')):
        """
        Redirect the user to the initially requested page on successful
        authentication or redirect her back to the login page if login failed.

        """
        if not request.identity:
            login_counter = request.environ.get('repoze.who.logins', 0) + 1
            redirect('/login',
                params=dict(came_from=came_from, __logins=login_counter))
        userid = request.identity['repoze.who.userid']
        flash(_('Welcome back, %s!') % userid)

        # Do not use tg.redirect with tg.url as it will add the mountpoint
        # of the application twice.
        return HTTPFound(location=came_from)

    @expose()
    def post_logout(self, came_from=lurl('/')):
        """
        Redirect the user to the initially requested page on logout and say
        goodbye as well.

        """
        flash(_('We hope to see you soon!'))
        return HTTPFound(location=came_from)
    
 
