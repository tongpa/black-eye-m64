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
import types
from datetime import datetime
from tg import tmpl_context
from pollandsurvey.widget.movie_form import create_movie_form

import logging;
log = logging.getLogger(__name__);

__all__ = ['SurveyController']


class SurveyController(BaseController):
    
    def __init__(self):
        self.utility = Utility();
        self.UPLOAD_DIR = config['path_upload_file'] ;
    
    def _before(self, *args, **kw):
        tmpl_context.project_name = "pollandsurvey"
    
    
    @expose('pollandsurvey.templates.survey.samplegrid')
    @require(predicates.in_any_group('voter','managers', msg=l_('Only for voter')))
    def samplegrid(self, *args, **kw):
        """Handle the front-page."""
        reload(sys);
        sys.setdefaultencoding("utf-8");
        return dict(page='index')
    
        
    @expose('pollandsurvey.templates.survey.index')
    @require(predicates.in_any_group('voter','managers', msg=l_('Only for voter')))
    def index(self, *args, **kw):
        """Handle the front-page."""
        reload(sys);
        sys.setdefaultencoding("utf-8");
        return dict(page='index')
    
    @expose('json')
    def getProjectByUser(self, *args, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        
        if not request.identity:
            login_counter = request.environ.get('repoze.who.logins', 0) + 1
            redirect('/login',
                params=dict(came_from=came_from, __logins=login_counter))
        
        user =  request.identity['user']; 
        
        quest_project = model.QuestionProject.getAllByUser(1,user.user_id);
        
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
        self.message = "success";
        
        id_question_project = kw.get('id_question_project');
        description = kw.get('description');
        end_text = kw.get('end_text');
        footer_message = kw.get('footer_message');
        header_message = kw.get('header_message');
        id_question_project_type = kw.get('id_question_project_type');
        name = kw.get('name'); 
        #welcome_text = kw.get('welcome_text'); 
        
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
        self.message = "success";
        
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
    def saveitems(self, came_from=lurl('/'), *args, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        self.success = True;
        self.message = "success";
        
        return dict(success=self.success, message = self.message);
    @expose('json')
    def saveProject(self, came_from=lurl('/'), *args, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        self.success = True;
        self.message = "success";
        
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
        
    #@expose('json')
    @expose()
    def addQuestion1(self, came_from=lurl('/'), *args, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        self.success = True;
        self.message = "success";
        
        self.dataValue = kw;
        print kw;
        print '----------';
        print args;
        print '----------';
        
    
        
        if not request.identity:
            login_counter = request.environ.get('repoze.who.logins', 0) + 1
            redirect('/login',
                params=dict(came_from=came_from, __logins=login_counter))
        
        user =  request.identity['user']; 
        
        #model.Question.createQuestion(self.dataValue,user.user_id);
        print "check";
        print self.dataValue.get('id_question') is None or ( len(self.dataValue.get('id_question')) == 0 );
        
        if(self.dataValue.get('id_question') is None or ( len(self.dataValue.get('id_question')) == 0 )  ):
            print "---------- add Object---------------------";
            question = model.Question();
         
            question.question = self.dataValue.get('question');
            question.help_message = self.dataValue.get('help_message');
            question.id_question_project = self.dataValue.get('id_question_project');
            question.id_question_type = self.dataValue.get('id_question_type');
            
            
            
            
            
            
            
            
            
           
            
            question.text_label = '';
            question.user_id = user.user_id;
            question.order = 3;
            question.save();
            datagrid  = json.loads(self.dataValue.get('datagrid'));
            
            
            print "image : ";
            imageFile = self.dataValue.get('image_upload');
            answerimage = self.dataValue.get('answer_image'); 
            print ('image_upload' in self.dataValue);
            
            if( imageFile is not None and imageFile.filename is not None and ('image_upload' in self.dataValue) ):
                print "create file";
                #print imageFile.name; #pass
                #print imageFile.file; 
                #print imageFile.filename;
                #print imageFile.type;
                
                self.file_name = imageFile.filename;
                self.file_data = imageFile.value;
                self.target_file_name= self.utility.joinPathFileAndCreatePath(self.UPLOAD_DIR , str(question.id_question), self.file_name);
                  
                self.utility.saveFile(self.target_file_name,self.file_data);  
                
                questionMedia = model.QuestionMedia();
                questionMedia.id_question = question.id_question;
                questionMedia.value = self.file_name;
                questionMedia.media_type = imageFile.type;
                questionMedia.media_path_file = self.target_file_name;
                questionMedia.save();
                
            if (answerimage is not None and (len(answerimage) > 0) and ('answer_image' in self.dataValue)):
                 
                print "Len image {0:2}" .format(len(answerimage));  
                for file in answerimage:
                    self.file_name = file.filename;
                    self.file_data = file.value;
                    self.media_type = file.type;
                    self.target_file_name= self.utility.joinPathFileAndCreatePath(self.UPLOAD_DIR , str(question.id_question), self.file_name);
                  
                    self.utility.saveFile(self.target_file_name,self.file_data); 
                    
                    basicData = model.BasicData();
                    basicData.id_basic_data_type = 3; #image
                    basicData.save();
                    
                    basicMedia = model.BasicMultimediaData();
                    basicMedia.id_basic_data = basicData.id_basic_data;
                    basicMedia.value = self.file_name;
                    basicMedia.media_type = self.media_type;
                    basicMedia.media_path_file = self.target_file_name;
                    basicMedia.save();
                    
                    basicQuestion = model.BasicQuestion();
                    basicQuestion.id_question = question.id_question;
                    basicQuestion.id_basic_data = basicData.id_basic_data;
                    #basicQuestion.answer =    ({True: True, False: False}[ basic_datas.get('value') in 'true']);
                    #basicQuestion.order = basic_datas.get('seq');
                    
                    basicQuestion.save();
                    
                    
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
            print ("-----update--------");
            log.info(self.dataValue.get('id_question'));
            
            question = model.Question.getById(self.dataValue.get('id_question'));
            question.help_message = self.dataValue.get('help_message');
            question.text_label = '';
            question.question = self.dataValue.get('question');
            
            datagrid  = json.loads(self.dataValue.get('datagrid'));
            
            #update image
            print "image : ";
            imageFile = self.dataValue.get('image_upload');
            answerimage = self.dataValue.get('answer_image'); 
            print ('image_upload' in self.dataValue);
            
            if( not self.utility.isEmpty(imageFile)  and ('image_upload' in self.dataValue) ):
                print "create file";
                #print imageFile.name; #pass
                #print imageFile.file; 
                #print imageFile.filename;
                #print imageFile.type;
                
                self.file_name = imageFile.filename;
                self.file_data = imageFile.value;
                self.target_file_name= self.utility.joinPathFileAndCreatePath(self.UPLOAD_DIR , str(question.id_question), self.file_name);
                  
                self.utility.saveFile(self.target_file_name,self.file_data);  
                
                questionMedia = model.QuestionMedia.getId(question.id_question);
                if(questionMedia is not None):
                    print "remove old file";
                    self.utility.removeFile(questionMedia.media_path_file);
                    
                    questionMedia.value = self.file_name;
                    questionMedia.media_type = imageFile.type;
                    questionMedia.media_path_file = self.target_file_name;
                    print "update question media";
                
                else:
                    questionMedia = model.QuestionMedia();
                    questionMedia.id_question = question.id_question;
                    questionMedia.value = self.file_name;
                    questionMedia.media_type = imageFile.type;
                    questionMedia.media_path_file = self.target_file_name;
                    questionMedia.save();
                    print "create question media";
            
            
            
            print("show data in grid" );
            for basic_datas in datagrid:   
                print(basic_datas.get('id_question')  );
                log.info(basic_datas );
                if (basic_datas.get('id_question') is not None and len( str(basic_datas.get('id_question')).strip() ) > 0  ):
                    print "update basicQuestion";
                    #update
                    basicText = model.BasicTextData.getId(basic_datas.get('id_basic_data'));
                    if (basicText is not None):
                        basicText.value = basic_datas.get('value');
                    
                    print 'id_question : ' + str(basic_datas.get('id_question'));
                    print 'id_basic_data : ' + str(basic_datas.get('id_basic_data'));
                    
                    basicQuestion = model.BasicQuestion.getByQuestionAndBasic( basic_datas.get('id_question'), basic_datas.get('id_basic_data'));
                    basicQuestion.answer =  ({True: 1, False: 0}[ str(basic_datas.get('answer')).lower() in 'true']);
                    basicQuestion.order = basic_datas.get('seq');
                    
                     
                else:
                    print "insert basicQuestion";
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
        
        self.success = True;
        self.message = "Save Success";
        
        df = json.loads(request.body, encoding=request.charset);
        
        print df;
        print df.get('id_question');
        
        #question = model.Question.loadJson(df);
        
        #question = model.Question.getById(df.get('id_question'));
        
        idQuestion = df.get('id_question');
        
        self.success, self.message = model.Question.deleteQuestoin(idQuestion);

        
        return dict(success=self.success, message = self.message);
    
    @expose('json')
    def addQuestion(self, came_from=lurl('/'), *args, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        self.success = True;
        self.message = "success";
        
        self.dataValue = kw;
        print kw;
        print '----------';
        print args;
        print '----------';
        
    
        
        if not request.identity:
            login_counter = request.environ.get('repoze.who.logins', 0) + 1
            redirect('/login',
                params=dict(came_from=came_from, __logins=login_counter))
        
        user =  request.identity['user']; 
        
        #model.Question.createQuestion(self.dataValue,user.user_id);
        print "check";
        
        self.isCreate = self.dataValue.get('id_question') is None or ( len(self.dataValue.get('id_question')) == 0 );
        
        self.id_question_type  = self.dataValue.get('id_question_type')
        #create or update question
        question = model.Question();
        if( self.isCreate  ):
            print "---------- create question---------------------";
            question.question = self.dataValue.get('question');
            question.help_message = self.dataValue.get('help_message');
            question.id_question_project = self.dataValue.get('id_question_project');
            question.id_question_type = self.id_question_type;
            
            question.text_label = '';
            question.user_id = user.user_id;
            question.order = self.dataValue.get('order');  
            question.save();
            
            print question.id_question;
        else:
            print "---------- update question---------------------";
            question = model.Question.getById(self.dataValue.get('id_question'));
            
            question.help_message = self.dataValue.get('help_message');
            question.text_label = '';
            question.question = self.dataValue.get('question');
            question.user_id = user.user_id;
        
        print "save Question";
            
        # create or update questionMedia    
        imageFile = self.dataValue.get('image_upload');
        if type(imageFile) is types.InstanceType:
            
            self.file_name = imageFile.filename;
            self.file_data = imageFile.value;
            self.target_file_name= self.utility.joinPathFileAndCreatePath(self.UPLOAD_DIR , str(question.id_question), self.file_name);
              
            self.utility.saveFile(self.target_file_name,self.file_data);  
            
            questionMedia = model.QuestionMedia.getId(question.id_question);
            if(questionMedia is None):
                questionMedia = model.QuestionMedia();
                questionMedia.id_question = question.id_question;
            else:
                self.utility.removeFile(questionMedia.media_path_file);
                print 'remove file : ' + questionMedia.media_path_file;
            questionMedia.value = self.file_name;
            questionMedia.media_type = imageFile.type;
            questionMedia.media_path_file = self.target_file_name;
            questionMedia.save();
            
            print "save questionMedia"; 
            
        #Step 2 create         
        datagrid  = json.loads(self.dataValue.get('datagrid'));
        for basic_datas in datagrid:  
            print basic_datas;
            self.isCreate = basic_datas.get('id_question') is not None and len( str(basic_datas.get('id_question')).strip() ) > 0 ;
            
            basicData = model.BasicData();
            basicQuestion = model.BasicQuestion();
            print "-----------------------Basic data-----------------------------------";
            if (not self.isCreate ):
                print "create basic data";                
                basicData.id_basic_data_type = self.id_question_type; #image
                basicData.save();  
                
                print "create basic question";
                basicQuestion.id_question = question.id_question;
                basicQuestion.id_basic_data = basicData.id_basic_data;
                basicQuestion.answer =   basic_datas.get('answer') ;# ({True: True, False: False}[ basic_datas.get('answer') in 'true']);
                basicQuestion.order = basic_datas.get('seq');                    
                basicQuestion.save();              
            else:
                print "update basic data : " + str( basic_datas.get('id_basic_data'));                
                basicData.id_basic_data = basic_datas.get('id_basic_data');
                basicQuestion  = model.BasicQuestion.getByQuestionAndBasic(question.id_question,basicData.id_basic_data);
                if(basicQuestion):
                    basicQuestion.answer =   basic_datas.get('answer') ; 
                    basicQuestion.order = basic_datas.get('seq');    
                else:
                    print "error load basicQuestion";
           
            print "------------------------basic Data type----------------------------------";
            print 'self.id_question_type : ' + str(self.id_question_type)  + ' type : ' + type(self.id_question_type).__name__ ;
            if (self.id_question_type == '1' or self.id_question_type == '2' or self.id_question_type == '3'):
                print "case text";
                basicText = model.BasicTextData();
                if (not self.isCreate ):
                    print "create basic text";
                    basicText.id_basic_data = basicData.id_basic_data;
                    basicText.value = basic_datas.get('value');
                    basicText.save();
                else:
                    print "update basic text";
                    basicText = model.BasicTextData.getByBasicDataId(basicData.id_basic_data);
                    if(basicText):                
                        basicText.value = basic_datas.get('value');                       
                    else:
                        print "error load BasicTextData";    
                
            elif (self.id_question_type == '4'):
                print "case image";
                answerimage = self.dataValue.get('answer_image');
                print basic_datas.get('answer_image');
                print type(answerimage);
                
                print 'basicData.id_basic_data : ' + str(basicData.id_basic_data);
                
                if (type(answerimage) is types.InstanceType or  type(answerimage) is types.ListType) :
                    if  type(answerimage) is types.InstanceType:
                        print 'single file';
                        print answerimage.type;
                        file = answerimage;
                        if (basic_datas.get('answer_image') == file.filename ) :
                            basicMedia = model.BasicMultimediaData();
                            self.file_name = file.filename;
                            self.file_data = file.value;
                            self.media_type = file.type;
                            self.target_file_name= self.utility.joinPathFileAndCreatePath(self.UPLOAD_DIR , str(question.id_question), self.file_name);
                            self.utility.saveFile(self.target_file_name,self.file_data); 
                            
                            if ( not self.utility.isNumber( basic_datas.get('id_basic_data') ) ):
                                print 'create basic media';
                                basicMedia.id_basic_data = basicData.id_basic_data;
                                basicMedia.value = self.file_name;
                                basicMedia.media_type = self.media_type;
                                basicMedia.media_path_file = self.target_file_name;
                                basicMedia.save();
                            else:
                                print 'update basic media';
                                basicMedia = model.BasicMultimediaData.getByBasicDataId( basic_datas.get('id_basic_data') );
                                self.utility.removeFile(basicMedia.media_path_file);
                                basicMedia.value = self.file_name;
                                basicMedia.media_type = self.media_type;
                                basicMedia.media_path_file = self.target_file_name;
                                
                    else:
                        for file in answerimage:
                            print 'type list file';
                            print type(file);
                            if type(file) is not types.UnicodeType:
                                #print file.type;
                                if (basic_datas.get('answer_image') == file.filename) :
                                    self.file_name = file.filename;
                                    self.file_data = file.value;
                                    self.media_type = file.type;
                                    self.target_file_name= self.utility.joinPathFileAndCreatePath(self.UPLOAD_DIR , str(question.id_question), self.file_name);
                                    self.utility.saveFile(self.target_file_name,self.file_data); 
                                    basicMedia = model.BasicMultimediaData();
                                    if ( not self.utility.isNumber( basic_datas.get('id_basic_data') ) ):
                                        print 'create basic media';
                                        basicMedia.id_basic_data = basicData.id_basic_data;
                                        basicMedia.value = self.file_name;
                                        basicMedia.media_type = self.media_type;
                                        basicMedia.media_path_file = self.target_file_name;
                                        basicMedia.save();
                                    else:
                                        print 'update basic media';
                                        basicMedia = model.BasicMultimediaData.getByBasicDataId( basic_datas.get('id_basic_data') );
                                        self.utility.removeFile(basicMedia.media_path_file);
                                        basicMedia.value = self.file_name;
                                        basicMedia.media_type = self.media_type;
                                        basicMedia.media_path_file = self.target_file_name;
                  
                else:
                    print "Other type";
                pass;
             
            
        print "save object";
        
        
        
        return dict(success=self.success, message = self.message);
    
    
    @expose('json')
    def createBasicData(self, came_from=lurl('/'), *args, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        
        self.success = True;
        self.message = "success";
        log.info(request);
        log.info(args);
        log.info(kw);
        
        return dict(success=self.success, message = self.message);
    
    @expose('json')
    def updateQuestionData(self  , **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        self.success = True;
        self.message = "success";
        log.info('---------1--------------');
        #log.info(request.method );
        #log.info(request.params );
        
        df = json.loads(request.body, encoding=request.charset);
        for d in df:
            print d.get('id_question');
            print d.get('order');
            self.success, self.message = model.Question.updateOrderById(d.get('order'), d.get('id_question'));
            
            print self.success;
            print self.message;
            
        #for d in request:
        #    log.info(d);
        print df;
        log.info('-----------------------');
        log.info(kw);
       
        return dict(success=self.success, message = self.message);
    
    @expose('json')
    def deleteMediaQuestion(self, came_from=lurl('/'), *args, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        self.success = True;
        self.message = "success";
        log.info('---------1--------------');
        
        df = json.loads(request.body, encoding=request.charset);
        
        model.QuestionMedia.deleteByQuestion(df.get('id'));
        
        return dict(success=self.success, message = self.message);
    
    @expose('json')
    def deleteQuestionData(self, came_from=lurl('/'), *args, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        self.success = True;
        self.message = "success";
        log.info('---------1--------------');
        
        df = json.loads(request.body, encoding=request.charset);
        # remark : remove file
        self.success,self.message =  model.BasicQuestion.deleteData( df.get('id') , deleteBasicQuestion=True) ;
        
        return dict(success=self.success, message = self.message);
    
    @expose('json')
    def addOptions(self, came_from=lurl('/'), *args, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        self.success = True;
        self.message = "success";
        log.info('---------1--------------');
         
     
        print kw;
        print args;
        
        
        self.option = model.QuestionOption();   
         
        if ( not self.utility.isEmpty(kw.get('id_question_option'))):
            self.option = model.QuestionOption.getId( kw.get('id_question_option')  ); 
            
            
             
        self.option.id_question_project = kw.get('id_question_project');        
        self.option.id_question_theme = kw.get('id_question_theme'); 
        self.option.name_publication = kw.get('name_publication');
        
        
        if (not self.utility.isEmpty(kw.get('activate_date'))):
            self.option.activate_date =  datetime.strptime(  kw.get('activate_date')  + ' 00:00:00' , '%d/%m/%Y %H:%M:%S') ;
        
        if (not self.utility.isEmpty(kw.get('expire_date'))):
            self.option.expire_date =  datetime.strptime(  kw.get('expire_date')  + ' 23:59:59' , '%d/%m/%Y %H:%M:%S') ;
       
        
        self.option.header_message =kw.get('header_message');
        self.option.footer_message = kw.get('footer_message');
        self.option.welcome_message = kw.get('welcome_message');
        self.option.end_message = kw.get('end_message');
        
        self.option.redirect_url =kw.get('redirect_url');
        
        if (  self.utility.isEmpty(kw.get('id_question_option'))):
            print "save option";
            self.option.save();
       
            
       
        
        
        
        
        
        return dict(success=self.success, message = self.message);
    
    
    @expose('json')
    def deleteOptions(self, came_from=lurl('/'), *args, **kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        
        self.success = True;
        self.message = "Save Success";
        
        df = json.loads(request.body, encoding=request.charset);
        
        print df;
        print df.get('id_question_option');
        
         
        idQuestion = df.get('id_question_option');
        
        self.success, self.message = model.QuestionOption.deleteById(idQuestion);

        
        return dict(success=self.success, message = self.message);
    