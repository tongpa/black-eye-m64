# -*- coding: utf-8 -*-
"""Main Controller"""

from tg import expose, flash, require, url, lurl, request, redirect, tmpl_context
from tg.i18n import ugettext as _, lazy_ugettext as l_
from tg.exceptions import HTTPFound
from tg import predicates
from pollandsurvey import model
from pollandsurvey.controllers.secure import SecureController
from pollandsurvey.model import DBSession, metadata
from tgext.admin.tgadminconfig import BootstrapTGAdminConfig as TGAdminConfig
 

from pollandsurvey.lib.base import BaseController
from pollandsurvey.controllers.error import ErrorController

__all__ = ['AngularController']


class AngularController(BaseController):
     

    def _before(self, *args, **kw):
        tmpl_context.project_name = "angularjs"

    @expose('pollandsurvey.templates.angular.index')
    def index(self):
        """Handle the front-page."""
        return dict(page='index')
    
    @expose('pollandsurvey.templates.angular.form')
    def form(self):
        """Handle the front-page."""
        return dict(page='form')
    
    @expose('pollandsurvey.templates.angular.validateform')
    def validateform(self):
        """Handle the front-page."""
        return dict(page='validateform')
    
    @expose('pollandsurvey.templates.angular.SampleForm')
    def SampleForm(self):
        """Handle the front-page."""
        
        return dict(page='SampleForm')
    
    @expose('pollandsurvey.templates.angular.radiotpl')
    def radiotpl(self):
        """Handle the front-page."""
        return dict(page='radiotpl')
   
    @expose('json')
    def saveQuestion(self, *args, **kw):
        
        print args;
        print kw;
        
        return dict(success = True);
    
    @expose('json')
    def getQuestion(self, *args, **kw):
        """Handle the front-page."""
        
        questions = [];
        answer = [];
        question = [];
        
        
        
        answer.append({'id' : 1 , 'label': 'red','selected': 'checked'});
        answer.append({'id' : 2 , 'label': 'green','selected': ''});
        answer.append({'id' : 3 , 'label': 'blue','selected': ''});
        answer.append({'id' : 4 , 'label': 'orange','selected': ''});        
        question.append({'id':1 ,'seq':1,'question': 'What do you like a color?','type': 'radio', 'answer': answer});
        
        
        
        answer = [];       
        answer.append({'id' : 1 , 'label': 'red','selected': True});
        answer.append({'id' : 2 , 'label': 'green','selected': False});
        answer.append({'id' : 3 , 'label': 'blue','selected': False});
        answer.append({'id' : 4 , 'label': 'orange','selected':False});
        
        question.append({'id':2 ,'seq':2,'question': 'What do you not like a color?','type': 'check', 'answer': answer});
        
        
        answer = [];       
        answer.append({'id' : 1 , 'label': 'Yes','selected': ''});
        answer.append({'id' : 2 , 'label': 'No','selected': 'checked'}); 
        question.append({'id':3 ,'seq':3,'question': 'Do you like a color?','type': 'radio', 'answer': answer});
        
        answer = [];       
        answer.append({'id' : 1 , 'label': 'http://localhost:8081/images/user_1/project_1/question_3/answer_1.png'});
        answer.append({'id' : 2 , 'label': 'http://localhost:8081/images/user_1/project_1/question_3/answer_2.png'}); 
        answer.append({'id' : 3 , 'label': 'http://localhost:8081/images/user_1/project_1/question_3/answer_3.png'}); 
        answer.append({'id' : 4 , 'label': 'http://localhost:8081/images/user_1/project_1/question_3/answer_4.png'}); 
        question.append({'id':4 ,'seq':4,'question': 'http://localhost:8081/images/user_1/project_1/question_3/question_3.png', 'type': 'image', 'answer': answer});
        
        
        questions.append({'id': 1, 'question' : question});
        
        return dict(questions = questions);
     
    @expose('json')
    def getValueCustomer(self, *args, **kw):
        customer = [];
        customer.append({ "Name" : "Alfreds Futterkiste", "City" : "Berlin", "Country" : "Germany" });
        customer.append({ "Name" : "Berglunds snabbköp", "City" : "Luleå", "Country" : "Sweden" });
        customer.append({ "Name" : "Centro comercial Moctezuma", "City" : "México D.F.", "Country" : "Mexico" });
        customer.append({ "Name" : "Ernst Handel", "City" : "Graz", "Country" : "Austria" });
        customer.append( { "Name" : "FISSA Fabrica Inter. Salchichas S.A.", "City" : "Madrid", "Country" : "Spain" });
        customer.append( { "Name" : "Galería del gastrónomo", "City" : "Barcelona", "Country" : "Spain" });
        customer.append({ "Name" : "Island Trading", "City" : "Cowes", "Country" : "UK" });
        customer.append({ "Name" : "Königlich Essen", "City" : "Brandenburg", "Country" : "Germany" });
        customer.append({ "Name" : "Laughing Bacchus Wine Cellars", "City" : "Vancouver", "Country" : "Canada" });
        
        return dict(customers = customer);
    
    @expose('json')
    def getUser(self, *args, **kw):
        return dict(user= {'firstName': 'John', 'lastName': 'Doe'});
        

     
