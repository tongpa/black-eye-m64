 
 

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