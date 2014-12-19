# -*- coding: utf-8 -*-
"""Survey Controller"""

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

import sys;
from datetime import datetime

from tg import tmpl_context

import logging;
log = logging.getLogger(__name__);

__all__ = ['PreviewController']


class PreviewController(BaseController):
   
    @expose('pollandsurvey.templates.view.view')
    def index(self ,id=0 , came_from=lurl('/')):
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
    
    
    @expose('pollandsurvey.templates.view.showview')
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
        
        
        self.questionOption = model.QuestionOption.getId(idProject);
        
        self.listQuestions = model.Question.getByProjectId(self.questionOption.id_question_project);
        
        question = [];
        for self.question in self.listQuestions:
            print self.question.id_question;
            print self.question.question;
            print self.question.question_type.type;
            print self.question.order;
            
            question.append(self.question.to_json());
        
        
        questions = [];
       
         
        
        questions.append({'id': idProject, 'question' : question});
        
        return dict(questions = questions);
    
    
    
    