# -*- coding: utf-8 -*-
"""Main Controller"""

from tg import expose, flash, require, url, lurl, request, redirect, tmpl_context,validate  
from tg.i18n import ugettext as _, lazy_ugettext as l_
from tg.exceptions import HTTPFound
from tg import predicates
from pollandsurvey import model
from pollandsurvey.controllers.secure import SecureController
from pollandsurvey.model import DBSession, metadata
from tgext.admin.tgadminconfig import BootstrapTGAdminConfig as TGAdminConfig
from tgext.admin.controller import AdminController

from pollandsurvey.lib.base import BaseController
from pollandsurvey.controllers.error import ErrorController

from pollandsurvey.controllers.register.registercontrol import RegisterController;
from pollandsurvey.controllers.surveycontroller import SurveyController;
from pollandsurvey.controllers.script.loadscriptcontroller import  ScriptController;
from pollandsurvey.controllers.script.loadmodelcontroller import  ScriptModelController;
from pollandsurvey.controllers.script.previewcontroller import  PreviewController;
from pollandsurvey.controllers.script.imagescontroller import ImagesController;
from pollandsurvey.controllers.angularcontroller import AngularController;
from pollandsurvey.controllers.answercontroller import AnswerController;

from tg import tmpl_context
from pollandsurvey.widget.movie_form import create_movie_form 
import sys
import logging;
log = logging.getLogger(__name__);
__all__ = ['RootController']


class RootController(BaseController):
    """
    The root controller for the PollandSurvey application.

    All the other controllers and WSGI applications should be mounted on this
    controller. For example::

        panel = ControlPanelController()
        another_app = AnotherWSGIApplication()

    Keep in mind that WSGI applications shouldn't be mounted directly: They
    must be wrapped around with :class:`tg.controllers.WSGIAppController`.

    """
    secc = SecureController()
    admin = AdminController(model, DBSession, config_type=TGAdminConfig)

    error = ErrorController()
    
    register = RegisterController();
    survey = SurveyController();
    script = ScriptController();
    model = ScriptModelController();
    
    images = ImagesController();
    preview =PreviewController();
    
    ans = AnswerController();
    
    ang = AngularController();
    
    def _before(self, *args, **kw):
        tmpl_context.project_name = "pollandsurvey"
    
    @expose('pollandsurvey.templates.about')
    def about(self, came_from=lurl('/')):
        return dict(page='about') 
        
    @expose('pollandsurvey.templates.index')
    def index(self, came_from=lurl('/')):
        """Handle the front-page."""
        
        
        
        if not request.identity:
            login_counter = request.environ.get('repoze.who.logins', 0) + 1
            redirect('/login', params=dict(came_from=came_from, __logins=login_counter))
        
        userid = request.identity['repoze.who.userid']
        flash(_('Welcome back, %s!') % userid)
        
        groups = request.identity['groups'] 
        
        self.location = '/about';
        if 'voter' in groups:            
            log.info('voter');
            self.location = '/survey';
        log.info('other');
        
        return  HTTPFound(location=self.location)
        #return dict(page='index')

    
 

    @expose('pollandsurvey.templates.environ')
    @require(predicates.has_permission('manage', msg=l_('Only for managers')))
    def environ(self):
        """This method showcases TG's access to the wsgi environment."""
        return dict(page='environ', environment=request.environ)

     
    
    @expose('pollandsurvey.templates.index')
    @require(predicates.has_permission('manage', msg=l_('Only for managers')))
    def manage_permission_only(self, **kw):
        """Illustrate how a page for managers only works."""
        return dict(page='managers stuff')


    @expose('pollandsurvey.templates.index')
    @require(predicates.is_user('editor', msg=l_('Only for the editor')))
    def editor_user_only(self, **kw):
        """Illustrate how a page exclusive for the editor works."""
        return dict(page='editor stuff')

    @expose('pollandsurvey.templates.login')
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
        
        groups = request.identity['groups'] 
        
        #identity = request.environ.get('repoze.who.identity') 
        
        
        #for key in request.environ:
        #    print key 
        #    print request.environ[key];
        #    print '-------'
        #print "----------------------------------------------------------------";
        #for key in request.identity:
        #    print key 
        #    print request.identity[key];
        #    print '-------'
        #print "----------------------------------------------------------------";
        
        #print "User id "  ;
        #user =  request.identity['user'];
        #print user.user_id;
        print 'came_from : ' + came_from;
        """
        
        if 'voter' in groups:
            print "voter";
            log.info('voter');
            return HTTPFound(location='/survey')
        
        print "other";
        
        """
        
        
        
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
    
    
    @expose('pollandsurvey.templates.expired')
    def expired(self,*args,**kw):
        return dict(page='expired');
    
    @expose('pollandsurvey.templates.thankyou')
    def thankyou(self,*args,**kw):
        return dict(page='thankyou');
     
    @expose('pollandsurvey.templates.new_form')
    def new(self, **kw):
        
         
        
        tmpl_context.form = create_movie_form
        return dict(modelname='Movie', value=kw)
    
    
    @validate(create_movie_form, error_handler=new)
    @expose()
    def create(self, **kw):
        """Create a movie object and save it to the database."""
        redirect("/register")
        
        
    @expose('pollandsurvey.templates.sanpleuploadfile')
    def sampleupload(self,*args,**kw):
    
        return dict(view="sample");
    
    @expose('json',content_type="text/plain"  )
    def addQuestion(self, came_from=lurl('/'), *args, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        self.success = True;
        self.message = "success";
        log.info('---------1--------------');
         
     
        print kw;
        print args;
        
        
          
        
        return dict(success=self.success, message = self.message);
    
    