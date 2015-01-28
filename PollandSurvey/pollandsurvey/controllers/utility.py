import os
import os.path
import base64 
import json 
import logging;
log = logging.getLogger(__name__); 
class Utility(object):

    def __init__(self):
        pass;
    
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
        
    def saveFile(self,filePath,data):
        fp = open(filePath, 'wb' );
        fp.write(data);
        fp.close();
    
import ast
print ast.literal_eval('True')
print bool('true')
print bool('false')

answer = 'false'

print ({True: True, False: False}[ answer in 'true'])
