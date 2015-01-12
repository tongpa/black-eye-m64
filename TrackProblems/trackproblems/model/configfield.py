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


from sqlalchemy import Table, ForeignKey, Column, desc
from sqlalchemy.types import Unicode, Integer, DateTime,Text,BigInteger
from sqlalchemy.orm import relation, synonym
from sqlalchemy.dialects.mysql import BIT
from trackproblems.model import DeclarativeBase, metadata, DBSession

# This is the association table for the many-to-many relationship between
# groups and permissions.
 
__all__ = ['FieldType', 'OwnerPage','FieldOwnerName','FieldOwnerSelectsOption'  ]


class FieldType(DeclarativeBase):
 

    __tablename__ = 'field_type'

    id_field_type = Column(BigInteger, autoincrement=True, primary_key=True);
    name =   Column(Unicode(255) , nullable=True); 

    def __repr__(self):
        return '<TrackModule: name=%s>' % repr(self.name)

    def __unicode__(self):
        return self.name
    
    
            


class OwnerPage(DeclarativeBase):
 

    __tablename__ = 'owner_page'

    id_owner_page = Column(BigInteger, autoincrement=True, primary_key=True)
    owner_name_page =   Column(Unicode(255) , nullable=True);
     
    active= Column(BIT, nullable=True, default=1);
    
     

    def __repr__(self):
        return '<ProblemType: name=%s>' % repr(self.owner_name_page) 

    def __unicode__(self):
        return self.owner_name_page
    
    def to_json(self):
        dict  = {"id": self.id_owner_page, 
                 "name": self.owner_name_page 
                 };
                 
        return dict;
    
 
class FieldOwnerName(DeclarativeBase):
 

    __tablename__ = 'field_owner_name'

    id_field_owner_name = Column(BigInteger, autoincrement=True, primary_key=True)
    
    id_owner_page = Column(   BigInteger,ForeignKey('owner_page.id_owner_page'), nullable=False, index=True) ;
    owner_page = relation('OwnerPage', backref='field_owner_name_id_owner_page');
    
    id_field_type = Column(   BigInteger,ForeignKey('field_type.id_field_type'), nullable=False, index=True) ;
    field_type = relation('FieldType', backref='field_owner_name_id_field_type');
    
    field_label =  Column(Unicode(255) , nullable=True);
    field_name =  Column(Unicode(255) , nullable=True);
    
    field_required = Column(BIT, nullable=True, default=1);
    text_required=  Column(Unicode(255) , nullable=True);
     
    id_parent  = Column(   BigInteger,ForeignKey('field_owner_name.id_parent'), nullable=True, index=True) ;
    parent = relation('FieldOwnerName');
    
    options = relation('FieldOwnerSelectsOption');
    url_get_option =  Column(Unicode(255) , nullable=True);
    seq = Column(Integer, nullable=True, default=1);

    def __repr__(self):
        return '<FieldOwnerName: name=%s>' % repr( self.field_label)

    def __unicode__(self):
        return self.field_name | self.field_label
    
    @classmethod
    def getbyId(cls,id):
        return DBSession.query(cls).get(id);
    @classmethod
    def getByPageId(cls,pageid):
        return DBSession.query(cls).filter(cls.id_owner_page == pageid ).order_by(  cls.seq ).all();
    
    def to_json_field(self):
         
        dict  = {
             "id" : self.id_field_owner_name,
             "type": self.field_type.name, 
             "field_label": self.field_label , 
             "field_name": self.field_name, 
             "field_required": self.field_required,
             "text_required": self.text_required
             };
        
        if hasattr(self, 'child'):
        #if self.child:
            dict['child'] = self.child;
        
         
        
        if hasattr(self, 'select_options'):
            dict['select_options'] = self.select_options;
        else :
            dict['url_get_option'] = self.url_get_option;
        
        
        return dict;
     
      

class FieldOwnerSelectsOption(DeclarativeBase):   
    __tablename__ = 'field_owner_selects_option'

    id_field_owner_selects_option = Column(BigInteger, autoincrement=True, primary_key=True)
    
    id_field_owner_name = Column(   BigInteger,ForeignKey('field_owner_name.id_field_owner_name'), nullable=False, index=True) ;
    field_owner_name = relation('FieldOwnerName', backref='field_owner_selects_option_id_field_owner_name');
    
    
    
    name =  Column(Unicode(255) , nullable=True);
    active= Column(BIT, nullable=True, default=1);
    seq = Column(Integer, nullable=True, default=1);

    def __repr__(self):
        return '<FieldOwnerName: name=%s>' % repr( self.field_label)

    def __unicode__(self):
        return self.field_name | self.field_label
    
    @classmethod
    def getbyId(cls,id):
        return DBSession.query(cls).get(id);
    
    def to_json(self):
        dict  = {"id": self.id_field_owner_selects_option, 
                 "name": self.name 
                 };
                 
        return dict;
   