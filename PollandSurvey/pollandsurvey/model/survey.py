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
__all__ = ['QuestionType' ]

class QuestionType(DeclarativeBase):

    __tablename__ = 'sur_question_type'

    id_question_type =  Column(Integer, autoincrement=True, primary_key=True)
    description = Column(String(255),unique=True, nullable=False)
    active  = Column(BIT, nullable=True, default=1)
   
   


    def __str__(self):
        return '"%s"' % (self.description )
    
    @classmethod
    def getAll(cls,act):
        if act is not None:
            return DBSession.query(QuestionType).filter(active = 1 ).all();
           
        else:
            return DBSession.query(cls) .all();
    
    
       