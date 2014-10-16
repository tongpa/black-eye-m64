 
 

class Utility(object):
    

    def __init__(self, params):
        pass;
    
    @classmethod
    def isEmpty(cls,value):
        if(value is None):
            return None;
        elif (len(value) == 0):
            return None;
        elif (value == ''):
            return None;
        
        return value;
    
    @classmethod
    def convertBoolean(cls,value):
        if (value == True):
            return 1;
        return 0;
    
    @classmethod
    def isBoolean(cls,value):
        if(value is None):
            return False;
        #elif (len(value) == 0):
        #    return False;
        elif (value == ''):
            return False;
        elif  (value == '1'):
            return True;
        elif  (value == 1):
            return True;
        
        return False;