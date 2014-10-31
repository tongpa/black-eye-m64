# -*- coding: utf-8 -*-
"""Setup the PollandSurvey application"""
from __future__ import print_function

import logging
from tg import config
from pollandsurvey import model
import transaction

def bootstrap(command, conf, vars):
    """Place any commands to setup pollandsurvey here"""

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
        
       
        
        quest_type = model.QuestionType();
        quest_type.id_question_type = 1;
        quest_type.description = "Single Choice";
        quest_type.active = 1;
        
        model.DBSession.add(quest_type);
        model.DBSession.flush();
         
        quest_type = model.QuestionType();
        quest_type.id_question_type = 2;
        quest_type.description = "Multi Choice";
        quest_type.active = 1;
        
        model.DBSession.add(quest_type);
        model.DBSession.flush();
        
        quest_type = model.QuestionType();
        quest_type.id_question_type = 3;
        quest_type.description = "Drop Down Menu";
        quest_type.active = 1;
        
        model.DBSession.add(quest_type);
        model.DBSession.flush();
        
        transaction.commit()
         """
        pass;
    except IntegrityError:
        print('Warning, there was a problem adding your auth data, it may have already been added:')
        import traceback
        print(traceback.format_exc())
        transaction.abort()
        print('Continuing with bootstrapping...')

    # <websetup.bootstrap.after.auth>
