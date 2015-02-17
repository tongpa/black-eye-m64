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


from tg import tmpl_context
from pollandsurvey.widget.movie_form import create_movie_form

import logging;
#from model.survey import BasicQuestion
log = logging.getLogger(__name__);

__all__ = ['ScriptModelController']


class ScriptModelController(BaseController):
    
    @expose()
    def index(self, came_from=lurl('/')):
        if not request.identity:
            login_counter = request.environ.get('repoze.who.logins', 0) + 1
            redirect('/login',
                params=dict(came_from=came_from, __logins=login_counter))
        userid = request.identity['repoze.who.userid']
        flash(_('Welcome back, %s!') % userid)

        # Do not use tg.redirect with tg.url as it will add the mountpoint
        # of the application twice.
        return HTTPFound(location=came_from)
    
    @expose('json')
    def getVariable (self, *args, **kw):
        variables = model.Variables.getAllParent(1);
        for q in variables:
            for sub in q.childen:
                print "\t\t" +  sub.name;
        #return dict(page ="test",quest = question) ;
        log.info("getVariable");
        return dict(survey=variables , total = len(variables));
    
    @expose('json')
    def getQuestionType(self, *args, **kw):
        questiontype = model.QuestionType.getAll(1);
        
        return dict(survey=questiontype , total = len(questiontype));
    
    @expose('json')
    def getBasicData(self, *args, **kw):
         
        BasicQuestion = model.BasicQuestion.getBasicTextById(kw.get('questionid'));
        BasicQuestion= model.BasicQuestion.convertBasicTextToJson(BasicQuestion);
       
        
        return dict(survey=BasicQuestion , total = len(BasicQuestion));
    
    @expose('json')
    def getBasicMediaData(self, *args, **kw):
        
        BasicQuestion = model.BasicQuestion.getBasicMediaById(kw.get('questionid'));
        BasicQuestion= model.BasicQuestion.convertBasicTextToJson(BasicQuestion);
       
        
        return dict(survey=BasicQuestion , total = len(BasicQuestion));
        
    @expose('json')
    def getQuestionsData(self, *args, **kw):
        pid = kw.get('projectid');
        print pid;
        question = model.Question.getQuestionByProjectId(pid);
        
        return dict(survey=question , total = len(question));
     
            
    @expose('json')
    def getOptionsProject(self, *args, **kw):
        pid = kw.get('projectid');
        print pid;
        question = model.QuestionOption.getByProject(pid)
        
        return dict(survey=question , total = len(question));
    
    @expose('json')
    def getOptionTheme(self, *args, **kw):
         
        question = model.QuestionTheme.getAll(1);
        
        return dict(survey=question , total = len(question));
    
    
    
    
    