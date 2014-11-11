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
from sqlalchemy.types import Unicode, Integer, DateTime, Date, Integer, String, Text,Boolean

from sqlalchemy.util import KeyedTuple;
from sqlalchemy.orm import relation, synonym, Bundle
from sqlalchemy.exc import IntegrityError
from sqlalchemy.dialects.mysql import BIT
from pollandsurvey.model import DeclarativeBase, metadata, DBSession
__all__ = ['GroupVariables', 'QuestionType', 'QuestionProjectType' ,'BasicDataType', 'QuestionProject','LanguageLabel','Variables','BasicData','BasicQuestion','BasicTextData','BasicTextData','Question']


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
     

class GroupVariables(DeclarativeBase):       
    __tablename__ = 'sur_group_variables'

    id_group_variables =  Column(Integer, autoincrement=True, primary_key=True)
    name = Column(String(255),unique=True, nullable=False)
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
        
    def to_json(self):
        return {"id_question_project_type": self.id_question_project_type, "description": self.description, "active": self.active };
    def to_dict(self):
        return {"id_question_project_type": self.id_question_project_type, "description": self.description, "active": self.active };
        
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
        
    @classmethod
    def getByQuestionId(cls):
        DBSession.query(cls) .join(Member).filter(cls.active == str(act).decode('utf-8')).all();
        pass;
     

     

        
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
        if act is not None:
            return DBSession.query(cls).get(act); 
        else:
            return DBSession.query(cls).all();   
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
    
    id_question_project = Column(   Integer,ForeignKey('sur_question_project.id_question_project'), nullable=False, index=True) ;
    project = relation('QuestionProject', backref='sur_question_id_question_project');
    
    user_id = Column(   Integer,ForeignKey('tg_user.user_id'), nullable=False, index=True) ;
    user = relation('User', backref='sur_question_user_id');
    
    question = Column(String(255),  nullable=False);
    help_message = Column(String(255),  nullable=False);
    text_label = Column(String(255),  nullable=False);
    order =  Column(Integer   );
    
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
        
    @classmethod
    def getQuestionByProjectId(cls,pid):
        datas = [];
        if pid is not None:
            data =  DBSession.query(cls,QuestionType).join(QuestionType).filter(cls.id_question_project == str(pid).decode('utf-8')).all();
            for d,e in data:
                d.question_type_name = e.description;
                datas.append(d); 
        
        return datas;

class Variables(DeclarativeBase):
    __tablename__ = 'sur_variables'
    
    
    id_variables =  Column(Integer, autoincrement=True, primary_key=True)
    name = Column(String(255) , nullable=False)
    description = Column(String(255) , nullable=True)
    
    id_group_variables = Column(   Integer,ForeignKey('sur_group_variables.id_group_variables'), nullable=False, index=True) ;
    group_variables = relation('GroupVariables', backref='sur_variables_id_group_variables');
     
    table_jm_ref = Column(String(255) , nullable=True)
    field_jm_ref = Column(String(255) , nullable=True)
    
    
    id_parent = Column(   Integer,ForeignKey('sur_variables.id_variables'), nullable=True, index=True) ;
    #parrent = relation('Variables', backref='sur_variables_id_variables' , remote_side=['sur_variables.id_variables']); #,
    childen = relation('Variables')  
    
    active  = Column(BIT, nullable=True, default=1)
    
    
    def __init__(self):
        self.active = 1;
        
    def __str__(self):
        return '"%s"' % (self.name )
    
    @classmethod
    def getId(cls,act):
        if act is not None:
            return DBSession.query(cls).get(act); 
        else:
            return DBSession.query(cls).all();   
        
    @classmethod
    def getAll(cls,act):
        if act is not None:
            return DBSession.query(cls).filter(cls.active == str(act).decode('utf-8')).all(); 
        else:
            return DBSession.query(cls).all();
    
    @classmethod
    def getAllParent(cls,act):
        if act is not None:
            return DBSession.query(cls).filter( and_ (cls.active == str(act).decode('utf-8'),cls.id_parent  == None )  ).all(); 
        else:
            return DBSession.query(cls).all();
        
    def to_json(self):
        
        dict  = {"id_variables": self.id_variables, "name": self.name,"description": self.description,"id_group_variables": self.id_group_variables,
                "group_variables": self.group_variables.name, 
                "table_jm_ref": self.table_jm_ref, 
                "field_jm_ref": self.field_jm_ref, 
                "group_variables": self.group_variables.name,
                "childen": [],
                "active": self.active };
        child =[];
        if len( self.childen ) >0 : 
            for obj in  self.childen:
                child.append(obj.to_json());
        
        dict['childen'] = child;
         
        return dict;

