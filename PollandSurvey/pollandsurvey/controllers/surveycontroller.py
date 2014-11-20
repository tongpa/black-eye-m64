# -*- coding: utf-8 -*-
"""Survey Controller"""

from tg import expose, flash, require, url, lurl, request, redirect, tmpl_context,validate,response 
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

import sys
import json

from tg import tmpl_context
from pollandsurvey.widget.movie_form import create_movie_form

import logging;
log = logging.getLogger(__name__);

__all__ = ['SurveyController']


class SurveyController(BaseController):
    
    def _before(self, *args, **kw):
        tmpl_context.project_name = "pollandsurvey"
        
    @expose('pollandsurvey.templates.survey.index')
    @require(predicates.in_any_group('voter','managers', msg=l_('Only for voter')))
    def index(self, *args, **kw):
        """Handle the front-page."""
        reload(sys);
        sys.setdefaultencoding("utf-8");
        return dict(page='index')
    
    @expose('json')
    def getProjectByUser(self, *args, **kw):
        quest_project = model.QuestionProject.getAll(1);
        
        log.info("getProjectByUser");
        return dict(survey=quest_project , total = len(quest_project));
    
    @expose('json')
    def getAll(self, *args, **kw):
        question = model.QuestionType.getAll(1);
        return dict(page ="test",quest = question) ;
    
    
    @expose('pollandsurvey.templates.survey.index')
    def extjs(self, *args, **kw):
        """Handle the front-page."""
        return dict(page='index')
    
    
    @expose('json')
    def updateProject(self, came_from=lurl('/'), *args, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        self.success = True;
        self.message = "5555";
        
        id_question_project = kw.get('id_question_project');
        description = kw.get('description');
        end_text = kw.get('end_text');
        footer_message = kw.get('footer_message');
        header_message = kw.get('header_message');
        id_question_project_type = kw.get('id_question_project_type');
        name = kw.get('name'); 
        welcome_text = kw.get('welcome_text'); 
        
        if id_question_project is not None or id_question_project != '':
            project = model.QuestionProject.getId(id_question_project);
            if(project):
                project.description = description;
                project.end_text = end_text;
                project.footer_message = footer_message;
                project.header_message = header_message;
                project.name = name;
                project.welcome_text = welcome_text;
                project.id_question_project_type = id_question_project_type;
                
            else :
                self.message = "error";
        else:
            self.message = "error";
        
        return dict(success=self.success, message = self.message);
        
    @expose('json')
    def deleteProject(self, came_from=lurl('/'), *args, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        self.success = True;
        self.message = "5555";
        
        print args;
        print kw;
        
        return dict(success=self.success, message = self.message);
    @expose('json')
    def saveProject(self, came_from=lurl('/'), *args, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        self.success = True;
        self.message = "5555";
        
        if not request.identity:
            login_counter = request.environ.get('repoze.who.logins', 0) + 1
            redirect('/login',
                params=dict(came_from=came_from, __logins=login_counter))
        
        
        
        
        project = model.QuestionProject();
        
        user =  request.identity['user']; 
        project.user_id =  user.user_id;
        
        if 'description' in kw:
            project.description = kw.get('description');
        
        if 'id_question_project_type' in kw:
            project.id_question_project_type = kw.get('id_question_project_type');
            
        if 'name' in kw:
            project.name = kw.get('name');
       
       
       
       
        if 'id_question_project' in kw  :
            project.id_question_project =  kw.get('id_question_project');
            
            project.save();
        
        
        
        return dict(success=self.success, message = self.message);
        #return dict(failed=self.success, message = self.message);
        
    @expose('json')
    def addQuestion(self, came_from=lurl('/'), *args, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        self.success = True;
        self.message = "5555";
        
        self.dataValue = kw;
        
        if not request.identity:
            login_counter = request.environ.get('repoze.who.logins', 0) + 1
            redirect('/login',
                params=dict(came_from=came_from, __logins=login_counter))
        
        user =  request.identity['user']; 
        
        #model.Question.createQuestion(self.dataValue,user.user_id);
        
        
        question = model.Question();
         
        question.question = self.dataValue.get('question');
        question.help_message = self.dataValue.get('help_message');
        question.id_question_project = self.dataValue.get('id_project');
        question.id_question_type = self.dataValue.get('id_question_type');
        question.text_label = '';
        question.user_id = user.user_id;
        question.order = 3;
        question.save();
        datagrid  = json.loads(self.dataValue.get('datagrid'));
        
        
         
  
        for basic_datas in datagrid:
        
            
            basicData = model.BasicData();
            basicData.id_basic_data_type = 1;
            basicData.save();
            
            basicText = model.BasicTextData();
            basicText.id_basic_data = basicData.id_basic_data;
            basicText.value = basic_datas.get('value');
            basicText.save();
            
            basicQuestion = model.BasicQuestion();
            basicQuestion.id_question = question.id_question;
            basicQuestion.id_basic_data = basicData.id_basic_data;
            basicQuestion.answer =    ({True: True, False: False}[ basic_datas.get('value') in 'true']);
            basicQuestion.order = basic_datas.get('seq');
            
            basicQuestion.save();
         
            
        print "save object";
        
        
        
        return dict(success=self.success, message = self.message);
    
    @expose('json')
    def createBasicData(self, came_from=lurl('/'), *args, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        self.success = True;
        self.message = "5555";
        log.info(request);
        log.info(args);
        log.info(kw);
        
        return dict(success=self.success, message = self.message);
    
    @expose()
    def updateQuestionData(self  , **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        self.success = True;
        self.message = "5555";
        log.info('---------1--------------');
        #log.info(request.method );
        #log.info(request.params );
        
        for d in request:
            log.info(d);
        log.info('-----------------------');
       
        log.info(kw);
       
        return dict(success=self.success, message = self.message);
    
        
    