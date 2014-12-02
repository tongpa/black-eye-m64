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
import transaction
__all__ = ['GroupVariables', 'QuestionType', 'QuestionProjectType' ,'BasicDataType', 'QuestionProject','LanguageLabel','Variables','BasicData','BasicQuestion','BasicTextData' ,'Question']


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
    
    """ relation   """
    child = relation('BasicQuestion');
    validate = relation('QuestionValidation');
    
    active  = Column(BIT, nullable=True, default=1);
    
    def __init__(self):
        self.active = 1;
        
    def __str__(self):
        return '"%s"' % (self.question )
    
    def save (self):
        DBSession.add(self); 
        DBSession.flush() ;
    
    def delete(self):
       
        for basicq in self.child:
            
            for childen in basicq.basicData.childenText:
                print "delete : BasicTextData : " + str(childen.id_basic_data);
                
                BasicTextData.deleteById(str(childen.id_basic_data));
                 
            print "delete : BasicQuestion : " + str(basicq.id_question) + " , " +  str(basicq.id_basic_data);
            basicq.delete();
            
            print "delete : BasicData : " + str(basicq.basicData.id_basic_data);
            basicq.basicData.delete();
        
        for val in self.validate:
            val.delete();
        DBSession.delete(self); 
        DBSession.flush() ;
        
        
    
    @classmethod
    def deleteBy(cls,question):    
        id_question = question.id_question;
        basicQuestion = BasicQuestion.getByQuestionId(question.id_question);
        
        sql = """ delete sur_text_data.* from 
                    sur_text_data    LEFT JOIN sur_basic_question on sur_text_data.id_basic_data = sur_basic_question.id_basic_data
                    where 
                         sur_basic_question.id_question = '"""  + str(id_question) + """' """;
        result = DBSession.execute(sql);
        DBSession.flush() ;
        
        sql = """ delete sur_basic_question.* from 
                    sur_basic_question     
                    where 
                 sur_basic_question.id_question = '"""  + str(id_question) + """'   """;
        result = DBSession.execute(sql);
        DBSession.flush() ;
        
        """
        sql = "DELETE FROM sur_basic_question WHERE sur_basic_question.id_question = '"+str(id_question)  + "'"; # AND sur_basic_question.id_basic_data = '"+ str(bq.id_basic_data) + "'" ;
        result = DBSession.execute(sql);
        DBSession.flush() ;
            
        for bq in basicQuestion:
            sql = "delete from sur_text_data where id_basic_data =" +str(bq.id_basic_data) ;
            DBSession.execute(sql);
            DBSession.flush() ;
            
            sql = "DELETE FROM sur_basic_data WHERE sur_basic_data.id_basic_data = '"+ str(bq.id_basic_data)  + "'" ;
            result = DBSession.execute(sql);
            DBSession.flush() ;
            
            transaction.commit();
        sql = "DELETE FROM sur_question_validation WHERE sur_question_validation.id_question = '"+ str(id_question) + "'" ;
        result = DBSession.execute(sql);
        DBSession.flush() ;
        
        sql = "DELETE FROM sur_question WHERE sur_question.id_question = '"+ str(id_question) + "'" ;
        result = DBSession.execute(sql);
        DBSession.flush() ;
        transaction.commit();
        """
        """"
        for basicq in question.child:
            for childen in basicq.basicData.childenText:
                sql = "delete from sur_text_data where id_basic_data =" +str(childen.id_basic_data) ;
                result = DBSession.execute(sql);
            DBSession.flush() ;
            sql = "DELETE FROM sur_basic_question WHERE sur_basic_question.id_question = '"+str(basicq.id_question) + "' AND sur_basic_question.id_basic_data = '"+ str(basicq.id_basic_data) + "'" ;
            result = DBSession.execute(sql);
            DBSession.flush() ;
            
            sql = "DELETE FROM sur_basic_data WHERE sur_basic_data.id_basic_data = '"+ str(basicq.basicData.id_basic_data) + "'" ;
            result = DBSession.execute(sql);
            DBSession.flush() ;
            
            sql = "DELETE FROM sur_question_validation WHERE sur_question_validation.id_question = '"+ str(question.id_question) + "'" ;
            result = DBSession.execute(sql);
            DBSession.flush() ;
            
            sql = "DELETE FROM sur_question WHERE sur_question.id_question = '"+ str(question.id_question) + "'" ;
            result = DBSession.execute(sql);
            DBSession.flush() ;
        """
        
    @classmethod
    def getById(cls,id):
        return DBSession.query(cls).get(id); 
    @classmethod
    def getAll(cls,act):
        if act is not None:
            return DBSession.query(cls).filter(cls.active == str(act).decode('utf-8')).all();
            #return DBSession.query(cls).get(act); 
        else:
            return DBSession.query(cls).all();
        
    @classmethod
    def loadJson(cls,parsed_dict):
        question = Question();
         
        question.id_question = parsed_dict.get('id_question');
        question.id_question_type = parsed_dict.get('id_question_type');
        question.id_question_project = parsed_dict.get('id_question_project');
        question.user_id = parsed_dict.get('user_id');
        question.question = parsed_dict.get('question');
        question.help_message = parsed_dict.get('help_message');
        question.text_label = parsed_dict.get('text_label');
        question.order = parsed_dict.get('order');
        question.active = parsed_dict.get('active');
        return question;
        
    @classmethod
    def getQuestionByProjectId(cls,pid):
        datas = [];
        if pid is not None:
            data =  DBSession.query(cls,QuestionType).join(QuestionType).filter(cls.id_question_project == str(pid).decode('utf-8')).all();
            for d,e in data:
                d.question_type_name = e.description;
                datas.append(d); 
        
        return datas;
    
    
    @classmethod
    def updateQuestion(cls):
        pass;
    
    @classmethod
    def createQuestion(cls, values,user_id):
        
        question = Question();
         
        question.question = values.get('question');
        question.help_message = values.get('help_message');
        question.id_question_project = values.get('id_project');
        question.id_question_type = values.get('id_question_type');
        question.text_label = '';
        question.user_id = user_id;
        question.order = 3;
        #question.save();
        
        
        for basic_datas in values.get('datagrid'):
            print basic_datas;
            """"
            basicData = BasicData();
            basicData.id_basic_data_type = 1;
            basicData.save();
            
            basicText = BasicTextData();
            basicText.id_basic_data = basicData.id_basic_data;
            basicText.value = basic_datas.get('value');
            basicText.save();
            
            basicQuestion = BasicQuestion();
            basicQuestion.id_question = question.id_question;
            basicQuestion.id_basic_data = basicData.id_basic_data;
            basicQuestion.answer =    ({True: True, False: False}[ basic_datas.get('value') in 'true']);
            basicQuestion.order = basic_datas.get('seq');
            
            basicQuestion.save();
            """
            
        print "save object";
        
        
        

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
    
    enable_validation  = Column(BIT, nullable=True, default=1);
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
        
    def delete(self):
        DBSession.delete(self); 
        DBSession.flush() ;
        
        
