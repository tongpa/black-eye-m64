# -*- coding: utf-8 -*-
"""
Auth* related model.

This is where the models used by the authentication stack are defined.

It's perfectly fine to re-use this definition in the PollandSurvey application,
though.

"""
import os
from datetime import datetime
from hashlib import sha256


from sqlalchemy import Table, ForeignKey, Column,and_
from sqlalchemy.types import Unicode,   DateTime, Date, Integer, String, Text,Boolean,BigInteger  

from sqlalchemy.util import KeyedTuple;
from sqlalchemy.orm import relation, synonym, Bundle
from sqlalchemy.exc import IntegrityError
from sqlalchemy.dialects.mysql import BIT
from pollandsurvey.model import DeclarativeBase, metadata, DBSession
import transaction

from pollandsurvey.model import Voter;

__all__ = ['Respondents','RespondentReply','ReplyBasicQuestion']

class Respondents(DeclarativeBase):

    __tablename__ = 'sur_contain_email'

    id_contain_email =  Column(BigInteger, autoincrement=True, primary_key=True)
    
    contain_name = Column(String(255) ) 
    subject = Column(String(255) ) 
    contain = Column(Text ) 
    
    create_date =  Column(DateTime, nullable=False, default=datetime.now); 
    
    active  = Column(BIT, nullable=True, default=1);
    
    
    
    def __init__(self):
        status = 1;
        pass;
        
    def __str__(self):
        return '"%s"' % (self.position )
    def save(self):
        try:
            DBSession.add(self); 
            DBSession.flush() ;
            print "save sur_contail_email"
            return None;
        except  IntegrityError:
            print "Duplicate entry" 
            return "Duplicate entry"
    
    @classmethod
    def getId(cls,act):
        return DBSession.query(cls).get(act);     
    @classmethod
    def getAll(cls,act):
        if act is not None:
            return DBSession.query(cls).filter(cls.active == str(act).decode('utf-8')).all();
            #return DBSession.query(cls).get(act); 
        else:
            return DBSession.query(cls) .all();
        
    def to_json(self):
        return {"id_contain_email": self.id_contain_email, "contain_name": self.contain_name, "subject": self.subject, "contain": self.contain , "active": self.active  };
    def to_dict(self):
        return {"id_contain_email": self.id_contain_email, "contain_name": self.contain_name, "subject": self.subject, "contain": self.contain , "active": self.active  };
    
    
class InviteVoter(DeclarativeBase):

    __tablename__ = 'sur_invite_voter'

    id_invite_voter =  Column(BigInteger, autoincrement=True, primary_key=True)
    
    id_voter = Column(   BigInteger,ForeignKey('sur_voter.id_voter'), nullable=False, index=True) ;
    voter = relation('Voter', backref='sur_invite_voter_id_voter');
    
    id_question_project = Column(   BigInteger,ForeignKey('sur_question_project.id_question_project'), nullable=False, index=True) ;
    question_project = relation('QuestionProject', backref='sur_invite_voter_id_question_project');
    
    id_question_option = Column(   BigInteger,ForeignKey('sur_question_option.id_question_option'), nullable=False, index=True) ;
    question_option = relation('QuestionOption', backref='sur_invite_voter_id_question_option');
    
    first_access_date  =  Column(DateTime);
    password = Column(String(255) )
    
    count_send = Column(Integer,  default=0); 
    invite_date =  Column(DateTime, nullable=False, default=datetime.now); 
    expire_date =  Column(DateTime, nullable=False, default=datetime.now +datetime.timedelta(days=30)); 
    
    
    def __init__(self):
        pass;
        
    def __str__(self):
        return '"%s"' % (self.position )
    
    @classmethod
    def getAll(cls,act):
        return DBSession.query(cls) .all();
    
    def save (self):
        DBSession.add(self); 
        DBSession.flush() ;
            
    def to_json(self):
        return {"id_invite_voter": self.id_invite_voter, "id_voter": self.id_voter, "id_question_project": self.id_question_project, "id_question_option": self.id_question_option,"first_access_date":self.first_access_date,"password":self.password,
                "count_send":self.count_send,"invite_date":self.invite_date,"expire_date":self.expire_date  };
    def to_dict(self):
        return {"id_invite_voter": self.id_invite_voter, "id_voter": self.id_voter, "id_question_project": self.id_question_project, "id_question_option": self.id_question_option,"first_access_date":self.first_access_date,"password":self.password,
                "count_send":self.count_send,"invite_date":self.invite_date,"expire_date":self.expire_date  };
    
    @classmethod
    def getByRespondentAndQuestion(cls,idResp,idQuestion):
        return DBSession.query(cls).filter(cls.id_respondents == str(idResp), cls.id_question == str(idQuestion) ).first();
                
class ReplyBasicQuestion(DeclarativeBase):

    __tablename__ = 'sur_send_email'
    
    id_send_email =  Column(BigInteger, autoincrement=True, primary_key=True)
    
    id_invite_voter = Column(   BigInteger,ForeignKey('sur_invite_voter.id_invite_voter'), nullable=False, index=True) ;
    voter = relation('InviteVoter', backref='sur_send_email_id_invite_voter'); 
    
    email = Column(String(255) )
    subject = Column(String(255) )
    contain = Column(String(255) )
    
    create_date =  Column(DateTime, nullable=False, default=datetime.now); 
    
    send_status  = Column(BIT, nullable=True, default=0);
    
    def __init__(self):
        pass;
        
    def __str__(self):
        return '"%s"' % (self.position )
    
    def save (self):
        DBSession.add(self); 
        DBSession.flush() ;
         
    @classmethod
    def getAll(cls,act):
        return DBSession.query(cls) .all();
        
    def to_json(self):
        return {"id_send_email": self.id_send_email, "id_invite_voter": self.id_invite_voter, "email": self.email,"subject":self.subject, "contain":self.contain,"create_date":self.create_date ,"send_status": self.send_status };
    def to_dict(self):
        return {"id_send_email": self.id_send_email, "id_invite_voter": self.id_invite_voter, "email": self.email,"subject":self.subject, "contain":self.contain,"create_date":self.create_date ,"send_status": self.send_status };
                
            