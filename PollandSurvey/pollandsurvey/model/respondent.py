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

    __tablename__ = 'sur_respondents'

    id_respondents =  Column(BigInteger, autoincrement=True, primary_key=True)
    
    id_voter = Column(   BigInteger,ForeignKey('sur_voter.id_voter'), nullable=False, index=True) ;
    voter = relation('Voter', backref='sur_respondents_id_voter');
    
    response_ip = Column(String(255) ) 
    respondent_data =  Column(DateTime, nullable=False, default=datetime.now); 
    
    id_question_project = Column(   BigInteger,ForeignKey('sur_question_project.id_question_project'), nullable=False, index=True) ;
    question_project = relation('QuestionProject', backref='sur_respondents_id_question_project');
    
    id_question_option = Column(   BigInteger,ForeignKey('sur_question_option.id_question_option'), nullable=False, index=True) ;
    question_option = relation('QuestionOption', backref='sur_respondents_id_question_option');
    
    finished  = Column(BIT, nullable=True, default=0);
     
    create_date =  Column(DateTime, nullable=False, default=datetime.now); 
    
    
    def __init__(self):
        pass;
        
    def __str__(self):
        return '"%s"' % (self.position )
    def save(self):
        try:
            DBSession.add(self); 
            DBSession.flush() ;
            print "save project"
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
        return {"id_respondents": self.id_respondents, "id_voter": self.id_voter, "response_ip": self.response_ip, "id_question_project": self.id_question_project , "id_question_option": self.id_question_option
                , "create_date": self.timezone };
    def to_dict(self):
        return {"id_respondents": self.id_respondents, "id_voter": self.id_voter, "response_ip": self.response_ip, "id_question_project": self.id_question_project , "id_question_option": self.id_question_option
                , "create_date": self.timezone };
    @classmethod
    def getByVoterIdAndPublicId(cls,idvoter,idpublic):
        return DBSession.query(cls).filter(cls.id_voter == str(idvoter), cls.id_question_option == str(idpublic) ).first();
    
    @classmethod
    def getByVoterAndPublicId(cls,idvoter,idpublic):
        
        return DBSession.query(cls).outerjoin(Voter, Voter.id_voter == cls.id_voter).filter( cls.id_voter == str(idvoter), cls.id_question_option == str(idpublic) ).first();

class RespondentReply(DeclarativeBase):

    __tablename__ = 'sur_resp_reply'

    id_resp_reply =  Column(BigInteger, autoincrement=True, primary_key=True)
    
    id_respondents = Column(   BigInteger,ForeignKey('sur_respondents.id_respondents'), nullable=False, index=True) ;
    respondents = relation('Respondents', backref='sur_resp_reply_id_respondents');
    
    id_question = Column(   BigInteger,ForeignKey('sur_question.id_question'), nullable=False, index=True) ;
    question = relation('Question', backref='sur_resp_reply_id_question');
    
     
     
    response_date =  Column(DateTime, nullable=False, default=datetime.now); 
    
    
    def __init__(self):
        pass;
        
    def __str__(self):
        return '"%s"' % (self.position )
    
    @classmethod
    def getAll(cls,act):
        if act is not None:
            return DBSession.query(cls).filter(cls.active == str(act).decode('utf-8')).all();
            #return DBSession.query(cls).get(act); 
        else:
            return DBSession.query(cls) .all();
    
    def save (self):
        DBSession.add(self); 
        DBSession.flush() ;
            
    def to_json(self):
        return {"id_resp_reply": self.id_resp_reply, "id_respondents": self.id_respondents, "id_question": self.id_question, "response_date": self.response_date  };
    def to_dict(self):
        return {"id_resp_reply": self.id_resp_reply, "id_respondents": self.id_respondents, "id_question": self.id_question, "response_date": self.response_date  };
       
    
    @classmethod
    def getByRespondentAndQuestion(cls,idResp,idQuestion):
        return DBSession.query(cls).filter(cls.id_respondents == str(idResp), cls.id_question == str(idQuestion) ).first();
                
class ReplyBasicQuestion(DeclarativeBase):

    __tablename__ = 'sur_reply_basic_question'

    id_resp_reply =  Column(BigInteger,ForeignKey('sur_resp_reply.id_resp_reply'), index=True, primary_key=True);
    respondentreply = relation('RespondentReply', backref='sur_reply_basic_question_id_resp_reply');
    
    id_basic_data = Column(   BigInteger,ForeignKey('sur_basic_data.id_basic_data') , index=True, primary_key=True) ;
    question_project_type = relation('BasicData', backref='sur_reply_basic_question_id_basic_data');
     
    answer_text =  Column(String(255) )  
    
    
    def __init__(self):
        pass;
        
    def __str__(self):
        return '"%s"' % (self.position )
    
    def save (self):
        DBSession.add(self); 
        DBSession.flush() ;
         
    @classmethod
    def getAll(cls,act):
        if act is not None:
            return DBSession.query(cls).filter(cls.active == str(act).decode('utf-8')).all();
            #return DBSession.query(cls).get(act); 
        else:
            return DBSession.query(cls) .all();
        
    def to_json(self):
        return {"id_resp_reply": self.id_resp_reply, "id_basic_data": self.id_basic_data, "answer_text": self.answer_text  };
    def to_dict(self):
        return {"id_resp_reply": self.id_resp_reply, "id_basic_data": self.id_basic_data, "answer_text": self.answer_text  };
                
class Invitation(DeclarativeBase):

    __tablename__ = 'sur_invitation'

    id_invitation =  Column(BigInteger, autoincrement=True, primary_key=True)
    from_name = Column(String(255) )
    subject = Column(String(255) )
    id_question_project = Column(   BigInteger,ForeignKey('sur_question_project.id_question_project'), nullable=False, index=True) ;
    question_project = relation('QuestionProject', backref='sur_invitation_id_question_project');
    
    content = Column(Text )
 
    create_date =  Column(DateTime, nullable=False, default=datetime.now); 
    update_date =  Column(DateTime, nullable=False );
    
    def __init__(self):
        pass;
        
    def __str__(self):
        return '"%s"' % (self.position )
    def save(self):
        try:
            DBSession.add(self); 
            DBSession.flush() ;
            print "save project"
            return None;
        except  IntegrityError:
            print "Duplicate entry" 
            return "Duplicate entry"
    
    @classmethod
    def getId(cls,act):
        return DBSession.query(cls).get(act);    
    
    def to_json(self):
        return {"id_invitation": self.id_invitation, "from_name": self.from_name, "subject": self.subject, "id_question_project": self.id_question_project, "content": self.content, "create_date": self.create_date   };
    def to_dict(self):
        return {"id_invitation": self.id_invitation, "from_name": self.from_name, "subject": self.subject, "id_question_project": self.id_question_project, "content": self.content, "create_date": self.create_date   };
       
            