class QuestionValidation(DeclarativeBase):

    __tablename__ = 'sur_question_validation'

    id_question =  Column(Integer,ForeignKey('sur_question.id_question'), index=True, primary_key=True);
    quest = relation('Question', backref='sur_question_validation_id_question');
    
    enable_validate  = Column(BIT, nullable=True, default=1);
    message = Column(String(255),  nullable=True);
     
    
    
    #active  = Column(BIT, nullable=True, default=1);
    
    
    def __init__(self):
        pass;
        
    def __str__(self):
        return '"%s"' % (self.message )
    
    @classmethod
    def getId(cls,act):
        if act is not None:
            return DBSession.query(cls).get(act); 
        else:
            return DBSession.query(cls).all();       
        
        
class BasicQuestion(DeclarativeBase):   
    __tablename__ = 'sur_basic_question';

    id_question =  Column(Integer,ForeignKey('sur_question.id_question'), index=True, primary_key=True);
    question = relation('Question', backref='sur_basic_question_id_question');
    
    id_basic_data = Column(   Integer,ForeignKey('sur_basic_data.id_basic_data') , index=True, primary_key=True) ;
    question_project_type = relation('BasicData', backref='sur_basic_data_id_basic_data');
    
    basicData  = relation('BasicData')  ;  
    
    
    def __init__(self):
        pass;
        
    def __str__(self):
        return '"%s"' % str(self.id_question )
    @classmethod
    def getBasicTextById(cls,id):
        data = [];
        if id is not None:
            
            #bn = Bundle("mybundle",BasicTextData.id_basic_data,BasicTextData.value,BasicTextData.multi_line,BasicDataType.description,BasicDataType.id_basic_data_type);
            #data = DBSession.query(bn).join(BasicData).join(BasicDataType).join(BasicTextData).filter(cls.id_question == str(id)).all(); 
            data = DBSession.query(BasicTextData.id_basic_data,BasicTextData.value,BasicTextData.multi_line,BasicDataType.description,BasicDataType.id_basic_data_type).join(BasicData).join(BasicDataType).join(BasicTextData).filter(cls.id_question == str(id)).all(); 
            
            #datad = BasicQuestion()._convertBasicTextToJson( data);
             
        return data;
    @classmethod
    def convertBasicTextToJson(self,data):
        value = [];
        row =1;
        for d in data:
            i=0;
            v = {};
            for e in d.keys():
                v[ str(e)] = d[i];
                i = i+1;
                
            if (len (v) >0):                
                v['row'] = str(row) ; 
                value.append(v);   
                row = row +1; 
                
        return value;
             
    
     


class BasicData(DeclarativeBase):

    __tablename__ = 'sur_basic_data'

    id_basic_data =  Column(Integer, autoincrement=True, primary_key=True)
    
    id_basic_data_type = Column(   Integer,ForeignKey('sur_basic_data_type.id_basic_data_type'), nullable=False, index=True) ;
    basic_data_type = relation('BasicDataType', backref='sur_basic_data_id_basic_data_type');
    
    childenText = relation('BasicTextData')  ; 
    
    def __init__(self):
        pass;
        
    def __str__(self):
        return '"%s"' % str(self.id_basic_data )
    
    
    
     
             
class BasicTextData(DeclarativeBase):   
    __tablename__ = 'sur_text_data';

    id_basic_data =  Column(Integer,ForeignKey('sur_basic_data.id_basic_data'), index=True, primary_key=True);
    basic_data = relation('BasicData', backref='sur_text_data_id_basic_data');
    
    value = Column(String(255),  nullable=False);
    multi_line  = Column(BIT, nullable=True, default=1) 
    
    
    
    def __init__(self):
        self.multi_line = 0;
        
    def __str__(self):
        return '"%s"' % str(self.id_basic_data )
    
    