class BasicQuestion(DeclarativeBase):   
    __tablename__ = 'sur_basic_question';

    id_question =  Column(Integer,ForeignKey('sur_question.id_question'), index=True, primary_key=True);
    question = relation('Question', backref='sur_basic_question_id_question');
    
    id_basic_data = Column(   Integer,ForeignKey('sur_basic_data.id_basic_data') , index=True, primary_key=True) ;
    question_project_type = relation('BasicData', backref='sur_basic_data_id_basic_data');
    
    answer   = Column(BIT, nullable=True, default=0);
    order =  Column(Integer   ); 
    basicData  = relation('BasicData')  ;  
    
    
    def __init__(self):
        pass;
        
    def __str__(self):
        return '"%s"' % str(self.id_question )
    
    @classmethod
    def getId(cls,act):
        return DBSession.query(cls).get(act);
    
    @classmethod
    def getByQuestionAndBasic(cls,idQuestion,idBasicData):
        return DBSession.query(cls).filter(cls.id_question == str(idQuestion), cls.id_basic_data == str(idBasicData) ).first();
    
    
    def delete(self):
        DBSession.delete(self); 
        DBSession.flush() ;
        
    def save (self):
        DBSession.add(self); 
        DBSession.flush() ;
        
    @classmethod
    def getByQuestionId(cls,idQuestion):
        return DBSession.query(cls).filter(cls.id_question == str(idQuestion)  ).all();
    @classmethod
    def getBasicTextById(cls,id):
        data = [];
        if id is not None:
            
            #bn = Bundle("mybundle",BasicTextData.id_basic_data,BasicTextData.value,BasicTextData.multi_line,BasicDataType.description,BasicDataType.id_basic_data_type);
            #data = DBSession.query(bn).join(BasicData).join(BasicDataType).join(BasicTextData).filter(cls.id_question == str(id)).all(); 
            
            #data = DBSession.query(BasicTextData.id_basic_data,BasicTextData.value,BasicTextData.multi_line,BasicDataType.description,BasicDataType.id_basic_data_type).join(BasicData).join(BasicDataType).join(BasicTextData).filter(cls.id_question == str(id)).all(); 
            
            data =  DBSession.query(cls.id_question,cls.answer,BasicTextData.id_basic_data,BasicTextData.value,BasicTextData.multi_line,BasicDataType.description,BasicDataType.id_basic_data_type ).join(BasicData).join(BasicTextData).join(BasicDataType).filter(cls.id_question == str(id)).all();
            
            
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
                v['seq'] = str(row) ; 
                value.append(v);   
                row = row +1; 
                
        return value;
             
    
     


class BasicData(DeclarativeBase):

    __tablename__ = 'sur_basic_data'

    id_basic_data =  Column(Integer, autoincrement=True, primary_key=True)
    
    id_basic_data_type = Column(   Integer,ForeignKey('sur_basic_data_type.id_basic_data_type'), nullable=False, index=True) ;
    basic_data_type = relation('BasicDataType', backref='sur_basic_data_id_basic_data_type');
    
    """list childen link """
    childenText = relation('BasicTextData')  ; 
    
    def __init__(self):
        pass;
        
    def __str__(self):
        return '"%s"' % str(self.id_basic_data )
    
    def save (self):
        DBSession.add(self); 
        DBSession.flush() ;
        
    def delete(self):
        DBSession.delete(self); 
        DBSession.flush() ;
    
     
             
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
    
    def save (self):
        DBSession.add(self); 
        DBSession.flush() ;
        
    def remove(self):
        DBSession.delete(self); 
        DBSession.flush() ;
    
    @classmethod
    def deleteById(cls,id):  
        sql = "delete from sur_text_data where id_basic_data =" +str(id) ;
        result = DBSession.execute(sql);
        
    @classmethod
    def getId(cls,act):
        return DBSession.query(cls).get(act); 
        
    
    