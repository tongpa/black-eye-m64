# -*- coding: utf-8 -*-
"""Survey Controller"""

from tg import expose, flash, require, url, lurl, request, redirect, tmpl_context,validate,response 
from tg.i18n import ugettext as _, lazy_ugettext as l_
from tg.exceptions import HTTPFound
from tg.configuration import AppConfig, config
from tg import predicates,RestController
from tg.decorators import override_template;
from pollandsurvey import model
from pollandsurvey.controllers.secure import SecureController
from pollandsurvey.model import DBSession, metadata
from tgext.admin.tgadminconfig import BootstrapTGAdminConfig as TGAdminConfig
from tgext.admin.controller import AdminController

from pollandsurvey.lib.base import BaseController
from pollandsurvey.controllers.error import ErrorController
from pollandsurvey.controllers.utility import Utility

import sys
import json 
import types
from datetime import datetime
from tg import tmpl_context
from pollandsurvey.widget.movie_form import create_movie_form

import logging;
log = logging.getLogger(__name__);

__all__ = ['AnswerController']


class AnswerController(BaseController):#RestController): #
    
    def __init__(self):
        self.utility = Utility();
        self.URL_GETDATAQUESTION = '/ans/getDataPreview?idProject={0}';
        self.UPLOAD_DIR = config['path_upload_file'] ;
    
    @expose()
    def _default(self, *args, **kw):
        return "This page is not ready"
    
    def _before(self, *args, **kw):
        tmpl_context.project_name = "pollandsurvey"
    
    @expose('pollandsurvey.templates.view.multiquestion')
    def reply(self,id=0,ready='no', **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        print id,
        print kw;
         
        self.header = '';
        self.footer = '';
        self.nextQuestion ='';
        self.template ='';
            
        self.questionOption = model.QuestionOption.getId(id);           
        
        if  self.questionOption is None or ( not self.utility.isActiveFromDate(None,self.questionOption.activate_date,self.questionOption.expire_date) ):
            redirect('/expired') ;
        
        print "after redirect";
        print "ready : ", ready;     
        print self.questionOption;    
        if str(ready).lower() == 'no':    
            #check have welcome page
            if( not self.utility.isEmpty(self.questionOption.welcome_message) ) :
                redirect('/ans' + '/welcome?id='+ str(self.questionOption.id_question_option) );
            else:
                self.template = self.questionOption.theme.template;
                override_template(AnswerController.reply, self.template) ;    
                
        elif str(ready).lower() == 'yes':
            self.header = self.questionOption.header_message;
            self.footer = self.questionOption.footer_message;
            self.urlName = self.utility.spritValue(request.path_info,'/');
            self.template = self.questionOption.theme.template
            if(len(self.urlName) >= 1 ) :
                self.nextQuestion = '/' + self.urlName[0] + '/saveQuestion' + '?id='+ str(self.questionOption.id_question_option);
            
            
            if(self.template is not None and len(self.template) > 0):    
                print self.template; 
                
                override_template(AnswerController.reply, self.template) 
                 
                 
        return dict(page='view',header = self.header, footer = self.footer, action = self.nextQuestion,template= self.template,urldata = self.URL_GETDATAQUESTION.format(id), idproject = id  ); 
            
    @expose('pollandsurvey.templates.view.welcome')
    def welcome(self,id=0,came_from=lurl('/')):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        
        log.info('preview id : ' + str(id));
        
        
        self.welcome_message = '';
        self.questionOption = model.QuestionOption.getId(id);
        
        
        if  self.questionOption is None or ( not self.utility.isActiveFromDate(None,self.questionOption.activate_date,self.questionOption.expire_date) ):
            redirect('/expired') ;
                
        self.welcome_message= self.questionOption.welcome_message;
        self.nextQuestion  = '';
         
        self.urlName = self.utility.spritValue(request.path_info,'/');
         
        if(len(self.urlName) >= 1 ) :
            #self.nextQuestion = '/' + self.urlName[0]+ '?id='+ str(self.questionOption.id_question_option);
            self.nextQuestion = '/' + 'ans/reply/'+  str(self.questionOption.id_question_option);
            
                
            
        
        return dict(page='view', ready = 'yes',welcome_message = self.welcome_message, nextQuestion= self.nextQuestion);
    
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
    
    @expose('json')
    def saveQuestion(self, *args, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        self.df = json.loads(request.body, encoding=request.charset);
        
        print self.df;
        print self.df.get('value');
        print args;
        print kw ;
        
        
        return dict(success = True);
   