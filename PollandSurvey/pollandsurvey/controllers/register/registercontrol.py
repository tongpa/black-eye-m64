# -*- coding: utf-8 -*-
"""Main Controller"""

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
from pollandsurvey.widget.register.registerwidget import RegisterForm ,passwordValidator
from tg import tmpl_context 

import tw2.core

__all__ = ['RegisterController']


class RegisterController(BaseController):
    """
    The root controller for the PollandSurvey application.

    All the other controllers and WSGI applications should be mounted on this
    controller. For example::

        panel = ControlPanelController()
        another_app = AnotherWSGIApplication()

    Keep in mind that WSGI applications shouldn't be mounted directly: They
    must be wrapped around with :class:`tg.controllers.WSGIAppController`.

    """
    
    

    def _before(self, *args, **kw):
        tmpl_context.project_name = "pollandsurvey"

    @expose('pollandsurvey.templates.register.index')
    def index1(self):
        """Handle the front-page."""
        return dict(page='index')

    @expose('pollandsurvey.templates.widget')
    def index(self, *args, **kw):
        w = RegisterForm(redirect='/register/',validate= passwordValidator).req()
        w.child.action ="/register/create";
         
        return dict(widget=w, page='register',title="Register")
    
    
    @expose()
    @validate(RegisterForm, error_handler=index)    
    def create(self,*args,**kw):
        
        return str(kw);
        flash(_('Wrong credentials'), 'warning')
        email =  kw['registerform:email_address'];
        user = kw['registerform:user_name'];
        confirm_password =  kw['registerform:confirm_password'];
        user_id = kw['registerform:user_id'];
        display = kw['registerform:display_name'];
        password = kw['registerform:password'];
        
        #u = model.User();
        msg ="";
        u = model.User.by_email_address(email);
        if u is None:
            u = model.User.by_user_name(user);
            if u is None:
                print password;
                print confirm_password;
                if( str(password) is  str(confirm_password) ):
                    print "create user";
                    u= model.User();
                    u.user_name = user
                    u.display_name = display
                    u.email_address = email
                    u.password = password
                    
                    print "save user";
                    #model.DBSession.add(u)
                    model.DBSession.flush()
                    print "save user success";
                else:
                    msg ="password not same";
                    print "password not same";
            else:
                msg = "user have already";
                print "user have already";
        else:
            msg = "email have already";
            print "email have already";
        pass;
 
    
