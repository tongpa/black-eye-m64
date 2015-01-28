# -*- coding: utf-8 -*-
"""Survey Controller"""

from tg import expose, flash, require, url, lurl, request, redirect, tmpl_context,validate,response 
from tg.i18n import ugettext as _, lazy_ugettext as l_
from tg.exceptions import HTTPFound
from tg.configuration import AppConfig, config
from tg import predicates
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
from tg import tmpl_context
from pollandsurvey.widget.movie_form import create_movie_form

import logging;
log = logging.getLogger(__name__);

__all__ = ['SurveyController']


class SurveyController(BaseController):
    
    def __init__(self):
        self.utility = Utility();
    
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
        
        self.df = json.loads(request.body, encoding=request.charset);
        
         
        self.idProject = self.df.get('id_question_project');
        
        self.listQuestion = model.Question.getByProjectId(self.idProject);
        for self.question in self.listQuestion:
            if(self.question):
                self.idQuestion = self.question.id_question;
                model.Question.deleteQuestoin(self.idQuestion);
            
        model.QuestionProject.deleteById(self.idProject);
        
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
        
        print kw;
        
        
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
        print kw;
        if not request.identity:
            login_counter = request.environ.get('repoze.who.logins', 0) + 1
            redirect('/login',
                params=dict(came_from=came_from, __logins=login_counter))
        
        user =  request.identity['user']; 
        
        #model.Question.createQuestion(self.dataValue,user.user_id);
        
        
        if(self.dataValue.get('id_question') is None or ( len(self.dataValue.get('id_question')) == 0 )  ):
         
            question = model.Question();
         
            question.question = self.dataValue.get('question');
            question.help_message = self.dataValue.get('help_message');
            question.id_question_project = self.dataValue.get('id_question_project');
            question.id_question_type = self.dataValue.get('id_question_type');
            
            
            UPLOAD_DIR = config['path_upload_file'] ;
            
            
            
            
            
            
           
            
            question.text_label = '';
            question.user_id = user.user_id;
            question.order = 3;
            question.save();
            datagrid  = json.loads(self.dataValue.get('datagrid'));
            
            
            print "image : ";
            imageFile = self.dataValue.get('image_upload');
            print imageFile.filename;
            if( imageFile is not None):
                print "create file";
                #print imageFile.name; #pass
                #print imageFile.file; 
                #print imageFile.filename;
                #print imageFile.type;
               
                self.file_name = imageFile.filename;
                self.file_data = imageFile.value;
                self.target_file_name= self.utility.joinPathFileAndCreatePath(UPLOAD_DIR , str(question.id_question), self.file_name);
                  
                self.utility.saveFile(self.target_file_name,self.file_data);          
                
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
        
        else:
            log.info("-----update--------");
            log.info(self.dataValue.get('id_question'));
            
            question = model.Question.getById(self.dataValue.get('id_question'));
            question.help_message = self.dataValue.get('help_message');
            question.text_label = '';
            question.question = self.dataValue.get('question');
            
            datagrid  = json.loads(self.dataValue.get('datagrid'));
            
            log.info("show data in grid" );
            
            for basic_datas in datagrid:   
                log.info(basic_datas.get('id_question')  );
                log.info(basic_datas );
                if (basic_datas.get('id_question') is None):
                    #update
                    basicText = model.BasicTextData.getId(basic_datas.get('id_basic_data'));
                    basicText.value = basic_datas.get('value');
                    
                    basicQuestion = model.BasicQuestion.getByQuestionAndBasic( self.dataValue.get('id_question'), basic_datas.get('id_basic_data'));
                    basicQuestion.answer =  ({True: 1, False: 0}[ str(basic_datas.get('answer')).lower() in 'true']);
                    basicQuestion.order = basic_datas.get('seq');
                    
                     
                else:
                    #insert
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
                    basicQuestion.answer =    ({True: 1, False: 0}[ str(basic_datas.get('answer')).lower() in 'true']);
                    basicQuestion.order = basic_datas.get('seq');
                    
                    basicQuestion.save();
                    
                    pass;
                
                
            
                
            pass;
        
         
  
        
         
            
        print "save object";
        
        
        
        return dict(success=self.success, message = self.message);
    
    @expose('json')
    def deleteQuestion(self, came_from=lurl('/'), *args, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        
        df = json.loads(request.body, encoding=request.charset);
        
        print df;
        print df.get('id_question');
        
        #question = model.Question.loadJson(df);
        
        #question = model.Question.getById(df.get('id_question'));
        
        idQuestion = df.get('id_question');
        
        model.Question.deleteQuestoin(idQuestion);
        """
        listBasicQuestion = model.BasicQuestion.getByQuestionId(idQuestion);
        
        model.BasicQuestion.deleteByQuestion(idQuestion);
        
        for basicQuestion in listBasicQuestion:
            idBasicData = basicQuestion.id_basic_data;
            model.BasicTextData.deleteById(idBasicData);            
            model.BasicData.deleteById(idBasicData);
            
        
        model.QuestionValidation.deleteByQuestion(idQuestion);
        model.Question.deleteByQuestion(idQuestion);
        """
         
            
        self.success = True;
        self.message = "Save Success";
        
        print args;
        print kw;
        
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
    
        
    