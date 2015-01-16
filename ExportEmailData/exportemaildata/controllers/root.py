# -*- coding: utf-8 -*-
"""Main Controller"""

from tg import expose, flash, require, url, lurl, request, redirect, tmpl_context,response
from tg.i18n import ugettext as _, lazy_ugettext as l_
from tg.exceptions import HTTPFound

from tg.configuration import AppConfig, config
from tg import predicates
from exportemaildata import model
from exportemaildata.controllers.secure import SecureController
from exportemaildata.model import DBSession, metadata
from tgext.admin.tgadminconfig import BootstrapTGAdminConfig as TGAdminConfig
from tgext.admin.controller import AdminController

import os
import sys
import json 
from exportemaildata.lib.base import BaseController
from exportemaildata.controllers.error import ErrorController
from exportemaildata.controllers.utility import Utility
from exportemaildata.controllers.importemail.importfromfile import importDataThread
from exportemaildata.controllers.importemail.importfromfile_old import importData_old
from exportemaildata.controllers.importemail.importEmailController import ImportEmailController

from  exportemaildata.service.importEmailService import ImportEmailService
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
    importemail = ImportEmailController();
    error = ErrorController()
    
    utility = Utility();
    importEmailService = ImportEmailService();
    
    def _before(self, *args, **kw):
        tmpl_context.project_name = "exportemaildata"

    @expose('exportemaildata.templates.index')
    def index(self):
        """Handle the front-page."""
        redirect('/importEmail' )
        return dict(page='index')

   
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
    def feedback(self, data, **kw):
        import json
        reload(sys);
        sys.setdefaultencoding("utf-8");
        
        df = json.loads(data, encoding=request.charset);
        
        print len(df);
        if(len(df) >0):
            for d in df:
                print d;
            print '-----------'    
            print df[0].get('Issue');
            data = df[1]
            print data;
            
            #write file image 
            import base64  
            type,b64data = data.split(',');
            imgData = base64.b64decode(b64data) 
            f = open('c:/temp/issue1.png', 'wb')
            f.write(imgData)
            f.close() 
        
        
        print 'feed back'
        
        
        return dict(success=True);
    @expose('json')
    def checkEmail(self,**kw):
        dupEmail = model.EmailData.checkDuplicateEmail();
        print len(dupEmail);
        return dict(success=True); 
        
    @expose('exportemaildata.templates.uploadEmail')
    def importEmail(self,**kw):
         
        return dict(page='index')
    
    @expose(content_type="application/ms-excel")
    def downloadOrig (self,**kw):
        idExport = kw.get('id');
        
        downloadFile = self.importEmailService.downloadFile(idExport,True);
        response.content_type = downloadFile.get('content_type');
        response.headers["Content-Disposition"] = downloadFile.get('headers');
            
        return  downloadFile.get('dataFile');
    
    @expose(content_type="application/ms-excel")
    def downloadError (self,**kw):
        
        idExport = kw.get('id');
        downloadFile = self.importEmailService.downloadFile(idExport,False);
        response.content_type = downloadFile.get('content_type');
        response.headers["Content-Disposition"] = downloadFile.get('headers');
            
        return  downloadFile.get('dataFile');
    @expose('json')
    def fileUpload(self, **kw):
        print kw.get('file');
        fileUpload = kw.get('file');
        data = fileUpload.file.read();
        UPLOAD_DIR = config['path_upload_file'] ;
      
        
        #step 1 
        export=model.ExportEmail();
        export.file_name = fileUpload.filename;
        export.error_file_name = 'error-'+fileUpload.filename;
        export.error_path_file = '';#error_file_name;
        export.path_file = '';#target_file_name;
        export.total_row = 0;
        export.insert_row = 0;
        export.error_row = 0;
        export.id_status_export = 1; #received file
        export.same_old_row = 0;    
        export.insert_real_row = 0;
        
        print "save"
        export.save();
        print "save1"
        
        
        target_file_name = os.path.join(os.getcwd(), UPLOAD_DIR , str(export.id_export_email), fileUpload.filename);
        error_file_name = os.path.join(os.getcwd(), UPLOAD_DIR , str(export.id_export_email), 'error-'+fileUpload.filename);
        
        self.utility.checkPathFile(UPLOAD_DIR + str(export.id_export_email));
        self.utility.checkPathFile(UPLOAD_DIR + str(export.id_export_email));
        
        export.error_path_file = error_file_name;
        export.path_file = target_file_name;
        
        
        f = open(target_file_name, 'wb')
        f.write(data)
        f.close()
        
         
        export.id_status_export = 2; #writed file
        
        
        try:
            export.thread_id = "Thread-" + str(export.id_export_email);  
            thread1 = importDataThread(export.thread_id, target_file_name,export  );
            #thread1 = importDataThread("Thread-1",'D:/tong/code_py/ExportEmailData/ExportEmailData/sample_data/Data500.xlsx'   );
            
            thread1.start();
        except Exception as e:
            print e;
            pass;
        
        
        return dict(sucess=True,thred = export.thread_id,id= str(export.id_export_email));
    
    
    @expose('json')
    def importData(self,**kw):
        
        try:
            thread1 = importDataThread("Thread-1",'D:/tong/code_py/ExportEmailData/ExportEmailData/sample_data/Data_100000_S2.xlsx'   );
            #thread1 = importDataThread("Thread-1",'D:/tong/code_py/ExportEmailData/ExportEmailData/sample_data/Data500.xlsx'   );
            
            thread1.start();
        except Exception as e:
            print e;
            pass;
        
        """
        import thread
        import time
        try:
            thread.start_new_thread( importData_old, ("Thread-1", model,'D:\Tong\Code\code_python\ExportEmail\ExportEmailData\sample_data\Data2.xlsx', ) );
        except:
            print "Error: unable to start thread"
        """
        """
        #used
        import openpyxl
        workbook = openpyxl.load_workbook(filename = 'D:\Tong\Code\code_python\ExportEmail\ExportEmailData\sample_data\Data2.xlsx', use_iterators = True)
        worksheets = workbook.get_sheet_names()
        worksheet = workbook.get_sheet_by_name('Sheet13')    
        print str(worksheet.calculate_dimension());
        
        email = {};
        pid = {};
        same_email = [];
        same_pid = [];
        used_email = [];
        for row in worksheet.iter_rows(range_string="A1:Z10"):
            
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
                    emaildata.save();
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
    
    
    
