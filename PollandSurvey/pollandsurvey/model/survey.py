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


from sqlalchemy import Table, ForeignKey, Column
from sqlalchemy.types import Unicode, Integer, DateTime, Date, Integer, String, Text,Boolean

from sqlalchemy.orm import relation, synonym
from sqlalchemy.dialects.mysql import BIT
from pollandsurvey.model import DeclarativeBase, metadata, DBSession
__all__ = ['QuestionType', 'QuestionProjectType' ,'BasicDataType', 'QuestionProject','LanguageLabel']


class LanguageLabel(DeclarativeBase):
    __tablename__ = 'sur_language_label'

    id_language_label =  Column(Integer, autoincrement=True, primary_key=True);
    module = Column(String(255), nullable=True);
    default_label = Column(String(255) , nullable=True);
    message_en =  Column(String(255) , nullable=True);
    message_th =  Column(String(255) , nullable=True); 
    active  = Column(BIT, nullable=True, default=1);
    
    def __init__(self):
        self.active = 1;
    def __str__(self):
        return '"%s"' % (self.default_label )
    
    def getLang (self,lang):
        if 'th' == lang:
            return str(self.message_th)  ;
        else:
            return str(self.message_en)  ;
    
    @classmethod
    def getAll(cls,act):
        if act is not None:
            return DBSession.query(cls).filter(cls.active == str(act).decode('utf-8')).all();
            #return DBSession.query(cls).get(act); 
        else:
            return DBSession.query(cls) .all();
     
        
        
class QuestionType(DeclarativeBase):

    __tablename__ = 'sur_question_type'

    id_question_type =  Column(Integer, autoincrement=True, primary_key=True)
    description = Column(String(255),unique=True, nullable=False)
    active  = Column(BIT, nullable=True, default=1)
    
    def __init__(self):
        self.active = 1;
    def __str__(self):
        return '"%s"' % (self.description )
    
    @classmethod
    def getAll(cls,act):
        if act is not None:
            return DBSession.query(cls).filter(cls.active == str(act).decode('utf-8')).all();
            #return DBSession.query(cls).get(act); 
        else:
            return DBSession.query(cls) .all();
    
class QuestionProjectType(DeclarativeBase):

    __tablename__ = 'sur_question_project_type'

    id_question_project_type =  Column(Integer, autoincrement=True, primary_key=True)
    description = Column(String(255),unique=True, nullable=False)
    active  = Column(BIT, nullable=True, default=1)
    
    def __init__(self):
        self.active = 1;
        
    def __str__(self):
        return '"%s"' % (self.description )
    
    @classmethod
    def getAll(cls,act):
        if act is not None:
            return DBSession.query(cls).filter(cls.active == str(act).decode('utf-8')).all();
            #return DBSession.query(cls).get(act); 
        else:
            return DBSession.query(cls) .all();
        
class BasicDataType(DeclarativeBase):

    __tablename__ = 'sur_basic_data_type'

    id_basic_data_type =  Column(Integer, autoincrement=True, primary_key=True)
    description = Column(String(255),unique=True, nullable=False)
    active  = Column(BIT, nullable=True, default=1)
    
    def __init__(self):
        self.active = 1;
        
    def __str__(self):
        return '"%s"' % (self.description )
    
    @classmethod
    def getAll(cls,act):
        if act is not None:
            return DBSession.query(cls).filter(cls.active == str(act).decode('utf-8')).all();
            #return DBSession.query(cls).get(act); 
        else:
            return DBSession.query(cls).all();
        
class QuestionProject(DeclarativeBase):

    __tablename__ = 'sur_question_project'

    id_question_project =  Column(Integer, autoincrement=True, primary_key=True)
    name = Column(String(255) , nullable=False)
    description = Column(String(255) , nullable=False)
    
    user_id = Column(   Integer,ForeignKey('tg_user.user_id'), nullable=False, index=True) ;
    user = relation('User', backref='sur_question_project_user_id');
    
    id_question_project_type = Column(   Integer,ForeignKey('sur_question_project_type.id_question_project_type'), nullable=False, index=True) ;
    question_project_type = relation('QuestionProjectType', backref='sur_question_project_id_question_project_type');
     
    
    header_message = Column(String(255),  nullable=True) 
    footer_message = Column(String(255),  nullable=True) 
    welcome_text = Column(String(255),  nullable=True) 
    end_text = Column(String(255),  nullable=True) 
    start_date =  Column(DateTime, nullable=False, default=datetime.now);
    end_date =  Column(DateTime, nullable=False, default=datetime.now);
    
    active  = Column(BIT, nullable=True, default=1)
    
    def __init__(self):
        self.active = 1;
        
    def __str__(self):
        return '"%s"' % (self.description )
    
    @classmethod
    def getAll(cls,act):
        list =[];
        if act is not None:
            list =  DBSession.query(cls).filter(cls.active == str(act).decode('utf-8')).all();
            #return DBSession.query(cls).get(act); 
        else:
            list =  DBSession.query(cls).all();
        
        for i in list:
            i.question_project_type;
        return list;
        

class Question(DeclarativeBase):

    __tablename__ = 'sur_question'

    id_question =  Column(Integer, autoincrement=True, primary_key=True)
    
    id_question_type = Column(   Integer,ForeignKey('sur_question_type.id_question_type'), nullable=False, index=True) ;
    question_type = relation('QuestionType', backref='sur_question_id_question_type');
    
    user_id = Column(   Integer,ForeignKey('tg_user.user_id'), nullable=False, index=True) ;
    user = relation('User', backref='sur_question_user_id');
    
    question = Column(String(255),  nullable=False);
    help_message = Column(String(255),  nullable=False);
    text_label = Column(String(255),  nullable=False);
    
    
    active  = Column(BIT, nullable=True, default=1);
    
    def __init__(self):
        self.active = 1;
        
    def __str__(self):
        return '"%s"' % (self.question )
    
    @classmethod
    def getAll(cls,act):
        if act is not None:
            return DBSession.query(cls).filter(cls.active == str(act).decode('utf-8')).all();
            #return DBSession.query(cls).get(act); 
        else:
            return DBSession.query(cls).all();
    

class QuestionValidation(DeclarativeBase):

    __tablename__ = 'sur_question_validation'

    id_question =  Column(Integer,ForeignKey('sur_question.id_question'), index=True, primary_key=True);
    quest = relation('Question', backref='sur_question_validation_id_question');
    
    enable_validate  = Column(BIT, nullable=True, default=1);
    message = Column(String(255),  nullable=True);
     
    
    
    #active  = Column(BIT, nullable=True, default=1);
    
    
    def __init__(self):
        self.active = 1;
        
    def __str__(self):
        return '"%s"' % (self.message )
    
    @classmethod
    def getId(cls,act):
        if act is not None:
            return DBSession.query(cls).get(act); 
        else:
            return DBSession.query(cls).all();       