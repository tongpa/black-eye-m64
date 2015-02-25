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
__all__ = ['VoterType','Gender','MarriageStatus','Organization','TelephoneType','AddressType','Position','Telephone','Address','Voter','MemberUser']

class VoterType(DeclarativeBase):

    __tablename__ = 'sur_m_voter_type'

    id_voter_type =  Column(BigInteger, autoincrement=True, primary_key=True)
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
        return {"id_voter_type": self.id_voter_type, "description": self.description, "active": self.active };
    def to_dict(self):
        return {"id_voter_type": self.id_voter_type, "description": self.description, "active": self.active };
 
class Gender(DeclarativeBase):

    __tablename__ = 'sur_m_gender'

    id_gender =  Column(BigInteger, autoincrement=True, primary_key=True)
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
        return {"id_gender": self.id_gender, "description": self.description, "active": self.active };
    def to_dict(self):
        return {"id_gender": self.id_gender, "description": self.description, "active": self.active };
     
class MarriageStatus(DeclarativeBase):

    __tablename__ = 'sur_m_marriage_status'

    id_marriage_status =  Column(BigInteger, autoincrement=True, primary_key=True)
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
        return {"id_marriage_status": self.id_marriage_status, "description": self.description, "active": self.active };
    def to_dict(self):
        return {"id_marriage_status": self.id_marriage_status, "description": self.description, "active": self.active };

class Organization(DeclarativeBase):

    __tablename__ = 'sur_organization'

    id_organization =  Column(BigInteger, autoincrement=True, primary_key=True)
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
        return {"id_organization": self.id_organization, "description": self.description, "active": self.active };
    def to_dict(self):
        return {"id_organization": self.id_organization, "description": self.description, "active": self.active };


class TelephoneType(DeclarativeBase):

    __tablename__ = 'sur_m_telephone_type'

    id_telephone_type =  Column(BigInteger, autoincrement=True, primary_key=True)
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
        return {"id_telephone_type": self.id_telephone_type, "description": self.description, "active": self.active };
    def to_dict(self):
        return {"id_telephone_type": self.id_telephone_type, "description": self.description, "active": self.active };

class AddressType(DeclarativeBase):

    __tablename__ = 'sur_m_address_type'

    id_address_type =  Column(BigInteger, autoincrement=True, primary_key=True)
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
        return {"id_address_type": self.id_address_type, "description": self.description, "active": self.active };
    def to_dict(self):
        return {"id_address_type": self.id_address_type, "description": self.description, "active": self.active };



class Position(DeclarativeBase):

    __tablename__ = 'sur_position'

    id_position =  Column(BigInteger, autoincrement=True, primary_key=True)
    
    id_organization = Column(   BigInteger,ForeignKey('sur_organization.id_organization'), nullable=False, index=True) ;
    organization = relation('Organization', backref='sur_position_id_organization');
    
    position = Column(String(255),unique=True, nullable=False)
    department = Column(String(255),unique=True, nullable=False)
    
    id_voter = Column(   BigInteger,ForeignKey('sur_voter.id_voter'), nullable=False, index=True) ;
    
    
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
        
    def to_json(self):
        return {"id_position": self.id_position, "id_organization": self.id_organization, "position": self.position, "department": self.department, "id_voter": self.id_voter };
    def to_dict(self):
        return {"id_position": self.id_position, "id_organization": self.id_organization, "position": self.position, "department": self.department, "id_voter": self.id_voter };

class Telephone(DeclarativeBase):

    __tablename__ = 'sur_telephone'

    id_telephone =  Column(BigInteger, autoincrement=True, primary_key=True)
    
    id_telephone_type = Column(   BigInteger,ForeignKey('sur_m_telephone_type.id_telephone_type'), nullable=False, index=True) ;
    type = relation('TelephoneType', backref='sur_telephone_id_telephone_type');
    
    description = Column(String(255) ) 
    
    id_voter = Column(   BigInteger,ForeignKey('sur_voter.id_voter'), nullable=False, index=True) ;
    
    
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
        
    def to_json(self):
        return {"id_telephone": self.id_telephone, "id_telephone_type": self.id_telephone_type, "description": self.description, "id_voter": self.id_voter  };
    def to_dict(self):
        return {"id_telephone": self.id_telephone, "id_telephone_type": self.id_telephone_type, "description": self.description, "id_voter": self.id_voter  };

