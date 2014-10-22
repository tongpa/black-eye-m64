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

 


from tg import tmpl_context
from pollandsurvey.widget.movie_form import create_movie_form

__all__ = ['SurveyController']


class SurveyController(BaseController):
    
    @expose('pollandsurvey.templates.index')
    def index(self):
        """Handle the front-page."""
        return dict(page='index')
    
    @expose()
    def getAll(self):
        question = model.QuestionType.getAll(1);
        return question;