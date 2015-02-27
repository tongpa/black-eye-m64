import os
import os.path
import base64 
import json 
import logging;
import types;
import datetime;
import os.path
log = logging.getLogger(__name__); 
class Utility(object):

    def __init__(self):
        pass;
    
    def getDefaultImagePath(self):
        path = os.getcwd();
        self.target_file_name = os.path.join(os.getcwd(), path , 'pollandsurvey', 'public','img','survey','not_available.png');
        return self.target_file_name;
        
    def joinPathFileAndCreatePath(self,orig_path,subpath,filename):
        self.target_file_name = os.path.join(os.getcwd(), orig_path , subpath, filename);
        print self.target_file_name;
        self.createPathFile(self.target_file_name);        
        return self.target_file_name;
    
    def createPathFile(self,path):         
        if os.path.exists(path):
            return True;
        else:
            path = os.path.dirname(path);
            if(not self.createPathFile(path)):
                os.makedirs(path);
            return False;
  
    
    def isNumber(self,data):
        try:
            float(data)
            return True
        except ValueError:
            pass
     
        try:
            import unicodedata
            unicodedata.numeric(data)
            return True
        except (TypeError, ValueError):
            pass
     
        return False    
    
    def saveFile(self,filePath,data):
        fp = open(filePath, 'wb' );
        fp.write(data);
        fp.close();
    
    def removeFile(self,filePath):
        os.remove( filePath );
        
    def isEmpty(self,data):
        if data is not None:
            
            if data == '':
                return True;
            elif len(str(data).strip()) == 0:
                return True;
            else:
                return False;
        else:
            return True;
        
        
    def convertToDateTime(self,data,format):
        pass;
    
    def spritValue(self,data,value):
         
 
        if not self.isEmpty(data) and  ( type(data) == types.StringType  or type(data) == types.UnicodeType  )   :
            
            return data.lstrip(value).split(value);
        return data;
    
    def isPartOf(self,first,second):
        if first is not None and second is not None:
            first = str(first).lower();
            second = str(second).lower();
            self.index = second.rfind(first);
            print first + " is path of " + second + "  : " + str(self.index);
            if(self.index >=0):
                return True;
            else:
                return False;
        
        return False;
    
    def isActiveFromDate(self,data,start,stop):
        
        if self.isEmpty(start):
            return False;
        
        if self.isEmpty(data):
            data = datetime.datetime.today();
            
        print 'start : ' , start;    
        print 'data : ' , data;
        print 'stop : ' , stop;
        
        
        if self.isEmpty(stop):
            print 'start < date ', start <= data; 
            return start <= data;
        elif start < data <= stop:
            print 'start < data <= stop :', start < data <= stop;
            return start < data <= stop;
        
        return False;
            
    def splitNameWithOutExtention(self,value):
        if (not self.isEmpty(value)):
            fileName, fileExtension = os.path.splitext(value);
            fileExtension = None;
            return fileName;
        
        return value;
            
            
            
#import ast
#print ast.literal_eval('True')
#print bool('true')
#print bool('false')

#answer = 'false'

#print ({True: True, False: False}[ answer in 'true'])

u = Utility();
#u.isPartOf('answer_1.png',"""C:\\fakepath\\answer_1.png""");
#d2 = datetime.datetime.today() - datetime.timedelta(days=2);
#d3 = datetime.datetime.today() + datetime.timedelta(days=15);
#u.isActiveFromDate(None,d2,d3);

#sp =  u.spritValue('/preview/welcome','/');
#print sp[0];
#print u.isNumber('20');
#import types
#print type(u'') is types.UnicodeType;
#sp = u.spritValue("10.2.1", ".");
#print sp;
#u.splitNameWithOutExtention('10.2.1.html');
#from datetime import datetime
#dt_str = '01/02/2015'  + ' 00:00:00' ;
#dt_obj = datetime.strptime(dt_str, '%d/%m/%Y %H:%M:%S')
#print dt_obj;

 