class Address(DeclarativeBase):

    __tablename__ = 'sur_address'

    id_address =  Column(BigInteger, autoincrement=True, primary_key=True)
    
    id_address_type = Column(   BigInteger,ForeignKey('sur_m_address_type.id_address_type'), nullable=False, index=True) ;
    addresstype = relation('AddressType', backref='sur_address_id_address_type');
    
    description = Column(String(255) ) 
    
    id_voter = Column(   BigInteger,ForeignKey('sur_voter.id_voter'), nullable=False, index=True) ;
    
    
    def __init__(self):
        pass;
        
    def __str__(self):
        return '"%s"' % (self.position )
    
    @classmethod
    def getById(cls,id):
        return DBSession.query(cls).get(id); 
    
    @classmethod
    def getAll(cls,act):
        if act is not None:
            return DBSession.query(cls).filter(cls.active == str(act).decode('utf-8')).all();
            #return DBSession.query(cls).get(act); 
        else:
            return DBSession.query(cls) .all();
        
    def to_json(self):
        return {"id_address": self.id_address, "id_address_type": self.id_address_type, "description": self.description, "id_voter": self.id_voter  };
    def to_dict(self):
        return {"id_address": self.id_address, "id_address_type": self.id_address_type, "description": self.description, "id_voter": self.id_voter  };
     
class Voter(DeclarativeBase):

    __tablename__ = 'sur_voter'

    id_voter =  Column(BigInteger, autoincrement=True, primary_key=True)
    
    email = Column(String(255) ) 
    prefix = Column(String(255) )
    firstname = Column(String(255) ) 
    lastname = Column(String(255) ) 
    timezone = Column(String(255) ) 
    
    id_marriage_status = Column(   BigInteger,ForeignKey('sur_m_marriage_status.id_marriage_status'), nullable=False, index=True) ;
    marriagestatus = relation('MarriageStatus', backref='sur_voter_id_marriage_status');
    
    id_voter_type = Column(   BigInteger,ForeignKey('sur_m_voter_type.id_voter_type'), nullable=False, index=True) ;
    votertype = relation('VoterType', backref='sur_voter_id_voter_type');
    
    birthdate =   Column(Date);
    
    id_gender = Column(   BigInteger,ForeignKey('sur_m_gender.id_gender'), nullable=False, index=True) ;
    gender = relation('Gender', backref='sur_voter_id_gender');
    
    create_date =  Column(DateTime, nullable=False, default=datetime.now); 
    
    respondents = relation('Respondents')  ; 
    
    
    def __init__(self):
        pass;
        
    def __str__(self):
        return '"%s"' % (self.position )
    
    @classmethod
    def getId(cls,id):
        return DBSession.query(cls).get(id); 
    
    @classmethod
    def getAll(cls,act):
        if act is not None:
            return DBSession.query(cls).filter(cls.active == str(act).decode('utf-8')).all();
            #return DBSession.query(cls).get(act); 
        else:
            return DBSession.query(cls) .all();
        
    def to_json(self):
        return {"id_voter": self.id_voter, "email": self.email, "prefix": self.prefix, "firstname": self.firstname , "lastname": self.lastname
                , "timezone": self.timezone, "id_marriage_status": self.id_marriage_status , "id_voter_type": self.id_voter_type, "birthdate": self.birthdate
                , "id_gender": self.id_gender, "create_date": self.create_date};
    def to_dict(self):
        return {"id_voter": self.id_voter, "email": self.email, "prefix": self.prefix, "firstname": self.firstname , "lastname": self.lastname
                , "timezone": self.timezone, "id_marriage_status": self.id_marriage_status , "id_voter_type": self.id_voter_type, "birthdate": self.birthdate
                , "id_gender": self.id_gender, "create_date": self.create_date};
                
class MemberUser(DeclarativeBase):

    __tablename__ = 'sur_member_user'

    id_member_user =  Column(BigInteger, autoincrement=True, primary_key=True)
    
     
    
    user_id = Column(   Integer,ForeignKey('tg_user.user_id'), nullable=False, index=True) ;
    user = relation('User', backref='sur_member_user_user_id');
    
    id_voter = Column(   BigInteger,ForeignKey('sur_voter.id_voter'), nullable=False, index=True) ;
    voter = relation('Voter', backref='sur_member_user_id_voter');
     
    
    create_date =  Column(DateTime, nullable=False, default=datetime.now); 
    update_date =  Column(DateTime, nullable=False, default=datetime.now); 
    
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
        
    def to_json(self):
        return {"id_member_user": self.id_member_user, "user_id": self.user_id, "id_voter": self.id_voter
                , "create_date": self.create_date
                , "update_date": self.update_date };
    def to_dict(self):
        return {"id_member_user": self.id_member_user, "user_id": self.user_id, "id_voter": self.id_voter
                , "create_date": self.create_date
                , "update_date": self.update_date };
      