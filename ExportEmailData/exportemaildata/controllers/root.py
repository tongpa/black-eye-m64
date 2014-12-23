# -*- coding: utf-8 -*-
"""Main Controller"""

from tg import expose, flash, require, url, lurl, request, redirect, tmpl_context
from tg.i18n import ugettext as _, lazy_ugettext as l_
from tg.exceptions import HTTPFound
from tg import predicates
from exportemaildata import model
from exportemaildata.controllers.secure import SecureController
from exportemaildata.model import DBSession, metadata
from tgext.admin.tgadminconfig import BootstrapTGAdminConfig as TGAdminConfig
from tgext.admin.controller import AdminController

from exportemaildata.lib.base import BaseController
from exportemaildata.controllers.error import ErrorController
from exportemaildata.controllers.importemail.importfromfile import importDataThread

__all__ = ['RootController']


class RootController(BaseController):
    """
    The root controller for the ExportEmailData application.

    All the other controllers and WSGI applications should be mounted on this
    controller. For example::

        panel = ControlPanelController()
        another_app = AnotherWSGIApplication()

    Keep in mind that WSGI applications shouldn't be mounted directly: They
    must be wrapped around with :class:`tg.controllers.WSGIAppController`.

    """
    secc = SecureController()
    admin = AdminController(model, DBSession, config_type=TGAdminConfig)

    error = ErrorController()

    def _before(self, *args, **kw):
        tmpl_context.project_name = "exportemaildata"

    @expose('exportemaildata.templates.index')
    def index(self):
        """Handle the front-page."""
        return dict(page='index')

    @expose('exportemaildata.templates.about')
    def about(self):
        """Handle the 'about' page."""
        return dict(page='about')

    @expose('exportemaildata.templates.environ')
    def environ(self):
        """This method showcases TG's access to the wsgi environment."""
        return dict(page='environ', environment=request.environ)

    @expose('exportemaildata.templates.data')
    @expose('json')
    def data(self, **kw):
        """This method showcases how you can use the same controller for a data page and a display page"""
        return dict(page='data', params=kw)
    @expose('exportemaildata.templates.index')
    @require(predicates.has_permission('manage', msg=l_('Only for managers')))
    def manage_permission_only(self, **kw):
        """Illustrate how a page for managers only works."""
        return dict(page='managers stuff')

    @expose('exportemaildata.templates.index')
    @require(predicates.is_user('editor', msg=l_('Only for the editor')))
    def editor_user_only(self, **kw):
        """Illustrate how a page exclusive for the editor works."""
        return dict(page='editor stuff')

    @expose('exportemaildata.templates.login')
    def login(self, came_from=lurl('/')):
        """Start the user login."""
        login_counter = request.environ.get('repoze.who.logins', 0)
        if login_counter > 0:
            flash(_('Wrong credentials'), 'warning')
        return dict(page='login', login_counter=str(login_counter),
                    came_from=came_from)

    @expose()
    def post_login(self, came_from=lurl('/')):
        """
        Redirect the user to the initially requested page on successful
        authentication or redirect her back to the login page if login failed.

        """
        if not request.identity:
            login_counter = request.environ.get('repoze.who.logins', 0) + 1
            redirect('/login',
                params=dict(came_from=came_from, __logins=login_counter))
        userid = request.identity['repoze.who.userid']
        flash(_('Welcome back, %s!') % userid)

        # Do not use tg.redirect with tg.url as it will add the mountpoint
        # of the application twice.
        return HTTPFound(location=came_from)

    @expose()
    def post_logout(self, came_from=lurl('/')):
        """
        Redirect the user to the initially requested page on logout and say
        goodbye as well.

        """
        flash(_('We hope to see you soon!'))
        return HTTPFound(location=came_from)
    
    
    @expose('json')
    def importData(self,*kw):
        
        
        thread1 = importDataThread("Thread-1",model,'D:\Tong\Code\code_python\ExportEmail\ExportEmailData\sample_data\Data5000-1.xlsx'   );
        
        thread1.start();
        """
        import thread
        import time
        try:
            thread.start_new_thread( importData, ("Thread-1", model,'D:\Tong\Code\code_python\ExportEmail\ExportEmailData\sample_data\Data5000-1.xlsx', ) );
        
            print thread.getName();
        except:
            print "Error: unable to start thread"
        """
        """
        import openpyxl
        workbook = openpyxl.load_workbook(filename = 'D:\Tong\Code\code_python\ExportEmail\ExportEmailData\sample_data\Data5000-1.xlsx', use_iterators = True)
        worksheets = workbook.get_sheet_names()
        worksheet = workbook.get_sheet_by_name('Sheet13')    
        print str(worksheet.calculate_dimension());
        
        email = {};
        pid = {};
        same_email = [];
        same_pid = [];
        used_email = [];
        for row in worksheet.iter_rows():
            
            emaildata = model.EmailData();
            emaildata.prefix =  row[0].value;
            emaildata.firstname_thai =  row[1].value;
            emaildata.lastname_thai =  row[2].value;
            emaildata.firstname_eng =  row[3].value;
            emaildata.lastname_eng =  row[4].value;
           
            emaildata.sex =  row[5].value;
            emaildata.birthdate =  row[6].value;
    
            emaildata.pid =  row[7].value;
            emaildata.passport =  row[8].value;
            emaildata.countryname =  row[9].value;
            emaildata.house_no =  row[10].value;
            emaildata.building_village =  row[11].value;
            emaildata.moo =  row[12].value;
            emaildata.soi =  row[13].value;
            emaildata.road =  row[14].value;
            emaildata.county =  row[15].value;
            emaildata.city =   row[16].value;
            emaildata.province =   row[17].value;
            emaildata.postcode=  row[18].value;
            emaildata.mobile=  row[19].value;
            emaildata.telephone=   row[20].value;
            emaildata.email=   row[21].value;
            emaildata.housing_type=   row[22].value;
            emaildata.category=   row[23].value;
            emaildata.salary=  row[24].value;
            emaildata.education=   row[25].value;
            
            
            if (email.get(emaildata.email) is None) :
                #emaildata.save();
                if(pid.get(emaildata.pid) is None) :
                    #emaildata.save();
                    email[emaildata.email] = emaildata;
                    pid[emaildata.pid] = emaildata;
                    used_email.append(emaildata);
                else:
                    same_pid.append(emaildata);  
            else:
                same_email.append(emaildata);
                
                 
            
            
             
        
        print "used email " + str( len(used_email));
        print "same email " + str( len(same_email));
        print "same ipd   " + str( len(same_pid));
        """
        return dict(success=True);
