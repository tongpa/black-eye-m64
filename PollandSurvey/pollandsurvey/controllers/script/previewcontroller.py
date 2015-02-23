# -*- coding: utf-8 -*-
"""Survey Controller"""

from tg import expose, flash, require, url, lurl, request, redirect, tmpl_context,validate
from tg.i18n import ugettext as _, lazy_ugettext as l_
from tg.exceptions import HTTPFound
from tg import predicates,decorators
from tg.decorators import override_template;
from pollandsurvey import model
from pollandsurvey.controllers.secure import SecureController
from pollandsurvey.model import DBSession, metadata
from tgext.admin.tgadminconfig import BootstrapTGAdminConfig as TGAdminConfig
from tgext.admin.controller import AdminController

from pollandsurvey.lib.base import BaseController
from pollandsurvey.controllers.error import ErrorController
from pollandsurvey.controllers.utility import Utility

import sys;
from datetime import datetime

from tg import tmpl_context

import logging;
from symbol import decorators

log = logging.getLogger(__name__);

__all__ = ['PreviewController']


class PreviewController(BaseController):
   
    def __init__(self):
        self.URL_GETDATAQUESTION = '/preview/getDataPreview?idProject={0}';
        self.utility = Utility();
    
    @expose('pollandsurvey.templates.view.multiquestion')
    def index(self ,id=0,ready='no' , came_from=lurl('/')):
        
        reload(sys);
        sys.setdefaultencoding("utf-8");
        
        if not request.identity:
            login_counter = request.environ.get('repoze.who.logins', 0) + 1
            redirect('/login',   params=dict(came_from=came_from, __logins=login_counter))
        userid = request.identity['repoze.who.userid']
        
        
        log.info('preview id : ' + str(id));
        log.info('ready : ' + str(ready))
        
        self.header = '';
        self.footer = '';
        self.nextQuestion ='';
        self.template ='';
        self.questionOption = model.QuestionOption.getId(id);
        if self.questionOption : 
            log.info('expire date : ' + str(self.questionOption.expire_date));
            log.info('current : ' + str(datetime.now()) );
            
            if datetime.now() <= self.questionOption.expire_date:
                log.info('not expire');
            else :
                log.info('expire');
            
            
            if str(ready).lower() == 'no':    
                #check have welcome page
                if( not self.utility.isEmpty(self.questionOption.welcome_message) ) :
                    redirect(request.path_info + '/welcome?id='+ str(self.questionOption.id_question_option) );
                else:
                    self.template = self.questionOption.theme.template;
                    override_template(PreviewController.index, self.template) ;    
                    
            elif str(ready).lower() == 'yes':
                self.header = self.questionOption.header_message;
                self.footer = self.questionOption.footer_message;
                self.urlName = self.utility.spritValue(request.path_info,'/');
                self.template = self.questionOption.theme.template
                if(len(self.urlName) >= 1 ) :
                    self.nextQuestion = '/' + self.urlName[0] + '/saveQuestion' + '?id='+ str(self.questionOption.id_question_option);
                
                
                if(self.template is not None and len(self.template) > 0):    
                    print self.template; 
                    
                    override_template(PreviewController.index, self.template) 
                    
                
        print 'idproject : ', id;     
        return dict(page='view',header = self.header, footer = self.footer, action = self.nextQuestion,template= self.template,urldata = self.URL_GETDATAQUESTION.format(id) , idproject = id ); 
         
        
    
    @expose ("genshi:pollandsurvey.templates.view.firstTemplate")
    def sampleTemplate(self,id=0, **kw):        
        print id;
        if(str(id) == str(2)):
            print id;
            override_template(PreviewController.sampleTemplate, 'genshi:pollandsurvey.templates.view.changeTemplate') 
        return dict(title="Foobar", mybool=False, someval="foo"  ) #,tg_template="pollandsurvey.templates.view.changeTemplate"
        
   
    @expose('pollandsurvey.templates.view.welcome')
    def welcome(self,id=0,came_from=lurl('/')):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        
        if not request.identity:
            login_counter = request.environ.get('repoze.who.logins', 0) + 1
            redirect('/login',   params=dict(came_from=came_from, __logins=login_counter))
        userid = request.identity['repoze.who.userid']
       
        
        log.info('preview id : ' + str(id));
        
        
        self.welcome_message = '';
        self.questionOption = model.QuestionOption.getId(id);
        if self.questionOption : 
            if datetime.now() <= self.questionOption.expire_date:
                log.info('not expire');
            else :
                log.info('expire');
                
            self.welcome_message= self.questionOption.welcome_message;
            self.nextQuestion  = '';
             
            self.urlName = self.utility.spritValue(request.path_info,'/');
             
            if(len(self.urlName) >= 1 ) :
                self.nextQuestion = '/' + self.urlName[0]+ '?id='+ str(self.questionOption.id_question_option);
        
            
                
            
        
        return dict(page='view', ready = 'yes',welcome_message = self.welcome_message, nextQuestion= self.nextQuestion);
    
    @expose('pollandsurvey.templates.view.singlequestion')
    def show(self ,id=0 , came_from=lurl('/')):
        if not request.identity:
            login_counter = request.environ.get('repoze.who.logins', 0) + 1
            redirect('/login',   params=dict(came_from=came_from, __logins=login_counter))
        userid = request.identity['repoze.who.userid']
        #flash(_('Welcome back, %s!') % userid)
        
        log.info('preview id : ' + str(id));
        
        self.questionOption = model.QuestionOption.getId(id);
        
        log.info('expire date : ' + str(self.questionOption.expire_date));
        log.info('current : ' + str(datetime.now()) );
        
        if datetime.now() <= self.questionOption.expire_date:
            log.info('not expire');
        else :
            log.info('expire');
        
        return dict(page='view')
    
    @expose('json')
    def getDataPreview(self, came_from=lurl('/'),   *args, **kw): 
        reload(sys);
        sys.setdefaultencoding("utf-8");
        
        idProject = kw.get('idProject');
        print args;
        print kw ;
        
        questions = [];
        
        self.questionOption = model.QuestionOption.getId(idProject);
        if self.questionOption :
            self.listQuestions = model.Question.getByProjectId(self.questionOption.id_question_project);
            
            question = [];
            for self.question in self.listQuestions:
                #print self.question.id_question;
                #print self.question.question;
                #print self.question.question_type.type;
                #print self.question.order;
                question.append(self.question.to_json());
            
            
            questions = [];
           
             
            
            questions.append({'id': idProject, 'question' : question});
        
        return dict(questions = questions);
    
    
    @expose('pollandsurvey.templates.view.goodbye')
    def saveQuestion(self,id=0 , came_from=lurl('/'),   *args, **kw): 
        reload(sys);
        sys.setdefaultencoding("utf-8");
        
        if not request.identity:
            login_counter = request.environ.get('repoze.who.logins', 0) + 1
            redirect('/login',   params=dict(came_from=came_from, __logins=login_counter))
        userid = request.identity['repoze.who.userid']
        
        
        self.success = True;
        self.message = "success";
        self.goodbye_message = '';
        self.nextQuestion = '';
        print "project id : " + str(id);
        print kw;
        print args;
        
        self.questionOption = model.QuestionOption.getId(id);
        if(self.questionOption):
            self.goodbye_message = self.questionOption.end_message;
            self.urlRedirect = self.questionOption.redirect_url;
        
        return dict(page='goodbye',success=self.success, message = self.message,goodbye = self.goodbye_message,nextQuestion = self.nextQuestion,urlRedirect = self.urlRedirect);
    