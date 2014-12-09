# -*- coding: utf-8 -*-
"""Main Controller"""

from tg import expose, flash, require, url, lurl, request, redirect, tmpl_context
from tg.i18n import ugettext as _, lazy_ugettext as l_
from tg.exceptions import HTTPFound
from tg import predicates
from angularjs import model
from angularjs.controllers.secure import SecureController
from angularjs.model import DBSession, metadata
from tgext.admin.tgadminconfig import BootstrapTGAdminConfig as TGAdminConfig
 

from angularjs.lib.base import BaseController
from angularjs.controllers.error import ErrorController

__all__ = ['AngularController']


class AngularController(BaseController):
     

    def _before(self, *args, **kw):
        tmpl_context.project_name = "angularjs"

    @expose('angularjs.templates.angular.index')
    def index(self):
        """Handle the front-page."""
        return dict(page='index')
    
    @expose('angularjs.templates.angular.form')
    def form(self):
        """Handle the front-page."""
        return dict(page='form')
    
    @expose('angularjs.templates.angular.validateform')
    def validateform(self):
        """Handle the front-page."""
        return dict(page='validateform')
    
    @expose('angularjs.templates.angular.SampleForm')
    def SampleForm(self):
        """Handle the front-page."""
        return dict(page='SampleForm')
    
    @expose('angularjs.templates.angular.radiotpl')
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
        
        answer.append({'id' : 1 , 'label': 'red'});
        answer.append({'id' : 2 , 'label': 'green'});
        answer.append({'id' : 3 , 'label': 'blue'});
        answer.append({'id' : 4 , 'label': 'orange'});        
        question.append({'id':1 ,'question': 'What do you like a color?','type': 'radio', 'answer': answer});
        
        
        
        answer = [];       
        answer.append({'id' : 1 , 'label': 'red'});
        answer.append({'id' : 2 , 'label': 'green'});
        answer.append({'id' : 3 , 'label': 'blue'});
        answer.append({'id' : 4 , 'label': 'orange'});
        
        question.append({'id':2 ,'question': 'What do you not like a color?','type': 'check', 'answer': answer});
        
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
        

     
