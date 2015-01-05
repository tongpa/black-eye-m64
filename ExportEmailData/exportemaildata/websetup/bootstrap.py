# -*- coding: utf-8 -*-
"""Setup the ExportEmailData application"""
from __future__ import print_function

import logging
from tg import config
from exportemaildata import model
import transaction

def bootstrap(command, conf, vars):
    """Place any commands to setup exportemaildata here"""

    # <websetup.bootstrap.before.auth
    from sqlalchemy.exc import IntegrityError
    try:
        """
        u = model.User()
        u.user_name = 'manager'
        u.display_name = 'Example manager'
        u.email_address = 'manager@somedomain.com'
        u.password = 'managepass'
    
        model.DBSession.add(u)
    
        g = model.Group()
        g.group_name = 'managers'
        g.display_name = 'Managers Group'
    
        g.users.append(u)
    
        model.DBSession.add(g)
    
        p = model.Permission()
        p.permission_name = 'manage'
        p.description = 'This permission give an administrative right to the bearer'
        p.groups.append(g)
    
        model.DBSession.add(p)
    
        u1 = model.User()
        u1.user_name = 'editor'
        u1.display_name = 'Example editor'
        u1.email_address = 'editor@somedomain.com'
        u1.password = 'editpass'
    
        model.DBSession.add(u1)
        model.DBSession.flush()
        transaction.commit()
        """
        statusExport = model.StatusExport();
        statusExport.id_status_export = 1;
        statusExport.name = 'received file';
        model.DBSession.add(statusExport);
        
        statusExport = model.StatusExport();
        statusExport.id_status_export = 2;
        statusExport.name = 'writed file';
        model.DBSession.add(statusExport);
        
        statusExport = model.StatusExport();
        statusExport.id_status_export = 3;
        statusExport.name = 'analysis data';
        model.DBSession.add(statusExport);
        
        statusExport = model.StatusExport();
        statusExport.id_status_export = 4;
        statusExport.name = 'insert data';
        model.DBSession.add(statusExport);
        
        statusExport = model.StatusExport();
        statusExport.id_status_export = 5;
        statusExport.name = 'writed file error';
        model.DBSession.add(statusExport);
        
        statusExport = model.StatusExport();
        statusExport.id_status_export = 6;
        statusExport.name = 'checking same data';
        model.DBSession.add(statusExport);
        
        statusExport = model.StatusExport();
        statusExport.id_status_export = 7;
        statusExport.name = 'export same data';
        model.DBSession.add(statusExport);
        
        statusExport = model.StatusExport();
        statusExport.id_status_export = 8;
        statusExport.name = 'merge data';
        model.DBSession.add(statusExport);
        
        statusExport = model.StatusExport();
        statusExport.id_status_export = 9;
        statusExport.name = 'finish';
        model.DBSession.add(statusExport);
        
        model.DBSession.flush()
        
        
        typeEmail = model.TypeEmail();
        typeEmail.id_type_email = 1;
        typeEmail.name = 'Applicant';
        model.DBSession.add(typeEmail);
        
        typeEmail = model.TypeEmail();
        typeEmail.id_type_email = 2;
        typeEmail.name = 'Corporate';
        model.DBSession.add(typeEmail);
        
        model.DBSession.flush()
        
        
        transaction.commit()
    except IntegrityError:
        print('Warning, there was a problem adding your auth data, it may have already been added:')
        import traceback
        print(traceback.format_exc())
        transaction.abort()
        print('Continuing with bootstrapping...')

    # <websetup.bootstrap.after.auth>
