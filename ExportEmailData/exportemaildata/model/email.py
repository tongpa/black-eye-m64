# -*- coding: utf-8 -*-
"""
Auth* related model.

This is where the models used by the authentication stack are defined.

It's perfectly fine to re-use this definition in the ExportEmailData application,
though.

"""
import os
from datetime import datetime
from hashlib import sha256
__all__ = ['EmailData' ,'ExportEmail' ,'EmailTemp']

from sqlalchemy import Table, ForeignKey, Column
from sqlalchemy.types import Unicode, Integer, DateTime
from sqlalchemy.orm import relation, synonym
from sqlalchemy.dialects.mysql import BIT

from exportemaildata.model import DeclarativeBase, metadata, DBSession

class ExportEmail(DeclarativeBase):
    
    __tablename__ = 'export_email'

    id_export_email = Column(Integer, autoincrement=True, primary_key=True)
    
    file_name = Column(Unicode(255) );
    path_file = Column(Unicode(255) );
    error_path_file = Column(Unicode(255) );
    
    total_row = Column(Integer);
    insert_row = Column(Integer );
    error_row = Column(Integer );
    
    same_old_row = Column(Integer );    
    insert_real_row = Column(Integer );
    
    
    active  = Column(BIT, nullable=True, default=1);
    created = Column(DateTime, default=datetime.now);
    
    emailData = relation('EmailData');
     
    def __repr__(self):
        return '<User: name=%s >' % (
                repr(self.file_name) )

    def __unicode__(self):
        return self.file_name 

    
    @classmethod
    def getId(cls,id):
        return DBSession.query(cls).get(id);
        
    def save(self):
        DBSession.add(self); 
        DBSession.flush() ;
    
    
class EmailData(DeclarativeBase):
    """
    User definition.

    This is the user definition used by :mod:`repoze.who`, which requires at
    least the ``user_name`` column.

    """
    __tablename__ = 'email_data'

    id = Column(Integer, autoincrement=True, primary_key=True)
    
    prefix = Column(Unicode(255) );
    firstname_thai = Column(Unicode(255) );
    lastname_thai = Column(Unicode(255) );
    firstname_eng = Column(Unicode(255) );
    lastname_eng = Column(Unicode(255) ); 
    sex = Column(Unicode(255) );
    birthdate = Column(DateTime, default=datetime.now)
    
    pid = Column(Unicode(255) ,index=True );
    passport = Column(Unicode(255) );
    countryname = Column(Unicode(255) );
    house_no = Column(Unicode(255) );
    building_village = Column(Unicode(255) );
    moo = Column(Unicode(255) );
    soi = Column(Unicode(255) );
    road = Column(Unicode(255) );
    county = Column(Unicode(255) );
    city = Column(Unicode(255) );
    province = Column(Unicode(255) );
    postcode= Column(Unicode(255) );
    mobile= Column(Unicode(255) );
    telephone= Column(Unicode(255) );
    email= Column(Unicode(255) ,index=True);
    housing_type= Column(Unicode(255) );
    category= Column(Unicode(255) );
    salary= Column(Unicode(255) );
    education= Column(Unicode(255) ); 
    
    id_export_email = Column(   Integer,ForeignKey('export_email.id_export_email'), nullable=False, index=True) ;
    exportemail = relation('ExportEmail', backref='email_data_id_export_email');
    
    
    def __repr__(self):
        return '<User: name=%s, email=%s, display=%s>' % (
                repr(self.firstname_thai), repr(self.email), repr(self.lastname_thai))

    def __unicode__(self):
        return self.firstname_thai or self.email
    
    @classmethod
    def checkNotDuplicateEmail(cls):
        return DBSession.query(cls).outerjoin(EmailTemp,cls.email == EmailTemp.email).filter(   EmailTemp.email == None   ).all();#.outerjoin(EmailTemp).filter(EmailTemp.email = cls.email).all();
     
    @classmethod
    def checkDuplicateEmail(cls):
        return DBSession.query(cls).outerjoin(EmailTemp,cls.email == EmailTemp.email).filter(   EmailTemp.email != None   ).all();#.outerjoin(EmailTemp).filter(EmailTemp.email = cls.email).all();
         
    
    def save(self):
        DBSession.add(self); 
        
        
        DBSession.flush() ;
        
class EmailTemp(DeclarativeBase):
    """
    User definition.

    This is the user definition used by :mod:`repoze.who`, which requires at
    least the ``user_name`` column.

    """
    __tablename__ = 'email_temp'

    id = Column(Integer, autoincrement=True, primary_key=True)
    
    prefix = Column(Unicode(255) );
    firstname_thai = Column(Unicode(255) );
    lastname_thai = Column(Unicode(255) );
    firstname_eng = Column(Unicode(255) );
    lastname_eng = Column(Unicode(255) ); 
    sex = Column(Unicode(255) );
    birthdate = Column(DateTime, default=datetime.now)
    
    pid = Column(Unicode(255) ,index=True);
    passport = Column(Unicode(255) );
    countryname = Column(Unicode(255) );
    house_no = Column(Unicode(255) );
    building_village = Column(Unicode(255) );
    moo = Column(Unicode(255) );
    soi = Column(Unicode(255) );
    road = Column(Unicode(255) );
    county = Column(Unicode(255) );
    city = Column(Unicode(255) );
    province = Column(Unicode(255) );
    postcode= Column(Unicode(255) );
    mobile= Column(Unicode(255) );
    telephone= Column(Unicode(255) );
    email= Column(Unicode(255)  ,unique=True,index=True  );
    housing_type= Column(Unicode(255) );
    category= Column(Unicode(255) );
    salary= Column(Unicode(255) );
    education= Column(Unicode(255) ); 
    
    
    id_export_email = Column(   Integer,ForeignKey('export_email.id_export_email'), nullable=False, index=True) ;
    exportemail = relation('ExportEmail', backref='email_temp_id_export_email');
    
    
    def __repr__(self):
        return '<User: name=%s, email=%s, display=%s>' % (
                repr(self.firstname_thai), repr(self.email), repr(self.lastname_thai))

    def __unicode__(self):
        return self.firstname_thai or self.email
    
    
    def copyData(self, emailData):
        if(emailData):
            self.prefix = emailData.prefix;
            self.firstname_thai = emailData.firstname_thai;
            self.lastname_thai = emailData.lastname_thai;
            self.firstname_eng = emailData.firstname_eng;
            self.lastname_eng = emailData.lastname_eng;
            
            self.sex = emailData.sex;
            self.birthdate = emailData.birthdate;
            
            self.pid = emailData.pid;
            self.passport = emailData.passport;
            self.countryname = emailData.countryname;
            self.house_no = emailData.house_no;
            self.building_village = emailData.building_village;
            self.moo = emailData.moo;
            self.soi =  emailData.soi;
            self.road =  emailData.road;
            self.county = emailData.county;
            self.city =  emailData.city;
            self.province =  emailData.province;
            self.postcode= emailData.postcode;
            self.mobile= emailData.mobile;
            self.telephone= emailData.telephone;
            self.email=  emailData.email;
            self.housing_type=  emailData.housing_type;
            self.category=  emailData.category;
            self.salary=  emailData.salary;
            self.education=  emailData.education;
            self.id_export_email =  emailData.id_export_email;
        
    
    def save(self):
        DBSession.add(self); 
        
        
        DBSession.flush() ;
           