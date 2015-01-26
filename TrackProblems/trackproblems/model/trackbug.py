# -*- coding: utf-8 -*-
"""
Auth* related model.

This is where the models used by the authentication stack are defined.

It's perfectly fine to re-use this definition in the trackproblem application,
though.

"""
import os
from datetime import datetime
from hashlib import sha256


from sqlalchemy import Table, ForeignKey, Column
from sqlalchemy.types import Unicode, Integer, DateTime,Text,BigInteger
from sqlalchemy.orm import relation, synonym
from sqlalchemy.dialects.mysql import BIT
from trackproblems.model import DeclarativeBase, metadata, DBSession

# This is the association table for the many-to-many relationship between
# groups and permissions.
 
__all__ = ['TrackModule', 'ProblemType','ProblemPage', 'TrackProblem' ,'TrackImage']


class TrackModule(DeclarativeBase):
 

    __tablename__ = 'track_module'

    id_track_module = Column(BigInteger, autoincrement=True, primary_key=True)
    module_name =   Column(Unicode(255) , nullable=True);
    secure_key =  Column(Unicode(255) , nullable=True);
    domain_name =  Column(Unicode(255) , nullable=True);
    bypass = Column(BIT, nullable=True, default=0); # 0 is not bypass (serious ) , 1 is bypass  
    active = Column(BIT, nullable=True, default=1);
    created = Column(DateTime, default=datetime.now)
    user_id =  Column(   Integer,ForeignKey('tg_user.user_id'), nullable=False, index=True) ;
    user = relation('User', backref='track_module_user_id');
    
    problemType = relation('ProblemType')  ;  

    def __repr__(self):
        return '<TrackModule: name=%s>' % repr(self.module_name)

    def __unicode__(self):
        return self.module_name
    
    @classmethod
    def getAll(cls):
        return DBSession.query(cls).all();
    
    @classmethod
    def getByIdAndSecureKey(cls,id,securekey):
        return DBSession.query(cls).filter(cls.id_track_module == str(id), cls.secure_key == str(securekey) ).first();
    
    @classmethod
    def checkSecureKey(cls,id,securekey):
        module = DBSession.query(cls).filter(cls.id_track_module == str(id), cls.secure_key == str(securekey) ).first();
        if module and module.active == 1 :
            return module;
        return None;
    
    def to_json(self):
        dict  = {"id": self.id_track_module, 
                 "name": self.module_name 
                 };
                 
        return dict;
            
            


class ProblemType(DeclarativeBase):
 

    __tablename__ = 'problem_type'

    id_problem_type = Column(BigInteger, autoincrement=True, primary_key=True)
    id_track_module = Column(   BigInteger,ForeignKey('track_module.id_track_module'), nullable=False, index=True) ;
    track_module = relation('TrackModule', backref='problem_type_id_track_module');
    
    problem_name =  Column(Unicode(255) , nullable=True);
    active= Column(BIT, nullable=True, default=1);
    created = Column(DateTime, default=datetime.now)
     

    def __repr__(self):
        return '<ProblemType: name=%s>' % repr(self.problem_name) 

    def __unicode__(self):
        return self.id_problem_type
    
    @classmethod
    def getProblemByProject(cls,id):
        return  DBSession.query(cls).filter(cls.id_track_module == str(id)).all();
    
    def to_json(self):
        dict  = {"id": self.id_problem_type, 
                 "name": self.problem_name 
                 };
                 
        return dict;
    
 
class ProblemPage(DeclarativeBase):
 

    __tablename__ = 'problem_page'

    id_problem_page = Column(BigInteger, autoincrement=True, primary_key=True)
    id_track_module = Column(   BigInteger,ForeignKey('track_module.id_track_module'), nullable=False, index=True) ;
    track_module = relation('TrackModule', backref='problem_page_id_track_module');
    
    page =  Column(Unicode(255) , nullable=True);
    ref_page =  Column(Unicode(255) , nullable=True);
    
    active= Column(BIT, nullable=True, default=1);
    created = Column(DateTime, default=datetime.now)
     

    def __repr__(self):
        return '<ProblemPage: name=%s>' % repr(self.page)

    def __unicode__(self):
        return self.page
    
class TrackProblem(DeclarativeBase):
 

    __tablename__ = 'track_problem'

    id_track_problem = Column(BigInteger, autoincrement=True, primary_key=True)
    
    id_track_module = Column(   BigInteger,ForeignKey('track_module.id_track_module'), nullable=False, index=True) ;
    track_module = relation('TrackModule', backref='track_problem_id_track_module');
    
    id_problem_page = Column(   BigInteger,ForeignKey('problem_page.id_problem_page'), nullable=False, index=True) ;
    problem_page = relation('ProblemPage', backref='track_problem_id_problem_page');
    
    id_problem_type = Column(   BigInteger,ForeignKey('problem_type.id_problem_type'), nullable=False, index=True) ;
    problem_type = relation('ProblemType', backref='track_problem_id_problem_type');
    
    feedback_url =  Column(Text , nullable=True); 
    
    description =  Column(Text , nullable=True); 
    from_page =  Column(Unicode(255) , nullable=True); 
    user =  Column(Unicode(255) , nullable=True); 
    
    
    image = relation('TrackImage')  ;
    
    active= Column(BIT, nullable=True, default=1);
    created = Column(DateTime, default=datetime.now)
     

    def __repr__(self):
        return '<TrackProblem: name=%s>' % repr(self.track_module.module_name)

    def __unicode__(self):
        return self.track_module.module_name
    
    def save(self):
        DBSession.add(self); 
        DBSession.flush() ;
    
    @classmethod 
    def getListByProjectAndProblemType(cls,projectId,problemId,offset,limit):
        if int( offset) == 1:
            offset = 0;
        else:
            offset  = (int(offset) -1 ) * int( limit);
        return  DBSession.query(cls).filter(cls.id_track_module == str(projectId),cls.id_problem_type == str(problemId)).offset( int( offset )   ).limit(limit).all();
    
    def to_json(self):
        dict  = {"id": self.id_track_problem, 
                 "description": self.description ,
                 "user" : self.user,
                 "from_page" : self.from_page
                 };
        if len(self.image) >0 : 
             
            dict['image'] = self.image[0].id_track_image;
                 
        return dict;
    
class TrackImage(DeclarativeBase):
 

    __tablename__ = 'track_image'

    id_track_image = Column(BigInteger, autoincrement=True, primary_key=True)
    
    id_track_problem = Column(   BigInteger,ForeignKey('track_problem.id_track_problem'), nullable=False, index=True) ;
    track_module = relation('TrackProblem', backref='track_image_id_track_problem');
    
 
    path_image =  Column(Unicode(255) , nullable=True); 
    
    active= Column(BIT, nullable=True, default=1);
    created = Column(DateTime, default=datetime.now)
     

    def __repr__(self):
        return '<TrackImage: name=%s>' % repr(self.path_image)

    def __unicode__(self):
        return self.path_image;
    
    def save(self):
        DBSession.add(self); 
        DBSession.flush() ;
    
    @classmethod
    def getbyId(cls,id):
        return DBSession.query(cls).get(id);
   