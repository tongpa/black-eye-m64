class ConvertType(object):
    '''
    classdocs
    '''


    def __init__(self, params):
        '''
        Constructor
        '''
        
    
    @classmethod
    def converToExt(cls,type):
        value = str(type);
        if 'VARCHAR' in value:
            return 'string';
        elif 'DATETIME' in value:
            return 'date';
        elif 'INTEGER' in value:
            return 'int';
        
        
        
        return "";
    
    @classmethod
    def getmodelField(cls,model):
        result = [];
        for key in model.__mapper__.c.keys():
            #print key;
            #print model.__table__.c[key].type
            result.append( dict(name= key,type = ConvertType.converToExt(model.__table__.c[key].type) ) ); #        {'name': key, 'type': ConvertType.converToExt(model.__table__.c[key].type)   });
            #print self.__mapper__.c[key] 
            #3result[key] = getattr(self, key)
        return result
    
#from manageproject.model import Projects        
#print ConvertType.getmodelField(Projects);